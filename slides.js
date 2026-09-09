(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const counter = document.getElementById('slideCounter');
  const progress = document.getElementById('progressBar');
  const nav = document.querySelector('.slide-nav');
  let current = 0;
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex;gap:8px';
  const prev = document.createElement('button');
  const next = document.createElement('button');
  for (const [button, label, text] of [[prev, 'Previous slide', '←'], [next, 'Next slide', '→']]) {
    button.type = 'button';
    button.className = 'slide-control';
    button.setAttribute('aria-label', label);
    button.textContent = text;
    controls.append(button);
  }
  nav.append(controls);
  counter.setAttribute('aria-live', 'polite');
  function goTo(index) {
    if (index < 0 || index >= slides.length) return;
    current = index;
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === current);
      slide.inert = i !== current;
      slide.setAttribute('aria-hidden', String(i !== current));
    });
    slides[current].scrollTop = 0;
    counter.textContent = `${current + 1} / ${slides.length}`;
    progress.style.width = `${((current + 1) / slides.length) * 100}%`;
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
  }
  prev.addEventListener('click', () => goTo(current - 1));
  next.addEventListener('click', () => goTo(current + 1));
  document.addEventListener('keydown', event => {
    if (document.querySelector('dialog[open]') || event.target.closest('button,a,input,textarea,summary')) return;
    if (['ArrowRight', 'ArrowDown', ' '].includes(event.key)) { event.preventDefault(); goTo(current + 1); }
    if (['ArrowLeft', 'ArrowUp'].includes(event.key)) { event.preventDefault(); goTo(current - 1); }
    if (event.key === 'Home') { event.preventDefault(); goTo(0); }
    if (event.key === 'End') { event.preventDefault(); goTo(slides.length - 1); }
  });
  let start;
  document.addEventListener('touchstart', event => {
    if (!event.target.closest('dialog')) start = [event.changedTouches[0].screenX, event.changedTouches[0].screenY];
  }, { passive: true });
  document.addEventListener('touchend', event => {
    if (!start || event.target.closest('dialog')) return;
    const dx = event.changedTouches[0].screenX - start[0];
    const dy = event.changedTouches[0].screenY - start[1];
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
    start = null;
  }, { passive: true });
  goTo(0);
})();
