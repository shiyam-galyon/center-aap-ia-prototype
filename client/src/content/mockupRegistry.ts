/**
 * Mockup Registry — the only file a contributor edits to attach a supplied
 * page mockup to a node in the Center AAP information-architecture plan.
 */
export type MockupAsset = {
  file: string;
  alt: string;
};

export const mockup = (file: string, alt: string): MockupAsset => ({ file, alt });

export const mockupUrl = (file: string) => `${import.meta.env.BASE_URL}${file.replace(/^\//, "")}`;

/**
 * Replace `null` with `mockup("mockups/<file-name>.png", "Description")`.
 * Images live in client/public/mockups/ and are deployed automatically after a
 * commit reaches main. The same image can be assigned to more than one node.
 */
export const mockupRegistry: Record<string, MockupAsset | null> = {
  home: null,
  learn: null,
  about: null,
  history: null,
  staff: null,
  board: null,
  reports: null,
  news: null,
  open: null,
  daf: null,
  impact: null,
  endowed: null,
  "scholarship-fund": null,
  "fund-inquiry": null,
  donate: null,
  "find-fund": null,
  "fund-detail": null,
  cart: null,
  checkout: null,
  confirmation: null,
  apply: null,
  grants: null,
  scholarships: null,
  programs: null,
  teen: null,
  fellowship: null,
  attend: null,
  events: null,
  gala: null,
  hundred: null,
  table: null,
  contact: null,
};
