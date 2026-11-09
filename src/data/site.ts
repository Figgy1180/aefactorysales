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
  email: 'sales@aefactorysales.com',
  factoryStreet: '2605 William Tell Street',
  factorySite: 'https://aecustomize.com',
  founded: '2022',
  hours: 'Visits by appointment',
  // Paste the short review link from Google Business Profile (Home > Ask for reviews), e.g. https://g.page/r/XXXX/review
  googleReviewUrl: '',
  // YouTube link for the fold-away video (paste the Shorts or watch URL). Empty hides the link.
  youtubeFold: '',
  youtubeFactory: 'https://youtu.be/e296PKRxLe4',
  dealerContact: 'Fei Yang',
  dealerPhone: '(512) 800-0117',
  dealerPhoneHref: 'tel:+15128000117',
  dealerEmail: 'fei@aefactorysales.com',
  // Web3Forms access key. Free at web3forms.com, tied to info@aefactorysales.com.
  // Leave empty and the forms run in preview mode (nothing is sent).
  // Web3Forms access keys are public by design (they only allow sending to the inbox they were created for).
  formKey: import.meta.env.PUBLIC_PREVIEW ? '' : import.meta.env.PUBLIC_WEB3FORMS_KEY || '7fdb1023-5888-4467-b512-4679a328c925', // info@aefactorysales.com
  // Optional second key so dealer applications go straight to Fei. Falls back to the main key.
  dealerFormKey: import.meta.env.PUBLIC_PREVIEW ? '' : import.meta.env.PUBLIC_WEB3FORMS_DEALER_KEY || '320f63a1-10b0-44d8-9462-c0ea9f6a76cc', // fei@aefactorysales.com
} as const;

export const WARRANTY = 'Lifetime on the frame, 3 years on parts';
export const WARRANTY_FULL =
  'Manufacturer-stated lifetime frame and 3-year parts coverage, plus a 1-year workmanship warranty. Coverage is subject to written terms and exclusions; parts claims may not include labor and service fees may apply.';
export const FRAME = {
  short: 'Heat-welded PVC-fiber blend, aluminum core, ceramic coating',
  long: 'Every A&E frame is heat welded, with no screws: a PVC and fiber blend with an aluminum rod inside for strength and a scratch-resistant ceramic coating outside.',
  colors: ['Night Gray', 'Bright White'],
};
export const INSTALL = 'Purchase to completed installation: under one month for standard projects, subject to confirmed scope and scheduling';
export const FINANCING =
  'We work with accredited lenders offering low rates and long terms. Subject to credit approval. Third-party lenders; A&E is not a lender.';

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
    href: '/three-season-rooms/',
    specs: [
      ['Panel', '4 mm polycarbonate, Smoky Gray or Morning Blue'],
      ['Frame', 'Heat-welded PVC-fiber blend, aluminum core, ceramic coating'],
      ['Panel size', 'Up to 3.5 × 10 ft each, arches available'],
      ['Wind', 'Ask for model- and installation-specific wind documentation'],
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
    href: '/three-season-rooms/',
    specs: [
      ['Panel', 'Polycarbonate sunshade panel'],
      ['Hardware', 'High-end handle, ramp water stop included'],
      ['Opening', 'Up to 5 ft per pull, 10 ft meeting in the middle'],
      ['Wind', 'Ask for current model-specific operating and stowed wind guidance'],
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
      ['Wind', 'Ask for current model-specific operating and stowed wind guidance'],
    ],
  },
  {
    id: 'fixed',
    name: 'Fixed Screen',
    family: 'screen',
    kind: '304 stainless steel screens',
    blurb:
      'Our answer to nylon. Stainless steel mesh in a heat-welded frame that resists tearing and keeps out mosquitoes, mice and snakes.',
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
    href: '/three-season-rooms/',
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
    { name: 'A&E Clearfixed to Clearfold', low: 7400, high: 9600, ours: true },
    { name: 'A&E Fixed Screen to Hexfold', low: 5800, high: 6700, ours: true },
  ],
  footnote:
    'Example patio: 16 × 14 ft, two open sides, 8 ft tall (240 sq ft of openings, 224 sq ft of floor). Sunroom ranges from the HomeGuide cost guide (Oct 2026), per floor sq ft applied to 224 sq ft. Motorized screens at $40 to $45 per sq ft of opening, Houston market pricing. A&E ranges use our lowest installed prices on 240 sq ft of openings.',
};

export const CITIES = [
  'Houston', 'Katy', 'Sugar Land', 'Cypress', 'The Woodlands', 'Pearland', 'Spring',
  'League City', 'Friendswood', 'Kingwood', 'Missouri City', 'Tomball', 'Bellaire',
  'West University Place', 'Memorial', 'Humble', 'Richmond', 'Conroe',
];

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
      a: 'One price covers design, the free site visit, CNC fabrication and testing in our Houston factory, installation by our own crew, parts and the factory warranty. Arches, extra posts and locks add to the total, and your quote lists every item.',
    },
    {
      q: 'Do you offer financing?',
      a: FINANCING,
    },
  ],
  room: [
    {
      q: 'Is a polycarbonate patio enclosure cheaper than a glass sunroom?',
      a: 'Usually by a wide margin. For a 16 × 14 ft patio, glass enclosures can have very different structural, ventilation and thermal scopes. Clearfixed or Clearfold on the same patio runs about $7,400 to $9,600. Polycarbonate is also much lighter than glass and flexes instead of shattering.',
    },
    {
      q: 'Is it air-conditioned?',
      a: 'No. It is a 3-season room: shaded, sheltered and ventilated through screen doors and doors that open on both sides. On the hottest August afternoons it will feel close to the outdoor temperature, just out of the sun, wind and bugs. Spring, fall and most of winter are when it shines.',
    },
    {
      q: 'What is the difference between Clearfixed and Clearfold?',
      a: 'Both are tinted polycarbonate. Clearfixed panels stay in place like a wall of windows and can be cut into arches and angles. Clearfold panels fold open on our track, so you can turn the room back into an open patio.',
    },
    {
      q: 'How much light and heat comes through the panels?',
      a: 'The reported reference values for one polycarbonate panel specification are 48% visible light transmission and 0.45 solar heat gain coefficient. Applicable reports for each tint and finished assembly are pending verification; these numbers do not guarantee indoor temperature.',
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
      q: 'Will metal patio screens keep out snakes and mice?',
      a: 'Yes. Fixed Screen uses 304 stainless steel mesh and Hexfold uses honeycomb aluminum mesh. These systems are designed to reduce insect entry when fitted and closed; they are not certified animal barriers.',
    },
    {
      q: 'How long do metal screens last compared to nylon?',
      a: 'Nylon and fiberglass screening typically needs rescreening every 5 to 10 years (HomeGuide). Our metal mesh resists tearing where nylon fails, and the frame carries a lifetime warranty.',
    },
    {
      q: 'Is Hexfold cheaper than motorized screens?',
      a: 'Motorized roll-down screens run about $40 to $45 per sq ft of opening in Houston. Hexfold starts at $28 per sq ft installed, with the look and feel of a high-end retractable and no motor to maintain.',
    },
    {
      q: 'What about my dog?',
      a: 'We can build a pet door right into a Fixed Screen panel so your dog can come and go.',
    },
  ],
  general: [
    {
      q: 'Are patio screens safe in Houston storms?',
      a: 'Wind ratings vary by product, size, anchorage and installation. Request the model-specific reports and the correct storm-preparation instructions. Do not treat any of these systems as hurricane-proof.',
    },
    {
      q: 'Do I need a roof over my patio?',
      a: 'Yes. Our enclosures and screens are built for existing roofed patios. Our track mounts to your posts, beams and slab, and we add posts or framing where an opening needs it.',
    },
    {
      q: 'How long does installation take?',
      a: 'Our target is under one month from purchase to completed installation for standard projects. The confirmed project scope and schedule determine the written installation window.',
    },
    {
      q: 'What does the warranty cover?',
      a: WARRANTY_FULL,
    },
    {
      q: 'What are the frames made of, and what colors come standard?',
      a: 'Every frame is heat welded with no screws: a PVC and fiber blend with an aluminum rod inside and a scratch-resistant ceramic coating outside. Frames come in Night Gray or Bright White. Polycarbonate panels come in Smoky Gray or Morning Blue.',
    },
    {
      q: 'Do you work with HOAs?',
      a: 'Yes. We can give you drawings, colors and product details for your HOA or architectural review application.',
    },
    {
      q: 'Where do you install?',
      a: 'Houston and the greater Houston area, including Katy, Sugar Land, Cypress, The Woodlands, Pearland, Spring, League City, Friendswood, Kingwood, Missouri City, Tomball, Bellaire, West University and Memorial.',
    },
    {
      q: 'Can I see it in person?',
      a: 'Office visits are by appointment. Visit the showroom at 2609 William Tell Street, Houston, TX 77093, or book a free site visit and we will bring samples to your home.',
    },
  ],
};

export const NAV = [
  { href: '/three-season-rooms/', label: '3-season rooms' },
  { href: '/hexfold/', label: 'Hexfold' },
  { href: '/screens/', label: 'Screens' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/projects/', label: 'Projects' },
  { href: '/why-ae/', label: 'Why A&E' },
  { href: '/learn/', label: 'Learn' },
];
