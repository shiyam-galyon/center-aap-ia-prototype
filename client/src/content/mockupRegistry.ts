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
  "learn-about-caap": null,
  "our-history": null,
  "our-staff": null,
  "our-advisory-board": null,
  reports: null,
  "open-a-fund": null,
  "donor-advised-fund": null,
  "impact-area-fund": null,
  "endowed-fund": null,
  "fund-scholarships": null,
  "donate-to-a-cause": null,
  "search-our-funds": null,
  "apply-for-an-opportunity": null,
  grants: null,
  "opportunity-scholarships": null,
  programs: null,
  "teen-grantmaking-initiative": null,
  "emerging-philanthropist-fellowship": null,
  "attend-an-event": null,
  "threads-of-giving-gala": null,
  "100-arab-americans": null,
  "directors-table-series": null,
};
