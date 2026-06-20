// ===== Scroll Reveal =====
(function () {
  const cards = document.querySelectorAll('.section-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  cards.forEach((card, i) => {
    card.style.transitionDelay = i * 0.08 + 's';
    observer.observe(card);
  });
})();

// ===== Custom Cursor =====
(function () {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let hover = false;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
  });

  const clickables = document.querySelectorAll(
    'a, button, .pub-btn, .contact-link, .social-icons a, .interest-item, .honor-item, .image.avatar img'
  );
  clickables.forEach((el) => {
    el.addEventListener('mouseenter', () => { hover = true; });
    el.addEventListener('mouseleave', () => { hover = false; });
  });

  function animate() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    const size = hover ? 48 : 32;
    ring.style.width = size + 'px';
    ring.style.height = size + 'px';
    ring.style.transform = `translate(${rx - size / 2}px, ${ry - size / 2}px)`;
    ring.style.borderColor = hover ? 'var(--blue)' : 'var(--text-light)';
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();
