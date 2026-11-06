// Simulator Pulo. Semua di browser: tidak menyentuh komputer pengunjung. Baris lirik hanya penanda, bukan lirik asli.
(function () {
  'use strict';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, root) { return (root || document).querySelector(s); };
  var LW = 900, LH = 520;
  var stage = $('#stage'), box = $('#stageBox'), isl = $('#isl'), body = $('#islBody'), caption = $('#caption'), simDock = $('#simDock');

  var ICON = {
    music: 'M9 4.6V15a3.5 3.5 0 1 0 2 3.2V8.4l8-1.9v6.1a3.5 3.5 0 1 0 2 3.2V2z',
    home: 'M4 10.5 5 3.6c.1-.7.9-1 1.4-.6l3.2 2.7a5 5 0 0 1 4.8 0l3.2-2.7c.5-.4 1.3-.1 1.4.6l1 6.9V15a8 7 0 0 1-16 0z',
    timer: 'M9 2h6v2H9zm3 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 8.4-4 2-1-1.8 3-1.5V9h2z',
    shelf: 'M3 5h18v5H3zm2 6h14v9H5zm4 2v2h6v-2z',
    tasks: 'M4 5h4v4H4zm6 1h10v2H10zM4 11h4v4H4zm6 1h10v2H10zM4 17h4v4H4zm6 1h10v2H10z',
    system: 'M9 2h2v2h2V2h2v2h2a3 3 0 0 1 3 3v2h2v2h-2v2h2v2h-2v2a3 3 0 0 1-3 3h-2v2h-2v-2h-2v2H9v-2H7a3 3 0 0 1-3-3v-2H2v-2h2v-2H2V9h2V7a3 3 0 0 1 3-3h2Zm-1 6v8h8V8Z',
    control: 'M3 5h9v2H3zM16 5h5v2h-5zM14 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM3 17h11v2H3zM20 17h1v2h-1zM17 15a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z',
    agent: 'M12 11c-3 0-6 3.4-6 6.4 0 1.7 1.3 2.6 2.8 2.6 1.1 0 2-.6 3.2-.6s2.1.6 3.2.6c1.5 0 2.8-.9 2.8-2.6 0-3-3-6.4-6-6.4zM5 7.5a2 2.5 0 1 1 0 5 2 2.5 0 0 1 0-5zm14 0a2 2.5 0 1 1 0 5 2 2.5 0 0 1 0-5zM9 3a2 2.6 0 1 1 0 5.2A2 2.6 0 0 1 9 3zm6 0a2 2.6 0 1 1 0 5.2A2 2.6 0 0 1 15 3z',
    rates: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm1 4h-2v1.1A3 3 0 0 0 8.5 10c0 1.9 1.6 2.6 3.2 3 1.3.3 1.8.6 1.8 1.2s-.6 1-1.5 1c-1 0-1.6-.5-1.7-1.3H8.3c.1 1.6 1.2 2.7 2.7 3V18h2v-1.1a3 3 0 0 0 2.5-2.8c0-2-1.6-2.6-3.2-3-1.3-.3-1.8-.6-1.8-1.1s.5-1 1.4-1 1.4.5 1.5 1.1h2c-.1-1.4-1-2.6-2.4-2.9z',
    speaker: 'M3 9v6h4l5 4V5L7 9zM15 8a5 5 0 0 1 0 8z',
    prev: 'M20 6.2c0-1-1.1-1.6-2-1.1L8 10.9c-.8.5-.8 1.7 0 2.2l10 5.8c.9.5 2-.1 2-1.1zM4 5h3v14H4z',
    next: 'M4 6.2c0-1 1.1-1.6 2-1.1l10 5.8c.8.5.8 1.7 0 2.2L6 18.9c-.9.5-2-.1-2-1.1zM17 5h3v14h-3z',
    play: 'M7 4.5v15l12-7.5z',
    pause: 'M6 4h4v16H6zm8 0h4v16h-4z',
    mic: 'M12 2a3.5 3.5 0 0 0-3.5 3.5v6a3.5 3.5 0 0 0 7 0v-6A3.5 3.5 0 0 0 12 2zM6 11a6 6 0 0 0 5 5.9V21h2v-4.1A6 6 0 0 0 18 11h-2a4 4 0 0 1-8 0z',
    close: 'M6.4 5 12 10.6 17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6L6.4 19 5 17.6l5.6-5.6L5 6.4z',
    check: 'M9.5 16.2 5 11.7l-1.5 1.5 6 6L21 7.7l-1.5-1.5z',
    bolt: 'M13 2 5 14h6l-1 8 9-13h-6z',
  };
  function svg(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICON[name] + '"/></svg>'; }
  function nix(face, head) {
    var s = head / 200;
    return '<img class="nxs" src="assets/nix-' + face + '.png" alt="" style="width:' + 310 * s + 'px;height:' + 280 * s + 'px;margin:' + -40 * s + 'px ' + -40 * s + 'px"' + ' data-nix="1">';
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var TRACKS = [
    { t: 'Wonderwall', a: 'Oasis', src: 'YouTube', c: 'c0', a1: '#E8C25A', a2: '#3C5A9E', len: 258 },
    { t: "Don't Look Back in Anger", a: 'Oasis', src: 'Spotify', c: 'c1', a1: '#7CC2F2', a2: '#5A6FD0', len: 289 },
    { t: 'Champagne Supernova', a: 'Oasis', src: 'YouTube', c: 'c2', a1: '#F07AB0', a2: '#6A44C8', len: 451 },
  ];
  var s = {
    theme: 'hitam', kind: 'Blur', size: 'medium', pos: 'dock', autoHide: false, greet: true,
    open: false, page: 'music', pin: false, alert: null, face: 'neutral', pestered: 0,
    media: true, film: false, track: 0, playing: true, posn: 74, vol: 62, volOpen: false, karaoke: false, offset: 0,
    timer: null, focus: false, water: 3, widgetL: 'Sholat', widgetR: 'Cuaca',
    tasks: [{ t: 'Kirim laporan', w: 'besok 09.00', d: false }, { t: 'Telepon klien', w: 'hari ini 15.00', d: false }, { t: 'Beli kopi', w: 'selesai', d: true }],
    shelf: [{ n: 'laporan.pdf' }, { n: 'foto-pantai.jpg' }], shelfN: 0,
    cpu: 12, ram: 58, disk: 30, dust: 2.4, trash: [{ n: 'catatan-lama.txt' }, { n: 'gambar-uji.png' }],
    agent: false, agentStep: 3, cam: false, mic: false, masked: false, rates: false, fullscreen: false, wifi: true, bt: true,
    dock: false, iconSize: 32, hideTaskbar: false, tucked: false,
    wins: { web: 'open', notes: 'closed' }, front: 'web', max: false, bright: false,
  };
  var SIZES = { small: { w: 150, h: 34, cw: 380, cmp: 34, head: 26 }, medium: { w: 196, h: 44, cw: 420, cmp: 44, head: 30 }, large: { w: 224, h: 50, cw: 460, cmp: 50, head: 34 }, minimal: { w: 120, h: 18, cw: 380, cmp: 34, head: 26 } };
  var PAGES = [['music', 'Musik'], ['agent', 'Asisten'], ['home', 'Beranda'], ['timer', 'Timer'], ['shelf', 'Saku'], ['tasks', 'Tugas'], ['rates', 'Kurs'], ['system', 'Sistem'], ['control', 'Kontrol']];
  function pages() { return PAGES.filter(function (p) { return (p[0] !== 'music' || s.media) && (p[0] !== 'agent' || s.agent) && (p[0] !== 'rates' || s.rates); }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function mmss(v) { v = Math.max(0, Math.floor(v)); return Math.floor(v / 60) + ':' + pad(v % 60); }
  function clock() { var d = new Date(); return pad(d.getHours()) + '.' + pad(d.getMinutes()); }
  function greeting() { var h = new Date().getHours(); return h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam'; }
  function track() { return s.film ? { t: 'Film Contoh: Episode 5', a: 'situsfilm.id', src: 'situsfilm.id', c: 'c3', a1: '#6A1F2A', a2: '#2B2B33', len: 3720 } : TRACKS[s.track]; }

  // Tampilan pulau untuk keadaan sekarang: lebar, tinggi, isi.
  function eq() { return '<span class="eq' + (s.playing ? '' : ' stop') + '" style="color:' + track().a1 + '"><i></i><i></i><i></i><i></i></span>'; }
  function tabs() {
    return '<div class="tabs">' + pages().map(function (p) { return '<button type="button" data-act="page:' + p[0] + '" class="' + (s.page === p[0] ? 'on' : '') + '" aria-label="' + p[1] + '">' + svg(p[0] === 'music' ? 'music' : p[0]) + (s.page === p[0] ? p[1] : '') + '</button>'; }).join('') + '</div>';
  }
  function widget(name) {
    var scene = { Sholat: 'rgba(70,120,210,.45)', Cuaca: 'rgba(60,170,190,.45)', 'Minggu ini': 'rgba(190,80,90,.4)', Minum: 'rgba(50,140,190,.45)', 'Jam dunia': 'rgba(110,90,200,.45)', Hijriah: 'rgba(60,70,160,.5)', 'Hitung mundur': 'rgba(190,60,110,.4)' }[name];
    var t = '';
    if (name === 'Sholat') t = 'Sholat berikutnya<span class="big">Dzuhur</span><span class="mut">11.54 · Jakarta</span>';
    if (name === 'Cuaca') t = 'Cuaca<span class="big">29°</span><span class="mut">Cerah berawan</span>';
    if (name === 'Minggu ini') t = 'Minggu ini<span class="big">3 tugas</span><span class="mut">Hari ini: 1 selesai</span>';
    if (name === 'Minum') t = 'Minum<span class="big">' + s.water + ' / 8 gelas</span><span class="mut" data-act="water" style="cursor:pointer;text-decoration:underline">+1 gelas</span>';
    if (name === 'Jam dunia') t = 'Jam dunia<span class="big">' + clock() + '</span><span class="mut">Jakarta · Tokyo +2 j</span>';
    if (name === 'Hijriah') t = 'Hijriah<span class="big">Jumadil</span><span class="mut">Bulan sabit tampil digambar</span>';
    if (name === 'Hitung mundur') t = 'Hitung mundur<span class="big">12 hari</span><span class="mut">Liburan</span>';
    return '<button type="button" class="crd btnc" data-act="cyclew:' + name + '" style="background:linear-gradient(' + scene + ',rgba(255,255,255,.05))">' + t + '</button>';
  }
  function pageView() {
    var size = SIZES[s.size], w = size.cw, tr = track();
    if (s.page === 'music' && s.media) {
      if (s.karaoke) {
        var pct = 20 + (s.posn * 7) % 70;
        return { w: w, h: 118, html: '<div class="v pg" style="padding-top:10px">' + (s.playing ? '<div class="aur" style="--a1:' + tr.a1 + ';--a2:' + tr.a2 + '"></div>' : '') +
          '<div class="rw" style="position:relative;flex:1"><div style="width:60px;display:grid;justify-items:center;gap:6px;flex:none">' + nix(s.playing ? 'happy' : 'neutral', 38) + '<div class="rw" style="gap:4px"><button type="button" class="ch" style="padding:0 7px" data-act="off:-1" aria-label="Lirik lebih lambat">−</button><span data-act="off:0" style="cursor:pointer;font-size:11px;width:30px;text-align:center" title="Kembali ke nol">' + (s.offset > 0 ? '+' : '') + s.offset.toString().replace('.', ',') + '</span><button type="button" class="ch" style="padding:0 7px" data-act="off:1" aria-label="Lirik lebih cepat">+</button></div></div>' +
          '<div class="lines" style="flex:1;min-width:0"><span>♪ baris sebelumnya</span><b class="lineb" style="--f:' + pct + '%">♪ baris yang sedang dinyanyikan ♪</b><span>♪ baris berikutnya</span></div>' +
          '<div style="display:grid;gap:4px"><button type="button" class="ib" data-act="karaoke" aria-label="Tutup karaoke">' + svg('close') + '</button><button type="button" class="ib" data-act="play" aria-label="Putar atau jeda">' + svg(s.playing ? 'pause' : 'play') + '</button></div></div></div>' };
      }
      var barsHtml = '';
      if (s.volOpen) {
        for (var b = 0; b < 26; b++) barsHtml += '<i data-act="vol:' + Math.round((b + 1) / 26 * 100) + '" class="' + (b / 26 < s.vol / 100 ? 'on' : '') + '" style="height:' + (4 + b * .7) + 'px"></i>';
      }
      return { w: w, h: 142, html: '<div class="v pg" style="--a1:' + tr.a1 + ';--a2:' + tr.a2 + '">' + (s.playing ? '<div class="aur"></div>' : '') +
        '<div class="rw pgb" data-act="open-source" style="cursor:pointer;position:relative"><span class="cov ' + tr.c + '" style="width:36px;height:36px;border-radius:9px"></span><div style="min-width:0;flex:1"><div class="ttl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(tr.t) + '</div><div class="mut">' + esc(s.film ? tr.src : tr.a + ' · ' + tr.src) + '</div></div>' + eq() + '</div>' +
        '<div class="rw" style="margin-top:7px;position:relative"><span class="mut" data-b="pos" style="width:32px">' + mmss(s.posn) + '</span><div class="prog" data-act="seek"><i data-b="bar" style="width:' + s.posn / tr.len * 100 + '%"></i></div><span class="mut" data-b="rem" style="width:38px;text-align:right">-' + mmss(tr.len - s.posn) + '</span></div>' +
        (s.volOpen
          ? '<div class="ctls" style="gap:8px"><button type="button" class="ib" data-act="volopen" aria-label="Tutup volume">' + svg('speaker') + '</button><div class="bars" style="--a1:' + tr.a1 + '">' + barsHtml + '</div><span style="width:24px;text-align:right">' + s.vol + '</span></div>'
          : '<div class="ctls"><button type="button" class="ib" data-act="volopen" aria-label="Volume">' + svg('speaker') + '</button><button type="button" class="ib" data-act="prev" aria-label="Sebelumnya">' + svg('prev') + '</button><button type="button" class="ib disc" data-act="play" aria-label="Putar atau jeda">' + svg(s.playing ? 'pause' : 'play') + '</button><button type="button" class="ib" data-act="next" aria-label="Berikutnya">' + svg('next') + '</button><button type="button" class="ib" data-act="karaoke" aria-label="Lirik">' + svg('mic') + '</button></div>') +
        '<div style="flex:1"></div>' + tabs() + '</div>' };
    }
    if (s.page === 'home') return { w: w, h: 172, html: '<div class="v pg"><div class="rw">' + nix('happy', 18) + '<span class="ttl">' + greeting() + '</span><span class="r mut">' + clock() + '</span></div><div class="two">' + widget(s.widgetL) + widget(s.widgetR) + '</div><div style="flex:1"></div>' + tabs() + '</div>' };
    if (s.page === 'timer') {
      if (s.timer) {
        var left = s.timer.left / s.timer.total;
        return { w: w, h: 128, html: '<div class="v pg" style="background:linear-gradient(transparent ' + (100 - left * 100) + '%, rgba(90,110,220,.45) ' + (100 - left * 100) + '%)"><div class="rw" style="flex:1">' + nix(left < .12 ? 'sweat' : 'happy', 36) + '<div><div class="ttl">' + s.timer.name + '</div><span class="big" data-b="timer">' + mmss(s.timer.left) + '</span></div><button type="button" class="ch r danger" data-act="timerstop">Hentikan</button></div>' + tabs() + '</div>' };
      }
      return { w: w, h: 128, html: '<div class="v pg"><div class="ttl" style="text-align:center">Mulai timer</div><div class="chiprow">' + [5, 15, 25, 45].map(function (m) { return '<button type="button" class="ch" data-act="timer:' + m + '">' + m + ' menit</button>'; }).join('') + '<button type="button" class="ch" data-act="pomo">Pomodoro 25 / 5</button></div><div style="flex:1"></div>' + tabs() + '</div>' };
    }
    if (s.page === 'shelf') return { w: w, h: 148, html: '<div class="v pg"><div class="rw"><span class="ttl">Saku NIX</span><span class="mut">' + s.shelf.length + ' item</span><button type="button" class="ch r" data-act="shelfadd">Seret file ke sini (contoh)</button></div><div class="shelf">' + s.shelf.slice(-4).map(function (it, i) { return '<div class="crd">' + esc(it.n) + '<button type="button" data-act="shelfdel:' + it.n + '">hapus</button></div>'; }).join('') + '</div><div style="flex:1"></div>' + tabs() + '</div>' };
    if (s.page === 'tasks') {
      var open = s.tasks.filter(function (t) { return !t.d; }).length;
      return { w: w, h: 168, html: '<div class="v pg"><div class="rw"><span class="ttl">Tugas</span><span class="mut">' + (s.tasks.length - open) + '/' + s.tasks.length + '</span></div><input class="ipt" id="taskIn" style="margin-top:6px" placeholder="Ketik: kirim laporan besok jam 9, lalu Enter" aria-label="Tugas baru"><div style="margin-top:5px;overflow:hidden">' + s.tasks.slice(-2).map(function (t) { var i = s.tasks.indexOf(t); return '<div class="tk ' + (t.d ? 'done' : '') + '"><button type="button" data-act="task:' + i + '" aria-label="Selesai"></button><span>' + esc(t.t) + '</span><span class="mut r">' + esc(t.w) + '</span></div>'; }).join('') + '</div><div style="flex:1"></div>' + tabs() + '</div>' };
    }
    if (s.page === 'rates') return { w: w, h: 132, html: '<div class="v pg"><div class="rw"><span class="ttl">USD ke IDR</span><span class="r" style="color:#30D158">▲ 0,4%</span></div><span class="big">Rp16.240</span><span class="mut">Kurs contoh, diperbarui sekali sehari bila Anda menyalakannya</span><div style="flex:1"></div>' + tabs() + '</div>' };
    if (s.page === 'system') return { w: w, h: 166, html: '<div class="v pg"><div class="rw"><span class="ttl">Sistem</span><span class="mut r">Menyala 4 j 12 m</span></div><div class="three"><div class="crd">CPU <b class="r" data-b="cpu">' + s.cpu + '%</b><div class="meter"><i data-b="cpum" style="width:' + s.cpu + '%"></i></div></div><div class="crd">RAM <b>' + s.ram + '%</b><div class="meter"><i style="width:' + s.ram + '%"></i></div></div><div class="crd">Disk <b>' + s.disk + '%</b><div class="meter"><i style="width:' + s.disk + '%"></i></div></div></div><div class="chiprow"><button type="button" class="ch" data-act="clean">Bersihkan ' + (s.dust > 0 ? s.dust.toString().replace('.', ',') + ' GB' : '(bersih)') + '</button><button type="button" class="ch" data-act="trash">Recycle Bin (' + s.trash.length + ')</button></div><div style="flex:1"></div>' + tabs() + '</div>' };
    if (s.page === 'control') {
      var bottom = s.volOpen
        ? '<div class="bars" style="flex:1;justify-content:center">' + Array.apply(null, Array(30)).map(function (_, b) { return '<i data-act="vol:' + Math.round((b + 1) / 30 * 100) + '" class="' + (b / 30 < s.vol / 100 ? 'on' : '') + '" style="height:' + (4 + b * .6) + 'px"></i>'; }).join('') + '</div><span>' + s.vol + '</span>'
        : ['Kunci', 'Tidur', 'Ulang', 'Matikan'].map(function (n) { return '<button type="button" class="ch" style="flex:1" data-act="power:' + n + '">' + n + '</button>'; }).join('');
      return { w: w, h: 156, html: '<div class="v pg"><div class="rw"><span class="ttl">Kontrol</span><span class="mut r">Mengisi daya</span></div><div class="three"><button type="button" class="crd btnc" data-act="setting:Wi-Fi"><b>Wi-Fi ›</b><div class="mut">Nyala</div></button><button type="button" class="crd btnc" data-act="setting:Bluetooth"><b>Bluetooth ›</b><div class="mut">Nyala</div></button><button type="button" class="crd btnc" data-act="setting:Baterai"><b>Baterai ›</b><div class="mut">91%</div></button></div><div class="rw" style="margin-top:8px;gap:5px"><button type="button" class="ib" data-act="volopen" aria-label="Volume" style="flex:none;background:rgba(255,255,255,.12)">' + svg('speaker') + '</button>' + bottom + '</div><div style="flex:1"></div>' + tabs() + '</div>' };
    }
    if (s.page === 'agent') return { w: w, h: 138, html: '<div class="v pg"><div class="rw">' + nix('side', 22) + '<span class="ttl">Claude bekerja · proyek</span><span class="r mut">' + s.agentStep + '/5</span></div><div class="rw" style="margin-top:8px;gap:3px">' + [1, 2, 3, 4, 5].map(function (i) { return '<span style="opacity:' + (i <= s.agentStep ? 1 : .3) + ';width:16px;display:inline-grid">' + '<svg viewBox="0 0 24 24" fill="#FF9F6B"><path d="' + ICON.agent + '"/></svg></span>'; }).join('') + '</div><div class="mut" style="margin-top:6px">Mengedit berkas tampilan</div><div style="flex:1"></div>' + tabs() + '</div>' };
    s.page = 'home';
    return pageView();
  }
  function compactView() {
    var size = SIZES[s.size];
    if (s.timer && s.timer.left > 0 && s.size !== 'minimal') return { w: 250, h: size.cmp, html: '<div class="v cmp"><b>' + s.timer.name + '</b><span class="r" style="color:#FF9F6B;font-weight:600" data-b="timer">' + mmss(s.timer.left) + '</span></div>' };
    if (s.agent && s.size !== 'minimal') return { w: 300, h: size.cmp, html: '<div class="v cmp">' + nix('side', size.head - 4) + '<b>Claude bekerja</b><span class="r mut">' + s.agentStep + '/5</span></div>' };
    if (s.size === 'minimal') return { w: 120, h: 18, html: '<div class="v cmp" style="padding:0 8px;font-size:11px;justify-content:space-between"><span style="width:14px;height:8px;border:1px solid #fff;border-radius:2px;display:inline-block;position:relative"><i style="position:absolute;inset:1px 3px 1px 1px;background:#30D158"></i></span><b>' + clock() + '</b>' + (s.media && s.playing ? eq().replace('margin-left:auto', '') : '<span class="mut" style="width:10px;height:10px;display:inline-block"><svg viewBox="0 0 24 24" fill="#fff"><path d="' + ICON.speaker + '"/></svg></span>') + '</div>' };
    if (s.media && (s.playing || s.film)) { var tr = track(); return { w: 300, h: size.cmp, html: '<div class="v cmp" style="--a1:' + tr.a1 + ';--a2:' + tr.a2 + '">' + (s.playing ? '<div class="aur" style="height:40px;bottom:-22px"></div>' : '') + '<span class="cov ' + tr.c + '" style="position:relative"></span><b style="position:relative">' + esc(tr.t) + '</b>' + eq() + '</div>' }; }
    return { w: size.w, h: size.h, html: '<div class="v cmp" style="justify-content:center;padding:0">' + nix(s.focus ? 'sleep' : s.face, size.head) + '</div>' };
  }

  function draw() {
    var v = s.alert ? s.alert : s.open ? pageView() : compactView();
    isl.style.width = v.w + 'px';
    isl.style.height = v.h + 'px';
    isl.className = (s.theme === 'glass' ? 'g ' + s.kind + ' ' : '') + s.size + ' ' + (s.pos === 'float' ? 'float' : 'dock') + (shouldTuck() ? ' tuck' : '');
    stage.classList.toggle('g', s.theme === 'glass');
    stage.classList.toggle('bright', s.bright);
    var input = $('#taskIn');
    var keep = input && document.activeElement === input ? input.value : null;
    var indic = (s.cam ? '<i class="dotcam"></i>' : '') + (s.mic ? '<i class="dotmic"></i>' : '');
    body.innerHTML = v.html + indic;
    if (keep !== null && $('#taskIn')) { $('#taskIn').value = keep; $('#taskIn').focus(); }
  }
  function shouldTuck() { return (s.autoHide && !s.open && !s.alert && !(s.media && s.playing) && !s.timer && !s.agent) || (s.fullscreen && !s.film && !s.open && !s.alert); }
  function say(text) { caption.textContent = text; }
  var alertTimer = 0;
  function showAlert(view, ms) {
    s.alert = view;
    clearTimeout(alertTimer);
    if (ms) alertTimer = setTimeout(function () { s.alert = null; draw(); }, ms);
    draw();
  }
  function openPage(p) { s.alert = null; s.open = true; s.pin = true; if (p) s.page = p; draw(); }
  function closeIsland() { s.open = false; s.pin = false; s.karaoke = false; s.volOpen = false; draw(); }

  // Tampilan sesaat.
  function indicator(left, mid) { return { w: 170, h: 26, html: '<div class="v cmp" style="padding:0 10px;font-size:12px;gap:7px">' + left + mid + '</div>' }; }
  function volBars(level, color) {
    var h = '';
    for (var i = 0; i < 16; i++) h += '<i class="' + (i / 16 < level ? 'on' : '') + '" style="height:' + (3 + i * .7) + 'px;--a1:' + color + '"></i>';
    return '<span class="bars" style="height:16px;--a1:' + color + '">' + h + '</span>';
  }
  function eyesView() {
    return { w: SIZES[s.size].cw, h: 94, html: '<div class="v" style="background:linear-gradient(#27386E,#F09A62);align-items:center;gap:12px;padding:0 16px;overflow:hidden"><svg viewBox="0 0 400 70" preserveAspectRatio="none" style="position:absolute;left:0;right:0;bottom:0;width:100%;height:56px"><path fill="#7A5E8E" d="M0 70V34c40-12 70-4 110-9 60-9 100 9 150 1 60-10 100 4 140-4v48z"/><path fill="#20224E" d="M0 70V52c40-12 90-8 140 6 60 12 160 4 260-4v16z"/></svg><span style="position:relative">' + nix('side', 42) + '</span><div style="position:relative;flex:1"><div class="ttl" style="font-size:15px">Istirahat mata</div><div style="font-size:12px">Lihat sejauh 6 meter selama 20 detik</div></div><b style="position:relative;width:40px;height:40px;border-radius:50%;box-shadow:inset 0 0 0 3px #fff;display:grid;place-items:center;font-size:15px" data-b="eyes">' + s.eyes + '</b></div>' };
  }
  function stretchView() {
    var cues = ['Berdiri dari kursi', 'Angkat tangan, tarik napas', 'Putar bahu pelan-pelan'];
    return { w: SIZES[s.size].cw, h: 94, html: '<div class="v" style="background:linear-gradient(#145C5A,#0B242C);align-items:center;gap:12px;padding:0 16px"><span class="fx-pop" style="display:block;transform:scale(1,' + (s.cue === 1 ? 1.16 : 1) + ');transform-origin:50% 100%;transition:transform .8s">' + nix(s.cue === 1 ? 'closed' : 'neutral', 42) + '</span><div style="flex:1"><div class="ttl" style="font-size:15px">Saatnya peregangan</div><div style="font-size:12px">' + cues[s.cue] + '</div><div style="margin-top:5px;display:flex;gap:4px">' + cues.map(function (_, i) { return '<i style="width:5px;height:5px;border-radius:50%;background:' + (i <= s.cue ? '#fff' : 'rgba(255,255,255,.3)') + '"></i>'; }).join('') + '</div></div><button type="button" class="ib disc" data-act="stretchdone" aria-label="Selesai">' + svg('check') + '</button></div>' };
  }
  function runCycle(seconds, step, done) {
    var n = 0;
    clearInterval(runCycle.t);
    runCycle.t = setInterval(function () { n++; if (n >= seconds) { clearInterval(runCycle.t); done(); return; } step(n); }, 1000);
  }

  // Tombol di dalam pulau.
  var ACT = {
    'play': function () { s.playing = !s.playing; say(s.playing ? 'Lagu diputar: aurora warna sampul menyala di bawah pemutar.' : 'Dijeda: aurora mati, dan pulau kembali diam kalau sembunyi otomatis menyala.'); },
    'next': function () { s.track = (s.track + 1) % TRACKS.length; s.posn = 0; s.film = false; s.playing = true; say('Lagu berganti ke ' + TRACKS[s.track].t + '. Warna aurora ikut sampulnya.'); },
    'prev': function () { s.track = (s.track + TRACKS.length - 1) % TRACKS.length; s.posn = 0; s.film = false; s.playing = true; say('Kembali ke ' + TRACKS[s.track].t + '.'); },
    'volopen': function () { s.volOpen = !s.volOpen; say('Klik ikon suara memunculkan slider di tempat yang sama. Klik batangnya untuk mengubah volume.'); },
    'karaoke': function () { s.karaoke = !s.karaoke; s.page = 'music'; say(s.karaoke ? 'Karaoke Panggung NIX. Baris yang dinyanyikan terisi dari kiri. Tombol − dan + menggeser waktu lirik, diingat per lagu. (Baris di sini hanya penanda.)' : 'Kembali ke pemutar.'); },
    'seek': function () { s.posn = Math.min(track().len - 5, s.posn + 30); },
    'open-source': function () { say('Klik judul membawa Anda kembali ke tab atau aplikasi sumbernya.'); },
    'water': function () { s.water = Math.min(8, s.water + 1); say('Satu gelas tercatat. Airnya naik di widget Minum.'); },
    'pomo': function () { startTimer(25, 'Pomodoro'); s.focus = true; say('Pomodoro 25/5 berjalan dan mode fokus menyala: notifikasi ditahan dulu. Klik di luar pulau, lalu lihat NIX.'); },
    'timerstop': function () { s.timer = null; s.focus = false; say('Timer dihentikan.'); },
    'shelfadd': function () { s.shelfN++; s.shelf.push({ n: ['ringkasan.docx', 'tautan-rapat', 'screenshot.png', 'data.xlsx'][s.shelfN % 4] }); say('Item masuk Saku NIX. Di aplikasi, Anda menyeret file, teks, tautan, atau gambar ke pulau.'); },
    'clean': function () { if (s.dust > 0) { var was = s.dust; s.dust = 0; s.disk = 28; say('Pembersih: NIX menyedot ' + String(was).replace('.', ',') + ' GB file sementara dan cache yang aman dihapus. Di simulator ini hanya contoh; tidak ada file Anda yang disentuh.'); } else say('Sudah bersih.'); },
    'trash': function () { if (s.trash.length) { var it = s.trash.pop(); say('Recycle Bin: "' + it.n + '" dikembalikan ke folder asalnya. Di aplikasi Anda juga bisa menghapus per file atau mengosongkan semuanya.'); } else say('Recycle Bin kosong.'); },
    'stretchdone': function () { clearInterval(runCycle.t); s.alert = null; say('Selesai. NIX menandainya, dan pengingat berikutnya datang sejam lagi.'); },
    'callok': function () { s.alert = null; say('Dijawab: jendela panggilan WhatsApp muncul. Pulo menekan tombol aslinya.'); },
    'callno': function () { s.alert = null; say('Ditolak dari pulau, tanpa membuka WhatsApp.'); },
    'allow': function () { s.alert = null; s.agentStep = Math.min(5, s.agentStep + 1); say('Diizinkan. Jawabannya langsung dikirim ke Claude Code.'); },
    'deny': function () { s.alert = null; say('Ditolak. Claude Code menerima jawabannya.'); },
  };
  function startTimer(minutes, name) { s.timer = { left: minutes * 60, total: minutes * 60, name: name }; s.page = 'timer'; }

  stage.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (el && isl.contains(el)) {
      e.stopPropagation();
      var a = el.dataset.act, i = a.indexOf(':'), key = i < 0 ? a : a.slice(0, i), val = i < 0 ? '' : a.slice(i + 1);
      if (key === 'page') { s.page = val; s.volOpen = false; s.karaoke = false; }
      else if (key === 'vol') { s.vol = +val; }
      else if (key === 'off') { s.offset = val === '0' ? 0 : Math.max(-20, Math.min(20, s.offset + (+val) * .25)); say('Lirik digeser ' + String(s.offset).replace('.', ',') + ' detik untuk lagu ini.'); }
      else if (key === 'timer') { startTimer(+val, 'Timer'); say('Timer ' + val + ' menit berjalan. Air di kolam NIX surut mengikuti sisa waktu.'); }
      else if (key === 'cyclew') { var list = ['Sholat', 'Cuaca', 'Minggu ini', 'Minum', 'Jam dunia', 'Hijriah', 'Hitung mundur']; var other = val === s.widgetL ? s.widgetR : s.widgetL; var nextName = list[(list.indexOf(val) + 1) % list.length]; if (nextName === other) nextName = list[(list.indexOf(nextName) + 1) % list.length]; if (val === s.widgetL) s.widgetL = nextName; else s.widgetR = nextName; say('Widget diganti: ' + nextName + '. Klik lagi untuk widget berikutnya.'); }
      else if (key === 'task') { s.tasks[+val].d = !s.tasks[+val].d; say(s.tasks[+val].d ? 'Tugas selesai. NIX mencapnya dengan telapak kakinya.' : 'Tugas dibuka lagi.'); }
      else if (key === 'shelfdel') { s.shelf = s.shelf.filter(function (it) { return it.n !== val; }); }
      else if (key === 'setting') { say(val + ': klik kotak ini di aplikasi membuka halaman pengaturan Windows-nya.'); }
      else if (key === 'power') { say(val + ': di aplikasi ' + (val === 'Ulang' || val === 'Matikan' ? 'butuh dua klik supaya tidak salah tekan.' : 'langsung berjalan.') + ' Di simulator tidak terjadi apa-apa.'); }
      else if (ACT[key]) ACT[key]();
      draw();
      return;
    }
    if (el) return;
    if (isl.contains(e.target)) {
      // Klik NIX saat pulau diam: makin diganggu makin kesal.
      if (e.target.dataset.nix && !s.open && !s.alert) { pester(); return; }
      if (s.open) return;
      if (s.alert) { s.alert = null; draw(); return; }
      s.open = true; s.page = s.media ? 'music' : 'home'; draw();
      return;
    }
    if (s.open) closeIsland();
  });
  var pesterTimer = 0;
  function pester() {
    var seq = ['surprised', 'sweat', 'sad', 'angry', 'angry', 'dizzy'];
    s.face = seq[Math.min(s.pestered++, seq.length - 1)];
    say('Mode ganggu: klik NIX berulang kali. Ia terkejut, berkeringat, sebal, lalu marah. Berhenti mengganggu, dan ia tenang lagi.');
    draw();
    clearTimeout(pesterTimer);
    pesterTimer = setTimeout(function () { s.pestered = 0; s.face = 'neutral'; draw(); }, 2500);
  }

  // Buka karena kursor, tutup saat kursor pergi, seperti aplikasinya.
  var hover = 0;
  isl.addEventListener('mouseenter', function () { clearTimeout(hover); if (!s.open && !s.alert) hover = setTimeout(function () { if (!isIdleNix()) { s.open = true; s.page = s.media ? 'music' : s.page === 'music' ? 'home' : s.page; draw(); } }, 170); });
  isl.addEventListener('mouseleave', function () { clearTimeout(hover); if (s.pin) return; hover = setTimeout(function () { if (s.open && !s.karaoke && document.activeElement !== $('#taskIn')) closeIsland(); }, 650); });
  function isIdleNix() { return isl.matches(':hover') && lastTarget && lastTarget.dataset && lastTarget.dataset.nix; }
  var lastTarget = null;
  isl.addEventListener('mousemove', function (e) { lastTarget = e.target; });
  body.addEventListener('keydown', function (e) {
    if (e.target.id !== 'taskIn' || e.key !== 'Enter' || !e.target.value.trim()) return;
    var text = e.target.value.trim(), w = /besok/i.test(text) ? 'besok' : 'hari ini', m = text.match(/jam\s*(\d{1,2})/i);
    if (m) w += ' ' + pad(+m[1]) + '.00';
    s.tasks.push({ t: text.replace(/\s*(besok|hari ini)?\s*jam\s*\d{1,2}.*$/i, '').replace(/\s*besok\s*$/i, '') || text, w: w, d: false });
    e.target.value = '';
    say('Tugas masuk, waktunya terbaca dari kalimat Anda: ' + w + '. Saat jatuh tempo, pulau mengetuk.');
    draw();
  });

  // Jendela contoh.
  var WINDOWS = {
    web: { title: 'Browser', x: 120, y: 90, w: 500, h: 290, html: '<h4>Halaman contoh</h4><i style="width:90%"></i><i style="width:96%"></i><i style="width:70%"></i><i style="width:82%"></i>' },
    notes: { title: 'Catatan', x: 330, y: 150, w: 420, h: 230, html: '<h4>Catatan</h4><i style="width:60%"></i><i style="width:88%"></i><i style="width:74%"></i>' },
  };
  function drawWindows() {
    var host = $('#winHost');
    host.innerHTML = '';
    Object.keys(WINDOWS).forEach(function (id) {
      if (s.wins[id] !== 'open') return;
      host.appendChild(buildWindow(id));
    });
    if (s.fullscreen) {
      var f = document.createElement('div');
      f.className = 'win film max';
      f.style.cssText = 'left:0;top:0;width:' + LW + 'px;height:' + LH + 'px;z-index:15';
      f.innerHTML = '<div style="text-align:center"><div style="font:700 26px var(--display)">Film contoh, layar penuh</div><button type="button" class="ch" id="exitFull" style="margin-top:10px">Keluar dari layar penuh</button></div>';
      host.appendChild(f);
      f.querySelector('#exitFull').onclick = function () { s.fullscreen = false; drawWindows(); draw(); say('Kembali dari layar penuh.'); };
    }
    drawDock();
  }
  function buildWindow(id) {
    var w = WINDOWS[id], el = document.createElement('div'), max = s.max && id === s.front;
    el.className = 'win' + (max ? ' max' : '');
    el.dataset.win = id;
    var box = winBox(id);
    el.style.cssText = 'left:' + box.x + 'px;top:' + box.y + 'px;width:' + box.w + 'px;height:' + box.h + 'px;z-index:' + (id === s.front ? 6 : 5);
    el.innerHTML = '<div class="wt"><b>' + w.title + '</b><div><span data-w="min" title="Perkecil">–</span><span data-w="max" title="Maksimalkan">▢</span><span data-w="close" title="Tutup">×</span></div></div><div class="wb">' + w.html + '</div>';
    el.addEventListener('mousedown', function () { if (s.front !== id) { s.front = id; drawWindows(); } });
    el.querySelector('[data-w=min]').onclick = function () { genie(id, false); say('Diperkecil dari tombol jendelanya sendiri: Genie tetap jalan menuju ikonnya.'); };
    el.querySelector('[data-w=max]').onclick = function () { s.max = !s.max; s.front = id; drawWindows(); updateTuck(); };
    el.querySelector('[data-w=close]').onclick = function () { s.wins[id] = 'closed'; drawWindows(); };
    return el;
  }
  function winBox(id) { var w = WINDOWS[id]; if (s.max && id === s.front) return { x: 0, y: 0, w: LW, h: s.hideTaskbar ? LH : LH - 34 }; return { x: w.x, y: w.y, w: w.w, h: w.h }; }

  // Dock: rumus sama dengan aplikasinya.
  var DOCK = [
    { id: 'start', name: 'Mulai', bg: 'none', sym: '<svg viewBox="0 0 24 24" fill="#4FB6F5" style="width:68%"><path d="M3 3h8.4v8.4H3zm9.6 0H21v8.4h-8.4zM3 12.6h8.4V21H3zm9.6 0H21V21h-8.4z"/></svg>' },
    { id: 'web', name: 'Browser', bg: 'linear-gradient(#59C2FF,#1466C9)', sym: '<svg viewBox="0 0 24 24" fill="#fff" style="width:60%"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 6.9 4H12a4 4 0 0 0-3.7 2.4L5.5 6.5A8 8 0 0 1 12 4z"/></svg>' },
    { id: 'notes', name: 'Catatan', bg: 'linear-gradient(#FFD45C,#C78F14)', sym: '<svg viewBox="0 0 24 24" fill="#231A05" style="width:56%"><path d="M5 3h14v18H5zm3 4v2h8V7zm0 4v2h8v-2zm0 4v2h5v-2z"/></svg>' },
    { id: 'music', name: 'Musik', bg: 'linear-gradient(#FF5C7A,#B4264B)', sym: '<svg viewBox="0 0 24 24" fill="#fff" style="width:58%"><path d="' + ICON.music + '"/></svg>' },
    { id: 'pulo', name: 'Pulo', bg: 'linear-gradient(#34373E,#0D0F13)', sym: '<img src="assets/nix-happy.png" alt="" style="width:92%">' },
  ];
  var dockScale = DOCK.map(function () { return 1; }), dockPointer = null, dockFrame = 0;
  function drawDock() {
    simDock.classList.toggle('off', !s.dock);
    var size = s.iconSize, slot = size + 4;
    simDock.style.height = size + 18 + 'px';
    simDock.style.borderRadius = Math.round((size + 18) * .36) + 'px';
    simDock.innerHTML = DOCK.map(function (d) {
      var running = (d.id === 'web' || d.id === 'notes') ? s.wins[d.id] !== 'closed' : d.id === 'music' ? s.media : d.id === 'pulo';
      return '<button type="button" data-d="' + d.id + '" class="' + (running ? 'run' : '') + '" style="width:' + slot + 'px;height:' + slot + 'px" aria-label="' + d.name + '"><span style="background:' + d.bg + '">' + d.sym + '</span><span class="nm">' + d.name + '</span></button>';
    }).join('');
    simDock.style.bottom = (s.tucked ? -(size + 26) : s.hideTaskbar ? 6 : 40) + 'px';
    $('#taskbar').style.display = s.hideTaskbar ? 'none' : 'flex';
  }
  function stepDock() {
    dockFrame = 0;
    var buttons = simDock.querySelectorAll('button[data-d]'), moving = false, size = s.iconSize, slot = size + 4 + 3, reach = (size + 4) * 2.6, grow = .62;
    var left = simDock.offsetLeft - simDock.offsetWidth / 2 + 7;
    var total = 0, xs = [];
    buttons.forEach(function (b, i) {
      var target = 1;
      if (dockPointer !== null && !reduced) { var c = left + i * slot + (size + 4) / 2; var t = Math.max(0, 1 - Math.abs(c - dockPointer) / reach); target = 1 + grow * Math.sin(t * Math.PI / 2); }
      dockScale[i] += (target - dockScale[i]) * .32;
      if (Math.abs(target - dockScale[i]) > .004) moving = true; else dockScale[i] = target;
      total += slot * dockScale[i];
    });
    var base = buttons.length * slot, x = (base - total) / 2;
    buttons.forEach(function (b, i) {
      var scaled = slot * dockScale[i];
      b.style.transform = 'translateX(' + (x + scaled / 2 - (i * slot + slot / 2)).toFixed(2) + 'px) scale(' + dockScale[i].toFixed(3) + ')';
      x += scaled;
    });
    if (moving) dockFrame = requestAnimationFrame(stepDock);
  }
  function logicalX(e) { var r = stage.getBoundingClientRect(); return (e.clientX - r.left) * LW / r.width; }
  simDock.addEventListener('mousemove', function (e) { dockPointer = logicalX(e); if (!dockFrame) dockFrame = requestAnimationFrame(stepDock); });
  simDock.addEventListener('mouseleave', function () { dockPointer = null; if (!dockFrame) dockFrame = requestAnimationFrame(stepDock); setTimeout(updateTuck, 400); });
  $('#dockEdge').addEventListener('mouseenter', function () { if (s.tucked) { s.tucked = false; drawDock(); say('Kursor menyentuh tepi bawah layar: dock naik lagi.'); } });
  simDock.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-d]');
    if (!b) return;
    var id = b.dataset.d;
    if (id === 'start') { say('Membuka menu Start Windows, seperti tombol aslinya.'); return; }
    if (id === 'pulo') { say('Membuka Pengaturan Pulo.'); return; }
    if (id === 'music') { s.media = true; s.playing = true; s.film = false; openPage('music'); say('Aplikasi musik dibuka, dan pulaunya langsung menjadi pemutar.'); return; }
    bounce(b);
    if (s.wins[id] === 'closed') { s.wins[id] = 'min'; s.front = id; genie(id, true); say('Aplikasi tertutup: ikon memantul dan jendelanya keluar dari ikon.'); return; }
    if (s.wins[id] === 'min') { s.front = id; genie(id, true); say('Efek Genie: jendela keluar lagi dari ikonnya.'); return; }
    if (s.front !== id) { s.front = id; drawWindows(); say('Jendela dibawa ke depan.'); return; }
    genie(id, false);
    say('Efek Genie: jendela di depan tersedot ke ikonnya.');
  });
  function bounce(b) {
    if (reduced || !b.animate) return;
    var el = b.querySelector('span');
    el.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-60%)', offset: .25 }, { transform: 'translateY(0)', offset: .5 }, { transform: 'translateY(-26%)', offset: .72 }, { transform: 'translateY(0)' }], { duration: 760, easing: 'ease-in-out' });
  }
  function updateTuck() {
    var should = s.dock && s.hideTaskbar && s.max && s.wins[s.front] === 'open' && dockPointer === null;
    if (should !== s.tucked) { s.tucked = should; drawDock(); }
  }

  // Genie: pita miring menuju ikon, sama seperti GenieWindow di aplikasi.
  var genieBusy = false;
  function smooth(x) { return x * x * (3 - 2 * x); }
  function genie(id, opening) {
    if (genieBusy) return;
    var dockBtn = simDock.querySelector('[data-d=' + id + ']');
    var box = winBox(id);
    var iconX, iconY, iconW;
    if (s.dock && dockBtn) {
      var r = stage.getBoundingClientRect(), b = dockBtn.getBoundingClientRect(), k = LW / r.width;
      iconX = (b.left - r.left + b.width / 2) * k; iconY = (b.top - r.top + b.height / 2) * k; iconW = b.width * k;
      if (s.tucked) { s.tucked = false; drawDock(); iconY = LH - s.iconSize; }
    } else { iconX = LW / 2 + (id === 'web' ? -24 : 24); iconY = LH - 17; iconW = 22; }
    if (reduced) { s.wins[id] = opening ? 'open' : 'min'; drawWindows(); updateTuck(); return; }
    if (s.effect === 'standard') { standardFx(id, opening, box, iconX, iconY); return; }
    genieBusy = true;
    var source = buildWindow(id);
    var rows = Math.round(Math.min(150, box.h / 2.4)), rowH = box.h / rows, strips = [];
    var host = $('#winHost');
    for (var i = 0; i < rows; i++) {
      var strip = document.createElement('div');
      strip.className = 'strip';
      strip.style.width = box.w + 'px';
      strip.style.height = (rowH + 1) + 'px';
      var copy = source.cloneNode(true);
      copy.style.left = '0'; copy.style.top = -i * rowH + 'px'; copy.style.boxShadow = 'none';
      strip.appendChild(copy);
      host.appendChild(strip);
      strips.push(strip);
    }
    s.wins[id] = 'min';
    var live = host.querySelector('[data-win=' + id + ']');
    if (live) live.remove();
    var top = box.y, height = box.h, width = box.w, cx = box.x + box.w / 2, span = Math.max(1, iconY - top), lag = .62;
    function place(t) {
      var shaping = smooth(Math.min(1, t / .5));
      function at(v) {
        var slide = smooth(Math.min(1, Math.max(0, t * (1 + lag) - (1 - v) * lag)));
        var rest = top + v * height, y = rest + (iconY - rest) * slide;
        var bend = smooth(Math.min(1, Math.max(0, (y - top) / span))) * shaping;
        return { y: y, w: width + (iconW - width) * bend, c: cx + (iconX - cx) * bend };
      }
      var cur = at(0), fade = t > .84 ? (1 - t) / .16 : 1;
      for (var r = 0; r < rows; r++) {
        var next = at((r + 1) / rows), ww = (cur.w + next.w) / 2;
        strips[r].style.transform = 'matrix(' + ww / width + ',0,' + (next.c - cur.c) / rowH + ',' + Math.max(.0005, (next.y - cur.y) / rowH) + ',' + (cur.c - ww / 2) + ',' + cur.y + ')';
        strips[r].style.opacity = fade;
        cur = next;
      }
    }
    var start = performance.now(), length = opening ? 600 : 560;
    function tick(now) {
      var p = Math.min(1, (now - start) / length), e = p * p * p * (p * (p * 6 - 15) + 10);
      place(opening ? 1 - e : e);
      if (p < 1) { requestAnimationFrame(tick); return; }
      strips.forEach(function (x) { x.remove(); });
      s.wins[id] = opening ? 'open' : 'min';
      genieBusy = false;
      drawWindows();
      updateTuck();
    }
    place(opening ? 1 : 0);
    requestAnimationFrame(tick);
  }

  // Jam desktop: huruf yang sama dengan ClockLetters di aplikasi (satuan tinggi huruf; busur bersudut GDI+, searah jarum jam dari kanan).
  var LETTERS = {
    A: [.9, [['L', 0, 1, .45, 0, .9, 1]]],
    B: [.75, [['L', 0, 0, 0, 1], ['L', .16, 0, .5, 0], ['A', .25, 0, .5, .5, -90, 180], ['L', .5, .5, .16, .5], ['A', .25, .5, .5, .5, -90, 180], ['L', .5, 1, .16, 1]]],
    C: [.92, [['A', 0, 0, .92, 1, 40, 280]]],
    D: [.86, [['L', 0, 0, 0, 1], ['L', .16, 0, .36, 0], ['A', -.14, 0, 1, 1, -90, 180], ['L', .36, 1, .16, 1]]],
    E: [.72, [['L', 0, 0, .72, 0], ['L', 0, .5, .56, .5], ['L', 0, 1, .72, 1]]],
    F: [.72, [['L', 0, 0, .72, 0], ['L', 0, .16, 0, 1], ['L', .16, .5, .56, .5]]],
    G: [.95, [['A', 0, 0, .95, 1, 12, 303], ['L', .52, .57, .95, .57]]],
    H: [.8, [['L', 0, 0, 0, 1], ['L', .8, 0, .8, 1], ['L', .16, .5, .64, .5]]],
    I: [0, [['L', 0, 0, 0, 1]]],
    J: [.62, [['L', .62, 0, .62, .69], ['A', 0, .38, .62, .62, 0, 180]]],
    K: [.78, [['L', 0, 0, 0, 1], ['L', .78, 0, .16, .5, .78, 1]]],
    L: [.66, [['L', 0, 0, 0, 1], ['L', .16, 1, .66, 1]]],
    M: [1, [['L', 0, 1, 0, 0, .5, .62, 1, 0, 1, 1]]],
    N: [.82, [['L', 0, 1, 0, 0, .82, 1, .82, 0]]],
    O: [1, [['A', 0, 0, 1, 1, -60, 330]]],
    P: [.75, [['L', 0, 0, 0, 1], ['L', .16, 0, .5, 0], ['A', .25, 0, .5, .55, -90, 180], ['L', .5, .55, .16, .55]]],
    R: [.76, [['L', 0, 0, 0, 1], ['L', .16, 0, .5, 0], ['A', .25, 0, .5, .5, -90, 180], ['L', .5, .5, .16, .5], ['L', .44, .5, .76, 1]]],
    S: [.76, [['A', 0, 0, .76, .5, 345, -255], ['A', 0, .5, .76, .5, 270, 255]]],
    T: [.8, [['L', 0, 0, .8, 0], ['L', .4, .16, .4, 1]]],
    U: [.8, [['L', 0, 0, 0, .6], ['A', 0, .2, .8, .8, 0, 180], ['L', .8, .6, .8, 0]]],
    V: [.84, [['L', 0, 0, .42, 1, .84, 0]]],
    W: [1.2, [['L', 0, 0, .3, 1, .6, 0, .9, 1, 1.2, 0]]],
    Y: [.84, [['L', 0, 0, .42, .5, .84, 0], ['L', .42, .5, .42, 1]]],
  };
  var TRACK = .42, WEIGHT = .075;
  function dayWord(cap) {
    var word = new Date().toLocaleDateString('id-ID', { weekday: 'long' }).toUpperCase();
    var x = 0, d = '', pad = cap * WEIGHT;
    word.split('').forEach(function (c) {
      var l = LETTERS[c];
      if (!l) return;
      l[1].forEach(function (k) {
        if (k[0] === 'L') {
          for (var i = 1; i < k.length; i += 2) d += (i === 1 ? 'M' : 'L') + ((x + k[i]) * cap + pad).toFixed(2) + ' ' + (k[i + 1] * cap + pad).toFixed(2);
        } else {
          var rx = k[3] / 2, ry = k[4] / 2, cx = x + k[1] + rx, cy = k[2] + ry, a0 = k[5] * Math.PI / 180, a1 = (k[5] + k[6]) * Math.PI / 180;
          d += 'M' + ((cx + rx * Math.cos(a0)) * cap + pad).toFixed(2) + ' ' + ((cy + ry * Math.sin(a0)) * cap + pad).toFixed(2)
            + 'A' + (rx * cap).toFixed(2) + ' ' + (ry * cap).toFixed(2) + ' 0 ' + (Math.abs(k[6]) > 180 ? 1 : 0) + ' ' + (k[6] > 0 ? 1 : 0) + ' '
            + ((cx + rx * Math.cos(a1)) * cap + pad).toFixed(2) + ' ' + ((cy + ry * Math.sin(a1)) * cap + pad).toFixed(2);
        }
      });
      x += l[0] + TRACK;
    });
    var w = (x - TRACK) * cap + pad * 2, h = cap + pad * 2;
    return '<svg width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" viewBox="0 0 ' + w.toFixed(1) + ' ' + h.toFixed(1) + '" aria-hidden="true"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="' + (cap * WEIGHT).toFixed(2) + '" stroke-linejoin="miter"/></svg>';
  }
  function clockText() {
    var d = new Date(), month = d.toLocaleDateString('id-ID', { month: 'long' }).toUpperCase();
    return { date: pad(d.getDate()) + ' ' + month + ', ' + d.getFullYear() + '.', time: '- ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ' -' };
  }
  function clockMarkup(cap) {
    var t = clockText();
    return dayWord(cap) + '<span class="clk-d" style="font-size:' + (cap * .31).toFixed(1) + 'px;margin-top:' + (cap * .3).toFixed(1) + 'px">' + t.date + '</span><span class="clk-t" style="font-size:' + (cap * .26).toFixed(1) + 'px;margin-top:' + (cap * .18).toFixed(1) + 'px">' + t.time + '</span>';
  }
  // Di panggung: digeser dari tengahnya, diubah ukurannya dari tepi atas atau bawah, dikunci. Sama dengan DesktopClock di aplikasi.
  var simClock = $('#simClock');
  s.clock = false; s.clockLock = false; s.clockScale = 1; s.clockCx = .5; s.clockTop = null;
  function drawClock() {
    simClock.hidden = !s.clock;
    if (!s.clock) return;
    var cap = Math.max(12, LH * .04 * s.clockScale);
    simClock.innerHTML = clockMarkup(cap);
    simClock.classList.toggle('locked', s.clockLock);
    var top = s.clockTop === null ? LH * .29 - cap * .3 : s.clockTop;
    simClock.style.left = (s.clockCx * LW) + 'px';
    simClock.style.top = Math.max(0, Math.min(LH - simClock.offsetHeight, top)) + 'px';
  }
  var drag = null;
  function stageK() { return LW / stage.getBoundingClientRect().width; }
  simClock.addEventListener('pointerdown', function (e) {
    if (s.clockLock) return;
    var r = simClock.getBoundingClientRect(), k = stageK(), y = (e.clientY - r.top) * k, h = r.height * k, band = Math.max(8, h * .14);
    drag = { edge: y < band ? -1 : y > h - band ? 1 : 0, x: e.clientX, y: e.clientY, cx: s.clockCx, top: simClock.offsetTop, h: simClock.offsetHeight, scale: s.clockScale };
    drag.bottom = drag.top + drag.h;
    simClock.setPointerCapture(e.pointerId);
    simClock.classList.add('drag');
    e.preventDefault();
  });
  simClock.addEventListener('pointermove', function (e) {
    if (!drag) {
      if (s.clockLock) return;
      var r = simClock.getBoundingClientRect(), y = e.clientY - r.top, band = Math.max(8 / stageK(), r.height * .14);
      simClock.style.cursor = y < band || y > r.height - band ? 'ns-resize' : 'move';
      return;
    }
    var k = stageK(), dx = (e.clientX - drag.x) * k, dy = (e.clientY - drag.y) * k;
    if (drag.edge === 0) {
      s.clockCx = Math.max(.1, Math.min(.9, drag.cx + dx / LW));
      s.clockTop = Math.max(0, Math.min(LH - drag.h, drag.top + dy));
      drawClock();
      return;
    }
    var h = drag.edge > 0 ? drag.h + dy : drag.h - dy;
    s.clockScale = Math.max(.5, Math.min(3, drag.scale * h / drag.h));
    s.clockTop = drag.top;
    drawClock();
    if (drag.edge < 0) { s.clockTop = drag.bottom - simClock.offsetHeight; drawClock(); }
  });
  function endDrag() { if (!drag) return; drag = null; simClock.classList.remove('drag'); }
  simClock.addEventListener('pointerup', endDrag);
  simClock.addEventListener('pointercancel', endDrag);
  simClock.addEventListener('dblclick', function () { if (s.clockLock) return; s.clockScale = 1; s.clockCx = .5; s.clockTop = null; drawClock(); say('Klik dua kali di tepinya: letak dan ukuran semula.'); });
  // Pratinjau besar di bagian Jam desktop.
  function drawClockShow() {
    var show = $('#clockShow');
    if (!show) return;
    show.innerHTML = '<div class="clk">' + clockMarkup(Math.max(22, Math.min(46, show.clientWidth * .062))) + '</div>';
  }
  setInterval(function () { if (s.clock) drawClock(); drawClockShow(); }, 30000);
  function revealDesktop() { if (s.wins.web === 'open') s.wins.web = 'min'; if (s.wins.notes === 'open') s.wins.notes = 'min'; s.max = false; s.open = false; drawWindows(); draw(); }

  // Efek Standar: jendela mengecil dan memudar ke ikonnya, seperti animasi Windows.
  function standardFx(id, opening, box, iconX, iconY) {
    genieBusy = true;
    s.wins[id] = 'open';
    drawWindows();
    var live = $('#winHost [data-win=' + id + ']');
    if (!live || !live.animate) { s.wins[id] = opening ? 'open' : 'min'; genieBusy = false; drawWindows(); updateTuck(); return; }
    var away = 'translate(' + (iconX - box.x - box.w / 2).toFixed(1) + 'px,' + (iconY - box.y - box.h / 2).toFixed(1) + 'px) scale(.12)';
    var frames = [{ transform: 'none', opacity: 1 }, { transform: away, opacity: 0 }];
    if (opening) frames.reverse();
    live.style.transformOrigin = '50% 50%';
    var done = false;
    function finish() {
      if (done) return;
      done = true;
      s.wins[id] = opening ? 'open' : 'min';
      genieBusy = false;
      drawWindows();
      updateTuck();
    }
    live.animate(frames, { duration: 240, easing: opening ? 'cubic-bezier(.2,.8,.3,1)' : 'cubic-bezier(.6,0,.8,.4)', fill: 'forwards' }).onfinish = finish;
    // Tab di latar menahan animasi; keadaan jendela tetap selesai.
    setTimeout(finish, 320);
  }

  // Semua fitur sebagai tombol.
  function ensureDock() { if (!s.dock) { s.dock = true; drawDock(); } }
  var GROUPS = [
    ['Musik dan film', [
      ['Putar lagu', function () { s.media = true; s.film = false; s.playing = true; s.karaoke = false; openPage('music'); say('Pemutar: Spotify, YouTube di browser, atau aplikasi lain, tanpa menghubungkan akun. Coba tombol putar, lompat, dan judulnya.'); }],
      ['Musik ringkas', function () { s.media = true; s.film = false; s.playing = true; closeIsland(); say('Saat tidak dibuka, pulau hanya menampilkan sampul, judul, dan equalizer. Aurora warna sampul menyala di bawahnya.'); }],
      ['Karaoke', function () { s.media = true; s.film = false; s.playing = true; s.karaoke = true; openPage('music'); say('Karaoke Panggung NIX dengan lirik tersinkron. Baris di sini hanya penanda; di aplikasi, liriknya dari LRCLIB bila Anda menyalakannya.'); }],
      ['Sinkron lirik', function () { s.media = true; s.karaoke = true; s.offset = .5; openPage('music'); say('Tombol − dan + di bawah NIX menggeser waktu lirik 0,25 detik, dan diingat per lagu.'); }],
      ['Film di browser', function () { s.media = true; s.film = true; s.playing = true; s.karaoke = false; openPage('music'); say('Film menampilkan nama situsnya, bukan "Chrome", dengan sampul filmnya bila Anda menyalakan fitur sampul.'); }],
      ['Film layar penuh', function () { s.media = true; s.film = true; s.playing = true; s.fullscreen = true; s.open = false; drawWindows(); draw(); say('Pulau tetap terlihat saat film layar penuh, dan klik membawa Anda kembali ke tabnya. Game layar penuh tetap menyembunyikan pulau.'); }],
    ]],
    ['Pemberitahuan', [
      ['Pesan masuk', function () { s.open = false; showAlert({ w: 340, h: 62, html: '<div class="v cmp"><span class="fx-pop">' + nix('surprised', 34) + '</span><div style="min-width:0"><b>' + (s.masked ? 'Pesan baru' : 'Tim Kantor') + '</b><div class="mut">' + (s.masked ? 'Isi disamarkan selama presentasi' : 'Rapat dipindah ke jam 3 sore') + '</div></div></div>' }, 4200); say(s.masked ? 'Mode presentasi: isi notifikasi disamarkan.' : 'Notifikasi WhatsApp, Telegram, Outlook, dan lainnya: NIX kaget, kartunya pergi sendiri. Klik kartu membuka aplikasinya.'); }],
      ['Samarkan isi', function () { s.masked = !s.masked; GROUPS_RUN('Pesan masuk'); }],
      ['Telepon WhatsApp', function () { s.open = false; showAlert({ w: 350, h: 62, html: '<div class="v cmp">' + nix('surprised', 34) + '<div><b>Budi</b><div class="mut">Panggilan suara WhatsApp</div></div><span class="r rw" style="gap:6px"><button type="button" class="ib" style="background:#E5484D" data-act="callno" aria-label="Tolak">' + svg('close') + '</button><button type="button" class="ib" style="background:#30D158" data-act="callok" aria-label="Jawab">' + svg('check') + '</button></span></div>' }); say('Telepon masuk dari WhatsApp desktop bisa dijawab atau ditolak dari pulau. Klik salah satunya.'); }],
      ['Volume', function () { s.vol = (s.vol + 18) % 100; s.open = false; showAlert(indicator('<span style="width:14px;flex:none"><svg viewBox="0 0 24 24" fill="#fff"><path d="' + ICON.speaker + '"/></svg></span>', volBars(s.vol / 100, '#9ADCFF')), 1600); say('Indikator volume menggantikan pop-up Windows. Ukurannya sama dengan semua indikator lain.'); }],
      ['Kecerahan', function () { s.open = false; showAlert(indicator('<span style="width:14px;height:14px;border-radius:50%;background:#FFE08A;flex:none;box-shadow:0 0 10px #FFE08A"></span>', volBars(.7, '#FFE08A')), 1600); say('Kecerahan: matahari naik di lereng titik, dan pulau ikut diterangi.'); }],
      ['Colok charger', function () { s.open = false; showAlert(indicator('<span style="width:14px;flex:none"><svg viewBox="0 0 24 24" fill="#30D158"><path d="' + ICON.bolt + '"/></svg></span>', '<b>Mengisi daya</b><span class="r" style="color:#30D158">91%</span>'), 2200); say('Colok charger: cairan energi mengisi badan pulau sampai persen baterai.'); }],
      ['Headphone', function () { s.open = false; showAlert(indicator(nix('happy', 16), '<b style="overflow:hidden;text-overflow:ellipsis">Buds Pro</b><span class="r">78%</span>'), 2200); say('Headphone tersambung: nama perangkat dan baterainya.'); }],
      ['Kamera dan mikrofon', function () { s.cam = !s.cam; s.mic = s.cam; s.open = false; draw(); say(s.cam ? 'Titik kecil di tepi pulau tanda kamera dan mikrofon sedang dipakai aplikasi. Klik lagi untuk mematikannya.' : 'Indikator mati.'); }],
    ]],
    ['Beranda dan widget', [
      ['Beranda', function () { openPage('home'); say('Beranda: dua widget pilihan Anda. Klik kartunya untuk mengganti widget.'); }],
      ['Jadwal sholat', function () { s.widgetL = 'Sholat'; openPage('home'); say('Jadwal sholat 51 kota, dihitung di perangkat dengan kriteria Kemenag, dengan langit yang bergerak.'); }],
      ['Cuaca', function () { s.widgetR = 'Cuaca'; openPage('home'); say('Cuaca: kartunya menjadi jendela langit, dengan hujan, awan, atau kilat. Mati secara bawaan.'); }],
      ['Minggu ini', function () { s.widgetL = 'Minggu ini'; openPage('home'); say('Minggu ini: tabung hari ini terisi setinggi tugas yang selesai.'); }],
      ['Minum', function () { s.widgetR = 'Minum'; openPage('home'); say('Minum: klik "+1 gelas", dan airnya naik.'); }],
      ['Jam dunia', function () { s.widgetL = 'Jam dunia'; openPage('home'); say('Jam dunia: dua kota, jam analog terang siang dan gelap malam.'); }],
      ['Hijriah', function () { s.widgetR = 'Hijriah'; openPage('home'); say('Kalender Hijriah dengan fase bulan yang digambar sesuai hari ini.'); }],
      ['Hitung mundur', function () { s.widgetL = 'Hitung mundur'; openPage('home'); say('Hitung mundur ke tanggal pilihan Anda, dengan papan flip.'); }],
    ]],
    ['Produktivitas', [
      ['Timer', function () { s.timer = null; openPage('timer'); say('Pilih menit, lalu timer berjalan. Di aplikasi, Anda bisa memutar pita ukur dengan roda mouse.'); }],
      ['Pomodoro', function () { startTimer(25, 'Pomodoro'); s.focus = true; openPage('timer'); say('Pomodoro 25/5, istirahat 15 menit setelah 4 sesi, dan mode fokus menyala otomatis.'); }],
      ['Tugas', function () { openPage('tasks'); say('Ketik "kirim laporan besok jam 9" lalu Enter. Pulo membaca waktunya sendiri.'); }],
      ['Saku NIX', function () { openPage('shelf'); say('Saku NIX: seret file, teks, tautan, atau gambar ke pulau, lalu seret keluar ke aplikasi lain. Teks di gambar bisa disalin.'); }],
      ['Mode fokus', function () { s.focus = !s.focus; s.open = false; s.media = s.focus ? false : s.media; s.playing = s.focus ? false : s.playing; draw(); say(s.focus ? 'Mode fokus: NIX tidur, dan notifikasi ditahan sampai Anda selesai. Klik lagi untuk mematikannya.' : 'Mode fokus mati.'); if (!s.focus) { s.media = true; s.playing = true; draw(); } }],
    ]],
    ['Kesehatan dan ibadah', [
      ['Istirahat mata', function () { s.open = false; s.eyes = 20; showAlert(eyesView()); say('Tiap 20 menit, pemandangan senja mengajak mata memandang jauh selama 20 detik, tanpa bunyi.'); runCycle(20, function (n) { s.eyes = 20 - n; var e = $('[data-b=eyes]'); if (e) e.textContent = s.eyes; }, function () { s.alert = null; draw(); }); }],
      ['Peregangan', function () { s.open = false; s.cue = 0; showAlert(stretchView()); say('Tiap jam, NIX ikut meregang mengikuti tiga langkah gerakan.'); runCycle(12, function (n) { var c = Math.floor(n / 4); if (c !== s.cue) { s.cue = c; if (s.alert) { s.alert = stretchView(); draw(); } } }, function () {}); }],
      ['Pengingat minum', function () { s.open = false; showAlert({ w: 340, h: 62, html: '<div class="v cmp">' + nix('happy', 30) + '<div><b>Waktunya minum</b><div class="mut">' + s.water * 250 + ' ml dari 2.000 ml</div></div><button type="button" class="ch r" data-act="water">Sudah</button></div>' }, 5000); say('Target minum dibagi rata di jam aktif Anda. Ada mode puasa yang menjedanya sampai Maghrib.'); }],
      ['Waktu sholat', function () { s.open = false; showAlert({ w: 360, h: 72, html: '<div class="v cmp" style="background:linear-gradient(#27386E,#0C1430)"><span style="width:18px;height:18px;border-radius:50%;background:#FFE3A8;box-shadow:0 0 14px #FFE3A8;flex:none"></span><div><b>Waktunya sholat Maghrib</b><div class="mut">18.02 · Jakarta</div></div></div>' }, 4500); say('"Adzan tanpa suara": langit berganti sesuai waktunya, siluet masjid, dan gelombang dari menara. Bunyi hanya notifikasi pendek.'); }],
      ['Hitung mundur sholat', function () { startTimer(12, 'Maghrib'); s.open = false; draw(); say('Sebelum waktu sholat, sumbu cahaya terbakar di tepi pulau menuju waktunya.'); }],
    ]],
    ['Sistem dan perawatan', [
      ['Sistem', function () { openPage('system'); say('CPU, RAM, dan disk, dibaca hanya selama halaman ini terlihat.'); }],
      ['Pembersih', function () { openPage('system'); ACT.clean(); draw(); }],
      ['Recycle Bin', function () { openPage('system'); ACT.trash(); draw(); }],
      ['Kontrol', function () { s.volOpen = false; openPage('control'); say('Yang biasanya di pojok taskbar: Wi-Fi, Bluetooth, baterai, volume, kunci, tidur, mulai ulang, matikan. Coba ikon suaranya.'); }],
      ['Kurs', function () { s.rates = true; openPage('rates'); say('Kurs seminggu terakhir, diperbarui sekali sehari. Mati secara bawaan.'); }],
    ]],
    ['Asisten AI', [
      ['Claude bekerja', function () { s.agent = true; s.agentStep = 3; s.open = false; draw(); say('Pulau menampilkan bahwa Claude Code sedang bekerja, langkahnya, dan lama kerjanya.'); }],
      ['Halaman Asisten', function () { s.agent = true; openPage('agent'); say('Jejak kaki per butir daftar tugas, dan langkah terakhir yang dikerjakan.'); }],
      ['Minta izin', function () { s.agent = true; s.open = false; showAlert({ w: 370, h: 84, html: '<div class="v pg" style="padding-top:9px"><div class="rw">' + nix('surprised', 26) + '<div><b>Claude minta izin</b><div class="mut">Menjalankan perintah: npm test</div></div></div><div class="rw" style="justify-content:flex-end;margin-top:3px"><button type="button" class="ch" data-act="deny">Tolak</button><button type="button" class="ch" style="background:#30D158;color:#06230F" data-act="allow">Izinkan</button></div></div>' }); say('Izin bisa dijawab langsung dari pulau, tanpa berpindah jendela.'); }],
      ['Selesai', function () { s.agent = false; s.open = false; showAlert({ w: 340, h: 62, html: '<div class="v cmp"><span class="fx-pop">' + nix('stars', 34) + '</span><div><b>Claude selesai</b><div class="mut">PULO · 12 langkah</div></div></div>' }, 3500); say('Selesai: cap telapak kaki kucing, dengan mata NIX berbinar.'); }],
    ]],
    ['Tampilan', [
      ['Tema Bawaan', function () { s.theme = 'hitam'; draw(); say('Bawaan: hitam seperti notch sungguhan, dengan poni yang menyatu ke tepi layar.'); }],
      ['Kaca Clear', function () { s.theme = 'glass'; s.kind = 'Clear'; closeOrKeep(); say('Liquid Glass Clear: tembus tanpa blur.'); }],
      ['Kaca Frosted', function () { s.theme = 'glass'; s.kind = 'Frosted'; closeOrKeep(); say('Liquid Glass Frosted: buram dan terang.'); }],
      ['Kaca Blur', function () { s.theme = 'glass'; s.kind = 'Blur'; closeOrKeep(); say('Liquid Glass Blur: buram dan gelap, teksnya paling mudah dibaca.'); }],
      ['Latar terang', function () { s.bright = !s.bright; draw(); say('Di aplikasi, kaca menggelap sendiri di atas halaman terang. Klik lagi untuk kembali.'); }],
      ['Kecil', function () { s.size = 'small'; compactNow(); say('Ukuran Kecil.'); }],
      ['Sedang', function () { s.size = 'medium'; compactNow(); say('Ukuran Sedang.'); }],
      ['Besar', function () { s.size = 'large'; compactNow(); say('Ukuran Besar.'); }],
      ['Minimal', function () { s.size = 'minimal'; compactNow(); say('Minimal: jam di tengah, baterai di kiri, volume atau equalizer di kanan.'); }],
      ['Menempel', function () { s.pos = 'dock'; draw(); say('Menempel di tepi atas layar.'); }],
      ['Mengambang', function () { s.pos = 'float'; draw(); say('Mengambang 10 px di bawah tepi layar.'); }],
      ['Sembunyi otomatis', function () { s.autoHide = !s.autoHide; s.open = false; s.media = !s.autoHide; s.playing = !s.autoHide; draw(); say(s.autoHide ? 'Saat diam, pulau naik keluar layar. Aktivitas berikutnya memunculkannya lagi. Klik lagi untuk mematikannya.' : 'Sembunyi otomatis mati.'); }],
      ['NIX menyapa', function () { s.open = false; showAlert({ w: 330, h: 62, html: '<div class="v cmp"><span class="fx-pop">' + nix('blush', 34) + '</span><div><b>' + greeting() + '!</b><div class="mut">Sholat berikutnya Dzuhur · 3 tugas hari ini</div></div></div>' }, 4500); say('Saat Anda kembali ke komputer, NIX menyapa dengan ringkasan hari ini.'); }],
      ['Jangan ganggu NIX', function () { s.media = false; s.playing = false; s.timer = null; s.agent = false; s.open = false; s.alert = null; s.face = 'neutral'; draw(); say('Pulau kosong dengan NIX. Sekarang klik wajah NIX berulang kali.'); }],
    ]],
    ['Dock', [
      ['Tampilkan dock', function () { s.dock = !s.dock; drawWindows(); say(s.dock ? 'Dock menyala, di atas taskbar Windows. Arahkan kursor: ikonnya membesar mengikuti kursor.' : 'Dock dimatikan.'); }],
      ['Efek Genie', function () { s.effect = 'genie'; ensureDock(); s.max = false; if (s.wins.web === 'closed') s.wins.web = 'open'; s.front = 'web'; drawWindows(); var opening = s.wins.web === 'min'; genie('web', opening); say(opening ? 'Jendela keluar lagi dari ikonnya. Klik ikon Browser di dock juga bisa.' : 'Jendela tersedot ke ikonnya. Klik ikon Browser di dock untuk membukanya lagi.'); }],
      ['Efek Standar', function () { s.effect = 'standard'; ensureDock(); s.max = false; if (s.wins.web === 'closed') s.wins.web = 'open'; s.front = 'web'; drawWindows(); var opening = s.wins.web === 'min'; genie('web', opening); say('Efek Standar: animasi Windows biasa, tanpa Genie, dan dock tidak menyimpan gambar jendela. Dipilih di Pengaturan.'); }],
      ['Ukuran dock', function () { ensureDock(); s.iconSize = s.iconSize === 32 ? 44 : s.iconSize === 44 ? 24 : 32; drawDock(); say('Ukuran ikon ' + s.iconSize + ' px. Di aplikasi lewat slider, dari 24 sampai 56 px.'); }],
      ['Sembunyikan taskbar', function () { ensureDock(); s.hideTaskbar = !s.hideTaskbar; drawWindows(); say(s.hideTaskbar ? 'Taskbar Windows hilang, dan dock menggantikannya sepenuhnya. Jam, baterai, dan volume pindah ke halaman Kontrol.' : 'Taskbar kembali.'); }],
      ['Dock turun otomatis', function () { ensureDock(); s.hideTaskbar = true; s.max = true; s.wins.web = 'open'; s.front = 'web'; drawWindows(); s.tucked = true; drawDock(); say('Jendela dimaksimalkan menimpa dock, jadi dock turun. Sentuhkan kursor ke tepi bawah panggung untuk memanggilnya.'); }],
    ]],
    ['Jam desktop', [
      ['Jam desktop', function () { s.clock = !s.clock; if (s.clock) revealDesktop(); drawClock(); say(s.clock ? 'Nama hari, tanggal, dan jam di desktop, di bawah semua jendela. Jendela contoh diperkecil supaya desktopnya terlihat. Klik lagi untuk mematikannya.' : 'Jam desktop dimatikan.'); }],
      ['Geser dan ubah ukuran', function () { s.clock = true; s.clockLock = false; revealDesktop(); drawClock(); say('Tarik bagian tengah jam untuk menggeser, tepi atas atau bawahnya untuk mengubah ukuran. Klik dua kali di tepi untuk letak dan ukuran semula.'); }],
      ['Kunci jam', function () { s.clock = true; s.clockLock = !s.clockLock; revealDesktop(); drawClock(); say(s.clockLock ? 'Dikunci: jam tidak bisa digeser atau diubah ukurannya, dan klik tembus ke desktop. Klik lagi untuk membukanya.' : 'Kunci dibuka: jam bisa digeser lagi.'); }],
    ]],
  ];
  // Tiap tombol adalah satu adegan: sisa adegan sebelumnya tidak boleh menutupinya. Tema, ukuran, posisi, dan dock tetap.
  function resetScene(name) {
    s.pin = false;
    s.alert = null;
    s.volOpen = false;
    s.face = 'neutral';
    clearTimeout(alertTimer);
    clearInterval(runCycle.t);
    if (name !== 'Sembunyi otomatis') s.autoHide = false;
    if (name !== 'Mode fokus') s.focus = false;
    if (s.fullscreen) { s.fullscreen = false; drawWindows(); }
    if (/^(Musik ringkas|Kecil|Sedang|Besar|Minimal|Mode fokus|Sembunyi otomatis|Claude bekerja|Hitung mundur sholat)$/.test(name)) { s.timer = null; if (name !== 'Claude bekerja') s.agent = false; }
  }
  function closeOrKeep() { draw(); }
  function compactNow() { s.open = false; s.alert = null; draw(); }
  function GROUPS_RUN(name) { GROUPS.forEach(function (g) { g[1].forEach(function (f) { if (f[0] === name) f[1](); }); }); }

  // Daftar fitur: satu kelompok terbuka, seperti daftar pengaturan.
  var groupsEl = $('#groups');
  function openGroup(section) {
    groupsEl.querySelectorAll('.grp').forEach(function (g) {
      var open = g === section;
      g.classList.toggle('open', open);
      g.querySelector('.grp-h').setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  function runFeature(button, feature) {
    resetScene(feature[0]);
    feature[1]();
    groupsEl.querySelectorAll('.feat.on').forEach(function (x) { x.classList.remove('on'); });
    button.classList.add('on');
    openGroup(button.closest('.grp'));
  }
  var featureButtons = {};
  GROUPS.forEach(function (g, i) {
    var section = document.createElement('div');
    section.className = 'grp' + (i === 0 ? ' open' : '');
    var head = document.createElement('button');
    head.type = 'button';
    head.className = 'grp-h';
    head.textContent = g[0];
    head.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
    head.addEventListener('click', function () { openGroup(section); });
    section.appendChild(head);
    var list = document.createElement('div');
    list.className = 'grp-b';
    g[1].forEach(function (f) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'feat';
      b.textContent = f[0];
      b.addEventListener('click', function () { runFeature(b, f); });
      featureButtons[f[0]] = b;
      list.appendChild(b);
    });
    section.appendChild(list);
    groupsEl.appendChild(section);
  });

  // Tombol "Coba" di bagian dock.
  document.querySelectorAll('[data-try]').forEach(function (b) {
    b.addEventListener('click', function () { featureButtons[b.dataset.try].click(); $('#coba').scrollIntoView(); });
  });

  // Wajah NIX: tombol wajah memunculkannya di pulau simulator.
  var FACES = [['neutral', 'Diam'], ['side', 'Melirik'], ['closed', 'Berkedip'], ['happy', 'Senang'], ['blush', 'Tersipu'], ['stars', 'Berbinar'], ['love', 'Sayang'], ['surprised', 'Kaget'], ['sweat', 'Keringat'], ['angry', 'Marah'], ['dizzy', 'Pusing'], ['sleep', 'Tidur'], ['sad', 'Sedih']];
  var facesEl = $('#faces');
  FACES.forEach(function (f) {
    var b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = '<img src="assets/nix-' + f[0] + '.png" width="310" height="280" alt="">' + f[1];
    b.addEventListener('click', function () {
      s.media = false; s.playing = false; s.timer = null; s.agent = false; s.open = false; s.alert = null; s.focus = false; s.face = f[0];
      draw();
      say('NIX ' + f[1].toLowerCase() + '. Di aplikasi, wajahnya berganti sendiri mengikuti apa yang terjadi.');
      $('#coba').scrollIntoView();
    });
    facesEl.appendChild(b);
  });

  // NIX di pembuka.
  var heroLines = [['surprised', 'Eh! Kaget aku.'], ['blush', 'Hehe, geli.'], ['stars', 'Aku tinggal di tepi atas layarmu.'], ['love', 'Coba simulator di bawah, ya.'], ['sweat', 'Sudah, sudah...'], ['angry', 'Berhenti mengklik!'], ['dizzy', 'Pusing...'], ['happy', 'Oke, aku maafkan.']];
  var heroIndex = 0, heroBtn = $('#heroNix'), heroFace = $('#heroFace'), heroSay = $('#heroSay');
  heroBtn.addEventListener('click', function () {
    var l = heroLines[heroIndex++ % heroLines.length];
    heroFace.src = 'assets/nix-' + l[0] + '.png';
    heroSay.textContent = l[1];
    if (!reduced && heroBtn.animate) heroBtn.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-14px) scale(1.05,.97)', offset: .4 }, { transform: 'translateY(0)' }], { duration: 340, easing: 'ease-out' });
  });
  if (!reduced) setInterval(function () {
    if (document.hidden || heroIndex > 0) return;
    heroFace.src = 'assets/nix-closed.png';
    setTimeout(function () { if (heroIndex === 0) heroFace.src = 'assets/nix-happy.png'; }, 180);
  }, 4200);

  // Waktu: hanya saat simulator terlihat.
  var visible = true;
  if ('IntersectionObserver' in window) new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }).observe(box);
  setInterval(function () {
    if (!visible || document.hidden) return;
    $('#taskClock').textContent = clock();
    if (s.media && s.playing) {
      s.posn += 1;
      var tr = track();
      if (s.posn >= tr.len) { s.posn = 0; if (!s.film) s.track = (s.track + 1) % TRACKS.length; draw(); }
      var pos = $('[data-b=pos]'), bar = $('[data-b=bar]'), rem = $('[data-b=rem]');
      if (pos) pos.textContent = mmss(s.posn);
      if (bar) bar.style.width = s.posn / tr.len * 100 + '%';
      if (rem) rem.textContent = '-' + mmss(tr.len - s.posn);
      var line = $('.lineb');
      if (line) line.style.setProperty('--f', 15 + (s.posn * 6) % 80 + '%');
    }
    if (s.timer) {
      s.timer.left -= 1;
      if (s.timer.left <= 0) { var name = s.timer.name; s.timer = null; s.focus = false; showAlert({ w: 300, h: 54, html: '<div class="v cmp">' + nix('stars', 28) + '<b>' + name + ' selesai</b></div>' }, 3500); }
      else {
        var t = $('[data-b=timer]');
        if (t) t.textContent = mmss(s.timer.left);
      }
    }
    if (s.open && s.page === 'system') { s.cpu = 8 + Math.round(Math.random() * 14); var c = $('[data-b=cpu]'), m = $('[data-b=cpum]'); if (c) c.textContent = s.cpu + '%'; if (m) m.style.width = s.cpu + '%'; }
  }, 1000);

  // Panggung mengikuti lebar halaman: lebar logis tidak kurang dari 640, supaya pulau yang terbuka tetap muat.
  function fit() {
    var width = box.parentNode.clientWidth;
    LW = Math.max(640, Math.min(980, width));
    LH = Math.round(Math.min(560, Math.max(440, LW * .58)));
    var scale = Math.min(width / LW, window.innerHeight * .62 / LH);
    stage.style.width = LW + 'px';
    stage.style.height = LH + 'px';
    stage.style.transform = 'scale(' + scale + ')';
    box.style.width = LW * scale + 'px';
    box.style.height = LH * scale + 'px';
    WINDOWS.web.x = Math.max(16, LW / 2 - 330);
    WINDOWS.notes.x = Math.max(60, LW / 2 - 90);
    WINDOWS.web.w = Math.min(500, LW - 60);
    WINDOWS.notes.w = Math.min(420, LW - 120);
    drawWindows();
    drawClock();
    drawClockShow();
  }
  window.addEventListener('resize', fit);
  $('#taskClock').textContent = clock();
  fit();
  draw();
})();
