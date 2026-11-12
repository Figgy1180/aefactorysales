import { captureSource, sourceLabel } from './source';
captureSource();

  document.querySelectorAll<HTMLFormElement>('form.quote-form, form.dealer-form, form.review-form').forEach((form) => {
  const note = form.querySelector<HTMLElement>('.form-note')!;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      note.hidden = false;
      note.textContent = form.dataset.invalid || 'Please fill in your name, phone and a 5-digit ZIP code so we can reach you.';
      (form.querySelector(':invalid') as HTMLElement | null)?.focus();
      return;
    }
    note.hidden = true;
    const key = form.dataset.key;
    if (!key) {
      note.hidden = false;
      note.textContent = 'Preview only: on the live site this sends your request to AE and opens the thank-you page. Nothing was sent.';
      return;
    }
    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]')!;
    btn.disabled = true;
    const data = new FormData(form);
    data.append('access_key', key);
    // Tag the lead with its campaign so info@ can see which door hanger or ad brought it in.
    const src = sourceLabel();
    if (src) {
      data.set('lead_source', src.label);
      data.set('landing_page', src.landing);
      data.set('subject', `${data.get('subject') || 'New request from aefactorysales.com'} [${src.label}]`);
    }
    data.set('page', location.pathname);
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data });
      const j = await r.json();
      if (!j.success) throw new Error(j.message);
      track('lead_submit', { form_id: form.id, lead_type: String(data.get('subject') || '').split(' request')[0], lead_source: String(data.get('lead_source') || '') });
      if (form.dataset.inline) {
        // Short forms (Call me back) confirm in place instead of leaving the page.
        form.hidden = true;
        const done = form.parentElement?.querySelector<HTMLElement>('.cb-done');
        if (done) { done.hidden = false; done.querySelector<HTMLElement>('button')?.focus(); }
        form.parentElement?.querySelector<HTMLElement>('.cb-lede')?.setAttribute('hidden', '');
        return;
      }
      location.href = form.dataset.next || '/thank-you/';
    } catch {
      btn.disabled = false;
      note.hidden = false;
      note.textContent = 'That did not go through. Please call (713) 791-8073 or email info@aefactorysales.com and we will set up your visit.';
    }
  });
});

// Measurement hooks. They push to window.dataLayer, which GA4 or a tag manager reads once one is installed.
// Until then they do nothing visible. Events: lead_submit, form_start, cta_click, phone_click.
function track(event: string, params: Record<string, string> = {}) {
  const w = window as unknown as { dataLayer?: unknown[] };
  (w.dataLayer ||= []).push({ event, page_path: location.pathname, ...params });
}
const started = new WeakSet<HTMLFormElement>();
document.addEventListener('focusin', (e) => {
  const f = (e.target as HTMLElement).closest?.('form.quote-form') as HTMLFormElement | null;
  if (f && !started.has(f)) { started.add(f); track('form_start', { form_id: f.id }); }
});
document.addEventListener('click', (e) => {
  const a = (e.target as HTMLElement).closest?.('a, button') as HTMLElement | null;
  if (!a) return;
  const href = a.getAttribute('href') || '';
  if (href.startsWith('tel:')) track('phone_click');
  else if (a.hasAttribute('data-cb-open') || /#book|#quote|free-quote/.test(href)) track('cta_click', { label: (a.textContent || '').trim().slice(0, 60) });
});
