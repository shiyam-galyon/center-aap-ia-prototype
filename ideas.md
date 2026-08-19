# Center AAP Site Map — Design Exploration

## Three possible approaches

### 1. Civic Cartography
**Very Brief Intro:** A public-facing information map that treats Center AAP’s architecture as a set of connected routes. Editorial warmth meets disciplined wayfinding, so the site feels both strategic and human.

**Probability:** 0.07

### 2. Living Archive
**Very Brief Intro:** A calm, museum-like catalogue built around generous typography, archival paper tones, and carefully sequenced records. It would foreground stewardship and institutional memory.

**Probability:** 0.04

### 3. Mission Control
**Very Brief Intro:** A compact planning console with crisp panels, clear statuses, and technical precision. It would feel like a working artifact for internal teams rather than a presentation site.

**Probability:** 0.08

---

## Chosen approach: Civic Cartography

### Design Movement
Contemporary editorial cartography paired with civic wayfinding systems. The experience should look like a thoughtfully designed public map, not a generic dashboard or a conventional organizational chart.

### Core Principles
1. **Journey before inventory.** The six visitor intentions—Learn, Open, Donate, Apply, Attend, and Contact—must remain immediately legible.
2. **Structured complexity, not clutter.** Dense information earns its place through nested hierarchy, spacing, labels, and reveal-on-demand interaction.
3. **Human purpose inside a technical map.** Use short contextual explanations and warm language to keep the template system connected to CAAP’s mission.
4. **Reusable systems are visible.** Each map node should make the distinction between a page instance, an archive, a reusable template, and a transactional flow unmistakable.

### Color Philosophy
The base is a quiet parchment field that makes the map feel tangible and workshop-ready rather than corporate. Deep river blue provides authority and structural continuity; desert saffron serves as the signature path color; terracotta marks transactional or high-dependency flows; sage differentiates structured content collections. The palette is restrained so the color coding communicates hierarchy rather than decoration.

### Layout Paradigm
An asymmetric **navigator + map canvas** arrangement. A fixed left rail holds the project lens, legend, and journey toggles. The dominant central field is a vertically unfolding map canvas with horizontal route rails. A contextual detail panel appears to the right or beneath the map on smaller screens, allowing selected nodes to explain their purpose without sending users away.

### Signature Elements
1. **Route rails:** Fine connector lines and circular waypoints indicate parent/child relationships without resorting to a rigid flowchart grid.
2. **Template stamps:** Small outlined labels identify Hub, Template, Archive, Flow, or Utility surfaces at a glance.
3. **Patterned field:** A very faint lattice and dot texture appears behind the canvas, suggesting connected communities and navigation coordinates.

### Interaction Philosophy
The map should reward exploration. Selecting a journey filters and emphasizes its route; expanding a branch exposes child nodes; selecting any node reveals its user purpose, template family, and example pages. Controls should be explicit and keyboard-friendly. The experience should never rely on a hover-only interaction.

### Animation
Node reveals use a short opacity-and-translate entrance with 40–60ms stagger intervals. Route rails brighten on selection, and detail panels transition with 180–240ms ease-out motion. Nothing should slide across the whole screen or animate continuously. All nonessential motion must respect `prefers-reduced-motion`.

### Typography System
**Instrument Serif** supplies the human, editorial voice for large headings and selected journey descriptions. **Manrope** supplies the operational voice for controls, labels, cards, and structured descriptions. Headings should be compact but expressive; interface labels should be concise, all-caps only for small metadata stamps; body text should remain highly readable at 15–16px.

### Brand Essence
**A navigable blueprint for the people shaping CAAP’s next digital home.**

**Personality:** Clear, generous, purposeful.

### Brand Voice
Headlines should be confident and orientation-led; CTAs should describe the next action precisely; microcopy should reduce ambiguity.

Examples:
- “Follow the visitor’s path, then see the system beneath it.”
- “Select a node to understand the template it belongs to.”

### Wordmark & Logo
Use a compact four-way compass lattice: four offset diamond pathways meeting at a central point. The mark is an abstract symbol of guidance, interconnection, and collective direction—no text inside the symbol. Pair it with the site-map wordmark in Manrope.

### Signature Brand Color
**Nahr Blue — #1F5E6B.** A deep, mineral blue intended to anchor the map’s route lines, navigation, and key structural labels.

## Style Decisions

- The visual site map uses the Civic Cartography approach exclusively.
- The product is an interactive planning artifact, not a duplicate of CAAP’s public website.
- The user must be able to distinguish route, page, template, archive, and flow through color, labels, and descriptions rather than color alone.
- The left rail is a persistent map key containing the project lens, route filters, legend, and compact Center AAP Site Map identity.
- Route rails, waypoints, canvas texture, and stamps must visually lead the experience; node cards are pinned map labels rather than the dominant visual treatment.
- The compact four-way compass lattice is paired with an explicit Center AAP Site Map wordmark in the map key and mobile header.
- The current expression is an **Architectural Civic Plan**: sparse black-line drafting, limited annotation, and a plan-view hierarchy, with the Civic Cartography palette used only to distinguish route logic.
