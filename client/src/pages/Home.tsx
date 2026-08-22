/**
 * Design: Architectural Prototype — a sparse black-line plan with annotated nodes,
 * a clearly drawn hierarchy, and minimal low-fidelity wireframes on selection.
 */
import { useMemo, useState } from "react";
import { ChevronDown, ChevronRight, ExternalLink, Plus, Search, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { hierarchy, siteRoot, type NodeKind, type TreeNode } from "@/content/hierarchyRegistry";
import { mockupRegistry, mockupUrl } from "@/content/mockupRegistry";

const flat = (nodes: TreeNode[]): TreeNode[] => nodes.flatMap((node) => [node, ...(node.children ? flat(node.children) : [])]);
const pageMark: Record<NodeKind, string> = { Page: "○", Template: "□", Flow: "↗" };

function BlueprintLine({ short = false }: { short?: boolean }) { return <span className={`blueprint-line ${short ? "short" : ""}`} />; }

function Wireframe({ node, method, setMethod }: { node: TreeNode; method: string; setMethod: (method: string) => void }) {
  const suppliedMockup = mockupRegistry[node.id];
  if (suppliedMockup) return <figure className="uploaded-mockup"><img src={mockupUrl(suppliedMockup.file)} alt={suppliedMockup.alt} /><figcaption>SUPPLIED MOCKUP · {node.label.toUpperCase()}</figcaption></figure>;
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

function PlanNode({ node, depth, selected, query, onOpen }: { node: TreeNode; depth: number; selected: string; query: string; onOpen: (node: TreeNode) => void }) {
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
  const nodes = useMemo(() => flat(hierarchy), []);
  const [selected, setSelected] = useState(nodes[0]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [method, setMethod] = useState("Card");
  const openNode = (node: TreeNode) => { setSelected(node); setDialogOpen(true); };

  return <main className="architect-plan"><div className="plan-layout">
    <aside className="map-rail" aria-label="Route map key"><div className="rail-brand"><span className="rail-mark"><i /><i /><i /><i /></span><p>CENTER AAP</p><h1>Site Map</h1></div><div className="rail-copy"><p>PROJECT LENS</p><span>Approved public-site<br />hierarchy and templates</span></div><nav className="rail-routes" aria-label="Primary visitor routes"><p>ROUTE KEY</p>{hierarchy.map((node, index) => <button type="button" key={node.id} onClick={() => openNode(node)}><span>{String(index + 1).padStart(2, "0")}</span>{node.label}</button>)}</nav><div className="rail-legend"><p>LEGEND</p><span><i className="route-blue" />Page</span><span><i className="route-saffron" />Selected node</span></div></aside>
    <div className="plan-main"><header className="plan-header"><div><p>PUBLIC SITE ARCHITECTURE</p><h1>Plan <span>— REV 01</span></h1></div><div className="plan-scale">NOT TO SCALE<br />INTERACTIVE STUDY</div></header>
    <section className="plan-drawing">
      <div className="drawing-caption"><span>APPROVED PAGE HIERARCHY</span><span>{nodes.length} PLOTTED POINTS</span><span>○ PAGE</span></div>
      <div className="drawing-toolbar"><Search size={14} /><input value={query} onChange={(event) => setQuery(event.target.value.toLowerCase())} placeholder="Locate a page" />{query && <button type="button" onClick={() => setQuery("")}><X size={14} /></button>}</div>
      <div className="plan-root"><button type="button" onClick={() => openNode(siteRoot)}><span>ROOT</span> CENTER AAP <ExternalLink size={13} /></button></div>
      <ul className="plan-tree">{hierarchy.map((node) => <PlanNode node={node} key={node.id} depth={0} selected={selected.id} query={query} onOpen={openNode} />)}</ul>
    </section>
    <footer className="plan-footer"><span>CLIENT EXPLORATION ARTIFACT</span><span>NO LIVE PAYMENT PROCESSING</span><span>SELECT ANY NODE TO VIEW A TEMPLATE</span></footer>
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent showCloseButton={false} className="architect-dialog max-h-[94vh] max-w-[calc(100%-1rem)] overflow-hidden p-0 sm:max-w-[960px]"><div className="dialog-top"><div><p>{selected.kind.toUpperCase()} / {selected.template.toUpperCase()}</p><DialogTitle>{selected.label}</DialogTitle><DialogDescription>{selected.note}</DialogDescription></div><button type="button" onClick={() => setDialogOpen(false)} aria-label="Close mockup"><X size={16} /></button></div><div className="mockup-stage"><div className={mockupRegistry[selected.id] ? "uploaded-mockup-shell" : "phone-frame"}><Wireframe node={selected} method={method} setMethod={setMethod} /></div></div>{selected.template === "checkout" && <div className="dialog-foot"><Plus size={12} /> {method} is selected for this demonstration. The production cart must persist all three fund designations into the same order and receipt.</div>}</DialogContent></Dialog>
    </div></div></main>;
}
