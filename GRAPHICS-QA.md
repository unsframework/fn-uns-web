# Graphics QA — 9 September 2026

Scope: the 61 public pages, their 41 technical SVG diagrams, and all 18 presentation slides. Archived design studies in `mocks/` and `proposals/` are outside this pass.

## Fixes

- Restored missing homepage packet, pulse, card-entry, and KPI animations. Diagram entry effects now wait until the graphic is visible.
- Restored documentation KPI and YAML reveal effects. Updated function and timeline highlights to use the current palette.
- Corrected capture packets that animated at the top of the SVG instead of on their connections.
- Routed process-diagram connectors between cards. Packets follow the actual SVG paths, including in the expanded view. Separated the historian badge, state indicator, and explanatory labels.
- Separated overlapping team and plant boxes, and centered wiring terminal caps with clear spacing.
- Fixed KPI captions and card-label overflow across the implementation overview, UNS explainer, MQTT walkthrough, and presentation.
- Kept the copy toolbar and code sample in one layout item so the explanatory column stays alongside the example.
- Kept slide statistics on one line; used two columns for statistics inside a half-width slide column.
- Made the diagram viewer fill its available height when its toolbar wraps on phones.
- Applied live reduced-motion preferences to native SVG animations as well as CSS animations. Kept topic trees, comparison cells, and YAML readable without JavaScript.

## Verification

Final result: **61 pages, 41 diagrams, 18 slides; zero browser-check failures.** The site checker and JavaScript syntax checks also pass.

Playwright Chromium checks cover page overflow at 1440, 768, 390, and 320 pixels; SVG label clipping, overlapping labels and boxes; animation progress; packet positions on motion paths; every diagram expanded to 300%; unique cloned IDs; zoom reset; Escape and restored focus; live reduced-motion changes; all presentation slides; and static content without JavaScript.

Visual review included all 41 SVGs and all 18 slides, plus desktop and phone views of the corrected code layout and pipeline viewer. Other browser engines were not exercised.

Run the regression checks using the commands in [README.md](README.md). The existing site checker also verifies all 61 pages, local links, anchors, assets, and shared page structure.
