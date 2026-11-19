// AE website Worker.
// Every normal page and file is served straight from the built site (dist/) by Cloudflare's asset server,
// along with public/_headers and public/_redirects. This script only runs for paths with no file,
// which today means one endpoint: POST /api/find-opening for the patio visualizer.

const MODEL = 'claude-sonnet-5-5';
const MAX_BODY = 2_500_000; // bytes of JSON (about a 1.8 MB photo after base64)

const TOOL = {
  name: 'report_openings',
  description: 'Report the patio openings found in the photo, in pixel coordinates of the image as given.',
  input_schema: {
    type: 'object',
    properties: {
      openings: {
        type: 'array',
        maxItems: 3,
        description: 'Open sides of the covered patio that a screen or panel system would fill, largest and most front-facing first. Empty if none is visible.',
        items: {
          type: 'object',
          properties: {
            corners: {
              type: 'array', minItems: 4, maxItems: 4,
              description: 'Four [x, y] pixel points in this order: top-left, top-right, bottom-right, bottom-left of the opening as seen in the photo.',
              items: { type: 'array', minItems: 2, maxItems: 2, items: { type: 'number' } },
            },
            width_ft: { type: 'number', description: 'Estimated real width of the opening in feet.' },
            height_ft: { type: 'number', description: 'Estimated real height of the opening in feet.' },
            confidence: { type: 'string', enum: ['high', 'medium', 'low'] },
            size_clues: { type: 'string', description: 'Short note on what the size estimate is based on (brick courses, a door, windows).' },
          },
          required: ['corners', 'width_ft', 'height_ft', 'confidence'],
        },
      },
      reason_if_none: { type: 'string' },
    },
    required: ['openings'],
  },
};

const PROMPT = (w, h) => `This is a homeowner's photo of a covered patio. The image is ${w} x ${h} pixels; (0,0) is the top-left corner.
Find each open side of the patio that a patio screen or enclosure would fill: the open area bounded by the posts or columns on each side, the beam or header above, and the slab or ground below. If a screen is already installed, use the opening it fills.
For each opening give the four corners exactly at the inside edges of the posts, the underside of the beam and the top of the slab, following the perspective of the photo (the shape is often a skewed four-sided shape, not a rectangle).
Estimate the real width and height in feet using visible references: a standard brick course is about 2.67 in (3 courses per 8 in), house doors are about 80 in tall, typical windows and patio ceilings are 8 to 10 ft. Prefer the most front-facing opening first.
Answer only with the report_openings tool.`;

const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'strict-origin-when-cross-origin',
  },
});

async function findOpening(request, env) {
  if (request.method === 'GET') return json({ enabled: !!env.ANTHROPIC_API_KEY });
  if (request.method !== 'POST') return json({ error: 'Use POST.' }, 405);
  // Only the AE site may call this.
  const origin = request.headers.get('origin') || '';
  if (origin && !/^https:\/\/(www\.)?aefactorysales\.com$/.test(origin)) return json({ error: 'Not allowed.' }, 403);
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'Photo reading is not set up yet.' }, 503);
  // Per-visitor limit (Cloudflare rate limiting binding), so the endpoint can't run up the bill.
  if (env.FIND_LIMIT) {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const { success } = await env.FIND_LIMIT.limit({ key: ip });
    if (!success) return json({ error: 'Too many photos in a short time. Please wait a minute.' }, 429);
  }
  const len = Number(request.headers.get('content-length') || 0);
  if (len > MAX_BODY) return json({ error: 'That photo is too large.' }, 413);
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Bad request.' }, 400); }
  const { image, width, height } = body || {};
  const w = Math.round(Number(width)), h = Math.round(Number(height));
  if (typeof image !== 'string' || image.length > MAX_BODY || !/^[A-Za-z0-9+/=]+$/.test(image)) return json({ error: 'Bad photo.' }, 400);
  if (!(w >= 64 && w <= 2048 && h >= 64 && h <= 2048)) return json({ error: 'Bad photo size.' }, 400);

  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 800,
      tools: [TOOL],
      tool_choice: { type: 'tool', name: 'report_openings' },
      messages: [{ role: 'user', content: [
        { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
        { type: 'text', text: PROMPT(w, h) },
      ] }],
    }),
  });
  if (!r.ok) {
    console.log('anthropic error', r.status, (await r.text()).slice(0, 300));
    return json({ error: 'Could not read the photo right now.' }, 502);
  }
  const out = await r.json();
  const use = (out.content || []).find((c) => c.type === 'tool_use');
  const raw = (use && use.input && Array.isArray(use.input.openings)) ? use.input.openings : [];
  // Clean up: keep valid shapes inside the image, sane sizes.
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, Number(v) || 0));
  const openings = raw.slice(0, 3).filter((o) => Array.isArray(o.corners) && o.corners.length === 4).map((o) => ({
    corners: o.corners.map((p) => [clamp(p[0], 0, w) / w, clamp(p[1], 0, h) / h]), // returned as 0..1 fractions
    width_ft: Math.round(clamp(o.width_ft, 2, 40) * 2) / 2,
    height_ft: Math.round(clamp(o.height_ft, 4, 14) * 2) / 2,
    confidence: ['high', 'medium', 'low'].includes(o.confidence) ? o.confidence : 'low',
  }));
  return json({ openings, note: openings.length ? '' : String((use && use.input && use.input.reason_if_none) || '').slice(0, 200) });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/find-opening' || url.pathname === '/api/find-opening/') return findOpening(request, env);
    return env.ASSETS.fetch(request);
  },
};
