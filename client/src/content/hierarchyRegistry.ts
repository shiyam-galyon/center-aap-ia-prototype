/**
 * Design: Architectural Prototype — this file is the single source of truth for
 * the Center AAP map. Edit labels, notes, hierarchy, or children here only.
 */
export type Template = "home" | "hub" | "editorial" | "people" | "library" | "directory" | "fund" | "cart" | "checkout" | "confirm" | "service" | "form" | "opportunity" | "event";
export type NodeKind = "Page" | "Template" | "Flow";

export type TreeNode = {
  id: string;
  label: string;
  kind: NodeKind;
  template: Template;
  note: string;
  copy?: string;
  children?: TreeNode[];
};

/**
 * HOW TO EDIT
 * - Rename a page: change `label`.
 * - Change helper text: change `note`.
 * - Add a page: copy a child object and give it a unique, lowercase `id`.
 * - Change nesting: move a child object into another node's `children` array.
 * - Remove a page: delete its complete object, including its trailing comma.
 * - Template controls the fallback wireframe. Use "hub" when unsure.
 */
export const hierarchy: TreeNode[] = [
  {
    id: "learn-about-caap",
    label: "Learn About CAAP",
    kind: "Page",
    template: "hub",
    note: "CAAP history, team, leadership, and reports.",
    children: [
      { id: "our-history", label: "Our History", kind: "Page", template: "editorial", note: "Institutional history." },
      { id: "our-staff", label: "Our Staff", kind: "Page", template: "people", note: "Structured staff profiles." },
      { id: "our-advisory-board", label: "Our Advisory Board", kind: "Page", template: "people", note: "Structured board profiles." },
      { id: "reports", label: "Reports", kind: "Page", template: "library", note: "Reports, policies, and documents." },
    ],
  },
  {
    id: "open-a-fund",
    label: "Open a Fund",
    kind: "Page",
    template: "hub",
    note: "Fundholder pathways and fund types.",
    children: [
      { id: "donor-advised-fund", label: "Donor Advised Fund", kind: "Page", template: "service", note: "Fund-type explanation." },
      { id: "impact-area-fund", label: "Impact Area Fund", kind: "Page", template: "service", note: "Fund-type explanation." },
      { id: "endowed-fund", label: "Endowed Fund", kind: "Page", template: "service", note: "Fund-type explanation." },
      { id: "fund-scholarships", label: "Scholarships", kind: "Page", template: "service", note: "Scholarship fund-type explanation." },
    ],
  },
  {
    id: "donate-to-a-cause",
    label: "Donate to a Cause",
    kind: "Page",
    template: "hub",
    note: "Cause discovery and fund selection.",
    children: [
      { id: "search-our-funds", label: "Search Our Funds", kind: "Page", template: "directory", note: "Searchable fund directory." },
    ],
  },
  {
    id: "apply-for-an-opportunity",
    label: "Apply for an Opportunity",
    kind: "Page",
    template: "hub",
    note: "Opportunity and initiative pathways.",
    children: [
      { id: "grants", label: "Grants", kind: "Page", template: "opportunity", note: "Grant opportunity listing." },
      { id: "opportunity-scholarships", label: "Scholarships", kind: "Page", template: "opportunity", note: "Scholarship opportunity listing." },
      { id: "programs", label: "Programs", kind: "Page", template: "opportunity", note: "Program opportunity listing." },
      { id: "teen-grantmaking-initiative", label: "Teen Grantmaking Initiative", kind: "Page", template: "opportunity", note: "Initiative opportunity page." },
      { id: "emerging-philanthropist-fellowship", label: "Emerging Philanthropist Fellowship", kind: "Page", template: "opportunity", note: "Fellowship opportunity page." },
    ],
  },
  {
    id: "attend-an-event",
    label: "Attend an Event",
    kind: "Page",
    template: "hub",
    note: "Signature events and event series.",
    children: [
      { id: "threads-of-giving-gala", label: "Threads of Giving Gala", kind: "Page", template: "event", note: "Signature gala event page." },
      { id: "100-arab-americans", label: "100 Arab Americans", kind: "Page", template: "event", note: "Event page." },
      { id: "directors-table-series", label: "Director’s Table Series", kind: "Page", template: "event", note: "Event-series page." },
    ],
  },
];

export const siteRoot: TreeNode = {
  id: "home",
  label: "Center AAP",
  kind: "Page",
  template: "home",
  note: "Root of the approved public-site hierarchy.",
  copy: "Ahlan wa Sahlan. Welcome. The Center for Arab American Philanthropy is the nation’s only Arab American community foundation.",
};
