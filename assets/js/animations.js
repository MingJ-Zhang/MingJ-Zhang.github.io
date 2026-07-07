// ===== View Mode Toggle =====
(function () {
  const toggle = document.getElementById('view-mode-toggle');
  const container = document.querySelector('.tab-container');
  if (!toggle || !container) return;

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      container.classList.add('tab-mode');
      // Activate first tab
      const firstBtn = container.querySelector('.tab-btn');
      if (firstBtn) firstBtn.click();
    } else {
      container.classList.remove('tab-mode');
      // Show all cards
      container.querySelectorAll('.section-card').forEach((card, i) => {
        card.style.transitionDelay = i * 0.03 + 's';
        card.classList.add('visible');
      });
    }
  });
})();

// ===== Tab Switching =====
(function () {
  const tabNav = document.querySelector('.tab-nav');
  if (!tabNav) return;

  const buttons = tabNav.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      if (!target) return;

      // Update buttons
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update panels
      panels.forEach((panel) => {
        panel.classList.remove('active');
        if (panel.id === 'tab-' + target) {
          panel.classList.add('active');
          // Reveal section cards inside the newly active panel
          const cards = panel.querySelectorAll('.section-card');
          cards.forEach((card, i) => {
            card.style.transitionDelay = i * 0.05 + 's';
            card.classList.add('visible');
          });
        }
      });
    });
  });

  // Reveal cards in the initially active panel
  const activePanel = document.querySelector('.tab-panel.active');
  if (activePanel) {
    const cards = activePanel.querySelectorAll('.section-card');
    cards.forEach((card, i) => {
      card.style.transitionDelay = i * 0.05 + 's';
      card.classList.add('visible');
    });
  }
})();

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
    'a, button, .pub-btn, .social-icons a, .interest-item, .image.avatar img'
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
