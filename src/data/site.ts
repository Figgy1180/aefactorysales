// Single source of truth for the whole site.
// Every fact here comes from the approved marketing doc (marketing/product-features-and-selling-points.md, Nov 5 2026)
// and the official price sheet (Oct 26 2026). Change it here and every page updates.

export const SITE = {
  name: 'AE Factory Sales',
  url: 'https://aefactorysales.com',
  tagline: 'Patio enclosures & screens',
  street: '2609 William Tell Street',
  streetShort: '2609 William Tell St',
  city: 'Houston',
  region: 'TX',
  zip: '77093',
  phone: '(713) 791-8073',
  phoneHref: 'tel:+17137918073',
  phoneE164: '+1-713-791-8073',
  email: 'info@aefactorysales.com',
  factorySite: 'https://aecustomize.com',
  founded: '2022',
  hours: 'Showroom by appointment only. Appointments available 24 hours.',
  // Paste the short review link from Google Business Profile (Home > Ask for reviews), e.g. https://g.page/r/XXXX/review
  googleReviewUrl: '',
  // Public Google Business Profile (verified, listed as "AE Factory Sales", Patio enclosure supplier).
  googleProfileUrl: 'https://www.google.com/maps?cid=7048360137294052373',
  // YouTube link for the fold-away video (paste the Shorts or watch URL). Empty hides the link.
  youtubeFold: 'https://youtu.be/e296PKRxLe4',
  // Web3Forms access key. Free at web3forms.com, tied to info@aefactorysales.com.
  // Leave empty and the forms run in preview mode (nothing is sent).
  // Web3Forms access keys are public by design (they only allow sending to the inbox they were created for).
  formKey: import.meta.env.PUBLIC_PREVIEW ? '' : import.meta.env.PUBLIC_WEB3FORMS_KEY || '7fdb1023-5888-4467-b512-4679a328c925', // all forms (quotes, reviews, dealers) deliver to info@aefactorysales.com
} as const;

export const WARRANTY = 'Lifetime on the frame, 3 years on parts';
export const WARRANTY_FULL =
  'Lifetime on the frame and 3 years on all parts, installed and maintained by the manufacturer. Excludes accidents, intentional damage and acts of God.';
export const FRAME = {
  short: 'Heat-welded PVC-fiber blend, aluminum core, ceramic coating',
  long: 'Every AE frame is heat welded, with no screws: a PVC and fiber blend with an aluminum rod inside for strength and a scratch-resistant ceramic coating outside.',
  colors: ['Night Gray', 'Bright White'],
};
export const INSTALL = 'Within a month of your order, by our own crew';
export const FINANCING =
  'We work with accredited lenders offering low rates and long terms. Subject to credit approval. Third-party lenders; AE is not a lender.';

export type Product = {
  id: string;
  name: string;
  family: 'polycarbonate' | 'screen' | 'both';
  kind: string;
  blurb: string;
  msrp: number; // lowest installed MSRP, $ per sq ft of opening
  href: string;
  specs: [string, string][];
};

export const PRODUCTS: Product[] = [
  {
    id: 'clearfixed',
    name: 'Clearfixed',
    family: 'polycarbonate',
    kind: 'Fixed polycarbonate panels',
    blurb:
      'A wall of tinted panels that turns a covered patio into a 3-season room. Can be cut into arches and angles to match your roofline.',
    msrp: 31,
    href: '/clearfixed/',
    specs: [
      ['Panel', '4 mm polycarbonate, Midnight Smoke or Storm Blue'],
      ['Frame', 'Heat-welded PVC-fiber blend, aluminum core, ceramic coating'],
      ['Panel size', 'Up to 3.5 × 10 ft each, arches available'],
      ['Wind', 'Fixed panels rated to 100 mph'],
    ],
  },
  {
    id: 'clearfold',
    name: 'Clearfold',
    family: 'polycarbonate',
    kind: 'Folding polycarbonate panels',
    blurb:
      'Polycarbonate panels that fold open on our track. Close them for a 3-season room, fold them away for an open patio.',
    msrp: 40,
    href: '/clearfold/',
    specs: [
      ['Panel', 'Polycarbonate sunshade panel'],
      ['Hardware', 'High-end handle, ramp water stop included'],
      ['Opening', 'Up to 5 ft per pull, 10 ft meeting in the middle'],
      ['Wind', 'Operates to about 40 mph; retract and secure for 100+ mph'],
    ],
  },
  {
    id: 'hexfold',
    name: 'Hexfold',
    family: 'screen',
    kind: 'Retractable honeycomb aluminum screens',
    blurb:
      'Folds out of sight when you want the view and pulls closed when the mosquitoes come out. The look of a high-end retractable screen, with no motor to fail.',
    msrp: 28,
    href: '/hexfold/',
    specs: [
      ['Mesh', 'Honeycomb aluminum, about 115 holes per sq in'],
      ['Frame', 'Heat-welded PVC-fiber blend, aluminum core, ceramic coating; stainless steel wheels'],
      ['Opening', 'Up to 10 × 10 ft per pull, 20 ft wide meeting in the middle'],
      ['Wind', 'Operates to about 40 mph; retract and secure for 100+ mph'],
    ],
  },
  {
    id: 'fixed',
    name: 'Fixed Screen',
    family: 'screen',
    kind: '304 stainless steel screens',
    blurb:
      'Our answer to nylon. Stainless steel mesh in a metal-reinforced, heat-welded frame, fitted to help keep bugs and small pests outside.',
    msrp: 24,
    href: '/screens/',
    specs: [
      ['Mesh', '304 stainless steel'],
      ['Frame', 'Heat-welded PVC-fiber blend, aluminum core, ceramic coating'],
      ['Panel size', 'Up to 3.5 × 10 ft each, arches available'],
      ['Extras', 'Pet doors available'],
    ],
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    family: 'both',
    kind: 'Polycarbonate and Hexfold mesh in one',
    blurb:
      'Our top shelf. Polycarbonate panels and honeycomb aluminum mesh in one folding system: half 3-season room, half screened patio.',
    msrp: 56,
    href: '/hybrid/',
    specs: [
      ['Panel', 'Polycarbonate sunshade panel and honeycomb aluminum mesh'],
      ['Hardware', 'High-end handle, ramp water stop included'],
      ['Opening', 'Up to 5 ft per pull, 8 ft meeting in the middle'],
    ],
  },
];

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)!;

// Three typical Houston patios. Priced by open wall area we fill (sq ft of openings).
export const SIZES = [
  { id: 's', name: 'Small', low: 150, high: 200, eg: 'About 12 × 10 ft, two open sides, 8 ft tall', sides: 2, w: 12, d: 10, posts: 0 },
  { id: 'm', name: 'Medium', low: 200, high: 300, eg: 'About 20 × 12 ft, two open sides, 8 ft tall', sides: 2, w: 20, d: 12, posts: 1 },
  { id: 'l', name: 'Large', low: 300, high: 400, eg: 'About 22 × 14 ft, three open sides, 8 ft tall', sides: 3, w: 22, d: 14, posts: 2 },
] as const;

export const money = (n: number) => '$' + (Math.round(n / 100) * 100).toLocaleString('en-US');
export const range = (msrp: number, low: number, high: number) => `${money(msrp * low)} to ${money(msrp * high)}`;

// Example patio used for every comparison: 16 × 14 ft, two open sides, 8 ft tall
// = 240 sq ft of openings, 224 sq ft of floor.
export const EXAMPLE = {
  label: '16 × 14 ft covered patio, two open sides, 8 ft tall',
  openings: 240,
  floor: 224,
  rows: [
    { name: '4-season glass sunroom', low: 45000, high: 90000, ours: false },
    { name: '3-season sunroom', low: 18000, high: 52000, ours: false },
    { name: 'Motorized roll-down screens', low: 9600, high: 10800, ours: false },
    { name: 'AE Clearfixed to Clearfold', low: 7400, high: 9600, ours: true },
    { name: 'AE Fixed Screen to Hexfold', low: 5800, high: 6700, ours: true },
  ],
  footnote:
    'Example patio: 16 × 14 ft, two open sides, 8 ft tall (240 sq ft of openings, 224 sq ft of floor). Sunroom ranges from the HomeGuide cost guide (Oct 2026), per floor sq ft applied to 224 sq ft. Motorized screens at $40 to $45 per sq ft of opening, Houston market pricing. AE ranges use our lowest installed prices on 240 sq ft of openings.',
};

export const CITIES = [
  'Houston', 'Katy', 'Sugar Land', 'Cypress', 'The Woodlands', 'Pearland', 'Spring',
  'League City', 'Friendswood', 'Kingwood', 'Missouri City', 'Tomball', 'Bellaire',
  'West University Place', 'Memorial', 'Humble', 'Richmond', 'Conroe',
];

// Cities that have their own page (built from a real project there). Key = name as shown in lists.
export const CITY_PAGES: Record<string, string> = {
  Katy: '/service-area/katy/',
  Richmond: '/service-area/richmond/',
  Conroe: '/service-area/lake-conroe/',
};

export const FACTS = {
  vlt: '48%',
  shgc: '0.45',
  fixedWind: '100 mph',
  foldWind: 'about 40 mph',
  foldStowed: '100+ mph',
  mesh: 'about 115 holes per sq in',
};

export type QA = { q: string; a: string };

export const FAQ: Record<string, QA[]> = {
  cost: [
    {
      q: 'How much does a patio enclosure cost in Houston?',
      a: 'Our installed prices start at $24 per sq ft for Fixed Screen, $28 for Hexfold, $31 for Clearfixed, $40 for Clearfold and $56 for the Hybrid, measured by the open wall area we fill. A 16 × 14 ft covered patio with two open sides runs about $5,800 to $6,700 in metal screens, or $7,400 to $9,600 as a polycarbonate 3-season room. Your exact price comes from a free site visit.',
    },
    {
      q: 'Why do you price by the square foot of opening?',
      a: 'Two patios that look alike can have very different openings. We price the open wall area we fill in, not your floor space, so you pay for what your patio actually needs. Two open sides on a 16 × 14 ft patio at 8 ft tall is about 240 sq ft.',
    },
    {
      q: 'What is included in the price?',
      a: 'One price covers design, the free site visit, CNC fabrication and testing in our Houston factory, installation by our own crew, parts and the factory warranty. Prices run from $24 to $56 per sq ft of opening, installed. Arches, extra posts and locks add to the total, and your quote lists every item.',
    },
    {
      q: 'Do you offer financing?',
      a: FINANCING,
    },
  ],
  room: [
    {
      q: 'Is a polycarbonate patio enclosure cheaper than a glass sunroom?',
      a: 'Usually by a wide margin. For a 16 × 14 ft patio, a 3-season sunroom runs about $18,000 to $52,000 and a 4-season glass sunroom $45,000 to $90,000 (HomeGuide, Oct 2026). Clearfixed or Clearfold on the same patio runs about $7,400 to $9,600. Polycarbonate is also much lighter than glass and flexes instead of shattering.',
    },
    {
      q: 'Is it air-conditioned?',
      a: 'No. It is a 3-season room: shaded, sheltered and ventilated through screen doors and doors that open on both sides. On the hottest August afternoons it will feel close to the outdoor temperature, just out of the sun, wind and bugs. Spring, fall and most of winter are when it shines.',
    },
    {
      q: 'What is the difference between Clearfixed and Clearfold?',
      a: 'Both are tinted polycarbonate. Clearfixed panels stay in place like a wall of windows and can be cut into arches and angles. Clearfold panels fold open on our track, so you can turn the room back into an open patio. Clearfixed starts at $31 per sq ft of opening installed and Clearfold at $40.',
    },
    {
      q: 'How much light and heat comes through the panels?',
      a: 'Midnight Smoke panels tested at 48% visible light transmission and a 0.45 solar heat gain coefficient. That means they cut glare like sunglasses while you still see the yard. These values were measured on Midnight Smoke panels.',
    },
    {
      q: 'How do I clean polycarbonate?',
      a: 'Use a soft cloth, mild soap and water. Skip abrasive pads and harsh cleaners, since polycarbonate scratches more easily than glass.',
    },
  ],
  screens: [
    {
      q: 'What is Hexfold?',
      a: 'Hexfold is our retractable patio screen. Honeycomb aluminum mesh with about 115 holes per square inch folds on our track, so you can open the patio to the view or close it against mosquitoes. It opens and closes by hand, so there is no motor to fail and no wiring.',
    },
    {
      q: 'Will metal patio screens help with snakes and mice?',
      a: 'They are built to help. Fixed Screen uses 304 stainless steel mesh and Hexfold uses honeycomb aluminum mesh, CNC-cut to your openings. The fit around the screen matters as much as the mesh, so at the site visit we check bottom edges, doors and any pet opening. We do not promise a pest-free patio.',
    },
    {
      q: 'Are your screens metal or fabric?',
      a: 'Metal. Hexfold uses honeycomb aluminum mesh and Fixed Screen uses 304 stainless steel mesh. The frames are metal-reinforced at the core and carry a lifetime warranty, with 3 years on parts. Ask to see both mesh samples at your site visit.',
    },
    {
      q: 'Do AE folding screens work when the power goes out?',
      a: 'Yes. Hexfold opens and closes by hand with its handle, so it does not need household electricity. Its manual folding mechanism has no motor program to reset when power returns. Use it within its operating limits: about 40 mph while open or moving.',
    },
    {
      q: 'Do Hexfold screens need maintenance?',
      a: 'Some. Manual operation removes the motor and controls, not the moving parts: the wheels and track still need simple care. Ask for the current care guide at your site visit.',
    },
    {
      q: 'Is Hexfold cheaper than motorized screens?',
      a: 'Motorized roll-down screens run about $40 to $45 per sq ft of opening in Houston. Hexfold starts at $28 per sq ft installed, with no motor or wiring.',
    },
    {
      q: 'Can I add a doggy door?',
      a: 'Yes. A doggy door is an add-on for a compatible screen panel. We help you pick the size and spot at the site visit. A pet opening is also a way in for other animals, so we plan its closure with you.',
    },
  ],
  general: [
    {
      q: 'Are patio screens safe in Houston storms?',
      a: 'Fixed polycarbonate panels are rated to 100 mph. Hexfold and the other folding systems operate in winds up to about 40 mph; retract and secure them before a big storm and they are good for 100+ mph. These are everyday durability ratings, not a hurricane rating.',
    },
    {
      q: 'Do I need a roof over my patio?',
      a: 'Yes. Our enclosures and screens are built for existing roofed patios. Our track mounts to your posts, beams and slab, and we add posts or framing where an opening needs it. Panels can be up to 10 ft tall.',
    },
    {
      q: 'How long does installation take?',
      a: 'Within a month of your order. We measure at the free site visit, build and test your whole job at our Houston factory, then our own crew installs it, usually in 1 day.',
    },
    {
      q: 'What does the warranty cover?',
      a: WARRANTY_FULL,
    },
    {
      q: 'What are the frames made of, and what colors come standard?',
      a: 'Every frame is heat welded with no screws: a PVC and fiber blend with an aluminum rod inside and a scratch-resistant ceramic coating outside. Frames come in Night Gray or Bright White. Polycarbonate panels come in Midnight Smoke or Storm Blue. Frames carry a lifetime warranty and all parts carry 3 years.',
    },
    {
      q: 'Do you work with HOAs?',
      a: 'Yes. We can give you drawings, colors and product details for your HOA or architectural review application. Frames come in 2 standard colors, Night Gray and Bright White.',
    },
    {
      q: 'Where do you install?',
      a: 'We install in Houston and 17 nearby areas. That includes Katy, Sugar Land, Cypress, The Woodlands, Pearland, Spring, League City, Friendswood, Kingwood, Missouri City, Tomball, Bellaire, West University Place, Memorial, Humble, Richmond and Conroe. Every job is built in our factory next to the showroom at 2609 William Tell St, Houston, TX 77093.',
    },
    {
      q: 'Can I see it in person?',
      a: 'Yes. The showroom is by appointment only, and appointments are available 24 hours a day. Visit the showroom at 2609 William Tell Street, Houston, TX 77093, or book a free site visit and we will bring samples to your home.',
    },
  ],
};

// Products menu in the header: every product page, grouped the way homeowners shop.
export const PRODUCT_MENU = [
  { group: 'Enclose it', items: [
    { href: '/patio-enclosures-houston/', label: 'Patio enclosures', note: 'Overview, all systems' },
    { href: '/three-season-rooms/', label: '3-season rooms', note: 'Polycarbonate panels' },
    { href: '/clearfixed/', label: 'Clearfixed', note: 'Fixed panels' },
    { href: '/clearfold/', label: 'Clearfold', note: 'Folding panels' },
    { href: '/hybrid/', label: 'Hybrid', note: 'Panels and mesh in one' },
  ] },
  { group: 'Screen it', items: [
    { href: '/hexfold/', label: 'Hexfold', note: 'Folding metal screens' },
    { href: '/screens/', label: 'Fixed Screen', note: 'Stainless steel mesh' },
    { href: '/pet-proof-patio-screens/', label: 'Screens for pets', note: 'Doggy door add-on' },
    { href: '/garage-screens/', label: 'Garage screens', note: 'One to three bays' },
  ] },
];

export const NAV = [
  { href: '/pricing/', label: 'Pricing' },
  { href: '/projects/', label: 'Projects' },
  { href: '/why-ae/', label: 'Why AE' },
  { href: '/learn/', label: 'Learn' },
];
