/**
 * Design: Civic Cartography — a navigable information architecture, composed as
 * route rails, waypoints, and editorial detail rather than a generic dashboard.
 */
import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Compass,
  FileText,
  HandHeart,
  Landmark,
  LayoutTemplate,
  Map,
  Maximize2,
  MousePointer2,
  Search,
  Sparkles,
  Ticket,
  UsersRound,
  X,
} from "lucide-react";

type JourneyId = "learn" | "open" | "donate" | "apply" | "attend" | "contact";
type NodeKind = "Hub" | "Template" | "Archive" | "Flow" | "Utility";

type SiteNode = {
  id: string;
  title: string;
  kind: NodeKind;
  template: string;
  description: string;
  examples: string[];
  pageCount: string;
  notes?: string;
};

type Journey = {
  id: JourneyId;
  name: string;
  color: string;
  softColor: string;
  glyph: string;
  description: string;
  icon: typeof BookOpen;
  nodes: SiteNode[];
};

const journeys: Journey[] = [
  {
    id: "learn",
    name: "Learn",
    glyph: "01",
    color: "#1F5E6B",
    softColor: "#DFEAEC",
    description: "Build trust through CAAP’s mission, people, record, and stories of impact.",
    icon: BookOpen,
    nodes: [
      {
        id: "learn-hub",
        title: "Learn About CAAP",
        kind: "Hub",
        template: "Section landing / action hub",
        description: "The orientation point for CAAP’s purpose, proof, and institutional knowledge.",
        examples: ["About CAAP", "Mission & approach", "Impact overview"],
        pageCount: "1 landing page",
      },
      {
        id: "editorial",
        title: "Institutional Pages",
        kind: "Template",
        template: "Standard editorial page",
        description: "Flexible long-form pages with a governed set of narrative, media, and call-to-action modules.",
        examples: ["Our History", "Policies", "Evergreen explanatory pages"],
        pageCount: "Reusable across many pages",
      },
      {
        id: "people",
        title: "People & Governance",
        kind: "Template",
        template: "People directory + profile",
        description: "A structured way to show staff, advisory board members, and individual biographies.",
        examples: ["Our Staff", "Our Advisory Board", "Individual profiles"],
        pageCount: "2 directories + profiles",
      },
      {
        id: "resources",
        title: "Reports & Resources",
        kind: "Archive",
        template: "Document / report library",
        description: "A categorized library for financial reports, research, policies, and downloadable resources.",
        examples: ["Annual reports", "Financials", "Policies"],
        pageCount: "1 archive + documents",
      },
      {
        id: "stories",
        title: "Stories & News",
        kind: "Archive",
        template: "Article archive + detail",
        description: "The durable editorial home for news, grant outcomes, fund stories, and institutional updates.",
        examples: ["News & Blog", "Impact stories", "Individual articles"],
        pageCount: "1 archive + articles",
      },
    ],
  },
  {
    id: "open",
    name: "Open",
    glyph: "02",
    color: "#9A6237",
    softColor: "#F2E6DA",
    description: "Help prospective fundholders understand choices, begin a relationship, and take the next step.",
    icon: Landmark,
    nodes: [
      {
        id: "open-hub",
        title: "Open a Fund",
        kind: "Hub",
        template: "Section landing / action hub",
        description: "The first decision point for prospective fundholders, with clear pathways into the right fund type.",
        examples: ["Open a Fund", "Fund type overview"],
        pageCount: "1 landing page",
      },
      {
        id: "fund-types",
        title: "Fund Type Pages",
        kind: "Template",
        template: "Fund-type / service detail",
        description: "A reusable service explanation that helps visitors compare options and understand the next action.",
        examples: ["Donor Advised Fund", "Impact Area Fund", "Endowed Fund", "Scholarship Fund"],
        pageCount: "4 primary pages",
      },
      {
        id: "fund-inquiry",
        title: "Fund-Opening Inquiry",
        kind: "Flow",
        template: "Decision support + routed inquiry",
        description: "A guided handoff into staff conversation, a form, or a more complete application pathway.",
        examples: ["Which fund is right for me?", "Fund-opening inquiry", "Staff next steps"],
        pageCount: "1 guided flow",
        notes: "The operational meaning of ‘Open’ determines whether this remains a form or becomes a self-service portal.",
      },
      {
        id: "fund-application",
        title: "Application & Confirmation",
        kind: "Flow",
        template: "Application / external portal",
        description: "An optional application surface for agreement, e-signature, and initial-funding steps.",
        examples: ["Applicant data", "Agreement handoff", "Application confirmation"],
        pageCount: "Only if required",
      },
    ],
  },
  {
    id: "donate",
    name: "Donate",
    glyph: "03",
    color: "#AD7144",
    softColor: "#F7E5D6",
    description: "Guide donors from a cause or fund discovery moment into a precise, designated gift.",
    icon: HandHeart,
    nodes: [
      {
        id: "donate-hub",
        title: "Donate to a Cause",
        kind: "Hub",
        template: "Section landing / discovery hub",
        description: "A route into featured funds, themes, general giving, and the full fund search experience.",
        examples: ["Featured funds", "Giving themes", "General CAAP donation"],
        pageCount: "1 landing page",
      },
      {
        id: "fund-directory",
        title: "Fund Discovery",
        kind: "Archive",
        template: "Fund directory / search results",
        description: "A specialized discovery interface for keyword search, A–Z browsing, featured funds, and rich filtering.",
        examples: ["All funds", "Featured funds", "A–Z browse", "Filtered results"],
        pageCount: "1 dynamic archive",
        notes: "Mission, beneficiary, geography, and fund type should be structured taxonomies—not manually written category pages.",
      },
      {
        id: "fund-detail",
        title: "Individual Fund",
        kind: "Template",
        template: "Fund detail",
        description: "The storytelling and giving page for every active fund, combining context, media, metadata, and donation action.",
        examples: ["Palestine Museum US Fund", "Shaheen Media Scholarship", "Teen Grantmaking Initiative"],
        pageCount: "One template, many funds",
      },
      {
        id: "giving-cart",
        title: "Giving Cart & Checkout",
        kind: "Flow",
        template: "Donation amount + cart + checkout",
        description: "A transactional surface for single- or multi-fund gifts, donor details, payment selection, fee logic, and receipt data.",
        examples: ["Add to cart", "Multi-fund basket", "Payment & tax acknowledgement"],
        pageCount: "One connected application flow",
        notes: "This is not a typical page template. It needs fund-level designation, payment, receipt, and finance-reconciliation rules.",
      },
      {
        id: "donation-confirmation",
        title: "Gift Acknowledgement",
        kind: "Utility",
        template: "Donation confirmation / receipt",
        description: "The post-payment acknowledgement experience, paired with email receipt and optional social-sharing prompt.",
        examples: ["On-screen confirmation", "Tax acknowledgement", "Social share"],
        pageCount: "1 confirmation state",
      },
    ],
  },
  {
    id: "apply",
    name: "Apply",
    glyph: "04",
    color: "#58745F",
    softColor: "#E0EADD",
    description: "Make grants, scholarships, programs, and fellowships understandable and actionable.",
    icon: Sparkles,
    nodes: [
      {
        id: "apply-hub",
        title: "Apply for an Opportunity",
        kind: "Hub",
        template: "Section landing / action hub",
        description: "The entry point for people seeking a current grant, scholarship, program, or fellowship opportunity.",
        examples: ["Current opportunities", "Application guidance"],
        pageCount: "1 landing page",
      },
      {
        id: "opportunity-directory",
        title: "Opportunity Explorer",
        kind: "Archive",
        template: "Opportunity directory",
        description: "A clear archive of all opportunities, sortable or grouped by type, status, eligibility, and deadline.",
        examples: ["Grants", "Scholarships", "Programs", "Fellowships"],
        pageCount: "1 dynamic archive",
      },
      {
        id: "opportunity-detail",
        title: "Individual Opportunity",
        kind: "Template",
        template: "Opportunity detail",
        description: "A shared structure for eligibility, requirements, deadlines, award information, FAQs, and an application action.",
        examples: ["Grant opportunity", "Scholarship opportunity", "Teen Grantmaking Initiative", "Emerging Philanthropist Fellowship"],
        pageCount: "One template, many opportunities",
      },
      {
        id: "application-flow",
        title: "Application Flow",
        kind: "Flow",
        template: "Application form / external portal",
        description: "The controlled application workflow and its post-submission next steps.",
        examples: ["Application form", "External portal", "Confirmation"],
        pageCount: "One or more application flows",
      },
    ],
  },
  {
    id: "attend",
    name: "Attend",
    glyph: "05",
    color: "#665C83",
    softColor: "#E9E4F0",
    description: "Give event visitors a clean path from discovery to registration, tickets, sponsorship, or follow-up.",
    icon: Ticket,
    nodes: [
      {
        id: "attend-hub",
        title: "Attend an Event",
        kind: "Hub",
        template: "Section landing / event hub",
        description: "A high-level invitation into CAAP’s current and signature event experiences.",
        examples: ["Upcoming events", "Signature event brands"],
        pageCount: "1 landing page",
      },
      {
        id: "event-calendar",
        title: "Event Calendar",
        kind: "Archive",
        template: "Event listing / calendar",
        description: "A chronological source of truth for upcoming and past events, with series or type filters where useful.",
        examples: ["Upcoming events", "Past events", "Event-type filters"],
        pageCount: "1 dynamic archive",
      },
      {
        id: "event-series",
        title: "Signature Event Series",
        kind: "Template",
        template: "Event series",
        description: "An evergreen home for recurring, branded event experiences that connects their past and future editions.",
        examples: ["Threads of Giving Gala", "100 Arab Americans", "Director’s Table Series"],
        pageCount: "Optional, for recurring brands",
      },
      {
        id: "event-detail",
        title: "Individual Event",
        kind: "Template",
        template: "Event detail",
        description: "A structured dated-event page for agenda, location, speakers, tickets, sponsorships, and attendee logistics.",
        examples: ["Threads of Giving Gala 2026", "100 Arab Americans event", "Director’s Table date"],
        pageCount: "One template, many events",
      },
      {
        id: "event-registration",
        title: "Registration & Tickets",
        kind: "Flow",
        template: "Event registration / ticketing",
        description: "A separate event transaction that carries attendee, ticket, sponsorship, and payment data—not just a donation.",
        examples: ["Ticket selection", "Sponsorship choice", "Registration confirmation"],
        pageCount: "One or more event flows",
      },
    ],
  },
  {
    id: "contact",
    name: "Contact",
    glyph: "06",
    color: "#7E6047",
    softColor: "#F0E4DA",
    description: "Turn broad interest into a well-routed conversation with the correct CAAP team or next step.",
    icon: UsersRound,
    nodes: [
      {
        id: "contact-hub",
        title: "Contact CAAP",
        kind: "Hub",
        template: "Contact / relationship routing",
        description: "A focused relationship page that makes it easy to choose the appropriate contact path.",
        examples: ["General contact", "Department routing", "Contact information"],
        pageCount: "1 landing page",
      },
      {
        id: "inquiry-form",
        title: "Routed Inquiry Forms",
        kind: "Template",
        template: "Contextual contact form",
        description: "A configurable form structure that can route questions based on purpose and capture only necessary details.",
        examples: ["General contact", "Fund-opening inquiry", "Partnership or media inquiry"],
        pageCount: "One template, multiple contexts",
      },
      {
        id: "contact-confirmation",
        title: "Contact Confirmation",
        kind: "Utility",
        template: "Form confirmation",
        description: "A clear acknowledgement state that sets expectations and confirms the inquiry route.",
        examples: ["Thank-you message", "Expected-response language"],
        pageCount: "1 reusable state",
      },
    ],
  },
];

const foundations: SiteNode[] = [
  {
    id: "global-shell",
    title: "Global Site Shell",
    kind: "Template",
    template: "Shared site foundation",
    description: "The consistent frame for every public page: header, navigation, utility actions, breadcrumbs, footer, alerts, and the visual language for calls to action.",
    examples: ["Primary navigation", "Donate / Login utilities", "Footer", "Mobile menu"],
    pageCount: "Used on every page",
  },
  {
    id: "component-system",
    title: "Reusable Components",
    kind: "Template",
    template: "Modular content system",
    description: "The cards and modules that make every template flexible without turning each page into a bespoke build.",
    examples: ["Hero", "CTA band", "Quote", "Metrics", "Media", "FAQ", "Related content"],
    pageCount: "Used across all templates",
  },
  {
    id: "utility-pages",
    title: "Utility Surfaces",
    kind: "Utility",
    template: "System pages",
    description: "The quiet but necessary pages that maintain continuity, findability, and compliance across the site.",
    examples: ["Search results", "404 / not found", "Privacy", "Accessibility", "Generic confirmation"],
    pageCount: "Shared system states",
  },
];

const typeStyles: Record<NodeKind, { foreground: string; background: string }> = {
  Hub: { foreground: "#1F5E6B", background: "#DCEBED" },
  Template: { foreground: "#4E514C", background: "#EBEBDD" },
  Archive: { foreground: "#6A5C7E", background: "#EAE5F0" },
  Flow: { foreground: "#9A563B", background: "#F5E0D6" },
  Utility: { foreground: "#6B625B", background: "#ECE8E1" },
};

function NodeCard({
  node,
  accent,
  selected,
  onSelect,
}: {
  node: SiteNode;
  accent: string;
  selected: boolean;
  onSelect: (node: SiteNode) => void;
}) {
  const kindStyle = typeStyles[node.kind];

  return (
    <button
      type="button"
      onClick={() => onSelect(node)}
      className={`node-card group relative w-full rounded-[11px] border text-left transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(38,47,46,0.08)] focus-visible:ring-2 focus-visible:ring-[#1F5E6B] focus-visible:ring-offset-2 ${
        selected ? "border-[#1F5E6B] bg-[#FFFDFC] shadow-[0_12px_25px_rgba(31,94,107,0.10)]" : "border-[#DDD7CA] bg-[#FCFAF3]/95"
      }`}
      aria-pressed={selected}
    >
      <span className="absolute -left-[7px] top-7 h-3 w-3 rounded-full border-[3px] border-[#F7F3EA]" style={{ backgroundColor: accent }} />
      <div className="flex min-h-[164px] flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em]" style={{ backgroundColor: kindStyle.background, color: kindStyle.foreground }}>
            {node.kind}
          </span>
          <ArrowUpRight className="h-4 w-4 text-[#8A897F] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
        </div>
        <h3 className="mt-5 text-[18px] font-extrabold leading-tight text-[#223336]">{node.title}</h3>
        <p className="mt-1.5 text-[12px] font-semibold leading-relaxed text-[#68706C]">{node.template}</p>
        <div className="mt-auto flex items-center justify-between border-t border-[#ECE7DD] pt-4 text-[11px] font-semibold text-[#77786F]">
          <span>{node.pageCount}</span>
          <span className="inline-flex items-center gap-1 text-[#1F5E6B]">Inspect <ChevronRight className="h-3.5 w-3.5" /></span>
        </div>
      </div>
    </button>
  );
}

function TemplateStamp({ kind }: { kind: NodeKind }) {
  const style = typeStyles[kind];
  return (
    <span className="inline-flex rounded-full px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em]" style={{ backgroundColor: style.background, color: style.foreground }}>
      {kind}
    </span>
  );
}

export default function Home() {
  const [activeJourney, setActiveJourney] = useState<JourneyId | "all">("all");
  const [expanded, setExpanded] = useState<Record<JourneyId, boolean>>({
    learn: true,
    open: true,
    donate: true,
    apply: true,
    attend: true,
    contact: true,
  });
  const [search, setSearch] = useState("");
  const [selectedNode, setSelectedNode] = useState<SiteNode>(journeys[2].nodes[3]);
  const [showDetails, setShowDetails] = useState(true);

  const query = search.trim().toLowerCase();
  const activeJourneys = useMemo(
    () => (activeJourney === "all" ? journeys : journeys.filter((journey) => journey.id === activeJourney)),
    [activeJourney],
  );

  const displayedJourneys = activeJourneys
    .map((journey) => ({
      ...journey,
      nodes: journey.nodes.filter((node) => {
        if (!query) return true;
        return `${node.title} ${node.kind} ${node.template} ${node.description} ${node.examples.join(" ")}`.toLowerCase().includes(query);
      }),
    }))
    .filter((journey) => journey.nodes.length > 0);

  const totalNodeCount = journeys.reduce((total, journey) => total + journey.nodes.length, 0) + foundations.length;

  const selectNode = (node: SiteNode) => {
    setSelectedNode(node);
    setShowDetails(true);
  };

  const resetMap = () => {
    setActiveJourney("all");
    setSearch("");
    setExpanded({ learn: true, open: true, donate: true, apply: true, attend: true, contact: true });
  };

  return (
    <main className="min-h-screen bg-[#F7F3EA] text-[#223336]">
      <div className="map-grain pointer-events-none fixed inset-0 opacity-60" />

      <aside className="map-key-rail relative z-20 hidden w-[320px] shrink-0 flex-col border-r border-[#DCD7CD] bg-[#FDFBF6]/95 px-7 py-8 md:fixed md:inset-y-0 md:left-0 md:flex">
        <div>
          <div className="flex items-center gap-3">
            <img src="/manus-storage/caap-sitemap-compass-mark_41843878.png" alt="Compass lattice mark" className="h-12 w-12 object-contain" />
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.19em] text-[#8B7251]">Center AAP</p>
              <p className="font-serif text-[30px] leading-[0.86] text-[#1F5E6B]">Site Map</p>
              <p className="mt-1.5 text-[8px] font-extrabold uppercase tracking-[0.16em] text-[#747A73]">Architecture navigator</p>
            </div>
          </div>
          <div className="mt-10">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#8B8176]">Map lens</p>
            <h1 className="mt-3 font-serif text-[31px] leading-[1.05] text-[#223336]">A navigable blueprint for CAAP’s next digital home.</h1>
            <p className="mt-4 text-[13px] leading-6 text-[#68706C]">Explore the visitor journeys, page branches, reusable templates, and transactional flows beneath the proposed architecture.</p>
          </div>
        </div>

        <nav className="mt-10" aria-label="Journey filters">
          <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#8B8176]">Primary journeys</p>
          <div className="space-y-1.5">
            <button
              type="button"
              onClick={() => setActiveJourney("all")}
              className={`journey-filter w-full ${activeJourney === "all" ? "journey-filter-active" : ""}`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#E2ECEC] text-[#1F5E6B]"><Map className="h-3.5 w-3.5" /></span>
              <span>All routes</span>
              <span className="ml-auto text-[10px] text-[#86877F]">6</span>
            </button>
            {journeys.map((journey) => {
              const Icon = journey.icon;
              return (
                <button
                  key={journey.id}
                  type="button"
                  onClick={() => setActiveJourney(journey.id)}
                  className={`journey-filter w-full ${activeJourney === journey.id ? "journey-filter-active" : ""}`}
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ backgroundColor: journey.color }}><Icon className="h-3.5 w-3.5" /></span>
                  <span>{journey.name}</span>
                  <span className="ml-auto text-[10px] text-[#86877F]">{journey.nodes.length}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-auto border-t border-[#E2DDD4] pt-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#8B8176]">Node key</p>
          <div className="mt-4 space-y-2.5 text-[12px] text-[#626861]">
            {(["Hub", "Template", "Archive", "Flow", "Utility"] as NodeKind[]).map((kind) => (
              <div key={kind} className="flex items-center gap-2.5"><TemplateStamp kind={kind} /><span>{kind === "Hub" ? "Visitor-intent landing" : kind === "Flow" ? "Application or transaction" : kind === "Archive" ? "Searchable collection" : kind === "Utility" ? "System support surface" : "Reusable page structure"}</span></div>
            ))}
          </div>
        </div>
      </aside>

      <div className="relative z-10 md:pl-[320px]">
        <header className="sticky top-0 z-30 border-b border-[#DED8CF] bg-[#FDFBF6]/90 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:hidden">
              <img src="/manus-storage/caap-sitemap-compass-mark_41843878.png" alt="Compass lattice mark" className="h-9 w-9 object-contain" />
              <div><p className="font-serif text-[22px] leading-none text-[#1F5E6B]">CAAP Site Map</p><p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#877C6F]">Template hierarchy</p></div>
            </div>
            <div className="hidden items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#7A7F77] md:flex">
              <Compass className="h-4 w-4 text-[#1F5E6B]" /> <span>Architecture navigator</span><span className="text-[#C4BEB3]">/</span><span className="text-[#1F5E6B]">Template hierarchy</span>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={resetMap} className="hidden rounded-full border border-[#D9D2C8] bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.11em] text-[#55605C] transition hover:border-[#1F5E6B] hover:text-[#1F5E6B] sm:inline-flex">Reset map</button>
              <button type="button" onClick={() => setShowDetails((visible) => !visible)} className="inline-flex items-center gap-2 rounded-full bg-[#1F5E6B] px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.11em] text-white transition hover:bg-[#174B55] active:scale-[0.97]">
                <LayoutTemplate className="h-3.5 w-3.5" /> {showDetails ? "Hide detail" : "Show detail"}
              </button>
            </div>
          </div>
        </header>

        <section className="hero-panel overflow-hidden px-5 pb-8 pt-8 sm:px-8 lg:px-10 lg:pt-10">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,243,234,0.98)_0%,rgba(247,243,234,0.90)_45%,rgba(247,243,234,0.47)_100%)]" />
          <div className="relative max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#CFC6B9] bg-[#FDFBF6]/85 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#736958] shadow-sm"><Map className="h-3.5 w-3.5 text-[#C18439]" /> {totalNodeCount} navigable system surfaces</div>
            <h2 className="mt-5 max-w-3xl font-serif text-[44px] leading-[0.96] text-[#223336] sm:text-[56px]">Follow the visitor’s path.<br /><span className="text-[#1F5E6B]">See the system beneath it.</span></h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[#57635E]">The global shell frames every page. The six route rails organize visitor intent. Select any waypoint to inspect its reusable template and the pages it supports.</p>
          </div>
        </section>

        <div className="border-b border-[#DED8CF] bg-[#FDFBF6] px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative max-w-xl flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#85877F]" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search a page, template, or user journey" className="h-10 w-full rounded-xl border border-[#DDD7CC] bg-[#FFFDFC] pl-10 pr-10 text-[13px] font-medium text-[#263436] outline-none transition placeholder:text-[#A3A39B] focus:border-[#1F5E6B] focus:ring-4 focus:ring-[#1F5E6B]/10" />
              {search && <button type="button" onClick={() => setSearch("")} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#6E756F] hover:bg-[#EFEAE1]"><X className="h-3.5 w-3.5" /></button>}
            </div>
            <div className="flex flex-wrap items-center gap-2 xl:hidden">
              <span className="mr-1 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#8A8176]">Focus</span>
              {[{ id: "all" as const, name: "All" }, ...journeys.map(({ id, name }) => ({ id, name }))].map((item) => (
                <button key={item.id} type="button" onClick={() => setActiveJourney(item.id)} className={`rounded-full px-3 py-2 text-[11px] font-extrabold transition ${activeJourney === item.id ? "bg-[#223F45] text-white" : "bg-[#F2EEE6] text-[#6A706B] hover:bg-[#E6E0D6]"}`}>{item.name}</button>
              ))}
            </div>
          </div>
        </div>

        <div className={`grid min-w-0 transition-[grid-template-columns] duration-300 ${showDetails ? "xl:grid-cols-[minmax(0,1fr)_370px]" : "xl:grid-cols-1"}`}>
          <div className="min-w-0 px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
            <section aria-labelledby="foundation-title" className="mb-10">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                <div><p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#9A7D5A]">Layer 0 · shared system</p><h2 id="foundation-title" className="mt-1 font-serif text-[30px] text-[#223336]">The foundation every route inherits.</h2></div>
                <p className="max-w-sm text-[12px] leading-5 text-[#6A706B]">These surfaces sit above the navigation tree and create continuity across the public experience.</p>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {foundations.map((node) => <NodeCard key={node.id} node={node} accent="#C18439" selected={selectedNode.id === node.id} onSelect={selectNode} />)}
              </div>
            </section>

            <section aria-labelledby="journey-map-title">
              <div className="flex flex-col justify-between gap-4 border-t border-[#DCD5CA] pt-8 sm:flex-row sm:items-end">
                <div><p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#9A7D5A]">Layers 1–6 · visitor routes</p><h2 id="journey-map-title" className="mt-1 font-serif text-[30px] text-[#223336]">Six ways into the system.</h2></div>
                <button type="button" onClick={() => setExpanded({ learn: true, open: true, donate: true, apply: true, attend: true, contact: true })} className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#1F5E6B] hover:text-[#174B55]"><Maximize2 className="h-3.5 w-3.5" /> Expand all routes</button>
              </div>

              <div className="journey-canvas mt-8 space-y-5">
                {displayedJourneys.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-[#CFC6B9] bg-[#FCFAF5] px-6 py-12 text-center"><Search className="mx-auto h-6 w-6 text-[#A89A87]" /><p className="mt-3 font-serif text-xl text-[#344447]">No matching map nodes.</p><button type="button" onClick={() => setSearch("")} className="mt-3 text-sm font-bold text-[#1F5E6B] underline underline-offset-4">Clear the search</button></div>
                )}
                {displayedJourneys.map((journey) => {
                  const Icon = journey.icon;
                  const open = expanded[journey.id] || Boolean(query);
                  return (
                    <section key={journey.id} className="route-section" style={{ "--route": journey.color, "--route-soft": journey.softColor } as React.CSSProperties}>
                      <button type="button" onClick={() => setExpanded((current) => ({ ...current, [journey.id]: !current[journey.id] }))} className="route-header w-full text-left" aria-expanded={open}>
                        <span className="route-index">{journey.glyph}</span>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-white shadow-sm" style={{ backgroundColor: journey.color }}><Icon className="h-5 w-5" /></span>
                        <span className="min-w-0 flex-1"><span className="block font-serif text-[27px] leading-none text-[#223336]">{journey.name}</span><span className="mt-1.5 block max-w-xl text-[12px] leading-5 text-[#68706C]">{journey.description}</span></span>
                        <span className="hidden items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#6B706B] sm:inline-flex">{journey.nodes.length} surfaces</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#667069]">{open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</span>
                      </button>
                      {open && (
                        <div className="route-content">
                          <div className="route-rail" aria-hidden="true" />
                          <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                            {journey.nodes.map((node) => <NodeCard key={node.id} node={node} accent={journey.color} selected={selectedNode.id === node.id} onSelect={selectNode} />)}
                          </div>
                        </div>
                      )}
                    </section>
                  );
                })}
              </div>
            </section>

            <section className="relative mt-12 overflow-hidden rounded-[24px] border border-[#DAD3C7] bg-[#1F5E6B] px-6 py-8 text-white sm:px-9">
              <img src="/manus-storage/caap-sitemap-routes_5d4fff0f.jpg" alt="Abstract connected route rails" className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen" />
              <div className="relative max-w-2xl"><p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#F5CD76]">Reading the map</p><h2 className="mt-2 font-serif text-[30px] leading-tight">A page belongs to a route. A template belongs to the system.</h2><p className="mt-3 text-[14px] leading-6 text-[#E5F0F0]">Select individual waypoints to separate what is a page instance from what is a reusable template, searchable archive, or transactional flow. That distinction keeps scope and maintenance clear.</p></div>
            </section>
          </div>

          {showDetails && (
            <aside className="detail-panel border-t border-[#DCD5CA] bg-[#FDFBF6] xl:sticky xl:top-[73px] xl:h-[calc(100vh-73px)] xl:overflow-y-auto xl:border-l xl:border-t-0">
              <div className="p-6 sm:p-8 xl:p-7">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#9A7D5A]">Selected waypoint</p><h2 className="mt-2 font-serif text-[32px] leading-none text-[#223336]">{selectedNode.title}</h2></div><button type="button" onClick={() => setShowDetails(false)} aria-label="Close detail panel" className="rounded-full border border-[#DDD7CC] p-2 text-[#657069] transition hover:bg-[#F1EDE5]"><X className="h-4 w-4" /></button></div>
                <div className="mt-6"><TemplateStamp kind={selectedNode.kind} /><p className="mt-3 text-[13px] font-extrabold text-[#1F5E6B]">{selectedNode.template}</p></div>
                <p className="mt-5 text-[14px] leading-7 text-[#59645F]">{selectedNode.description}</p>
                <div className="mt-7 rounded-2xl border border-[#E1DBD1] bg-[#F7F3EA] p-5"><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#8B8176]">What belongs here</p><ul className="mt-3 space-y-3">{selectedNode.examples.map((example) => <li key={example} className="flex items-start gap-2.5 text-[13px] leading-5 text-[#47544F]"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C18439]" />{example}</li>)}</ul></div>
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-[#E1DBD1] bg-white p-4"><FileText className="h-5 w-5 text-[#1F5E6B]" /><div><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#8B8176]">Scope marker</p><p className="mt-1 text-[13px] font-bold text-[#46524E]">{selectedNode.pageCount}</p></div></div>
                {selectedNode.notes && <div className="mt-4 rounded-2xl border-l-4 border-[#C18439] bg-[#FFF4DF] px-4 py-4"><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#8D6331]">Architecture note</p><p className="mt-2 text-[13px] leading-6 text-[#725E42]">{selectedNode.notes}</p></div>}
                <div className="mt-8 border-t border-[#E5DED4] pt-6"><p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#8B8176]">Interaction tip</p><p className="mt-2 text-[12px] leading-5 text-[#68706C]"><MousePointer2 className="mr-1 inline h-3.5 w-3.5 text-[#1F5E6B]" />Use the route filters or search field to focus the map, then select any node to inspect its responsibility in the system.</p></div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}
