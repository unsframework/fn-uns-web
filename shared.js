/* Shared navigation, code samples, and vector diagram exploration. */
(() => {
  document.documentElement.classList.add('js');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-navigation');
  const closeMenu = () => {
    navigation?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  };
  menuButton?.addEventListener('click', () => {
    const open = navigation.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
  });
  navigation?.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navigation?.classList.contains('open')) {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const narrowNavigation = matchMedia('(max-width: 900px)');
  narrowNavigation.addEventListener('change', closeMenu);

  // Deep links remain usable when their technical section starts collapsed.
  const revealAnchor = hash => {
    if (!hash || hash === '#') return;
    let id;
    try { id = decodeURIComponent(hash.slice(1)); } catch { return; }
    const target = document.getElementById(id);
    if (!target) return;
    let parent = target.parentElement;
    let opened = false;
    while (parent) {
      if (parent.tagName === 'DETAILS' && !parent.open) {
        parent.open = true;
        opened = true;
      }
      parent = parent.parentElement;
    }
    if (opened) requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
  };
  revealAnchor(location.hash);
  addEventListener('hashchange', () => revealAnchor(location.hash));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && url.pathname === location.pathname) revealAnchor(url.hash);
  });

  const sidebar = document.querySelector('.sidebar-disclosure');
  const narrowSidebar = matchMedia('(max-width: 760px)');
  if (sidebar) {
    const setSidebar = () => { sidebar.open = !narrowSidebar.matches; };
    setSidebar();
    narrowSidebar.addEventListener('change', setSidebar);
    sidebar.addEventListener('click', event => {
      if (event.target.closest('a') && narrowSidebar.matches) sidebar.open = false;
    });
  }

  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const reveals = document.querySelectorAll('.fade-in, [data-animate], .yaml-preview');
  const reveal = element => element.classList.add('visible', 'animate-active');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05 });
    reveals.forEach(element => observer.observe(element));
  } else reveals.forEach(reveal);

  // Keep code in its original block. The copy control never enters the payload.
  document.querySelectorAll('.yaml-block, .yaml-preview, .code-block').forEach(block => {
    if (block.closest('.slide')) return;
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';
    const label = document.createElement('span');
    label.textContent = block.querySelector('pre') ? 'CODE / CONFIGURATION' : 'EXAMPLE';
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'copy-code';
    copy.textContent = 'Copy';
    copy.setAttribute('aria-label', 'Copy code sample');
    const status = document.createElement('span');
    status.className = 'sr-only';
    status.setAttribute('role', 'status');
    toolbar.append(label, copy, status);
    block.before(toolbar);
    copy.addEventListener('click', async () => {
      const text = (block.querySelector('pre') || block).innerText;
      try {
        if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
        else {
          const field = document.createElement('textarea');
          field.value = text;
          field.style.cssText = 'position:fixed;left:-9999px;top:0';
          document.body.append(field);
          field.select();
          const copied = document.execCommand('copy');
          field.remove();
          copy.focus();
          if (!copied) throw new Error('Clipboard unavailable');
        }
        copy.textContent = 'Copied';
        status.textContent = 'Code copied to clipboard.';
      } catch {
        const range = document.createRange();
        range.selectNodeContents(block);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        copy.textContent = 'Selected';
        status.textContent = 'Code selected. Use your browser’s copy command.';
      }
      setTimeout(() => { copy.textContent = 'Copy'; }, 2500);
    });
  });

  // All technical SVGs share an accessible, zoomable full-size view.
  let dialog;
  let diagramSequence = 0;
  document.querySelectorAll('main svg, .slide svg').forEach(svg => {
    if (svg.closest('.brand') || svg.closest('button')) return;
    const viewBox = svg.viewBox.baseVal;
    if (viewBox.width < 100 || viewBox.height < 60) return;
    const frame = document.createElement('div');
    frame.className = 'diagram-frame';
    svg.before(frame);
    frame.append(svg);
    const controls = document.createElement('div');
    controls.className = 'diagram-controls';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'diagram-expand';
    button.textContent = 'Explore diagram ↗';
    const heading = svg.closest('section, .docs-content, .hero, .slide')?.querySelector('h2, h1, h3');
    const title = heading?.textContent.replace(/\s+/g, ' ').trim() || 'Factory architecture';
    if (svg.getAttribute('aria-label') === 'Technical diagram') svg.setAttribute('aria-label', `${title} — technical diagram`);
    button.setAttribute('aria-label', `Explore diagram: ${title}`);
    controls.append(button);
    frame.append(controls);
    button.addEventListener('click', () => openDiagram(svg, title, button));
  });

  function openDiagram(source, title, trigger) {
    dialog?.remove();
    dialog = document.createElement('dialog');
    dialog.className = 'diagram-dialog';
    dialog.setAttribute('aria-label', title);
    const toolbar = document.createElement('div');
    toolbar.className = 'diagram-toolbar';
    const label = document.createElement('span');
    label.textContent = title;
    const controls = document.createElement('div');
    const makeButton = (text, name) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = text;
      button.setAttribute('aria-label', name);
      controls.append(button);
      return button;
    };
    const minus = makeButton('−', 'Zoom out');
    const reset = makeButton('100%', 'Reset diagram zoom');
    const plus = makeButton('+', 'Zoom in');
    const close = makeButton('Close ×', 'Close diagram');
    toolbar.append(label, controls);
    const canvas = document.createElement('div');
    canvas.className = 'diagram-canvas';
    canvas.tabIndex = 0;
    canvas.setAttribute('aria-label', 'Diagram. Scroll to explore when zoomed.');
    const clone = source.cloneNode(true);
    // Avoid duplicate SVG identifiers while keeping gradients and motion paths.
    const ids = new Map();
    clone.querySelectorAll('[id]').forEach(node => {
      const id = `expanded-${++diagramSequence}-${node.id}`;
      ids.set(node.id, id);
      node.id = id;
    });
    clone.querySelectorAll('*').forEach(node => {
      for (const attribute of [...node.attributes]) {
        let value = attribute.value;
        ids.forEach((replacement, id) => {
          value = value.replaceAll(`url(#${id})`, `url(#${replacement})`);
          if (value === `#${id}`) value = `#${replacement}`;
        });
        if (value !== attribute.value) node.setAttribute(attribute.name, value);
      }
    });
    canvas.append(clone);
    dialog.append(toolbar, canvas);
    document.body.append(dialog);
    let zoom = 100;
    const applyZoom = () => {
      clone.style.width = `${zoom}%`;
      reset.textContent = `${zoom}%`;
      minus.disabled = zoom <= 100;
      plus.disabled = zoom >= 300;
    };
    minus.addEventListener('click', () => { zoom = Math.max(100, zoom - 25); applyZoom(); });
    plus.addEventListener('click', () => { zoom = Math.min(300, zoom + 25); applyZoom(); });
    reset.addEventListener('click', () => { zoom = 100; applyZoom(); });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    const previousOverflow = document.body.style.overflow;
    dialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow;
      dialog.remove();
      trigger.focus();
    }, { once: true });
    applyZoom();
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    close.focus();
  }
})();
