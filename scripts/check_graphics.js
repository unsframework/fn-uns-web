// Run against the local server with playwright-cli run-code --filename scripts/check_graphics.js.
async page => {
  const origin = 'http://127.0.0.1:8765';
  await page.goto(origin);
  const routes = await page.evaluate(async () => {
    const xml = new DOMParser().parseFromString(await (await fetch('/sitemap.xml')).text(), 'application/xml');
    return [...new Set([...xml.querySelectorAll('loc')].map(node => new URL(node.textContent).pathname).concat('/404.html', '/start/', '/slide/'))];
  });
  const failures = [];
  const check = (ok, message) => { if (!ok) failures.push(message); };
  page.on('pageerror', error => failures.push(`${page.url()}: ${error.message}`));
  let diagrams = 0;
  const settle = svg => svg.evaluate(el => {
    el.getAnimations({ subtree: true }).forEach(animation => {
      animation.pause();
      const timing = animation.effect.getTiming();
      animation.currentTime = timing.delay + timing.duration * (timing.iterations === Infinity ? .95 : 1.01);
    });
  });
  const linkedPaths = svg => svg.evaluate(el => {
    el.pauseAnimations();
    el.setCurrentTime(1.3);
    return [...el.querySelectorAll('animateMotion:has(mpath)')].flatMap(animation => {
      const path = el.querySelector(`[id="${animation.querySelector('mpath').getAttribute('href').slice(1)}"]`);
      if (!path) return ['missing motion path'];
      const duration = parseFloat(animation.getAttribute('dur'));
      const delay = parseFloat(animation.getAttribute('begin') || '0');
      const point = path.getPointAtLength(path.getTotalLength() * ((1.3 - delay) % duration) / duration);
      const actual = new DOMPoint(0, 0).matrixTransform(el.getScreenCTM().inverse().multiply(animation.parentElement.getScreenCTM()));
      return Math.hypot(point.x - actual.x, point.y - actual.y) > 1 ? [`packet is off connector ${path.id}`] : [];
    });
  });
  const labels = svg => svg.evaluate(el => {
    const bounds = el.getBoundingClientRect();
    const texts = [...el.querySelectorAll('text')].map(node => ({
      text: node.textContent.trim(), rect: node.getBoundingClientRect()
    })).filter(item => item.rect.width);
    const issues = [];
    const boxes = [...el.querySelectorAll('rect')].filter(node => getComputedStyle(node).fill !== 'none').map(node => node.getBoundingClientRect());
    const fixedBoxes = [...el.querySelectorAll('rect:not(:has(animate))')].filter(node => getComputedStyle(node).fill !== 'none').map(node => node.getBoundingClientRect());
    const contains = (a, b) => a.left <= b.left + 1 && a.right >= b.right - 1 && a.top <= b.top + 1 && a.bottom >= b.bottom - 1;
    for (let i = 0; i < fixedBoxes.length; i++) {
      const a = fixedBoxes[i];
      for (const b of fixedBoxes.slice(i + 1)) {
        if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1 && !contains(a, b) && !contains(b, a)) issues.push('overlapping component boxes');
      }
    }
    for (let i = 0; i < texts.length; i++) {
      const { text, rect: a } = texts[i];
      if (a.left < bounds.left - 1 || a.right > bounds.right + 1 || a.top < bounds.top - 1 || a.bottom > bounds.bottom + 1) issues.push(`clipped: ${text}`);
      const box = boxes.filter(b => b.width > 20 && b.left <= (a.left + a.right) / 2 && b.right >= (a.left + a.right) / 2 && b.top <= (a.top + a.bottom) / 2 && b.bottom >= (a.top + a.bottom) / 2).sort((a, b) => a.width * a.height - b.width * b.height)[0];
      if (box && (a.left < box.left - 1 || a.right > box.right + 1 || a.top < box.top - 1 || a.bottom > box.bottom + 1)) issues.push(`label escapes its card: ${text}`);
      for (const { text: other, rect: b } of texts.slice(i + 1)) {
        if (Math.min(a.right, b.right) - Math.max(a.left, b.left) > 1 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 1) issues.push(`overlap: ${text} / ${other}`);
      }
    }
    return issues;
  });
  for (const route of routes) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(origin + route);
    check(response.status() === 200, `${route}: HTTP ${response.status()}`);
    await page.locator('details').evaluateAll(nodes => nodes.forEach(node => { node.open = true; }));
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route}: overflow at ${width}px`);
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    const graphics = page.locator('.diagram-frame>svg');
    for (let i = 0; i < await graphics.count(); i++) {
      diagrams++;
      const svg = graphics.nth(i), name = `${route} diagram ${i + 1}`;
      // Use the real slide controls so inactive slides stay inert.
      if (route === '/slide/') {
        while (!await svg.evaluate(el => !!el.closest('.slide.active'))) await page.getByRole('button', { name: 'Next slide', exact: true }).click();
      }
      await svg.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      const motion = await svg.evaluate(el => ({
        smil: el.getCurrentTime(), paused: el.animationsPaused(),
        packets: [...el.querySelectorAll('[style*="offset-path"]')].map(node => ({
          name: getComputedStyle(node).animationName,
          time: node.getAnimations()[0]?.currentTime
        }))
      }));
      await page.waitForTimeout(60);
      const advancing = await svg.evaluate((el, before) => ({
        smil: el.getCurrentTime() > before.smil && !el.animationsPaused(),
        packets: [...el.querySelectorAll('[style*="offset-path"]')].every((node, j) => getComputedStyle(node).animationName !== 'none' && node.getAnimations()[0]?.currentTime > before.packets[j].time)
      }), motion);
      check(advancing.smil && advancing.packets, `${name}: motion is stopped`);
      await settle(svg);
      for (const issue of await labels(svg)) failures.push(`${name}: ${issue}`);
      for (const issue of await linkedPaths(svg)) failures.push(`${name}: ${issue}`);
      await page.setViewportSize({ width: 390, height: 844 });
      const trigger = svg.locator('..').getByRole('button');
      await trigger.click();
      const dialog = page.locator('.diagram-dialog'), clone = dialog.locator('svg');
      check(await dialog.isVisible(), `${name}: expansion failed`);
      check(await clone.evaluate(el => [...el.querySelectorAll('mpath')].every(node => el.querySelector(`[id="${node.getAttribute('href').slice(1)}"]`))), `${name}: broken expanded motion path`);
      check(await page.evaluate(() => { const ids = [...document.querySelectorAll('[id]')].map(el => el.id); return new Set(ids).size === ids.length; }), `${name}: duplicate expanded IDs`);
      const initialWidth = await clone.evaluate(el => el.getBoundingClientRect().width);
      for (let zoom = 100; zoom < 300; zoom += 25) await dialog.getByRole('button', { name: 'Zoom in', exact: true }).click();
      check(await clone.evaluate((el, width) => Math.abs(el.getBoundingClientRect().width - width * 3) < 2, initialWidth), `${name}: zoom does not resize the diagram`);
      await settle(clone);
      for (const issue of await labels(clone)) failures.push(`${name} expanded: ${issue}`);
      for (const issue of await linkedPaths(clone)) failures.push(`${name} expanded: ${issue}`);
      check(await dialog.locator('.diagram-canvas').evaluate(el => el.clientHeight > 100 && el.getBoundingClientRect().bottom <= el.closest('dialog').getBoundingClientRect().bottom), `${name}: clipped zoom canvas`);
      await dialog.getByRole('button', { name: 'Reset diagram zoom' }).click();
      await page.keyboard.press('Escape');
      check(await trigger.evaluate(el => el === document.activeElement), `${name}: focus not restored`);
      await page.setViewportSize({ width: 1440, height: 1000 });
    }
  }
  // Native SVG and CSS motion must both respond to a live preference change.
  for (const route of ['/', '/docs/', '/guides/pipeline-functions.html', '/guides/digital-twin-gitops.html']) {
    await page.goto(origin + route);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.diagram-expand').first().click();
    check(await page.locator('.diagram-frame>svg, .diagram-canvas>svg').evaluateAll(nodes => nodes.every(el => el.animationsPaused() && el.getAnimations({ subtree: true }).every(a => a.playState !== 'running'))), `${route}: reduced motion still animates`);
    const clock = await page.locator('.diagram-canvas>svg').evaluate(el => el.getCurrentTime());
    await page.waitForTimeout(80);
    check(await page.locator('.diagram-canvas>svg').evaluate((el, time) => el.getCurrentTime() === time, clock), `${route}: native SVG clock was not paused`);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction(() => [...document.querySelectorAll('.diagram-frame>svg, .diagram-canvas>svg')].every(el => !el.animationsPaused()));
    check(await page.locator('.diagram-frame>svg, .diagram-canvas>svg').evaluateAll(nodes => nodes.every(el => !el.animationsPaused())), `${route}: motion did not resume`);
    await page.keyboard.press('Escape');
  }
  await page.goto(origin + '/guides/pipeline-functions.html');
  const capture = page.locator('.diagram-frame>svg').nth(1);
  check(await capture.evaluate(el => [...el.querySelectorAll('circle:has(>animate[attributeName="cx"])')].every(node => node.cy.baseVal.value === 80)), 'Capture packets are not aligned to their connectors');
  await page.goto(origin + '/fn-uns/');
  check(await page.locator('.code-layout').evaluate(el => el.children.length === 2 && el.firstElementChild.contains(el.querySelector('.copy-code'))), 'Code toolbar breaks the two-column example');
  await page.goto(origin + '/slide/');
  const slides = await page.locator('.slide').count();
  for (let i = 0; i < slides; i++) {
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      check(await page.locator('.slide.active').evaluate(el => el.scrollWidth <= innerWidth), `Slide ${i + 1}: overflow at ${width}px`);
      check(await page.locator('.slide.active .stat-number').evaluateAll(nodes => nodes.every(el => el.scrollWidth <= el.clientWidth && el.getBoundingClientRect().height <= parseFloat(getComputedStyle(el).lineHeight) + 1)), `Slide ${i + 1}: statistic wraps or overflows at ${width}px`);
    }
    if (i < slides - 1) await page.getByRole('button', { name: 'Next slide', exact: true }).click();
  }
  const staticContext = await page.context().browser().newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await staticContext.newPage();
  for (const route of ['/uns/', '/how-it-works/', '/framework/']) {
    await staticPage.goto(origin + route);
    check(await staticPage.locator('.tt-segment,.tt-desc,.n2-cell,.yaml-line').evaluateAll(nodes => nodes.every(el => getComputedStyle(el).opacity === '1')), `${route}: graphics lose content without JavaScript`);
  }
  await staticContext.close();
  if (failures.length) throw new Error(failures.join('\n'));
  return { pages: routes.length, diagrams, slides, widths: [1440, 768, 390, 320], failures };
}
