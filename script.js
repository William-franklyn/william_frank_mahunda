// Futuristic particle-network background
(() => {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let raf;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.6,
    }));
  };

  const LINK_DIST = 130;
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(120, 160, 255, 0.55)';
      ctx.fill();
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(91, 157, 255, ${0.14 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    if (!reduceMotion) raf = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener('resize', () => { resize(); if (reduceMotion) draw(); });
  document.addEventListener('visibilitychange', () => {
    if (reduceMotion) return;
    if (document.hidden) cancelAnimationFrame(raf);
    else raf = requestAnimationFrame(draw);
  });
})();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') navLinks.classList.remove('open');
});

// Project filters
const filterButtons = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('#projectsGrid .card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.tags.split(' ').includes(filter);
      card.classList.toggle('hidden', !show);
    });
  });
});

// ── Hidden visit stats (secret: click the © in the footer) ──────────────────
// Powered by GoatCounter — free, privacy-friendly analytics. Clicking © shows
// the total visit count. The full breakdown you asked about — visitors' COUNTRY,
// city-level region, DEVICE, BROWSER and how they found you (REFERRER) — lives in
// your private dashboard at https://<code>.goatcounter.com, which only you can log
// into. That's the right place for it: precise identity can't be captured from a
// browser without a permission popup, and publishing visitor locations on a public
// button would expose their personal data (and yours) to anyone who clicks.
//
//  ▶ TO ACTIVATE (one-time, ~2 min):
//    1. Sign up free at https://www.goatcounter.com/  and choose a code
//       (your dashboard becomes <code>.goatcounter.com).
//    2. Put that code on the ONE line below. That's it — tracking + the
//       secret counter both switch on. Nothing else to edit.
(() => {
  const GC_CODE = 'williammahunda'; // your GoatCounter code

  const secret = document.getElementById('visitSecret');
  if (!secret) return;
  secret.style.cursor = 'default'; // looks like plain text — stays secret

  // Tracking itself is the static GoatCounter <script> tag in each HTML page.
  // It natively skips any browser whose localStorage has skipgc='t', which the
  // toggle below sets — so your own visits stop counting once you flip it.

  // Render the stats panel, including a per-browser "don't count me" toggle.
  function renderStats(panel, d) {
    const off = localStorage.getItem('skipgc') === 't';
    panel.innerHTML =
      `<div style="font-size:24px;font-weight:700">${d.count}</div>` +
      `<div style="opacity:.75;margin-bottom:8px">total visits · ${d.count_unique || '—'} unique</div>` +
      `<a href="https://${GC_CODE}.goatcounter.com" target="_blank" rel="noopener" style="color:#7ba8ff;text-decoration:none">Open full dashboard ↗</a>` +
      `<div style="opacity:.5;font-size:11px;margin:6px 0 10px">Country, device &amp; referrer are in your dashboard (private to you).</div>` +
      `<div style="border-top:1px solid rgba(120,160,255,0.25);padding-top:8px;font-size:12px">This browser is <strong style="color:${off ? '#7be0a3' : '#ffcf7b'}">${off ? 'excluded' : 'being counted'}</strong>.</div>`;
    const btn = document.createElement('button');
    btn.textContent = off ? 'Start counting this browser' : "Don't count my visits";
    Object.assign(btn.style, {
      marginTop: '6px', width: '100%', cursor: 'pointer',
      background: 'rgba(120,160,255,0.15)', color: '#eaf0ff',
      border: '1px solid rgba(120,160,255,0.35)', borderRadius: '8px',
      padding: '6px 8px', font: '12px Inter, system-ui, sans-serif',
    });
    btn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      if (localStorage.getItem('skipgc') === 't') localStorage.removeItem('skipgc');
      else localStorage.setItem('skipgc', 't');
      renderStats(panel, d);
    });
    panel.appendChild(btn);
  }

  secret.addEventListener('click', (e) => {
    e.preventDefault();
    let panel = document.getElementById('visitPanel');
    if (panel) { panel.remove(); return; } // click again to close

    panel = document.createElement('div');
    panel.id = 'visitPanel';
    Object.assign(panel.style, {
      position: 'fixed', bottom: '18px', right: '18px', zIndex: '9999',
      background: 'rgba(12,16,32,0.96)', color: '#eaf0ff',
      border: '1px solid rgba(120,160,255,0.35)', borderRadius: '12px',
      padding: '14px 16px', font: '13px/1.5 Inter, system-ui, sans-serif',
      maxWidth: '260px', boxShadow: '0 12px 40px rgba(0,0,0,0.55)',
    });
    panel.innerHTML = '<div style="opacity:.7">Loading visits…</div>';
    document.body.appendChild(panel);

    if (GC_CODE === 'YOURCODE') {
      panel.innerHTML =
        '<strong>Counter not set up yet.</strong><br>' +
        'Add your GoatCounter code in <code>script.js</code> to switch this on. ' +
        'Visitor country / device / referrer then appear in your private dashboard.';
    } else {
      fetch(`https://${GC_CODE}.goatcounter.com/counter/TOTAL.json`)
        .then((r) => r.json())
        .then((d) => renderStats(panel, d))
        .catch(() => { panel.innerHTML = 'Stats unavailable right now.'; });
    }

    // Dismiss when clicking anywhere else.
    setTimeout(() => {
      const off = (ev) => {
        if (!panel.contains(ev.target) && ev.target !== secret) {
          panel.remove();
          document.removeEventListener('click', off);
        }
      };
      document.addEventListener('click', off);
    }, 0);
  });
})();
