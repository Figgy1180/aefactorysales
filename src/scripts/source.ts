// Lead source tracking: remembers where a visitor came from (door hanger QR, typed hanger address,
// ad link) so every form submission says which campaign brought the lead in.
// Codes look like "hanger-winter-qr": campaign "hanger-winter", method "qr".
const KEY = 'ae_src';
const DAYS = 45; // a hanger can sit on the counter for weeks before they fill the form

const CAMPAIGNS: Record<string, string> = {
  'hanger-winter': 'Winter door hanger',
  'hanger-every': 'Every-season door hanger',
};
const METHODS: Record<string, string> = { qr: 'QR scan', url: 'typed web address' };

type Stored = { code: string; landing: string; at: number };

function read(): Stored | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Stored;
    if (Date.now() - s.at > DAYS * 864e5) { localStorage.removeItem(KEY); return null; }
    return s;
  } catch { return null; }
}
function write(code: string) {
  try { localStorage.setItem(KEY, JSON.stringify({ code, landing: location.pathname, at: Date.now() })); } catch {}
}

/** Call once per page: stores ?src= (or utm_source/utm_campaign), or the page's default campaign. */
export function captureSource() {
  const q = new URLSearchParams(location.search);
  const code = q.get('src') || [q.get('utm_source'), q.get('utm_campaign')].filter(Boolean).join('-');
  if (code) { write(code.slice(0, 60)); return; }
  const fallback = document.body.dataset.defaultSrc;
  if (fallback && !read()) write(fallback);
}

/** Human label for the email, e.g. "Winter door hanger (QR scan)". Null when there is no campaign. */
export function sourceLabel(): { label: string; landing: string } | null {
  const s = read();
  if (!s) return null;
  const parts = s.code.split('-');
  const method = METHODS[parts[parts.length - 1]];
  const base = method ? parts.slice(0, -1).join('-') : s.code;
  const name = CAMPAIGNS[base] || base;
  return { label: method ? `${name} (${method})` : name, landing: s.landing };
}
