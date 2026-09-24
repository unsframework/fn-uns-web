# Graphics QA

## Homepage follow-up — 24 September 2026

- Connected all three factory machines to explicit sockets on the namespace hub. Cable endpoints now touch the equipment faces; labels sit clear of the routes and the hub callout.
- Replaced the lower diagram's disconnected/through-card packet routes with branches around the cards. Connected the output block, centered the stage headings, and aligned the cache/database connections.
- Animated packets now reference the visible SVG paths directly, including in the expanded viewer. Staggered motion starts on its route rather than flashing at the SVG origin.
- Added checks for detached endpoints, sockets outside equipment faces, and wires crossing cards or labels, at normal size and 300% zoom.

Verified both homepage diagrams visually on desktop and mobile, plus the expanded factory view. The Chromium regression pass covered **61 pages, 41 diagrams, 18 slides, and four viewport widths with zero failures**; local site and JavaScript syntax checks also passed.

## Site-wide pass — 9 September 2026

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
