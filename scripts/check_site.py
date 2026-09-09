#!/usr/bin/env python3
"""Check the public site's local routes, assets, anchors, and shared page shell."""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent
EXCLUDED = {'mocks', 'proposals', '.git', '.playwright-cli'}

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.ids = []
        self.links = []
        self.tags = Counter()
        self.header = False
        self.footer = False
        self.styles = []
        self.feed(path.read_text())

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        self.tags[tag] += 1
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        for key in ('href', 'src'):
            if attrs.get(key):
                self.links.append(attrs[key])
        if tag == 'header' and 'site-header' in attrs.get('class', '').split():
            self.header = True
        if tag == 'footer' and 'site-footer' in attrs.get('class', '').split():
            self.footer = True
        if tag == 'link' and attrs.get('rel') == 'stylesheet':
            self.styles.append(attrs.get('href'))

pages = {
    path.resolve(): Page(path)
    for path in ROOT.rglob('*.html')
    if path.relative_to(ROOT).parts[0] not in EXCLUDED
}
errors = []
for path, page in pages.items():
    name = str(path.relative_to(ROOT))
    if '/signal.css' not in page.styles:
        errors.append(f'{name}: missing Signal works stylesheet')
    if name != 'slide/index.html':
        if not page.header or not page.footer:
            errors.append(f'{name}: missing shared header or footer')
        if page.tags['h1'] != 1 or page.tags['main'] != 1:
            errors.append(f'{name}: expected one main landmark and one H1')
    if not page.tags['title']:
        errors.append(f'{name}: missing page title')
    duplicates = [id_ for id_, count in Counter(page.ids).items() if count > 1]
    if duplicates:
        errors.append(f'{name}: duplicate IDs: {duplicates}')
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc:
            continue
        if not url.path:
            target = path
        elif url.path.startswith('/'):
            target = ROOT / unquote(url.path).lstrip('/')
        else:
            target = path.parent / unquote(url.path)
        if target.is_dir():
            target /= 'index.html'
        target = target.resolve()
        if not target.exists():
            errors.append(f'{name}: broken local link {link}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{name}: missing anchor {link}')
        if '/mocks/' in link or '/proposals/' in link:
            errors.append(f'{name}: production page depends on mockup {link}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} pages; local links, assets, anchors, page landmarks, and shared theme.')
