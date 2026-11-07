// Satu-satunya tempat alamat rilis. Kosong = tombolnya tetap "Segera hadir". Angka unduhan hanya dari GitHub, tidak pernah dikarang.
(function () {
  'use strict';
  var SITE = {
    repo: 'Ocang1996/pulo',
    released: false,             // true setelah rilis pertama terunggah di GitHub
    store: '',                   // alamat halaman Microsoft Store (https://apps.microsoft.com/detail/9P8K4MX5NV3S setelah lolos sertifikasi)
    saweria: 'https://saweria.co/CloVerX',
  };
  var I = window.PuloI18n, T = I.t;

  // Judul dan deskripsi halaman ikut bahasa.
  document.title = T('meta.title');
  var desc = document.querySelector('meta[name=description]');
  if (desc) desc.setAttribute('content', T('meta.desc'));
  document.querySelectorAll('[data-version]').forEach(function (el) { el.textContent = T('version', '1.0.0'); });
  var langBtn = document.getElementById('langBtn');
  if (langBtn) langBtn.addEventListener('click', function () { I.set(I.lang === 'id' ? 'en' : 'id'); });

  // Tanya jawab dari kamus: satu sumber untuk dua bahasa.
  var qa = document.getElementById('qa');
  if (qa) T('faq').forEach(function (item) {
    var d = document.createElement('details');
    d.innerHTML = '<summary>' + item[0] + '</summary><div class="ans"><p>' + item[1] + '</p></div>';
    qa.appendChild(d);
  });

  // Cara memasang: langkah dan kendala dari kamus, tab Store / Zip.
  document.querySelectorAll('[data-steps]').forEach(function (ol) {
    ol.innerHTML = T(ol.dataset.steps).map(function (st) { return '<li><b class="t">' + st[0] + '</b><p>' + st[1] + '</p></li>'; }).join('');
  });
  document.querySelectorAll('[data-help]').forEach(function (dl) {
    dl.innerHTML = T(dl.dataset.help).map(function (h) { return '<div><dt>' + h[0] + '</dt><dd>' + h[1] + '</dd></div>'; }).join('');
  });
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-guide]'));
  function pick(name, focus) {
    tabs.forEach(function (t) {
      var on = t.dataset.guide === name;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
      if (on && focus) t.focus();
    });
  }
  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { pick(t.dataset.guide); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      pick(tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length].dataset.guide, true);
    });
  });
  // Tab yang dibuka lebih dulu: Store bila sudah ada, Zip bila hanya Zip yang sudah dirilis.
  if (tabs.length) pick(!SITE.store && SITE.released ? 'zip' : 'store');

  function link(host, text, href, external) {
    var box = document.querySelector(host);
    if (!box) return;
    box.innerHTML = '';
    var a = document.createElement('a');
    a.className = 'btn';
    a.href = href;
    a.textContent = text;
    if (external) { a.target = '_blank'; a.rel = 'noopener'; }
    box.appendChild(a);
  }
  // Pulau navigasi menyingkir saat halaman digulir ke bawah supaya tidak menutupi judul, dan kembali saat digulir ke atas.
  var nav = document.getElementById('notch'), last = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('away', y > 160 && y > last + 2);
    if (y < last - 2 || y <= 160) nav && nav.classList.remove('away');
    last = y;
  }, { passive: true });

  if (SITE.store) link('[data-store]', T('get.openStore'), SITE.store, true);
  if (SITE.saweria) link('[data-coffee]', T('get.openSaweria'), SITE.saweria, true);
  if (!SITE.released) return;
  link('[data-zip]', T('get.downloadZip'), 'https://github.com/' + SITE.repo + '/releases/latest/download/Pulo.zip');

  function show(info) {
    if (info.version) document.querySelectorAll('[data-version]').forEach(function (el) { el.textContent = T('version', info.version); });
    if (!info.count) return;
    var text = I.num(info.count);
    document.querySelectorAll('[data-count-text]').forEach(function (el) { el.textContent = T('hero.count', text); });
    document.querySelectorAll('[data-zip-count]').forEach(function (el) { el.textContent = T('get.zipCount', text); });
    document.querySelectorAll('[data-count-line]').forEach(function (el) { el.hidden = false; });
  }
  // API GitHub membatasi 60 permintaan per jam per alamat IP, jadi hasilnya disimpan 10 menit. Gagal = baris angkanya tidak tampil.
  var KEY = 'pulo.downloads';
  try {
    var saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
    if (saved && Date.now() - saved.at < 600000) { show(saved); return; }
  } catch (e) { /* penyimpanan bisa ditolak browser */ }
  fetch('https://api.github.com/repos/' + SITE.repo + '/releases?per_page=100')
    .then(function (r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function (releases) {
      var count = 0;
      releases.forEach(function (rel) { rel.assets.forEach(function (asset) { if (asset.name === 'Pulo.zip') count += asset.download_count; }); });
      var latest = releases.filter(function (rel) { return !rel.draft && !rel.prerelease; })[0];
      var info = { at: Date.now(), count: count, version: latest ? latest.tag_name.replace(/^v/, '') : '' };
      show(info);
      try { sessionStorage.setItem(KEY, JSON.stringify(info)); } catch (e) { /* lihat di atas */ }
    })
    .catch(function () { /* tanpa angka */ });
})();
