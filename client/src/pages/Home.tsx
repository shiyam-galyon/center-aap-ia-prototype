/**
 * Design: Architectural Prototype — a sparse black-line plan with annotated nodes,
 * a clearly drawn hierarchy, and minimal low-fidelity wireframes on selection.
 */
import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Plus, Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Template = "home" | "hub" | "editorial" | "people" | "library" | "directory" | "fund" | "cart" | "checkout" | "confirm" | "service" | "form" | "opportunity" | "event";
type Kind = "Page" | "Template" | "Flow";

type Node = {
  id: string;
  label: string;
  kind: Kind;
  template: Template;
  note: string;
  copy?: string;
  children?: Node[];
};

const plan: Node[] = [
  { id: "home", label: "Home", kind: "Page", template: "home", note: "Mission-led entry and route selection.", copy: "Ahlan wa Sahlan. Welcome. The Center for Arab American Philanthropy (CAAP) is the nation’s only Arab American community foundation." },
  { id: "learn", label: "Learn", kind: "Page", template: "hub", note: "Institutional information and impact.", children: [
    { id: "about", label: "About CAAP", kind: "Page", template: "editorial", note: "Mission and approach.", copy: "CAAP offers the tools for charitable giving and the relationship to nurture philanthropic ambitions." },
    { id: "history", label: "Our History", kind: "Page", template: "editorial", note: "Institutional history." },
    { id: "staff", label: "Our Staff", kind: "Page", template: "people", note: "Structured staff profiles." },
    { id: "board", label: "Our Advisory Board", kind: "Page", template: "people", note: "Structured board profiles." },
    { id: "reports", label: "Reports & Resources", kind: "Page", template: "library", note: "Reports, policies, and documents." },
    { id: "news", label: "Stories & News", kind: "Page", template: "directory", note: "Impact-story and news archive." },
  ]},
  { id: "open", label: "Open a Fund", kind: "Page", template: "hub", note: "Prospective fundholder decision path.", children: [
    { id: "daf", label: "Donor Advised Fund", kind: "Page", template: "service", note: "Fund-type explanation." },
    { id: "impact", label: "Impact Area Fund", kind: "Page", template: "service", note: "Fund-type explanation." },
    { id: "endowed", label: "Endowed Fund", kind: "Page", template: "service", note: "Fund-type explanation." },
    { id: "scholarship-fund", label: "Scholarship Fund", kind: "Page", template: "service", note: "Fund-type explanation." },
    { id: "fund-inquiry", label: "Fund-Opening Inquiry", kind: "Flow", template: "form", note: "Mobile-first staff-routed inquiry." },
  ]},
  { id: "donate", label: "Donate", kind: "Page", template: "hub", note: "Fund discovery and designated giving.", children: [
    { id: "find-fund", label: "Find a Fund", kind: "Page", template: "directory", note: "Searchable fund directory." },
    { id: "fund-detail", label: "Palestine Museum US Fund", kind: "Template", template: "fund", note: "Representative individual-fund template.", copy: "The Palestine Museum US is an arts and craft museum based in Connecticut and Edinburgh, run entirely by volunteers." },
    { id: "cart", label: "Multi-Fund Gift Cart", kind: "Flow", template: "cart", note: "Selected fund designations and amounts." },
    { id: "checkout", label: "Donation Checkout", kind: "Flow", template: "checkout", note: "One selected method pays the full cart." },
    { id: "confirmation", label: "Gift Confirmation", kind: "Flow", template: "confirm", note: "Receipt and acknowledgement state." },
  ]},
  { id: "apply", label: "Apply", kind: "Page", template: "hub", note: "Grants, scholarships, programs, and fellowships.", children: [
    { id: "grants", label: "Grants", kind: "Page", template: "opportunity", note: "Opportunity template." },
    { id: "scholarships", label: "Scholarships", kind: "Page", template: "opportunity", note: "Opportunity template." },
    { id: "programs", label: "Programs", kind: "Page", template: "opportunity", note: "Opportunity template." },
    { id: "teen", label: "Teen Grantmaking Initiative", kind: "Page", template: "opportunity", note: "Opportunity template." },
    { id: "fellowship", label: "Emerging Philanthropist Fellowship", kind: "Page", template: "opportunity", note: "Opportunity template." },
  ]},
  { id: "attend", label: "Attend", kind: "Page", template: "hub", note: "Events, tickets, sponsorships, and registration.", children: [
    { id: "events", label: "Events Calendar", kind: "Page", template: "directory", note: "Date-led event listing." },
    { id: "gala", label: "Threads of Giving Gala 2026", kind: "Template", template: "event", note: "Representative event template." },
    { id: "hundred", label: "100 Arab Americans", kind: "Page", template: "event", note: "Event page." },
    { id: "table", label: "Director’s Table Series", kind: "Page", template: "event", note: "Event-series page." },
  ]},
  { id: "contact", label: "Contact", kind: "Page", template: "form", note: "Relationship-routing contact form." },
];

const flat = (nodes: Node[]): Node[] => nodes.flatMap((node) => [node, ...(node.children ? flat(node.children) : [])]);
const pageMark: Record<Kind, string> = { Page: "○", Template: "□", Flow: "↗" };

function BlueprintLine({ short = false }: { short?: boolean }) { return <span className={`blueprint-line ${short ? "short" : ""}`} />; }

function Wireframe({ node, method, setMethod }: { node: Node; method: string; setMethod: (method: string) => void }) {
  const text = node.copy ?? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum at consequat nisi.";
  const header = <div className="mock-header"><span>CAAP</span><i /><i /><b>MENU</b></div>;
  const title = <div className="mock-title"><small>{node.kind} / {node.template}</small><h3>{node.label}</h3></div>;
  const generic = <>{header}<section className="mock-body">{title}<p>{text}</p><div className="mock-grid"><span /><span /><span /></div><button>PRIMARY ACTION</button></section></>;

  if (node.template === "cart") return <>{header}<section className="mock-body">{title}<div className="cart-row"><span>Palestine Museum US</span><b>$100</b></div><div className="cart-row"><span>Shaheen Media Scholarship</span><b>$150</b></div><div className="cart-row"><span>Teen Grantmaking Initiative</span><b>$100</b></div><div className="cart-total"><span>TOTAL</span><b>$350</b></div><button>SECURE CHECKOUT</button></section></>;
  if (node.template === "checkout") {
    const methods = ["Card", "ACH", "PayPal", "Venmo", "Cash App"];
    return <>{header}<section className="mock-body checkout-mock">{title}<div className="checkout-summary"><span>3 fund designations</span><b>$350</b></div><label>CONTACT INFORMATION<BlueprintLine /><BlueprintLine short /></label><div className="payment-title">SELECT ONE PAYMENT METHOD</div><div className="payment-methods">{methods.map((option) => <button type="button" key={option} onClick={() => setMethod(option)} className={method === option ? "payment-selected" : ""}><i />{option}</button>)}</div><p className="checkout-rule">One selected method completes the full multi-fund cart.</p><button>DONATE $350</button></section></>;
  }
  if (node.template === "form") return <>{header}<section className="mock-body">{title}<p>Short, mobile-first relationship form with only essential fields and clear next steps.</p><label>NAME<BlueprintLine /></label><label>EMAIL<BlueprintLine /></label><label>INQUIRY TYPE<BlueprintLine short /></label><button>SUBMIT INQUIRY</button></section></>;
  if (node.template === "fund") return <>{header}<section className="mock-body fund-mock">{title}<div className="mock-image">HERO MEDIA</div><p>{text}</p><h4>WHY IT MATTERS</h4><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p><button>DONATE TO THIS FUND</button></section></>;
  if (node.template === "directory" || node.template === "library") return <>{header}<section className="mock-body">{title}<div className="mock-search">SEARCH <i>FILTER</i></div>{[1, 2, 3, 4].map((item) => <div className="listing-row" key={item}><span><BlueprintLine /><BlueprintLine short /></span><b>{node.template === "library" ? "PDF" : "VIEW"}</b></div>)}</section></>;
  if (node.template === "people") return <>{header}<section className="mock-body">{title}<div className="people-grid">{[1, 2, 3, 4].map((item) => <span key={item}><i /><BlueprintLine short /></span>)}</div></section></>;
  if (node.template === "confirm") return <>{header}<section className="mock-confirm"><strong>✓</strong><small>GIFT CONFIRMED</small><h3>Thank you for your support.</h3><p>A formal acknowledgement will arrive by email.</p></section></>;
  if (node.template === "opportunity" || node.template === "event" || node.template === "service") return <>{header}<section className="mock-body">{title}<div className="mock-data">STATUS / DATE / ELIGIBILITY</div><p>{text}</p><div className="mock-image">CONTENT AREA</div><button>{node.template === "opportunity" ? "APPLY NOW" : node.template === "service" ? "START AN INQUIRY" : "REGISTER"}</button></section></>;
  return generic;
}

function PlanNode({ node, depth, selected, query, onOpen }: { node: Node; depth: number; selected: string; query: string; onOpen: (node: Node) => void }) {
  const [expanded, setExpanded] = useState(true);
  const visible = !query || `${node.label} ${node.note}`.toLowerCase().includes(query) || Boolean(node.children?.some((child) => `${child.label} ${child.note}`.toLowerCase().includes(query)));
  if (!visible) return null;
  return <li>
    <div className={`plan-row level-${depth}`}>
      {node.children ? <button className="plan-expand" type="button" onClick={() => setExpanded((value) => !value)} aria-label={`Toggle ${node.label}`}>{expanded || query ? <ChevronDown size={13} /> : <ChevronRight size={13} />}</button> : <span className="plan-expand" />}
      <button type="button" onClick={() => onOpen(node)} className={`plan-node ${selected === node.id ? "is-selected" : ""}`}><span className="plan-mark">{pageMark[node.kind]}</span><span><b>{node.label}</b><small>{node.note}</small></span><em>{node.kind}</em></button>
    </div>
    {node.children && (expanded || query) && <ul className="plan-branch">{node.children.map((child) => <PlanNode node={child} key={child.id} depth={depth + 1} selected={selected} query={query} onOpen={onOpen} />)}</ul>}
  </li>;
}

export default function Home() {
  const nodes = useMemo(() => flat(plan), []);
  const [selected, setSelected] = useState(nodes.find((node) => node.id === "checkout") ?? nodes[0]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("Card");
  const openNode = (node: Node) => { setSelected(node); setDialogOpen(true); };

  return <main className="architect-plan"><div className="plan-layout">
    <aside className="map-rail" aria-label="Route map key"><div className="rail-brand"><span className="rail-mark"><i /><i /><i /><i /></span><p>CENTER AAP</p><h1>Site Map</h1></div><div className="rail-copy"><p>PROJECT LENS</p><span>Public site architecture<br />and template plan</span></div><nav className="rail-routes" aria-label="Primary visitor routes"><p>ROUTE KEY</p>{plan.slice(1).map((node, index) => <button type="button" key={node.id} onClick={() => openNode(node)}><span>{String(index + 1).padStart(2, "0")}</span>{node.label}</button>)}</nav><div className="rail-legend"><p>LEGEND</p><span><i className="route-blue" />Structure</span><span><i className="route-saffron" />Primary path</span><span><i className="route-terra" />Transaction</span><span><i className="route-sage" />Collection</span></div></aside>
    <div className="plan-main"><header className="plan-header"><div><p>PUBLIC SITE ARCHITECTURE</p><h1>Plan <span>— REV 01</span></h1></div><div className="plan-scale">NOT TO SCALE<br />INTERACTIVE STUDY</div></header>
    <section className="plan-drawing">
      <div className="drawing-caption"><span>PAGE HIERARCHY</span><span>{nodes.length} PLOTTED POINTS</span><span>○ PAGE &nbsp; □ REUSABLE TEMPLATE &nbsp; ↗ FLOW</span></div>
      <div className="drawing-toolbar"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value.toLowerCase())} placeholder="Locate a page" />{query && <button type="button" onClick={() => setQuery("")}><X size={14} /></button>}</div>
      <div className="plan-root"><button type="button" onClick={() => openNode(plan[0])}><span>ROOT</span> CENTER AAP / HOME <ExternalLink size={13} /></button></div>
      <ul className="plan-tree">{plan.slice(1).map((node) => <PlanNode node={node} key={node.id} depth={0} selected={selected.id} query={query} onOpen={openNode} />)}</ul>
    </section>
    <footer className="plan-footer"><span>CLIENT EXPLORATION ARTIFACT</span><span>NO LIVE PAYMENT PROCESSING</span><span>SELECT ANY NODE TO VIEW A TEMPLATE</span></footer>
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent showCloseButton={false} className="architect-dialog max-h-[94vh] max-w-[calc(100%-1rem)] overflow-hidden p-0 sm:max-w-[960px]"><div className="dialog-top"><div><p>{selected.kind.toUpperCase()} / {selected.template.toUpperCase()}</p><DialogTitle>{selected.label}</DialogTitle><DialogDescription>{selected.note}</DialogDescription></div><button type="button" onClick={() => setDialogOpen(false)} aria-label="Close mockup"><X size={16} /></button></div><div className="mockup-stage"><div className="phone-frame"><Wireframe node={selected} method={method} setMethod={setMethod} /></div></div>{selected.template === "checkout" && <div className="dialog-foot"><Plus size={12} /> {method} is selected for this demonstration. The production cart must persist all three fund designations into the same order and receipt.</div>}</DialogContent></Dialog>
    </div></div></main>;
}
