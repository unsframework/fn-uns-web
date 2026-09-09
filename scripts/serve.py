#!/usr/bin/env python3
"""Serve the full static site locally; defaults to all interfaces, port 8765."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--port', type=int, default=8765)
parser.add_argument('--bind', default='0.0.0.0')
args = parser.parse_args()
root = Path(__file__).resolve().parent.parent
handler = partial(SimpleHTTPRequestHandler, directory=str(root))
print(f'Serving UNS Framework on http://{args.bind}:{args.port}/', flush=True)
ThreadingHTTPServer((args.bind, args.port), handler).serve_forever()
