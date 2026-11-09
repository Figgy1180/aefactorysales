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
export const REVIEWS: Review[] = [];
