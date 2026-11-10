import { captureSource, sourceLabel } from './source';
captureSource();

  document.querySelectorAll<HTMLFormElement>('form.quote-form, form.dealer-form, form.review-form').forEach((form) => {
  const note = form.querySelector<HTMLElement>('.form-note')!;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      note.hidden = false;
      note.textContent = 'Please fill in your name, phone and a 5-digit ZIP code so we can reach you.';
      (form.querySelector(':invalid') as HTMLElement | null)?.focus();
      return;
    }
    const key = form.dataset.key;
    if (!key) {
      note.hidden = false;
      note.textContent = 'Preview only: on the live site this sends your request to A&E and opens the thank-you page. Nothing was sent.';
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
      location.href = form.dataset.next || '/thank-you/';
    } catch {
      btn.disabled = false;
      note.hidden = false;
      note.textContent = 'That did not go through. Please call (713) 791-8073 or email info@aefactorysales.com and we will set up your visit.';
    }
  });
});
