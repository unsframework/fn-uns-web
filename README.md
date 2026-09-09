# UNS Framework website

A static website for the UNS Framework standard, fn-uns implementation, and practical guides. The design follows **Signal works**, round two, concept 01.

## Run locally

```sh
python3 scripts/serve.py
```

Open `http://localhost:8765/`, or forward port **8765**. The server binds to `0.0.0.0`; change the port with `--port 8000` or bind to loopback with `--bind 127.0.0.1`.

The homepage is `/`. Design studies remain at `/mocks/`.

## Site structure

- `start/`: orientation and a first-pilot planning path.
- `CONTENT-QA.md`: content review findings, coverage, and verification.
- `GRAPHICS-QA.md`: graphics and animation fixes, browser coverage, and regression checks.
- `index.html` and `home.css`: homepage and its factory illustration.
- `style.css`: shared design tokens, navigation, buttons, and footer.
- `docs.css`: documentation navigation, tables, code, and reading layout.
- `signal.css`: integration with the existing page-specific diagrams and components.
- `shared.js`: mobile navigation, expandable-section deep links, diagram zoom, code copying, and motion preferences.
- `slides.js`: accessible controls for `/slide/`.
- `framework/`, `docs/`, `guides/`, `uns/`, `fn-uns/`, `how-it-works/`: public content.

Pages are plain HTML and work without a build step. Navigation and content remain available without JavaScript; JavaScript adds code copying and full-size diagram exploration. Existing vector diagrams are retained, with neutral colors mapped to the shared palette and semantic wiring colors preserved.

## Check changes

```sh
python3 scripts/check_site.py
node --check shared.js
node --check slides.js
```

When changing page layouts, inspect desktop and mobile views, including a guide with diagrams and tables. Check the mobile menu, documentation disclosure, diagram zoom and Escape handling, code copying, and presentation navigation.

For the graphics browser checks, start the local server and run with Playwright CLI installed:

```sh
playwright-cli -s=uns-graphics open http://127.0.0.1:8765/
playwright-cli -s=uns-graphics run-code --filename scripts/check_graphics.js
```

This checks the public pages, diagram labels and component bounds, packet motion, expanded diagrams, reduced motion, slide layouts, and content visibility without JavaScript.
