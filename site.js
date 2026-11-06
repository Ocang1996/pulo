// Satu-satunya tempat alamat rilis. Kosong = tombolnya tetap "Segera hadir". Angka unduhan hanya dari GitHub, tidak pernah dikarang.
(function () {
  'use strict';
  var SITE = {
    repo: 'Ocang1996/pulo',
    released: false,             // true setelah rilis pertama terunggah di GitHub
    store: '',                   // alamat halaman Microsoft Store
    saweria: 'https://saweria.co/CloVerX',
  };

  function link(host, text, href) {
    var box = document.querySelector(host);
    if (!box) return;
    box.innerHTML = '';
    var a = document.createElement('a');
    a.className = 'btn';
    a.href = href;
    a.textContent = text;
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

  if (SITE.store) link('[data-store]', 'Buka Store', SITE.store);
  if (SITE.saweria) link('[data-coffee]', 'Buka Saweria', SITE.saweria);
  if (!SITE.released) return;
  link('[data-zip]', 'Unduh Pulo.zip', 'https://github.com/' + SITE.repo + '/releases/latest/download/Pulo.zip');

  function show(info) {
    if (info.version) document.querySelectorAll('[data-version]').forEach(function (el) { el.textContent = 'Versi ' + info.version; });
    if (!info.count) return;
    var text = info.count.toLocaleString('id-ID');
    document.querySelectorAll('[data-count]').forEach(function (el) { el.textContent = text; });
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
      releases.forEach(function (rel) {
        rel.assets.forEach(function (asset) { if (asset.name === 'Pulo.zip') count += asset.download_count; });
      });
      var latest = releases.filter(function (rel) { return !rel.draft && !rel.prerelease; })[0];
      var info = { at: Date.now(), count: count, version: latest ? latest.tag_name.replace(/^v/, '') : '' };
      show(info);
      try { sessionStorage.setItem(KEY, JSON.stringify(info)); } catch (e) { /* lihat di atas */ }
    })
    .catch(function () { /* tanpa angka */ });
})();
