# Content and navigation QA — 8 September 2026

The pass covers the 61 public pages. It addresses page purpose, reading order, terminology, onward links, and the balance between operational explanation and implementation detail. The existing Signal works design and original SVG diagrams remain in place.

## Problems addressed

| Finding | Change |
| --- | --- |
| Homepage led with protocols, schema, and tools before practical value | Put operational uses directly after the hero; explain the shared-data idea before the full architecture and toolkit. |
| Visitors had to distinguish three project names before choosing a path | Added `/start/` with understand, plan, and try paths; explained the standard, implementation, and deployment tool together. |
| “How it works” immediately traced nine implementation layers backwards | Added a forward, three-step overview; retained the nine-layer trace in an expandable section with functioning deep links. |
| fn-uns led with GitOps and code | Put production visibility first, explained the core pipeline, and made engineering details expandable. |
| Standard introduction was repetitive and implied automatic compatibility | Explained what definition files describe and what still requires implementation; connected examples, walkthrough, and field references. |
| Documentation assumed every visitor wanted the same setup sequence | Added task paths and grouped component navigation by capture, production, reporting, and configuration. |
| Guide categories put software first and planning last | Grouped by plan, connect, organize/use data, and extend; aligned card titles with destination titles. |
| YAML tutorial required several sections of motivation before practical work | Moved the worked example first and made background reading optional. |
| Reference pages felt disconnected | Added scope/context and relevant onward links; distinguished the topic monitor `uns-framework` from the descriptive standard. |
| Quick start promised a full stack in five minutes; counts mixed components and functions | Stated the actual three-component sample result, separated the core deployment and optional additions, and made the reference count consistently 12 components. |
| Landing page and presentation duplicated an inconsistent setup command | Replaced duplicated terminals with links to the canonical quick start. |
| Tool comparisons made blanket claims about competing products | Rewrote comparisons around team workflow and operating responsibilities. Corrected Node-RED Git and context storage statements against its official documentation. |
| Illustrative numbers appeared to be guaranteed results | Labelled scenarios and timing examples, replaced unsupported statistical asides with concrete planning guidance, and changed the integration rationale to measurable pilot questions. |
| Page titles, descriptions, contents lists, and navigation disagreed after edits | Refreshed metadata and in-page links from the actual headings; retained existing anchor IDs. |

Sources used for the comparison corrections: [Node-RED Projects](https://nodered.org/docs/user-guide/projects/) and [working with context](https://nodered.org/docs/user-guide/context).

## Coverage

Each page below was reviewed for its place in the visitor journey, its opening context and heading sequence, and navigation to related material. Detailed API, schema, and hardware pages retain their specialist reference content; the main entry pages provide the accessible explanation.

| Page | Role after the pass |
| --- | --- |
| [404.html](/404.html) | Recovery links to the homepage and documentation; wording retained. |
| [changelog.html](/changelog.html) | Historical release record with links to the current standard and example. |
| [docs/api-reference.html](/docs/api-reference.html) | Implementation reference: API Reference. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/architecture.html](/docs/architecture.html) | Implementation reference: Architecture. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/code-patterns.html](/docs/code-patterns.html) | Implementation reference: Code Patterns. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/components.html](/docs/components.html) | Implementation reference: Components. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/configuration.html](/docs/configuration.html) | Implementation reference: Configuration Guide. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/database-schema.html](/docs/database-schema.html) | Implementation reference: Database Schema. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/extending.html](/docs/extending.html) | Implementation reference: Extending the System. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/first-deployment.html](/docs/first-deployment.html) | Implementation reference: Add history and production metrics. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/fnkit-basics.html](/docs/fnkit-basics.html) | Implementation reference: fnkit Basics. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/getting-started.html](/docs/getting-started.html) | Implementation reference: Try simulated machine data. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/index.html](/docs/) | Task hub for the standard, implementation, guides, and all 12 components. |
| [docs/manufacturing-kpis.html](/docs/manufacturing-kpis.html) | Implementation reference: Manufacturing KPIs. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-ai.html](/docs/uns-ai.html) | Implementation reference: uns-ai — AI-Powered Analysis. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-cache.html](/docs/uns-cache.html) | Implementation reference: uns-cache — Cache Reader API. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-dashboard.html](/docs/uns-dashboard.html) | Implementation reference: uns-dashboard — Grafana Dashboards. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-framework.html](/docs/uns-framework.html) | Implementation reference: uns-framework — Topic Monitor. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-historian.html](/docs/uns-historian.html) | Implementation reference: uns-historian — MQTT Historian. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-input.html](/docs/uns-input.html) | Implementation reference: uns-input — Manual Data Entry. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-kpi.html](/docs/uns-kpi.html) | Implementation reference: uns-kpi — KPI Reporter. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-log.html](/docs/uns-log.html) | Implementation reference: uns-log — Change Logger. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-productivity.html](/docs/uns-productivity.html) | Implementation reference: uns-productivity — Production Run Logger. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-sim.html](/docs/uns-sim.html) | Implementation reference: uns-sim — Machine Simulator. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-state.html](/docs/uns-state.html) | Implementation reference: uns-state — State Duration Tracker. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/uns-stoppage.html](/docs/uns-stoppage.html) | Implementation reference: uns-stoppage — Stoppage Classifier. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/what-is-uns.html](/docs/what-is-uns.html) | Implementation reference: What is the Unified Namespace?. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/why-faas.html](/docs/why-faas.html) | Implementation reference: Why functions and Git-based deployment?. Scoped introduction, task-based sidebar, and related next reading. |
| [docs/why-uns.html](/docs/why-uns.html) | Implementation reference: Evaluate the integration work. Scoped introduction, task-based sidebar, and related next reading. |
| [fn-uns/index.html](/fn-uns/) | Implementation capabilities, core component map, and sample entry point. |
| [framework/area.html](/framework/area.html) | Standard reference: Area Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/artifact.html](/framework/artifact.html) | Standard reference: Artifact Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/cell.html](/framework/cell.html) | Standard reference: Cell Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/consumer.html](/framework/consumer.html) | Standard reference: Consumer Configuration Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/core-definitions.html](/framework/core-definitions.html) | Standard reference: Core Definitions. Context links connect fields with the complete example and walkthrough. |
| [framework/database.html](/framework/database.html) | Standard reference: Database Configuration Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/equipment.html](/framework/equipment.html) | Standard reference: Equipment Configuration Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/example.html](/framework/example.html) | Standard reference: Example. Context links connect fields with the complete example and walkthrough. |
| [framework/function.html](/framework/function.html) | Standard reference: Function Configuration Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/index.html](/framework/) | Purpose and limits of the descriptive standard; examples and field references. |
| [framework/line.html](/framework/line.html) | Standard reference: Line Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/mqtt.html](/framework/mqtt.html) | Standard reference: MQTT Configuration Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/producer.html](/framework/producer.html) | Standard reference: Producer Configuration Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/sensor.html](/framework/sensor.html) | Standard reference: Sensor Configuration Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/site.html](/framework/site.html) | Standard reference: Site Configuration Beta. Context links connect fields with the complete example and walkthrough. |
| [framework/uns.html](/framework/uns.html) | Standard reference: Unified Namespace Configuration Beta. Context links connect fields with the complete example and walkthrough. |
| [guides/connectivity-options.html](/guides/connectivity-options.html) | Practical guide: Plan the connection to a machine. Outcome/context at entry, contents links, and a relevant next task. |
| [guides/digital-twin-gitops.html](/guides/digital-twin-gitops.html) | Practical guide: Build a custom analysis function. Outcome/context at entry, contents links, and a relevant next task. |
| [guides/flow-vs-gitops.html](/guides/flow-vs-gitops.html) | Practical guide: Flows and functions: choose a workflow your team can maintain.. Outcome/context at entry, contents links, and a relevant next task. |
| [guides/index.html](/guides/) | Task hub: plan, connect, organize/use, extend. |
| [guides/pipeline-functions.html](/guides/pipeline-functions.html) | Practical guide: Follow the fn-uns data pipeline. Outcome/context at entry, contents links, and a relevant next task. |
| [guides/siemens-logo-mqtt.html](/guides/siemens-logo-mqtt.html) | Practical guide: Siemens Logo 8.4: publish data over MQTT. Outcome/context at entry, contents links, and a relevant next task. |
| [guides/siemens-logo-wiring.html](/guides/siemens-logo-wiring.html) | Practical guide: Siemens Logo 8.4: connect a digital input. Outcome/context at entry, contents links, and a relevant next task. |
| [guides/staffing-uns-team.html](/guides/staffing-uns-team.html) | Practical guide: Plan the team for a UNS pilot. Outcome/context at entry, contents links, and a relevant next task. |
| [guides/teltonika-rut200-digital-io.html](/guides/teltonika-rut200-digital-io.html) | Practical guide: Teltonika RUT200: collect machine status. Outcome/context at entry, contents links, and a relevant next task. |
| [guides/yaml-definitions.html](/guides/yaml-definitions.html) | Practical guide: Describe a small factory in YAML. Outcome/context at entry, contents links, and a relevant next task. |
| [how-it-works/index.html](/how-it-works/) | Three-step explanation with optional full architecture trace. |
| [index.html](/) | Practical value and the shared-data idea; paths to explanation and a first use. |
| [slide/index.html](/slide/) | Presentation aligned with the site’s explanation, examples, and next steps. |
| [start/index.html](/start/) | Orientation: understand, plan a pilot, or run sample data. |
| [uns/index.html](/uns/) | Practical before/after story, scoped example outcomes, and operational questions. |

## Verification

- `python3 scripts/check_site.py`: all 61 public pages, local routes/assets/anchors, duplicate IDs, main/H1 landmarks, and shared theme.
- Browser layout checks: all 61 pages at 1440, 768, 390, and 320 pixels, with technical sections expanded; no horizontal document overflow, missing images, or JavaScript page errors.
- Original SVG preservation: all 160 pre-pass SVG elements remain (including the shared brand marks); only component terminology was normalized where applicable.
- Visitor interaction checks cover homepage → explanation, start paths, direct and repeated deep links into collapsed content, component navigation, mobile menu, and native disclosure with JavaScript disabled.
- Presentation checks cover all 18 slides at four widths.

This is a content organization and static-site QA pass. It does not claim to have commissioned real equipment, deployed the fn-uns backend, or validated every external product specification and command. Existing hardware instructions, schemas, and implementation examples remain specialist material.
