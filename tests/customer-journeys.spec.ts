import { test as base, expect } from '@playwright/test';

// All tests are local-only. Block every external request, including form delivery,
// analytics and future third-party scripts. Individual tests may mock form responses.
const test = base.extend({
  context: async ({ context }, use) => {
    await context.route('**/*', async (route) => {
      if (new URL(route.request().url()).origin === 'http://127.0.0.1:4322') {
        await route.continue();
      } else {
        await route.abort('blockedbyclient');
      }
    });
    await use(context);
  },
});

test('homepage and product navigation work at this viewport', async ({ page, isMobile }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Houston/i);
  const nav = page.getByRole('navigation', { name: isMobile ? 'Mobile' : 'Main', exact: true });
  if (isMobile) await page.getByLabel('Open menu').click();
  else await nav.locator('summary').click();
  await nav.locator('a[href="/clearfold/"]').click();
  await expect(page).toHaveURL(/\/clearfold\//);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Clearfold/i);
});

test('estimator prices opening area and responds to system changes', async ({ page }) => {
  await page.goto('/');
  const picker = page.locator('#picker');
  const data = JSON.parse((await picker.getAttribute('data-json'))!);
  const size = data.sizes[1];
  await picker.locator(`label:has(input[name="size"][value="${size.id}"])`).click();
  for (const id of ['clearfold', 'hybrid']) {
    await picker.locator(`label:has(input[name="sys"][value="${id}"])`).click();
    const product = data.products.find((p: { id: string }) => p.id === id);
    const fmt = (v: number) => '$' + (Math.round(v / 100) * 100).toLocaleString('en-US');
    await expect(page.locator('#est-range')).toHaveText(`${fmt(product.msrp * size.low)} to ${fmt(product.msrp * size.high)}`);
    await expect(page.locator('#est-note')).toContainText('sq ft of openings');
  }
});

test('price quiz carries the chosen system and estimate into the inquiry', async ({ page }) => {
  await page.goto('/free-quote/');
  const quiz = page.locator('#quiz');
  const data = JSON.parse((await quiz.getAttribute('data-json'))!);
  await quiz.locator(`[data-size="${data.sizes[1].id}"]`).click();
  await quiz.locator('[data-use="enclose"]').click();
  await quiz.locator('[data-pick="clearfold"]').click();
  await quiz.getByRole('button', { name: 'See my price' }).click();
  await expect(quiz.locator('[data-panel="4"]')).toBeVisible();
  await expect(quiz.locator('#q-sys')).toHaveText('Clearfold');
  const estimate = await quiz.locator('#quiz-visit input[name="estimate"]').inputValue();
  expect(estimate).toContain('Clearfold');
  expect(estimate).toContain((await quiz.locator('#q-total').textContent())!);
});

test('booking dialog supports keyboard focus and Escape', async ({ page, isMobile }) => {
  await page.goto('/clearfold/');
  const opener = page.locator(isMobile ? '.callbar [data-cb-open]' : '.top-actions > a[data-cb-open]');
  await opener.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('#cb-form input[name="name"]')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener).toBeFocused();
});

test('invalid booking is not submitted and points to the missing field', async ({ page }) => {
  let submissions = 0;
  await page.route('https://api.web3forms.com/submit', async (route) => {
    submissions++;
    await route.fulfill({ json: { success: true } });
  });
  await page.goto('/');
  const form = page.locator('#home-book');
  await form.getByRole('button', { name: 'Book my free visit', exact: true }).click();
  await expect(form.getByRole('status')).toContainText('Please add your name');
  await expect(form.locator('input[name="name"]')).toBeFocused();
  expect(submissions).toBe(0);
});

for (const success of [true, false]) {
  test(`booking ${success ? 'confirms and records attribution' : 'failure offers retry without counting a lead'}`, async ({ page }) => {
    let submissions = 0;
    let payload = '';
    await page.route('https://api.web3forms.com/submit', async (route) => {
      submissions++;
      payload = route.request().postData() || '';
      await route.fulfill({ json: { success, message: success ? 'Mock accepted' : 'Mock rejected' } });
    });
    await page.goto('/?src=hanger-winter-qr');
    const form = page.locator('#home-book');
    await expect(form).toHaveAttribute('data-key', 'quality-tests-not-a-real-access-key');
    await form.getByLabel('Name', { exact: true }).fill('AE Automated Test');
    await form.getByLabel('Phone', { exact: true }).fill('2025550148');
    await form.getByRole('button', { name: 'Book my free visit', exact: true }).click();
    if (success) {
      await expect(form).toBeHidden();
      await expect(page.locator('.bv-visit .cb-done').first()).toBeVisible();
      expect(payload).toContain('Winter door hanger (QR scan)');
      expect(payload).toContain('quality-tests-not-a-real-access-key');
    } else {
      await expect(form.getByRole('status')).toContainText('That did not go through');
      await expect(form.getByRole('button', { name: 'Book my free visit', exact: true })).toBeEnabled();
    }
    expect(submissions).toBe(1);
    const events = await page.evaluate(() => (window as unknown as { dataLayer: Record<string, unknown>[] }).dataLayer || []);
    expect(events.filter(e => e.event === 'lead_submit')).toHaveLength(success ? 1 : 0);
    expect(events.filter(e => e.event === 'form_start')).toHaveLength(1);
    expect(JSON.stringify(events)).not.toContain('2025550148');
    expect(JSON.stringify(events)).not.toContain('AE Automated Test');
  });
}
