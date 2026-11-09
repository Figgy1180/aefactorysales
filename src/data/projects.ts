// Featured projects, installed by the A&E crew. Photos live in src/assets/projects/<id>/ and are
// shown in file-name order (1-..., 2-...). Until a folder exists, the aesds.com photo is used.
import type { ImageMetadata } from 'astro';

export type Project = {
  id: string; slug: string; title: string; city: string; kind: 'Patio' | 'Door' | 'Garage';
  systems: string[]; note?: string; img: string; source: string;
  captions?: Record<string, string>; openClosed?: [string, string]; facts?: [string, string][];
  goal?: string; // what the homeowners wanted, in A&E's words (not a quote)
};
const F = (id: string) => `https://framerusercontent.com/images/${id}.jpg`;
const P = (n: number) => `https://aesds.com/page/p${n}`;
const fold = 'Aluminum folding screens', fixed = 'Fixed steel mesh';

export const PROJECTS: Project[] = [
  {
    id: 'p35', slug: 'houston-20-ft-patio-enclosure', title: '20 ft wide patio enclosure', city: 'Houston', kind: 'Patio',
    systems: [fold, fixed],
    note: 'A covered patio open on two sides. Folding screens meet in the middle across the long side, so the whole wall opens to the yard. Fixed steel mesh closes in the short side.',
    img: F('tqHD0RWwpzcivAgirRk5JRVck'), source: P(35),
    captions: {
      '1-wide': 'Both open sides screened in, seen from the yard',
      '2-long-side': 'The long side: folding panels meeting in the middle',
      '3-inside-closed': 'From inside, screens closed',
      '4-inside-open': 'Same view, folding screens open',
    },
    openClosed: ['3-inside-closed', '4-inside-open'],
    facts: [['Opening', 'About 20 ft wide on the long side'], ['Folding', 'Two folding stacks meeting in the middle'], ['Fixed', 'Steel mesh panels on the short side'], ['Built', 'In our Houston factory, installed by our crew']],
  },
  {
    id: 'p36', slug: 'houston-11-ft-tall-folding-screens', title: '11 ft tall courtyard patio', city: 'Houston', kind: 'Patio',
    systems: [fold],
    note: 'A tall patio tucked between two wings of the house, closed in with 11 ft folding screens that part in the middle.',
    goal: 'The homeowners wanted to sit out in the evening without mosquitoes. Their concern was that 11 ft screens would overwhelm a courtyard that is a prominent part of the house, so the screens had to keep the open feeling and suit the white brick.',
    img: F('PZG2gDnx3Y0sHQatwsFaQdPx5G0'), source: P(36),
    captions: { '1-outside-closed': 'From the patio, screens closed', '2-outside-open': 'Same view, screens folded open', '3-inside-closed': 'From inside, closed', '4-inside-open': 'From inside, open to the yard', '5-side-kitchen': 'Beside the outdoor kitchen' },
    openClosed: ['3-inside-closed', '4-inside-open'],
    facts: [['Height', 'About 11 ft'], ['Folding', 'Two panels meeting in the middle'], ['Built', 'In our Houston factory, installed by our crew']],
  },
  {
    id: 'p14', slug: 'richmond-brick-home-patio-enclosure', title: 'Brick home patio enclosure', city: 'Richmond', kind: 'Patio',
    systems: [fold],
    note: 'Folding screens on both open sides of a covered patio. Fold them back and the whole patio opens to the yard.',
    goal: 'Mosquitoes kept chasing the homeowners inside, even for a morning coffee. They wanted both open sides screened without changing the look of the brick house.',
    img: F('JiV4NxBu9bK0lb8e4ZjCeNG4vM'), source: P(14),
    captions: { '1-corner-closed': 'Both sides closed, from the corner', '2-long-side-closed': 'The long side, closed', '3-long-side-open': 'The long side, folded open', '4-inside-closed': 'From inside, closed', '5-inside-open': 'Same view, open', '6-corner-open': 'Corner view, open' },
    openClosed: ['4-inside-closed', '5-inside-open'],
  },
  {
    id: 'p34', slug: 'houston-freestanding-patio-enclosure', title: 'Freestanding patio enclosure', city: 'Houston', kind: 'Patio',
    systems: [fold, fixed],
    note: 'A detached covered patio in the backyard, screened on every open side with a mix of fixed panels and folding screens.',
    goal: 'The family had a separate patio building in the backyard that rarely got used because of the bugs. They wanted it screened in and still feeling like an outdoor patio.',
    img: F('PGsps7abWQXi8C30qxvA2UmH90E'), source: P(34),
    captions: { '1-corner-closed': 'Corner view, closed', '2-front-closed': 'Front, closed', '3-front-open': 'Front, folded open', '4-inside': 'Inside, looking out to the yard', '5-inside-seating': 'The seating area', '6-corner-open': 'Corner view, open' },
    openClosed: ['2-front-closed', '3-front-open'],
  },
  {
    id: 'p4', slug: 'katy-three-car-garage-screens', title: 'Three-car garage screens', city: 'Katy', kind: 'Garage',
    systems: [fold],
    note: 'Folding screen doors across all three garage bays, so the garage opens to the driveway without letting the bugs in.',
    goal: 'The homeowner spends a lot of time working in the garage and wanted all three doors open for airflow without the flying bugs coming in.',
    img: F('ZTLoUQ0SIO7eiZhR55r3Jp2faKc'), source: P(4),
    captions: { '1-front': 'All three bays from the driveway', '2-left-bays': 'Single bay and double bay', '3-right-bays': 'Folding doors with handles' },
  },
  {
    id: 'p6', slug: 'lake-conroe-outdoor-kitchen-enclosure', title: 'Outdoor kitchen enclosure', city: 'Lake Conroe', kind: 'Patio',
    systems: [fold],
    note: 'Three large openings around an outdoor kitchen. Open them to the pines, or close them when the bugs come out.',
    goal: 'The homeowners love hosting and cooking outside, but bugs showed up once the lights came on. They wanted the enclosure to keep the view of the pines and show off the wood ceiling.',
    img: F('8VLO4hwwquBJqLHA2Zu52GcC81I'), source: P(6),
    captions: { '1-kitchen-inside': 'The outdoor kitchen, screens closed', '2-outside-closed': 'From the patio, closed', '3-outside-open': 'Same view, open', '4-wide': 'The whole back of the house', '5-openings': 'Screens folded to the side' },
    openClosed: ['2-outside-closed', '3-outside-open'],
  },
  {
    id: 'p5', slug: 'cypress-back-door-screen', title: 'Back door screen', city: 'Cypress', kind: 'Door',
    systems: [fold],
    note: 'One retractable screen on the back door. It folds to the side of the frame when you don\'t need it.',
    goal: 'A small job: the homeowners wanted to open the back door for fresh air without letting bugs into the kitchen.',
    img: F('Dm5zkzdgidYVDzExs9NxCJpBEs'), source: P(5),
    captions: { '1-closed': 'Closed', '2-open': 'Folded to the side', '3-half-open': 'Partly open', '4-porch': 'On the covered porch' },
    openClosed: ['1-closed', '2-open'],
  },
];

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/projects/*/*.{jpg,jpeg,png,webp}', { eager: true });
export type Photo = { key: string; img: ImageMetadata; caption?: string };
export function photos(p: Project): Photo[] {
  return Object.entries(files)
    .filter(([k]) => k.split('/').at(-2) === p.id)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, m]) => { const key = k.split('/').pop()!.replace(/\.\w+$/, ''); return { key, img: m.default, caption: p.captions?.[key] }; });
}
export const altFor = (p: Project, caption?: string) =>
  `${caption ? caption + ': ' : ''}${p.title.toLowerCase()} in ${p.city}, TX, with ${p.systems.join(' and ').toLowerCase()}`;
// Never ask for a size bigger than the photo itself (some phone exports are small).
export const fit = (ws: number[], img: ImageMetadata) => { const ok = ws.filter((w) => w <= img.width); return ok.length ? ok : [img.width]; };
