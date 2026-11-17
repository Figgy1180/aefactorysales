// Verified customer reviews only: the customer's own words, from a source you can show
// (Google, Facebook, text, email, or the review form on /reviews/), with permission to publish.
// Nothing here renders until at least one review is added.
export type Review = {
  name: string;      // first name + last initial, e.g. "Maria G."
  city: string;      // e.g. "Katy, TX"
  project?: string;  // project id from projects.ts, e.g. "p4"
  rating?: number;   // 1 to 5
  text: string;      // exact words; fix obvious typos only
  source: string;    // where it came from, e.g. "Google review, Oct 2026"
};
export const REVIEWS: Review[] = [
  {
    name: 'Homeowner',
    city: 'Houston, TX',
    project: 'p35',
    text: 'I love their upscale product. It takes the worry out of having to call someone out every time we have strong winds or a power outage. The installation was professional and they even cleaned up after themselves, which, sad to say, is rare these days.',
    source: 'Customer feedback shared with AE, November 2026',
  },
  {
    name: 'Homeowner',
    city: 'Lake Conroe, TX',
    project: 'p6',
    text: 'We cook a lot of hot pot, and the smell can linger, but cooking outside was a nightmare with all the bugs we get by the lake. AE screens really gave us our outdoor space back. It blocks the bugs but keeps the air flowing. Would recommend.',
    source: 'Customer feedback shared with AE, November 2026',
  },
];
