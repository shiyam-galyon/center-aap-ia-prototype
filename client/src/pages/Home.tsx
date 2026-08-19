/**
 * Design: Minimal IA Prototype — a restrained clickable tree with low-fidelity,
 * mobile-first wireframe pop-ups for page templates and transactional flows.
 */
import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  CircleDot,
  CreditCard,
  ExternalLink,
  FileText,
  Search,
  Smartphone,
  MapPinned,
  TabletSmartphone,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type TemplateKey =
  | "home"
  | "hub"
  | "standard"
  | "people"
  | "documents"
  | "directory"
  | "fund"
  | "cart"
  | "checkout"
  | "confirmation"
  | "service"
  | "form"
  | "opportunity"
  | "events"
  | "event";

type NodeKind = "Page" | "Template" | "Flow";

type PageNode = {
  id: string;
  label: string;
  kind: NodeKind;
  template: TemplateKey;
  description: string;
  clientCopy?: string;
  children?: PageNode[];
};

const tree: PageNode[] = [
  {
    id: "home",
    label: "Home",
    kind: "Page",
    template: "home",
    description: "Mission-led front door that routes visitors into Learn, Open, Donate, Apply, Attend, or Contact.",
    clientCopy:
      "Ahlan wa Sahlan. Welcome. We are so glad you are here. The Center for Arab American Philanthropy (CAAP) is the nation’s only Arab American community foundation.",
  },
  {
    id: "learn",
    label: "Learn",
    kind: "Page",
    template: "hub",
    description: "The institutional learning hub for CAAP’s history, people, reports, and stories.",
    children: [
      { id: "about", label: "About CAAP", kind: "Page", template: "standard", description: "Mission, approach, and institutional overview.", clientCopy: "CAAP offers the tools for your charitable giving and the relationship to nurture your philanthropic ambitions." },
      { id: "history", label: "Our History", kind: "Page", template: "standard", description: "CAAP’s history and development." },
      { id: "staff", label: "Our Staff", kind: "Page", template: "people", description: "Structured staff directory and individual profiles." },
      { id: "board", label: "Our Advisory Board", kind: "Page", template: "people", description: "Advisory board directory and individual profiles." },
      { id: "reports", label: "Reports & Resources", kind: "Page", template: "documents", description: "Downloadable reports, policies, research, and documents." },
      { id: "stories", label: "Stories & News", kind: "Page", template: "directory", description: "Archive for grant outcomes, fund stories, and institutional news." },
    ],
  },
  {
    id: "open",
    label: "Open a Fund",
    kind: "Page",
    template: "hub",
    description: "Decision hub for prospective fundholders, from education through inquiry or application.",
    children: [
      { id: "daf", label: "Donor Advised Fund", kind: "Page", template: "service", description: "Explains the donor-advised fund option and its next step." },
      { id: "impact-fund", label: "Impact Area Fund", kind: "Page", template: "service", description: "Explains a fund focused on a shared issue or community need." },
      { id: "endowed-fund", label: "Endowed Fund", kind: "Page", template: "service", description: "Explains long-term endowed giving and fund stewardship." },
      { id: "scholarship-fund", label: "Scholarship Fund", kind: "Page", template: "service", description: "Explains how to create a scholarship fund with CAAP." },
      { id: "fund-inquiry", label: "Fund-Opening Inquiry", kind: "Flow", template: "form", description: "Mobile-first guided inquiry that routes a prospective fundholder to CAAP staff." },
    ],
  },
  {
    id: "donate",
    label: "Donate",
    kind: "Page",
    template: "hub",
    description: "Fund discovery, individual fund storytelling, and designated giving.",
    children: [
      { id: "fund-discovery", label: "Find a Fund", kind: "Page", template: "directory", description: "Search and filter active funds by mission, beneficiary, geography, and type." },
      { id: "fund-detail", label: "Palestine Museum US Fund", kind: "Template", template: "fund", description: "Representative individual-fund page for narrative, media, metadata, and a giving action.", clientCopy: "The Palestine Museum US is an arts and craft museum based in Connecticut and Edinburgh, run entirely by volunteers." },
      { id: "gift-cart", label: "Multi-Fund Gift Cart", kind: "Flow", template: "cart", description: "A single cart retaining a donor’s selected fund designations, amounts, and notes." },
      { id: "donation-checkout", label: "Donation Checkout", kind: "Flow", template: "checkout", description: "A mobile-first checkout where one donor-selected payment method completes the total cart." },
      { id: "gift-confirmation", label: "Gift Confirmation", kind: "Flow", template: "confirmation", description: "On-screen acknowledgement and formal email receipt after the transaction." },
    ],
  },
  {
    id: "apply",
    label: "Apply",
    kind: "Page",
    template: "hub",
    description: "Current opportunities for grants, scholarships, programs, and fellowships.",
    children: [
      { id: "grants", label: "Grants", kind: "Page", template: "opportunity", description: "Individual grant opportunity template with status, eligibility, requirements, and application CTA." },
      { id: "scholarships", label: "Scholarships", kind: "Page", template: "opportunity", description: "Individual scholarship opportunity template with status, eligibility, and application CTA." },
      { id: "programs", label: "Programs", kind: "Page", template: "opportunity", description: "Program overview and participation or application pathway." },
      { id: "teen-grantmaking", label: "Teen Grantmaking Initiative", kind: "Page", template: "opportunity", description: "Featured initiative built from the opportunity template." },
      { id: "fellowship", label: "Emerging Philanthropist Fellowship", kind: "Page", template: "opportunity", description: "Featured fellowship built from the opportunity template." },
    ],
  },
  {
    id: "attend",
    label: "Attend",
    kind: "Page",
    template: "hub",
    description: "Event discovery, event details, ticketing, sponsorship, and confirmation.",
    children: [
      { id: "events", label: "Events Calendar", kind: "Page", template: "events", description: "Upcoming and past events in a date-led directory." },
      { id: "gala", label: "Threads of Giving Gala 2026", kind: "Template", template: "event", description: "Representative event page with event details, ticket or sponsorship selection, and registration CTA." },
      { id: "arab-americans", label: "100 Arab Americans", kind: "Page", template: "event", description: "Individual event page using the same structured event template." },
      { id: "directors-table", label: "Director’s Table Series", kind: "Page", template: "event", description: "Event-series page linking upcoming and past dates." },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    kind: "Page",
    template: "form",
    description: "Relationship-routing contact page with general, fund-opening, and partnership inquiry paths.",
  },
];

const routeMeta: Record<string, { color: string; soft: string; summary: string }> = {
  learn: { color: "#1F5E6B", soft: "#DFEAEC", summary: "Mission, people, reports, stories" },
  open: { color: "#A87931", soft: "#F5E7CF", summary: "Fund types and inquiry" },
  donate: { color: "#B85C47", soft: "#F4E1DB", summary: "Fund discovery and giving" },
  apply: { color: "#58745F", soft: "#E0EBDD", summary: "Grants, scholarships, programs" },
  attend: { color: "#665C83", soft: "#EAE5F0", summary: "Events, tickets, sponsorships" },
  contact: { color: "#556C78", soft: "#E2EBEE", summary: "Relationship routing" },
};

const allNodes = (nodes: PageNode[]): PageNode[] => nodes.flatMap((node) => [node, ...(node.children ? allNodes(node.children) : [])]);

const typeLabel: Record<NodeKind, string> = { Page: "Page", Template: "Template", Flow: "Flow" };

function Line({ className = "" }: { className?: string }) {
  return <span className={`wire-line ${className}`} />;
}

function WireNav() {
  return (
    <div className="wire-nav">
      <span className="wire-mark">CAAP</span>
      <span className="wire-nav-line" />
      <span className="wire-nav-line short" />
      <span className="wire-nav-line short" />
      <span className="wire-button-sm">Donate</span>
    </div>
  );
}

function WireTitle({ label, short = false }: { label: string; short?: boolean }) {
  return <div className="wire-title-group"><p className="wire-eyebrow">{label}</p><Line className={short ? "w-40" : "w-64"} /><Line className="w-44" /></div>;
}

function WireBlocks({ count = 3 }: { count?: number }) {
  return <div className="wire-card-grid">{Array.from({ length: count }).map((_, index) => <div className="wire-card" key={index}><span className="wire-image" /><Line /><Line className="w-2/3" /><span className="wire-link" /></div>)}</div>;
}

function WireframePreview({
  node,
  device,
  paymentMethod,
  onPaymentMethod,
}: {
  node: PageNode;
  device: "mobile" | "desktop";
  paymentMethod: string;
  onPaymentMethod: (method: string) => void;
}) {
  const displayCopy = node.clientCopy ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed ligula in arcu facilisis tempus.";
  const isMobile = device === "mobile";

  const shell = (children: React.ReactNode) => (
    <div className={`device-shell ${isMobile ? "device-mobile" : "device-desktop"}`}>
      <div className="device-top"><span /><span /><span /></div>
      <div className="wire-page">{children}</div>
    </div>
  );

  if (node.template === "home" || node.template === "hub") {
    return shell(<><WireNav /><section className="wire-hero"><WireTitle label={node.label} /><p className="wire-copy">{displayCopy}</p><div className="wire-cta-row"><span className="wire-button">Explore</span><span className="wire-button ghost">Learn more</span></div></section><section className="wire-section"><p className="wire-section-label">Featured pathways</p><WireBlocks count={isMobile ? 2 : 3} /></section></>);
  }

  if (node.template === "directory" || node.template === "events" || node.template === "documents") {
    return shell(<><WireNav /><section className="wire-section"><WireTitle label={node.label} /><div className="wire-search-row"><span className="wire-search">Search</span><span className="wire-filter">Filter</span></div>{node.template === "documents" ? <div className="wire-list">{Array.from({ length: 5 }).map((_, index) => <div className="wire-list-row" key={index}><FileText size={13} /><div><Line className="w-36" /><Line className="w-20 thin" /></div><span className="wire-download">PDF</span></div>)}</div> : <WireBlocks count={isMobile ? 3 : 6} />}</section></>);
  }

  if (node.template === "people") {
    return shell(<><WireNav /><section className="wire-section"><WireTitle label={node.label} /><div className="wire-people-grid">{Array.from({ length: isMobile ? 4 : 6 }).map((_, index) => <div className="wire-person" key={index}><span className="wire-avatar" /><Line className="w-20" /><Line className="w-14 thin" /></div>)}</div></section></>);
  }

  if (node.template === "fund") {
    return shell(<><WireNav /><section className="wire-fund-hero"><div><p className="wire-eyebrow">Fund detail</p><h3>{node.label}</h3><p>{displayCopy}</p><span className="wire-button">Donate to this fund</span></div><span className="wire-hero-image">Hero image</span></section><section className="wire-section two-col"><div><WireTitle label="Why it matters" /><p className="wire-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at sapien vitae sem pretium porta.</p></div><div className="wire-side-box"><Line /><Line className="w-3/4" /><span className="wire-link" /></div></section></>);
  }

  if (node.template === "cart") {
    return shell(<><WireNav /><section className="wire-section"><WireTitle label="Your gift cart" /><div className="wire-cart-list"><div className="wire-cart-item"><div><strong>Palestine Museum US</strong><small>Private note · optional</small></div><b>$100</b></div><div className="wire-cart-item"><div><strong>Jack & Bernice Shaheen Media Scholarship</strong><small>Honor gift · optional</small></div><b>$150</b></div><div className="wire-cart-item"><div><strong>Teen Grantmaking Initiative</strong><small>Public narrative · optional</small></div><b>$100</b></div></div><div className="wire-total"><span>Cart total</span><strong>$350</strong></div><span className="wire-button full">Proceed to secure payment</span></section></>);
  }

  if (node.template === "checkout") {
    const methods = ["Credit / Debit", "ACH bank", "PayPal", "Venmo", "Cash App Pay"];
    return shell(<><WireNav /><section className="wire-section checkout-wire"><div className="checkout-head"><div><p className="wire-eyebrow">Secure checkout</p><h3>Complete your gift</h3></div><span className="wire-total-pill">$350</span></div><div className="wire-checkout-split"><div className="wire-form-stack"><label>Contact information<Line /><Line className="w-3/4" /></label><label>Billing address<Line /><Line className="w-2/3" /></label></div><div className="wire-payment-area"><p className="wire-section-label">Choose one payment method</p><p className="wire-microcopy">One method completes every fund in this cart.</p><div className="wire-payment-options">{methods.map((method) => <button type="button" onClick={() => onPaymentMethod(method)} className={`wire-payment-method ${paymentMethod === method ? "selected" : ""}`} key={method}><span className="wire-radio" />{method}</button>)}</div><div className="wire-payment-detail"><CreditCard size={16} /><div><Line className="w-32" /><Line className="w-20 thin" /></div></div></div></div><div className="wire-checkout-footer"><span>3 designated funds</span><span className="wire-button">Donate $350</span></div></section></>);
  }

  if (node.template === "confirmation") {
    return shell(<><WireNav /><section className="wire-confirm"><span className="wire-check">✓</span><p className="wire-eyebrow">Gift confirmed</p><h3>Thank you for your support.</h3><p>A formal acknowledgement letter will be sent to your email.</p><span className="wire-button ghost">Return to CAAP</span></section></>);
  }

  if (node.template === "service") {
    return shell(<><WireNav /><section className="wire-service"><WireTitle label={node.label} /><p className="wire-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. This page explains the fund type, who it serves, and the next step.</p><div className="wire-check-list"><span>○ Considerations</span><span>○ How it works</span><span>○ Speak with CAAP</span></div><span className="wire-button">Start an inquiry</span></section></>);
  }

  if (node.template === "opportunity") {
    return shell(<><WireNav /><section className="wire-section"><div className="wire-opportunity-meta"><span>Open</span><span>Deadline: TBD</span></div><WireTitle label={node.label} /><p className="wire-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. This area explains eligibility, benefits, required materials, and key dates.</p><div className="wire-side-box"><p className="wire-section-label">At a glance</p><Line /><Line className="w-3/4" /><Line className="w-2/3" /></div><span className="wire-button">Apply now</span></section></>);
  }

  if (node.template === "event") {
    return shell(<><WireNav /><section className="wire-event"><WireTitle label={node.label} /><div className="wire-event-meta"><span>Date & time</span><span>Location</span><span>Tickets / sponsorships</span></div><span className="wire-hero-image wide">Event image</span><p className="wire-copy">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Event information, honorees, and participation details live here.</p><span className="wire-button">Register or purchase tickets</span></section></>);
  }

  return shell(<><WireNav /><section className="wire-section"><WireTitle label={node.label} /><p className="wire-copy">{node.template === "form" ? "Use a concise, mobile-first form with clear routing, required fields only, and an explicit next-step confirmation." : displayCopy}</p><div className="wire-form-stack"><label>Name<Line /></label><label>Email<Line /></label><label>How can we help?<span className="wire-textarea" /></label></div><span className="wire-button">Submit inquiry</span></section></>);
}

function TreeNode({
  node,
  depth,
  selectedId,
  query,
  onOpen,
}: {
  node: PageNode;
  depth: number;
  selectedId: string;
  query: string;
  onOpen: (node: PageNode) => void;
}) {
  const [expanded, setExpanded] = useState(true);
  const matches = query ? `${node.label} ${node.description}`.toLowerCase().includes(query) : true;
  const childMatches = node.children?.some((child) => `${child.label} ${child.description}`.toLowerCase().includes(query)) ?? false;
  if (query && !matches && !childMatches) return null;

  return (
    <li className="tree-item">
      <div className={`tree-row depth-${depth}`}>
        {node.children ? <button type="button" onClick={() => setExpanded((current) => !current)} aria-label={expanded ? `Collapse ${node.label}` : `Expand ${node.label}`} className="tree-expander">{expanded || query ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</button> : <span className="tree-spacer" />}
        <button type="button" onClick={() => onOpen(node)} className={`tree-node ${selectedId === node.id ? "tree-node-selected" : ""}`}>
          <CircleDot size={13} strokeWidth={selectedId === node.id ? 2.5 : 1.7} />
          <span>{node.label}</span>
          <small>{typeLabel[node.kind]}</small>
        </button>
      </div>
      {node.children && (expanded || query) && <ul className="tree-children">{node.children.map((child) => <TreeNode key={child.id} node={child} depth={depth + 1} selectedId={selectedId} query={query} onOpen={onOpen} />)}</ul>}
    </li>
  );
}

export default function Home() {
  const nodes = useMemo(() => allNodes(tree), []);
  const [selected, setSelected] = useState<PageNode>(nodes.find((node) => node.id === "donation-checkout") ?? nodes[0]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [device, setDevice] = useState<"mobile" | "desktop">("mobile");
  const [paymentMethod, setPaymentMethod] = useState("Credit / Debit");

  const selectNode = (node: PageNode) => {
    setSelected(node);
    setOpen(true);
    if (node.template === "checkout" || node.template === "cart" || node.template === "form") setDevice("mobile");
  };

  return (
    <main className="prototype-page">
      <header className="prototype-header">
        <div className="prototype-brand"><span className="prototype-brand-mark brand-compass" aria-hidden="true"><i /><i /><i /><i /></span><div><p>Center AAP</p><h1>Site Map</h1><small>Architecture navigator</small></div></div>
        <div className="prototype-header-note"><MapPinned size={12} /> Follow a visitor path</div>
      </header>

      <section className="prototype-intro">
        <div><p className="prototype-kicker">Interactive architecture map</p><h2>Follow a visitor path.<br />See the template beneath it.</h2><p>Use the route map to orient the system, then open a page point to review its simple wireframe. The donation route demonstrates a multi-fund cart and a mobile-first checkout.</p></div>
        <div className="prototype-rules"><span><b>Cart rule</b> One donor-selected method completes the total cart.</span><span><b>Priority flows</b> Open a Fund and Donate.</span></div>
      </section>

      <section className="tree-workspace" aria-label="Center AAP information architecture tree">
        <aside className="tree-sidebar">
          <div className="tree-sidebar-head"><div><p className="prototype-kicker">Map inventory</p><h2>Page tree</h2></div><span>{nodes.length} points</span></div>
          <div className="tree-search"><Search size={15} /><input value={query} onChange={(event) => setQuery(event.target.value.toLowerCase())} placeholder="Find a page" aria-label="Find a page in the information architecture" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear search"><X size={14} /></button>}</div>
          <ul className="tree-root">{tree.map((node) => <TreeNode key={node.id} node={node} depth={0} selectedId={selected.id} query={query} onOpen={selectNode} />)}</ul>
        </aside>

        <section className="prototype-guide">
          <div className="guide-icon"><MapPinned size={24} /></div>
          <p className="prototype-kicker">Route map</p>
          <h2>Start with a visitor intention.</h2>
          <p>Six connected routes organize the system. The tree remains a supporting inventory; the map makes the visitor journey visible first.</p>
          <button type="button" className="map-home-node" onClick={() => selectNode(tree[0])}><span className="map-waypoint">00</span><span><b>Home</b><small>Mission-led entry point</small></span><ExternalLink size={14} /></button>
          <div className="route-map" aria-label="Primary visitor routes">
            {tree.filter((node) => node.id !== "home").map((node, index) => {
              const meta = routeMeta[node.id];
              return <button type="button" key={node.id} onClick={() => selectNode(node)} className="route-map-node" style={{ borderColor: meta.color, backgroundColor: meta.soft }}><span className="map-waypoint" style={{ backgroundColor: meta.color }}>{String(index + 1).padStart(2, "0")}</span><span className="route-map-copy"><b>{node.label}</b><small>{meta.summary}</small></span><ChevronRight size={15} /></button>;
            })}
          </div>
          <div className="map-legend"><span><i className="blue" />Structure</span><span><i className="saffron" />Primary path</span><span><i className="terracotta" />Transaction</span><span><i className="sage" />Collection</span></div>
          <button type="button" className="guide-button" onClick={() => selectNode(selected)}>Open selected: {selected.label}<ExternalLink size={15} /></button>
        </section>
      </section>

      <footer className="prototype-footer">Schematic planning artifact only. No payment processing occurs in this prototype.</footer>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="wire-dialog max-h-[92vh] max-w-[calc(100%-1.2rem)] overflow-hidden border-[#1E1E1E] bg-[#F2F2EE] p-0 shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:max-w-[1180px]">
          <div className="wire-dialog-top">
            <div><p className="prototype-kicker">{typeLabel[selected.kind]} · {selected.template} template</p><DialogTitle className="mt-1 font-mono text-xl font-bold tracking-tight text-[#181818]">{selected.label}</DialogTitle><DialogDescription className="mt-1 max-w-xl text-[12px] leading-5 text-[#555]">{selected.description}</DialogDescription></div>
            <button type="button" onClick={() => setOpen(false)} className="wire-dialog-close" aria-label="Close wireframe"><X size={17} /></button>
          </div>
          <div className="wire-dialog-toolbar"><div className="device-toggle" role="group" aria-label="Wireframe viewport"><button type="button" className={device === "mobile" ? "active" : ""} onClick={() => setDevice("mobile")}><Smartphone size={14} /> Mobile</button><button type="button" className={device === "desktop" ? "active" : ""} onClick={() => setDevice("desktop")}><TabletSmartphone size={14} /> Desktop</button></div><span>Low-fidelity template preview</span></div>
          <div className="wire-dialog-body"><WireframePreview node={selected} device={device} paymentMethod={paymentMethod} onPaymentMethod={setPaymentMethod} /></div>
          {selected.template === "checkout" && <div className="wire-dialog-note"><CreditCard size={14} /> Selected demo method: <b>{paymentMethod}</b>. In production, one method pays the entire multi-fund cart; fund designations remain attached to the order.</div>}
        </DialogContent>
      </Dialog>
    </main>
  );
}
