// Kartu ringkasan fitur dan gerak halaman. Gambar pulau di kartu berasal dari simulator (fungsi tampilan yang sama).
// Gerak memakai Motion (motion.dev) bila termuat; tanpa Motion, atau bila pengunjung memilih gerak dikurangi, semua langsung tampil.
(function () {
  'use strict';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var M = !reduced && window.Motion && window.Motion.animate ? window.Motion : null;
  var sim = window.PuloSim;

  // Kartu: layar kecil dengan pulau di tepi atasnya, diskalakan supaya muat.
  function fill(cardEl) {
    var name = cardEl.dataset.preview, scr = cardEl.querySelector('.scr');
    if (!sim || !scr) return;
    if (name === 'dock') {
      scr.innerHTML = '<div class="mini" style="top:auto;bottom:14px"><div class="mdock" style="position:relative;left:0;transform:none;height:50px;border-radius:18px">' + sim.dock(32) + '</div></div>';
    } else if (name === 'clock') {
      scr.innerHTML = '<div class="clockbox"><div class="clk">' + sim.clock(30, 'bold') + '</div></div>';
      return;
    } else {
      var v = sim.preview(name);
      if (!v) return;
      var glass = /\bg\b/.test(v.cls);
      scr.innerHTML = '<div class="mini' + (glass ? ' g' : '') + '"><div class="' + v.cls + '" style="width:' + v.w + 'px;height:' + v.h + 'px"><div class="islBody">' + v.html + '</div></div></div>';
      scr.querySelectorAll('[data-act]').forEach(function (el) { el.removeAttribute('data-act'); });
      scr.querySelectorAll('button, input').forEach(function (el) { el.tabIndex = -1; });
    }
    fit(cardEl);
  }
  function fit(cardEl) {
    var scr = cardEl.querySelector('.scr'), mini = scr && scr.querySelector('.mini');
    if (!mini) return;
    var first = mini.firstElementChild, w = first.offsetWidth, h = first.offsetHeight;
    var k = Math.min(1, (scr.clientWidth - 28) / w, (scr.clientHeight - 24) / h);
    if (cardEl.dataset.preview === 'dock') { mini.style.transform = 'translateX(-50%) scale(' + Math.min(1.2, (scr.clientWidth - 40) / w) + ')'; mini.style.transformOrigin = '50% 100%'; return; }
    mini.style.transform = 'translateX(-50%) scale(' + k.toFixed(3) + ')';
  }
  var cards = Array.prototype.slice.call(document.querySelectorAll('.bc'));
  // Klik kartu ditangani simulator lewat data-try, sama dengan tombol "Coba" lainnya.
  cards.forEach(fill);
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(function (entries) { entries.forEach(function (e) { fit(e.target.closest('.bc')); }); });
    cards.forEach(function (c) { var scr = c.querySelector('.scr'); if (scr) ro.observe(scr); });
  }

  // Tanya jawab: tinggi jawaban bergerak saat dibuka dan ditutup.
  document.querySelectorAll('.qa details').forEach(function (d) {
    var summary = d.querySelector('summary'), ans = d.querySelector('.ans');
    summary.addEventListener('click', function (e) {
      if (!M) return;
      e.preventDefault();
      if (d.open) {
        M.animate(ans, { height: [ans.offsetHeight + 'px', '0px'], opacity: [1, 0] }, { duration: .28, ease: [.4, 0, .2, 1] }).then(function () { d.open = false; ans.style.height = ''; ans.style.opacity = ''; });
      } else {
        d.open = true;
        var h = ans.offsetHeight;
        M.animate(ans, { height: ['0px', h + 'px'], opacity: [0, 1] }, { duration: .36, ease: [.22, 1, .36, 1] }).then(function () { ans.style.height = ''; });
      }
    });
  });

  if (!M || !('IntersectionObserver' in window)) return;
  var ease = [.22, 1, .36, 1];
  // Pemicu sekali saat elemen masuk layar. IntersectionObserver langsung, bukan inView Motion (tidak terpicu di uji 7 Nov 2026).
  function onView(selector, run, amount) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { io.unobserve(e.target); run(e.target); } });
    }, { threshold: amount || .2 });
    document.querySelectorAll(selector).forEach(function (el) { io.observe(el); });
  }

  // Pembuka: baris demi baris naik, NIX memantul masuk.
  var hero = document.querySelectorAll('[data-anim=hero]');
  hero.forEach(function (el) { el.style.opacity = 0; });
  M.animate(hero, { opacity: [0, 1], y: [26, 0] }, { duration: .9, delay: M.stagger(.09), ease: ease });
  var nixBtn = document.getElementById('heroNix');
  if (nixBtn) M.animate(nixBtn, { y: [60, 0], scale: [.86, 1] }, { type: 'spring', stiffness: 160, damping: 14, delay: .35 });

  // Bagian lain: naik dan muncul saat masuk layar.
  document.querySelectorAll('[data-anim=up]').forEach(function (el) { el.style.opacity = 0; });
  onView('[data-anim=up]', function (el) {
    M.animate(el, { opacity: [0, 1], y: [28, 0] }, { duration: .8, ease: ease });
  }, .25);
  cards.forEach(function (c) { c.style.opacity = 0; });
  onView('.bento', function (grid) {
    M.animate(grid.querySelectorAll('.bc'), { opacity: [0, 1], y: [34, 0], scale: [.97, 1] }, { duration: .8, delay: M.stagger(.06), ease: ease });
  }, .05);

  // Angka statistik berhitung naik sekali.
  onView('.stats', function (row) {
    row.querySelectorAll('[data-count-to]').forEach(function (b) {
      var to = +b.dataset.countTo, pre = b.dataset.prefix || '', suf = b.dataset.suffix || '';
      M.animate(0, to, { duration: 1.1, ease: ease, onUpdate: function (v) { b.textContent = pre + Math.round(v) + suf; } });
    });
  }, .5);

  // Wajah NIX menyapa saat bagiannya terlihat.
  document.querySelectorAll('#faces button').forEach(function (b) { b.style.opacity = 0; });
  onView('#faces', function (row) {
    M.animate(row.querySelectorAll('button'), { opacity: [0, 1], y: [18, 0] }, { duration: .5, delay: M.stagger(.035), ease: ease });
  }, .3);
})();
