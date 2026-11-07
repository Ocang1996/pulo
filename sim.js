// Simulator Pulo. Semua di browser: tidak menyentuh komputer pengunjung. Lagu, nama, dan data hanya contoh; baris lirik hanya penanda.
// Tampilan tiap halaman digambar dari tangkapan layar Pulo 7 Nov 2026 dan ukurannya dari kode island (PageParts, LiveTabs, IslandMetrics).
(function () {
  'use strict';
  var I = window.PuloI18n, T = I.t, EN = I.lang === 'en', LOC = I.locale;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (q, root) { return (root || document).querySelector(q); };
  var LW = 900, LH = 520;
  var stage = $('#stage'), box = $('#stageBox'), isl = $('#isl'), body = $('#islBody'), caption = $('#caption'), simDock = $('#simDock');

  // Teks simulator: [Indonesia, English].
  I.add({
    'p.music': ['Musik', 'Music'], 'p.agent': ['Asisten', 'Assistant'], 'p.home': ['Beranda', 'Home'], 'p.timer': ['Timer', 'Timer'], 'p.shelf': ['Saku', 'Pocket'],
    'p.tasks': ['Tugas', 'Tasks'], 'p.rates': ['Kurs', 'Rates'], 'p.system': ['Sistem', 'System'], 'p.control': ['Kontrol', 'Controls'],
    'min': ['menit', 'min'],
    'greet': [function (h) { return h < 11 ? 'Selamat pagi' : h < 15 ? 'Selamat siang' : h < 18 ? 'Selamat sore' : 'Selamat malam'; }, function (h) { return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'; }],
    'nextPrayer': ['Sholat berikutnya', 'Next prayer'],
    'prayers': [['Subuh', 'Dzuhur', 'Ashar', 'Maghrib', 'Isya'], ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']],
    'inTime': [function (h, m) { return (h ? h + 'j ' : '') + m + 'm lagi'; }, function (h, m) { return 'in ' + (h ? h + 'h ' : '') + m + 'm'; }],
    'weather': ['Cuaca', 'Weather'], 'rain': ['Hujan', 'Rain'],
    'week': ['Minggu ini', 'This week'], 'weekDone': [function (n) { return 'Hari ini ' + n + ' selesai'; }, function (n) { return n + ' done today'; }],
    'water': ['Minum', 'Water'], 'glasses': [function (n) { return n + ' / 8 gelas'; }, function (n) { return n + ' / 8 glasses'; }], 'plusGlass': ['+1 gelas', '+1 glass'],
    'world': ['Jam dunia', 'World clock'], 'hijri': ['Hijriah', 'Hijri'], 'countdown': ['Hitung mundur', 'Countdown'], 'days': ['hari', 'days'], 'holiday': ['Liburan', 'Holiday'],
    'agentWorking': ['Claude bekerja', 'Claude is working'], 'agentChip': ['Claude · Bekerja · PULO', 'Claude · Working · PULO'], 'agentReady': ['Claude · Siap', 'Claude · Ready'],
    'agentStep': ['Mengedit tampilan landing page', 'Editing the landing page design'], 'agentNow': ['Menjalankan uji tampilan', 'Running the layout check'],
    'steps': [function (n) { return n + ' langkah'; }, function (n) { return n + ' steps'; }],
    'shelfName': ['Saku NIX', 'NIX\'s Pocket'], 'empty': ['kosong', 'empty'], 'shelfEmpty': ['Saku NIX masih kosong', 'NIX\'s Pocket is empty'],
    'shelfHint': ['Seret file, gambar, tautan, atau teks ke island', 'Drag files, images, links, or text onto the island'], 'shelfAdd': ['+ Contoh', '+ Sample'],
    'tasksToday': ['Tugas hari ini', 'Today\'s tasks'], 'add': ['+ Tambah', '+ Add'], 'taskPlaceholder': ['Ketik: kirim laporan besok jam 9, lalu Enter', 'Type: send the report tomorrow at 9, then Enter'],
    'doneOf': [function (a, b) { return a + ' dari ' + b + ' selesai'; }, function (a, b) { return a + ' of ' + b + ' done'; }], 'allDone': ['✓ Semua selesai', '✓ All done'],
    'noTasks': ['Belum ada tugas hari ini', 'No tasks today yet'], 'late': ['Terlambat', 'Overdue'], 'clickAgain': ['Klik lagi untuk menghapus', 'Click again to delete'],
    'tomorrow': ['Besok', 'Tomorrow'], 'today': ['Hari ini', 'Today'],
    'uptime': [function (h, m) { return 'Menyala ' + h + ' j ' + m + ' m'; }, function (h, m) { return 'Up ' + h + ' h ' + m + ' m'; }],
    'free': [function (v) { return v + ' GB bebas'; }, function (v) { return v + ' GB free'; }], 'cleanBtn': ['Bersihkan', 'Clean up'],
    'on': ['Nyala', 'On'], 'battery': ['Baterai', 'Battery'], 'lock': ['Kunci', 'Lock'], 'sleep': ['Tidur', 'Sleep'], 'restart': ['Ulang', 'Restart'], 'shutdown': ['Matikan', 'Shut down'],
    'rateTitle': ['Kurs', 'Rates'], 'copied': ['disalin', 'copied'],
    'msgFrom': ['Tim Kantor', 'Office Team'], 'msgText': ['Rapat dipindah ke jam 3 sore', 'Meeting moved to 3 pm'], 'msgMasked': ['Pesan baru', 'New message'], 'msgMaskedText': ['Isi disamarkan selama presentasi', 'Hidden while you present'],
    'caller': ['Budi', 'Sam'], 'callType': ['Panggilan suara WhatsApp', 'WhatsApp voice call'], 'charging': ['Mengisi daya', 'Charging'],
    'drinkNow': ['Waktunya minum', 'Time for water'], 'mlOf': [function (n) { return n + ' ml dari 2.000 ml'; }, function (n) { return n + ' ml of 2,000 ml'; }], 'drank': ['Sudah', 'Done'],
    'prayerNow': [function (p) { return 'Waktunya sholat ' + p; }, function (p) { return 'Time for ' + p; }],
    'eyes': ['Istirahat mata', 'Eye break'], 'eyesText': ['Lihat sejauh 6 meter selama 20 detik', 'Look 6 meters away for 20 seconds'],
    'stretch': ['Saatnya peregangan', 'Time to stretch'], 'cues': [['Berdiri dari kursi', 'Angkat tangan, tarik napas', 'Putar bahu pelan-pelan'], ['Stand up from your chair', 'Raise your arms, breathe in', 'Roll your shoulders slowly']],
    'permTitle': ['Claude minta izin', 'Claude asks for permission'], 'permText': ['Menjalankan perintah: npm test', 'Run command: npm test'], 'deny': ['Tolak', 'Deny'], 'allow': ['Izinkan', 'Allow'],
    'agentDone': ['Claude selesai', 'Claude is done'], 'timerDone': [function (n) { return n + ' selesai'; }, function (n) { return n + ' is done'; }],
    'greetCard': [function (g) { return g + '!'; }, function (g) { return g + '!'; }], 'greetSub': ['Sholat berikutnya Dzuhur · 3 tugas hari ini', 'Next prayer Dhuhr · 3 tasks today'],
    'pomodoro': ['Pomodoro', 'Pomodoro'], 'filmTitle': ['Film Contoh: Episode 5', 'Sample Film: Episode 5'], 'fullTitle': ['Film contoh, layar penuh', 'Sample film, full screen'], 'exitFull': ['Keluar dari layar penuh', 'Exit full screen'],
    'lyricPrev': ['♪ baris sebelumnya', '♪ previous line'], 'lyricNow': ['♪ baris yang sedang dinyanyikan ♪', '♪ the line being sung ♪'], 'lyricNext': ['♪ baris berikutnya', '♪ next line'],
    'win.web': ['Browser', 'Browser'], 'win.notes': ['Catatan', 'Notes'], 'win.page': ['Halaman contoh', 'Sample page'],
    'w.min': ['Perkecil', 'Minimize'], 'w.max': ['Maksimalkan', 'Maximize'], 'w.close': ['Tutup', 'Close'],
    'd.start': ['Mulai', 'Start'], 'd.music': ['Musik', 'Music'],
    // Kelompok dan fitur
    'g.music': ['Musik dan film', 'Music and film'], 'g.alerts': ['Pemberitahuan', 'Alerts'], 'g.home': ['Beranda dan widget', 'Home and widgets'], 'g.prod': ['Produktivitas', 'Productivity'],
    'g.health': ['Kesehatan dan ibadah', 'Health and prayer'], 'g.system': ['Sistem dan perawatan', 'System and care'], 'g.ai': ['Asisten AI', 'AI assistant'], 'g.look': ['Tampilan', 'Appearance'],
    'g.dock': ['Dock', 'Dock'], 'g.clock': ['Jam desktop', 'Desktop clock'],
    'f.play': ['Putar lagu', 'Play a song'], 'f.compact': ['Musik ringkas', 'Compact music'], 'f.karaoke': ['Karaoke', 'Karaoke'], 'f.sync': ['Sinkron lirik', 'Lyric timing'],
    'f.film': ['Film di browser', 'Film in the browser'], 'f.full': ['Film layar penuh', 'Full-screen film'],
    'f.message': ['Pesan masuk', 'New message'], 'f.mask': ['Samarkan isi', 'Hide contents'], 'f.call': ['Telepon WhatsApp', 'WhatsApp call'], 'f.volume': ['Volume', 'Volume'],
    'f.bright': ['Kecerahan', 'Brightness'], 'f.charger': ['Colok charger', 'Plug in charger'], 'f.headphone': ['Headphone', 'Headphones'], 'f.privacy': ['Kamera dan mikrofon', 'Camera and mic'],
    'f.home': ['Beranda', 'Home'], 'f.prayer': ['Jadwal sholat', 'Prayer times'], 'f.weather': ['Cuaca', 'Weather'], 'f.week': ['Minggu ini', 'This week'], 'f.water': ['Minum', 'Water'],
    'f.world': ['Jam dunia', 'World clock'], 'f.hijri': ['Hijriah', 'Hijri'], 'f.countdown': ['Hitung mundur', 'Countdown'],
    'f.timer': ['Timer', 'Timer'], 'f.pomodoro': ['Pomodoro', 'Pomodoro'], 'f.tasks': ['Tugas', 'Tasks'], 'f.shelf': ['Saku NIX', 'NIX\'s Pocket'], 'f.focus': ['Mode fokus', 'Focus mode'],
    'f.eyes': ['Istirahat mata', 'Eye break'], 'f.stretch': ['Peregangan', 'Stretch'], 'f.drink': ['Pengingat minum', 'Water reminder'], 'f.prayerTime': ['Waktu sholat', 'Prayer time'], 'f.prayerCount': ['Hitung mundur sholat', 'Prayer countdown'],
    'f.system': ['Sistem', 'System'], 'f.clean': ['Pembersih', 'Clean up'], 'f.trash': ['Recycle Bin', 'Recycle Bin'], 'f.control': ['Kontrol', 'Controls'], 'f.rates': ['Kurs', 'Exchange rates'],
    'f.agentWork': ['Claude bekerja', 'Claude at work'], 'f.agentPage': ['Halaman Asisten', 'Assistant page'], 'f.perm': ['Minta izin', 'Permission request'], 'f.agentDone': ['Selesai', 'Done'],
    'f.themeDefault': ['Tema Bawaan', 'Default theme'], 'f.clear': ['Kaca Clear', 'Clear glass'], 'f.frosted': ['Kaca Frosted', 'Frosted glass'], 'f.blur': ['Kaca Blur', 'Blur glass'],
    'f.brightBg': ['Latar terang', 'Bright background'], 'f.small': ['Kecil', 'Small'], 'f.medium': ['Sedang', 'Medium'], 'f.large': ['Besar', 'Large'], 'f.minimal': ['Minimal', 'Minimal'],
    'f.docked': ['Menempel', 'Docked'], 'f.floating': ['Mengambang', 'Floating'], 'f.autohide': ['Sembunyi otomatis', 'Auto-hide'], 'f.greet': ['NIX menyapa', 'NIX says hi'], 'f.pester': ['Jangan ganggu NIX', 'Don\'t poke NIX'],
    'f.dock': ['Tampilkan dock', 'Show the dock'], 'f.genie': ['Efek Genie', 'Genie effect'], 'f.standard': ['Efek Standar', 'Standard effect'], 'f.dockSize': ['Ukuran dock', 'Dock size'],
    'f.hideTaskbar': ['Sembunyikan taskbar', 'Hide the taskbar'], 'f.dockAuto': ['Dock turun otomatis', 'Dock slips away'], 'f.dockAlways': ['Dock selalu sembunyi', 'Dock always hidden'],
    'f.clock': ['Jam desktop', 'Desktop clock'], 'f.clockMove': ['Geser dan ubah ukuran', 'Move and resize'], 'f.clockLock': ['Kunci jam', 'Lock the clock'],
    'f.clockLine': ['Huruf Garis', 'Line lettering'], 'f.clockBold': ['Huruf Tebal', 'Bold lettering'], 'f.clockRound': ['Huruf Bulat', 'Rounded lettering'],
    // Keterangan
    'c.play': ['Pemutar: Spotify, YouTube di browser, atau aplikasi lain, tanpa menghubungkan akun. Coba tombol putar, lompat, dan judulnya.', 'The player: Spotify, YouTube in the browser, or any other app, with no account to connect. Try play, skip, and the title.'],
    'c.compact': ['Saat tidak dibuka, pulau hanya menampilkan sampul, judul, dan equalizer. Aurora warna sampul menyala di bawahnya.', 'When closed, the island shows just the cover, title, and equalizer. An aurora in the cover\'s colors glows underneath.'],
    'c.karaoke': ['Karaoke Panggung NIX dengan lirik tersinkron. Baris di sini hanya penanda; di aplikasi, liriknya dari LRCLIB bila Anda menyalakannya.', 'NIX\'s Stage karaoke with synced lyrics. The lines here are placeholders; in the app, lyrics come from LRCLIB when you turn it on.'],
    'c.sync': ['Tombol − dan + di bawah NIX menggeser waktu lirik 0,25 detik, dan diingat per lagu.', 'The − and + buttons under NIX shift the lyric timing by 0.25 seconds, remembered per song.'],
    'c.film': ['Film menampilkan nama situsnya, bukan "Chrome", dengan sampul filmnya bila Anda menyalakan fitur sampul.', 'Films show the site\'s name, not "Chrome", with the poster when you turn on posters.'],
    'c.full': ['Pulau tetap terlihat saat film layar penuh, dan klik membawa Anda kembali ke tabnya. Game layar penuh tetap menyembunyikan pulau.', 'The island stays visible during a full-screen film, and a click takes you back to its tab. Full-screen games still hide the island.'],
    'c.message': ['Notifikasi WhatsApp, Telegram, Outlook, dan lainnya: NIX kaget, kartunya pergi sendiri. Klik kartu membuka aplikasinya.', 'WhatsApp, Telegram, Outlook, and more: NIX is startled, and the card leaves on its own. Clicking it opens the app.'],
    'c.masked': ['Mode presentasi: isi notifikasi disamarkan.', 'Presenting: notification contents are hidden.'],
    'c.call': ['Telepon masuk dari WhatsApp desktop bisa dijawab atau ditolak dari pulau. Klik salah satunya.', 'Incoming WhatsApp desktop calls can be answered or declined from the island. Click one.'],
    'c.volume': ['Indikator volume menggantikan pop-up Windows. Ukurannya sama dengan semua indikator lain.', 'The volume indicator replaces the Windows pop-up. It is the same size as every other indicator.'],
    'c.bright': ['Kecerahan: matahari naik di lereng titik, dan pulau ikut diterangi.', 'Brightness: a sun climbs a slope of dots, and the island lights up with it.'],
    'c.charger': ['Colok charger: cairan energi mengisi badan pulau sampai persen baterai.', 'Plug in the charger: energy fills the island up to the battery level.'],
    'c.headphone': ['Headphone tersambung: nama perangkat dan baterainya.', 'Headphones connected: the device name and its battery.'],
    'c.privacyOn': ['Titik kecil di tepi pulau tanda kamera dan mikrofon sedang dipakai aplikasi. Klik lagi untuk mematikannya.', 'Small dots on the island mean an app is using your camera and microphone. Click again to turn them off.'],
    'c.privacyOff': ['Indikator mati.', 'Indicator off.'],
    'c.home': ['Beranda: dua widget pilihan Anda. Klik kartunya untuk mengganti widget.', 'Home: two widgets of your choice. Click a card to switch widgets.'],
    'c.prayer': ['Jadwal sholat 51 kota, dihitung di perangkat dengan kriteria Kemenag, dengan langit yang bergerak.', 'Prayer times for 51 Indonesian cities, calculated on the device with the Kemenag criteria, under a moving sky.'],
    'c.weather': ['Cuaca: kartunya menjadi jendela langit, dengan hujan, awan, atau kilat. Mati secara bawaan.', 'Weather: the card becomes a window on the sky, with rain, clouds, or lightning. Off by default.'],
    'c.week': ['Minggu ini: tabung hari ini terisi setinggi tugas yang selesai.', 'This week: today\'s tube fills as high as the tasks you finish.'],
    'c.water': ['Minum: klik "+1 gelas", dan airnya naik.', 'Water: click "+1 glass" and the water rises.'],
    'c.world': ['Jam dunia: dua kota, jam analog terang siang dan gelap malam.', 'World clock: two cities, analog dials that are light by day and dark at night.'],
    'c.hijri': ['Kalender Hijriah dengan fase bulan yang digambar sesuai hari ini.', 'The Hijri calendar, with today\'s moon phase drawn in.'],
    'c.countdown': ['Hitung mundur ke tanggal pilihan Anda, dengan papan flip.', 'A countdown to the date you pick, on a flip board.'],
    'c.timer': ['Klik pita ukur atau putar roda mouse di atasnya, satu menit per garis, lalu tekan putar.', 'Click the ruler or scroll over it, one minute per line, then press play.'],
    'c.pomodoro': ['Pomodoro 25/5, istirahat 15 menit setelah 4 sesi, dan mode fokus menyala otomatis. Air di kolam NIX surut mengikuti sisa waktu.', 'Pomodoro 25/5, a 15-minute break after 4 sessions, and focus mode turns on by itself. The water in NIX\'s pool drains with the time left.'],
    'c.tasks': ['Klik "+ Tambah", ketik "kirim laporan besok jam 9", lalu Enter. Pulo membaca waktunya sendiri.', 'Click "+ Add", type "send the report tomorrow at 9", then Enter. Pulo reads the time by itself.'],
    'c.shelf': ['Saku NIX: seret file, teks, tautan, atau gambar ke pulau, lalu seret keluar ke aplikasi lain. Klik "+ Contoh" untuk menjatuhkan item.', 'NIX\'s Pocket: drop files, text, links, or images on the island, then drag them out to another app. Click "+ Sample" to drop an item.'],
    'c.focusOn': ['Mode fokus: NIX tidur, dan notifikasi ditahan sampai Anda selesai. Klik lagi untuk mematikannya.', 'Focus mode: NIX sleeps, and notifications wait until you are done. Click again to turn it off.'],
    'c.focusOff': ['Mode fokus mati.', 'Focus mode off.'],
    'c.eyes': ['Tiap 20 menit, pemandangan senja mengajak mata memandang jauh selama 20 detik, tanpa bunyi.', 'Every 20 minutes, a dusk scene invites your eyes to look far away for 20 seconds, without a sound.'],
    'c.stretch': ['Tiap jam, NIX ikut meregang mengikuti tiga langkah gerakan.', 'Every hour, NIX stretches along with you in three steps.'],
    'c.drink': ['Target minum dibagi rata di jam aktif Anda. Ada mode puasa yang menjedanya sampai Maghrib.', 'Your water goal is spread across your active hours. A fasting mode pauses it until Maghrib.'],
    'c.prayerTime': ['"Adzan tanpa suara": langit berganti sesuai waktunya, siluet masjid, dan gelombang dari menara. Bunyi hanya notifikasi pendek.', 'A "silent adhan": the sky changes with the time of day, a mosque silhouette, and waves from the minaret. The only sound is a short chime.'],
    'c.prayerCount': ['Sebelum waktu sholat, sumbu cahaya terbakar di tepi pulau menuju waktunya.', 'Before prayer time, a fuse of light burns along the island toward it.'],
    'c.system': ['CPU, RAM, dan disk, dibaca hanya selama halaman ini terlihat.', 'CPU, RAM, and disk, read only while this page is visible.'],
    'c.clean': [function (v) { return 'Pembersih: NIX menyedot ' + v + ' GB file sementara dan cache yang aman dihapus. Di simulator ini hanya contoh; tidak ada file Anda yang disentuh.'; }, function (v) { return 'Clean up: NIX gobbles ' + v + ' GB of temporary files and caches that are safe to remove. In this simulator it is only an example; none of your files are touched.'; }],
    'c.cleanDone': ['Sudah bersih.', 'Already clean.'],
    'c.trash': [function (n) { return 'Recycle Bin: "' + n + '" dikembalikan ke folder asalnya. Di aplikasi Anda juga bisa menghapus per file atau mengosongkan semuanya.'; }, function (n) { return 'Recycle Bin: "' + n + '" goes back to its folder. In the app you can also delete files one by one or empty it all.'; }],
    'c.trashEmpty': ['Recycle Bin kosong.', 'The Recycle Bin is empty.'],
    'c.control': ['Yang biasanya di pojok taskbar: Wi-Fi, Bluetooth, baterai, volume, kunci, tidur, mulai ulang, matikan. Coba ikon suaranya.', 'What usually sits in the taskbar corner: Wi-Fi, Bluetooth, battery, volume, lock, sleep, restart, shut down. Try the speaker.'],
    'c.rates': ['Kurs seminggu terakhir, diperbarui sekali sehari. Klik jumlahnya untuk mengonversi. Mati secara bawaan.', 'The last week of rates, updated once a day. Click an amount to convert. Off by default.'],
    'c.agentWork': ['Pulau menampilkan bahwa Claude Code sedang bekerja, langkahnya, dan lama kerjanya.', 'The island shows that Claude Code is working, its current step, and how long it has been at it.'],
    'c.agentPage': ['Jejak kaki per butir daftar tugas, dan langkah terakhir yang dikerjakan.', 'A paw print per to-do item, and the latest step.'],
    'c.perm': ['Izin bisa dijawab langsung dari pulau, tanpa berpindah jendela.', 'Permission requests can be answered right from the island, without switching windows.'],
    'c.agentDone': ['Selesai: cap telapak kaki kucing, dengan mata NIX berbinar.', 'Done: a cat paw stamp, with NIX\'s eyes sparkling.'],
    'c.themeDefault': ['Bawaan: hitam seperti notch sungguhan, dengan telinga yang menyatu ke tepi layar.', 'Default: black like a real notch, with ears that blend into the screen edge.'],
    'c.clear': ['Liquid Glass Clear: tembus tanpa blur, selalu agak gelap supaya teks terbaca.', 'Liquid Glass Clear: see-through with no blur, always slightly dark so text stays readable.'],
    'c.frosted': ['Liquid Glass Frosted: buram dan terang.', 'Liquid Glass Frosted: blurred and bright.'],
    'c.blur': ['Liquid Glass Blur: buram dan gelap, teksnya paling mudah dibaca.', 'Liquid Glass Blur: blurred and dark, the easiest to read.'],
    'c.brightBg': ['Di aplikasi, kaca menggelap sendiri di atas halaman terang. Klik lagi untuk kembali.', 'In the app, the glass darkens by itself over bright pages. Click again to go back.'],
    'c.size': [function (n) { return 'Ukuran ' + n + '.'; }, function (n) { return n + ' size.'; }],
    'c.minimal': ['Minimal: jam di tengah, baterai di kiri, volume atau equalizer di kanan.', 'Minimal: the clock in the middle, battery on the left, volume or equalizer on the right.'],
    'c.docked': ['Menempel di tepi atas layar.', 'Docked to the top edge of the screen.'], 'c.floating': ['Mengambang 10 px di bawah tepi layar, tanpa telinga.', 'Floating 10 px below the screen edge, without ears.'],
    'c.autohideOn': ['Saat diam, pulau naik keluar layar. Aktivitas berikutnya memunculkannya lagi. Klik lagi untuk mematikannya.', 'When idle, the island slides off the screen. The next activity brings it back. Click again to turn it off.'],
    'c.autohideOff': ['Sembunyi otomatis mati.', 'Auto-hide off.'],
    'c.greet': ['Saat Anda kembali ke komputer, NIX menyapa dengan ringkasan hari ini.', 'When you come back to your PC, NIX says hi with a summary of your day.'],
    'c.pester': ['Pulau kosong dengan NIX. Sekarang klik wajah NIX berulang kali.', 'An empty island with NIX. Now click NIX\'s face again and again.'],
    'c.pestering': ['Mode ganggu: klik NIX berulang kali. Ia terkejut, berkeringat, sebal, lalu marah. Berhenti mengganggu, dan ia tenang lagi.', 'Poke mode: keep clicking NIX. It gets startled, sweaty, annoyed, then angry. Stop, and it calms down.'],
    'c.dockOn': ['Dock menyala, di atas taskbar Windows. Arahkan kursor: ikonnya membesar mengikuti kursor.', 'The dock is on, above the Windows taskbar. Hover it: icons grow under your cursor.'],
    'c.dockOff': ['Dock dimatikan.', 'Dock off.'],
    'c.genieOpen': ['Jendela keluar lagi dari ikonnya. Klik ikon Browser di dock juga bisa.', 'The window flows back out of its icon. Clicking the Browser icon in the dock works too.'],
    'c.genieMin': ['Jendela tersedot ke ikonnya. Klik ikon Browser di dock untuk membukanya lagi.', 'The window pours into its icon. Click the Browser icon in the dock to open it again.'],
    'c.standard': ['Efek Standar: animasi Windows biasa, tanpa Genie, dan dock tidak menyimpan gambar jendela. Dipilih di Pengaturan.', 'Standard effect: the usual Windows animation, no Genie, and the dock keeps no window pictures. Chosen in Settings.'],
    'c.dockSize': [function (n) { return 'Ukuran ikon ' + n + ' px. Di aplikasi lewat slider, dari 24 sampai 56 px.'; }, function (n) { return 'Icon size ' + n + ' px. In the app it is a slider from 24 to 56 px.'; }],
    'c.hideTaskbarOn': ['Taskbar Windows hilang, dan dock menggantikannya sepenuhnya. Jam, baterai, dan volume pindah ke halaman Kontrol.', 'The Windows taskbar is gone, and the dock takes its place completely. Clock, battery, and volume move to the Controls page.'],
    'c.hideTaskbarOff': ['Taskbar kembali.', 'The taskbar is back.'],
    'c.dockAuto': ['Jendela dimaksimalkan menimpa dock, jadi dock turun. Sentuhkan kursor ke tepi bawah panggung untuk memanggilnya.', 'A maximized window covers the dock, so it slips down. Touch the bottom edge of the stage to call it back.'],
    'c.dockAlwaysOn': ['Selalu sembunyi: dock turun juga di desktop, dan naik saat kursor menyentuh tepi bawah. Klik lagi untuk kembali ke bawaan.', 'Always hidden: the dock slips down on the desktop too, and rises when your cursor touches the bottom edge. Click again for the default.'],
    'c.dockAlwaysOff': ['Bawaan: dock hanya turun saat tertimpa jendela.', 'Default: the dock slips down only when a window covers it.'],
    'c.dockUp': ['Kursor menyentuh tepi bawah layar: dock naik lagi.', 'The cursor touched the bottom edge: the dock rises again.'],
    'c.clockOn': ['Nama hari, tanggal, dan jam di desktop, di bawah semua jendela. Jendela contoh diperkecil supaya desktopnya terlihat. Klik lagi untuk mematikannya.', 'The day, date, and time on the desktop, below every window. The sample windows are minimized so the desktop shows. Click again to turn it off.'],
    'c.clockOff': ['Jam desktop dimatikan.', 'Desktop clock off.'],
    'c.clockMove': ['Tarik bagian tengah jam untuk menggeser, tepi atas atau bawahnya untuk mengubah ukuran. Klik dua kali di tepi untuk letak dan ukuran semula.', 'Drag the middle of the clock to move it, its top or bottom edge to resize. Double-click an edge to reset.'],
    'c.clockLockOn': ['Dikunci: jam tidak bisa digeser atau diubah ukurannya, dan klik tembus ke desktop. Klik lagi untuk membukanya.', 'Locked: the clock cannot be moved or resized, and clicks pass through to the desktop. Click again to unlock.'],
    'c.clockLockOff': ['Kunci dibuka: jam bisa digeser lagi.', 'Unlocked: the clock can be moved again.'],
    'c.clockStyle': [function (n) { return 'Gaya huruf ' + n + '. Kerangkanya sama, yang berubah tebal, jarak, dan celah hurufnya.'; }, function (n) { return n + ' lettering. Same skeleton; the weight, spacing, and gaps change.'; }],
    'c.clockReset': ['Klik dua kali di tepinya: letak dan ukuran semula.', 'Double-clicked the edge: back to the original place and size.'],
    // Tombol di dalam pulau
    'a.play': ['Lagu diputar: aurora warna sampul menyala di bawah pemutar.', 'Playing: an aurora in the cover\'s colors glows under the player.'],
    'a.pause': ['Dijeda: aurora mati, dan pulau kembali diam kalau sembunyi otomatis menyala.', 'Paused: the aurora fades, and the island goes quiet if auto-hide is on.'],
    'a.next': [function (n) { return 'Lagu berganti ke ' + n + '. Warna aurora ikut sampulnya.'; }, function (n) { return 'Now playing ' + n + '. The aurora follows its cover.'; }],
    'a.prev': [function (n) { return 'Kembali ke ' + n + '.'; }, function (n) { return 'Back to ' + n + '.'; }],
    'a.vol': ['Klik ikon suara memunculkan slider di tempat yang sama. Klik batangnya untuk mengubah volume.', 'Clicking the speaker swaps in a slider. Click the bars to change the volume.'],
    'a.karaokeOn': ['Karaoke Panggung NIX. Baris yang dinyanyikan terisi dari kiri. Tombol − dan + menggeser waktu lirik, diingat per lagu. (Baris di sini hanya penanda.)', 'NIX\'s Stage karaoke. The sung line fills from the left. The − and + buttons shift the lyric timing, remembered per song. (These lines are placeholders.)'],
    'a.karaokeOff': ['Kembali ke pemutar.', 'Back to the player.'],
    'a.source': ['Klik judul membawa Anda kembali ke tab atau aplikasi sumbernya.', 'Clicking the title takes you back to its tab or app.'],
    'a.water': ['Satu gelas tercatat. Airnya naik di widget Minum.', 'One glass logged. The water rises in the Water widget.'],
    'a.timer': [function (n) { return 'Timer ' + n + ' menit berjalan. Air di kolam NIX surut mengikuti sisa waktu.'; }, function (n) { return 'A ' + n + '-minute timer is running. The water in NIX\'s pool drains with the time left.'; }],
    'a.pick': [function (n) { return n + ' menit. Tekan putar untuk mulai.'; }, function (n) { return n + ' minutes. Press play to start.'; }],
    'a.timerStop': ['Timer dihentikan.', 'Timer stopped.'], 'a.timerPause': ['Dijeda: NIX tertidur di kolamnya.', 'Paused: NIX dozes off in the pool.'],
    'a.shelfAdd': ['Item masuk Saku NIX dan menggantung di jemuran. Di aplikasi, Anda menyeret file, teks, tautan, atau gambar ke pulau.', 'The item drops into NIX\'s Pocket and hangs on the line. In the app, you drag files, text, links, or images onto the island.'],
    'a.shelfOpen': [function (n) { return '"' + n + '": klik membuka item, seret keluar memindahkannya ke aplikasi lain.'; }, function (n) { return '"' + n + '": click to open it, drag it out to move it into another app.'; }],
    'a.taskDone': ['Tugas selesai. NIX mencapnya dengan telapak kakinya.', 'Task done. NIX stamps it with a paw.'], 'a.taskOpen': ['Tugas dibuka lagi.', 'Task reopened.'],
    'a.taskAdded': [function (w) { return 'Tugas masuk, waktunya terbaca dari kalimat Anda: ' + w + '. Saat jatuh tempo, pulau mengetuk.'; }, function (w) { return 'Task added, with the time read from your sentence: ' + w + '. When it is due, the island taps you.'; }],
    'a.taskDeleted': ['Tugas dihapus.', 'Task deleted.'],
    'a.setting': [function (n) { return n + ': klik kotak ini di aplikasi membuka halaman pengaturan Windows-nya.'; }, function (n) { return n + ': in the app, this opens its Windows settings page.'; }],
    'a.power2': [function (n) { return n + ': di aplikasi butuh dua klik supaya tidak salah tekan. Di simulator tidak terjadi apa-apa.'; }, function (n) { return n + ': in the app this needs two clicks so it is never pressed by accident. Nothing happens in the simulator.'; }],
    'a.power1': [function (n) { return n + ': di aplikasi langsung berjalan. Di simulator tidak terjadi apa-apa.'; }, function (n) { return n + ': in the app this runs right away. Nothing happens in the simulator.'; }],
    'a.offset': [function (v) { return 'Lirik digeser ' + v + ' detik untuk lagu ini.'; }, function (v) { return 'Lyrics shifted ' + v + ' seconds for this song.'; }],
    'a.widget': [function (n) { return 'Widget diganti: ' + n + '. Klik lagi untuk widget berikutnya.'; }, function (n) { return 'Widget switched to ' + n + '. Click again for the next one.'; }],
    'a.stretchDone': ['Selesai. NIX menandainya, dan pengingat berikutnya datang sejam lagi.', 'Done. NIX marks it, and the next reminder comes in an hour.'],
    'a.callOk': ['Dijawab: jendela panggilan WhatsApp muncul. Pulo menekan tombol aslinya.', 'Answered: the WhatsApp call window appears. Pulo presses its real button.'],
    'a.callNo': ['Ditolak dari pulau, tanpa membuka WhatsApp.', 'Declined from the island, without opening WhatsApp.'],
    'a.allow': ['Diizinkan. Jawabannya langsung dikirim ke Claude Code.', 'Allowed. The answer goes straight to Claude Code.'], 'a.deny': ['Ditolak. Claude Code menerima jawabannya.', 'Denied. Claude Code gets the answer.'],
    'a.rate': [function (v) { return 'Hasil konversi ' + v + ' disalin, seperti di aplikasi.'; }, function (v) { return 'Converted ' + v + ' and copied, like in the app.'; }],
    'a.full': ['Kembali dari layar penuh.', 'Back from full screen.'],
    'a.start': ['Membuka menu Start Windows, seperti tombol aslinya.', 'Opens the Windows Start menu, like the real button.'], 'a.pulo': ['Membuka Pengaturan Pulo.', 'Opens Pulo Settings.'],
    'a.dockMusic': ['Aplikasi musik dibuka, dan pulaunya langsung menjadi pemutar.', 'The music app opens, and the island turns into the player.'],
    'a.dockClosed': ['Aplikasi tertutup: ikon memantul dan jendelanya keluar dari ikon.', 'The app was closed: the icon bounces and its window flows out.'],
    'a.dockMin': ['Efek Genie: jendela keluar lagi dari ikonnya.', 'Genie effect: the window flows back out of its icon.'],
    'a.dockFront': ['Jendela dibawa ke depan.', 'The window comes to the front.'], 'a.dockGenie': ['Efek Genie: jendela di depan tersedot ke ikonnya.', 'Genie effect: the front window pours into its icon.'],
    'a.winMin': ['Diperkecil dari tombol jendelanya sendiri: Genie tetap jalan menuju ikonnya.', 'Minimized from its own button: the Genie still runs toward its icon.'],
  });

  // Ikon garis 24 × 24 (gaya Fluent). Yang berisi memakai fill.
  var LINE = {
    speaker: 'M4 9.5h3l4.5-4v13L7 14.5H4z M15 9a4 4 0 0 1 0 6',
    mic: 'M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z M6.5 11a5.5 5.5 0 0 0 11 0 M12 16.5V20',
    wifi: 'M3 9.5a13 13 0 0 1 18 0 M6 12.8a8.5 8.5 0 0 1 12 0 M9 16a4 4 0 0 1 6 0 M12 19.2h.01',
    bt: 'M7 7.5l10 9-5 4v-17l5 4-10 9',
    batt: 'M3.5 8h15a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z M21.5 10.5v3',
    lock: 'M6.5 10.5h11v9h-11z M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5',
    moon: 'M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z',
    restart: 'M5 12a7 7 0 1 0 2.1-5 M5 4v4h4',
    power: 'M12 3.5v8 M7.2 6.4a7 7 0 1 0 9.6 0',
    chev: 'M10 7l5 5-5 5', left: 'M14 7l-5 5 5 5', right: 'M10 7l5 5-5 5',
    trash: 'M5 7h14 M9.5 7V5h5v2 M7 7l1 12.5h8L17 7',
    broom: 'M14.5 4.5l5 5 M17 7l-6 6 M11 13c-3-1-6 1-6.5 6.5 5.5-.5 7.5-3.5 6.5-6.5z',
    clip: 'M14 13.5l-3-3 M8 6l2 2 M5 20l4-1 10-10-3-3L6 16z',
    cloud: 'M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.2 11 3.5 3.5 0 0 0 7 18z',
    mosque: 'M5 20V12a7 7 0 0 1 14 0v8 M3 20h18 M12 5V3 M10 20v-4a2 2 0 0 1 4 0v4',
    plus: 'M12 5v14 M5 12h14', close: 'M6.5 6.5l11 11 M17.5 6.5l-11 11', check: 'M5 12.5l4.5 4.5L19 7.5',
    file: 'M7 3.5h6.5L18 8v12.5H7z M13 3.5V8h5',
    link: 'M10 14a4 4 0 0 0 5.7.2l3-3a4 4 0 0 0-5.7-5.7l-1.4 1.4 M14 10a4 4 0 0 0-5.7-.2l-3 3a4 4 0 0 0 5.7 5.7l1.4-1.4',
    image: 'M4 5.5h16v13H4z M4 16l5-5 4 4 2.5-2.5L20 17 M15.5 9.5h.01',
    text: 'M5 6.5h14 M5 11h14 M5 15.5h9',
    drop: 'M12 3.5c3 3.6 5.5 6.8 5.5 10a5.5 5.5 0 0 1-11 0c0-3.2 2.5-6.4 5.5-10z',
  };
  var FILL = {
    music: 'M9 4.6V15a3.5 3.5 0 1 0 2 3.2V8.4l8-1.9v6.1a3.5 3.5 0 1 0 2 3.2V2z',
    cat: 'M4 10.5 5 3.6c.1-.7.9-1 1.4-.6l3.2 2.7a5 5 0 0 1 4.8 0l3.2-2.7c.5-.4 1.3-.1 1.4.6l1 6.9V15a8 7 0 0 1-16 0z',
    paw: 'M12 12.2c-2.9 0-6.2 3-6.2 6 0 1.8 1.3 2.8 2.9 2.8 1.2 0 2.2-.6 3.3-.6s2.1.6 3.3.6c1.6 0 2.9-1 2.9-2.8 0-3-3.3-6-6.2-6ZM2.5 11.2a2.1 2.7 0 1 1 4.2 0a2.1 2.7 0 1 1-4.2 0ZM6.9 6.6a2.1 2.7 0 1 1 4.2 0a2.1 2.7 0 1 1-4.2 0ZM12.9 6.6a2.1 2.7 0 1 1 4.2 0a2.1 2.7 0 1 1-4.2 0ZM17.3 11.2a2.1 2.7 0 1 1 4.2 0a2.1 2.7 0 1 1-4.2 0Z',
    prev: 'M6 5.5h2.2v13H6z M19 6.3v11.4c0 .8-.9 1.3-1.6.8l-8-5.7a1 1 0 0 1 0-1.6l8-5.7c.7-.5 1.6 0 1.6.8z',
    next: 'M15.8 5.5H18v13h-2.2z M5 6.3v11.4c0 .8.9 1.3 1.6.8l8-5.7a1 1 0 0 0 0-1.6l-8-5.7C5.9 5 5 5.5 5 6.3z',
    play: 'M8 5.2v13.6c0 .8.9 1.3 1.6.8l10-6.8a1 1 0 0 0 0-1.6l-10-6.8C8.9 3.9 8 4.4 8 5.2z',
    pause: 'M7 5h3.2v14H7zm6.8 0H17v14h-3.2z',
    bolt: 'M13 2 5 14h6l-1 8 9-13h-6z',
    claude: 'M13.5 12 13.1 2.6 12 2 10.9 2.6 10.5 12zM13.21 12.88 18.42 5.04 17.88 3.91 16.64 3.75 10.79 11.12zM12.46 13.43 21.28 10.14 21.51 8.91 20.6 8.05 11.54 10.57zM11.54 13.43 20.6 15.95 21.51 15.09 21.28 13.86 12.46 10.57zM10.79 12.88 16.64 20.25 17.88 20.09 18.42 18.96 13.21 11.12zM10.5 12 10.9 21.4 12 22 13.1 21.4 13.5 12zM10.79 11.12 5.58 18.96 6.12 20.09 7.36 20.25 13.21 12.88zM11.54 10.57 2.72 13.86 2.49 15.09 3.4 15.95 12.46 13.43zM12.46 10.57 3.4 8.05 2.49 8.91 2.72 10.14 11.54 13.43zM13.21 11.12 7.36 3.75 6.12 3.91 5.58 5.04 10.79 12.88z',
    stopwatch: 'M9 2h6v2H9zm3 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm1 8.4-4 2-1-1.8 3-1.5V9h2z',
    archive: 'M3 5h18v5H3zm2 6h14v9H5zm4 2v2h6v-2z',
    checklist: 'M4 5h4v4H4zm6 1h10v2H10zM4 11h4v4H4zm6 1h10v2H10zM4 17h4v4H4zm6 1h10v2H10z',
    chip: 'M9 2h2v2h2V2h2v2h2a3 3 0 0 1 3 3v2h2v2h-2v2h2v2h-2v2a3 3 0 0 1-3 3h-2v2h-2v-2h-2v2H9v-2H7a3 3 0 0 1-3-3v-2H2v-2h2v-2H2V9h2V7a3 3 0 0 1 3-3h2Zm-1 6v8h8V8Z',
    sliders: 'M3 5h9v2H3zM16 5h5v2h-5zM14 3a3 3 0 1 1 0 6 3 3 0 0 1 0-6ZM3 17h11v2H3zM20 17h1v2h-1zM17 15a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z',
    coin: 'M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Zm1 4h-2v1.1A3 3 0 0 0 8.5 10c0 1.9 1.6 2.6 3.2 3 1.3.3 1.8.6 1.8 1.2s-.6 1-1.5 1c-1 0-1.6-.5-1.7-1.3H8.3c.1 1.6 1.2 2.7 2.7 3V18h2v-1.1a3 3 0 0 0 2.5-2.8c0-2-1.6-2.6-3.2-3-1.3-.3-1.8-.6-1.8-1.1s.5-1 1.4-1 1.4.5 1.5 1.1h2c-.1-1.4-1-2.6-2.4-2.9z',
  };
  function line(name, size, color, width) {
    return '<svg class="ic" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="' + (color || 'currentColor') + '" stroke-width="' + (width || 1.7) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + LINE[name] + '"/></svg>';
  }
  function fill(name, size, color) {
    return '<svg class="ic" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="' + (color || 'currentColor') + '" aria-hidden="true"><path d="' + FILL[name] + '"/></svg>';
  }
  // Ikon baris halaman: font ikon Windows (sama dengan aplikasinya) bila terpasang di komputer pengunjung, gambar sendiri bila tidak.
  var FLUENT = (function () {
    try {
      var c = document.createElement('canvas').getContext('2d');
      c.font = '20px monospace';
      var plain = c.measureText('').width;
      c.font = '20px "Segoe Fluent Icons", "Segoe MDL2 Assets", monospace';
      return c.measureText('').width !== plain;
    } catch (e) { return false; }
  })();
  function glyph(code, fallback, size, color) {
    if (FLUENT) return '<span class="fg" style="font-size:' + (size - 1) + 'px;color:' + color + '" aria-hidden="true">' + code + '</span>';
    return fill(fallback, size - 2, color);
  }
  function nix(face, head) {
    var k = head / 200;
    return '<img class="nxs" src="assets/nix-' + face + '.png" alt="" style="width:' + 310 * k + 'px;height:' + 280 * k + 'px;margin:' + -40 * k + 'px ' + -40 * k + 'px" data-nix="1">';
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function hex(c) { return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]; }
  function rgba(c, a) { var v = hex(c); return 'rgba(' + v[0] + ',' + v[1] + ',' + v[2] + ',' + a + ')'; }
  function lighten(c, k) { var v = hex(c); return 'rgb(' + v.map(function (x) { return Math.round(x + (255 - x) * k); }).join(',') + ')'; }
  function darken(c, k) { var v = hex(c); return 'rgb(' + v.map(function (x) { return Math.round(x * k); }).join(',') + ')'; }
  // Lencana fitur seperti PageParts.Badge: kotak bergradasi, simbol putih, tepi tipis terang.
  function badge(color, inner, size) {
    size = size || 20;
    return '<span class="bdg" style="width:' + size + 'px;height:' + size + 'px;border-radius:' + Math.round(size * .3) + 'px;background:linear-gradient(' + lighten(color, .2) + ',' + darken(color, .72) + ')">' + inner + '</span>';
  }

  var COLOR = { music: '#FF2D55', timer: '#7D7AFF', shelf: '#00C7BE', rates: '#D4A017', system: '#7D7AFF', control: '#32ADE6', agent: '#D97757' };
  function accent() { return s.theme === 'glass' ? '#9ADCFF' : '#30D158'; }
  function colorOf(page) { return COLOR[page] || accent(); }

  var TRACKS = [
    { t: 'Island Breeze', a: 'The Paper Cats', src: 'YouTube', c: 'c0', a1: '#FF5C8A', a2: '#7A3CFF', len: 222 },
    { t: 'Midnight Pier', a: 'Lumen Coast', src: 'Spotify', c: 'c1', a1: '#58C7FF', a2: '#3B5BDB', len: 247 },
    { t: 'Kunyit Sky', a: 'Arang & Santan', src: 'YouTube', c: 'c2', a1: '#F2B21B', a2: '#E8590C', len: 198 },
  ];
  var s = {
    theme: 'hitam', kind: 'Blur', size: 'medium', pos: 'dock', autoHide: false,
    open: false, page: 'music', pin: false, alert: null, face: 'neutral', pestered: 0,
    media: true, film: false, track: 0, playing: true, posn: 46, vol: 62, volOpen: false, karaoke: false, offset: 0,
    timer: null, pick: 25, focus: false, water: 3, widgetL: 'prayer', widgetR: 'weather',
    tasks: [{ t: EN ? 'Send the report' : 'Kirim laporan', w: T('tomorrow') + ' 09.00', d: false }, { t: EN ? 'Call the client' : 'Telepon klien', w: T('today') + ' 15.00', d: false }, { t: EN ? 'Buy coffee' : 'Beli kopi', w: T('today') + ' 10.00', d: true }],
    taskSel: 0, taskDel: false, taskAdd: false,
    shelf: [{ n: 'laporan.pdf', k: 'file' }, { n: 'pantai.jpg', k: 'image' }, { n: 'pulo.app', k: 'link' }], shelfN: 0,
    cpu: 12, ram: 58, disk: 30, dust: 2.4, trash: [{ n: 'catatan-lama.txt' }, { n: 'gambar-uji.png' }],
    agent: false, agentStep: 3, cam: false, mic: false, masked: false, rates: false, rateAmt: 100, fullscreen: false,
    dock: false, iconSize: 32, hideTaskbar: false, tucked: false, dockAlways: false, effect: 'genie',
    wins: { web: 'open', notes: 'closed' }, front: 'web', max: false, bright: false,
    clock: false, clockLock: false, clockScale: 1, clockCx: .5, clockTop: null, clockStyle: 'line',
  };
  var SIZES = { small: { w: 150, h: 34, cw: 380, cmp: 34, head: 26 }, medium: { w: 196, h: 44, cw: 420, cmp: 44, head: 30 }, large: { w: 224, h: 50, cw: 460, cmp: 50, head: 34 }, minimal: { w: 120, h: 18, cw: 380, cmp: 34, head: 26 } };
  var PAGES = ['music', 'agent', 'home', 'timer', 'shelf', 'tasks', 'rates', 'system', 'control'];
  function pages() { return PAGES.filter(function (p) { return (p !== 'music' || s.media) && (p !== 'agent' || s.agent) && (p !== 'rates' || s.rates); }); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function mmss(v) { v = Math.max(0, Math.floor(v)); return Math.floor(v / 60) + ':' + pad(v % 60); }
  var SEP = EN ? ':' : '.';
  function clock(d) { d = d || new Date(); return pad(d.getHours()) + SEP + pad(d.getMinutes()); }
  function greeting() { return T('greet', new Date().getHours()); }
  function dateLine() { var d = new Date(); return d.toLocaleDateString(LOC, { weekday: 'short', day: 'numeric', month: 'short' }).replace(/\.$/, '') + ' · ' + clock(d); }
  function track() { return s.film ? { t: T('filmTitle'), a: 'situsfilm.id', src: 'situsfilm.id', c: 'c3', a1: '#C0392B', a2: '#2B2B33', len: 3720 } : TRACKS[s.track]; }
  function dec(v) { return I.num(v, 1); }

  // Sholat (Jakarta, November; perkiraan): sholat berikutnya dari jam pengunjung.
  var PRAYER_AT = [[4, 7], [11, 41], [15, 2], [17, 52], [19, 4]];
  function nextPrayer() {
    var now = new Date(), mins = now.getHours() * 60 + now.getMinutes();
    for (var i = 0; i < 5; i++) { var m = PRAYER_AT[i][0] * 60 + PRAYER_AT[i][1]; if (m > mins) return { i: i, at: m, left: m - mins }; }
    return { i: 0, at: PRAYER_AT[0][0] * 60 + PRAYER_AT[0][1], left: 24 * 60 - mins + PRAYER_AT[0][0] * 60 + PRAYER_AT[0][1] };
  }

  // Bagian halaman, seperti PageParts.Header dan LiveTabs.
  function head(page, title, sub, right) {
    var g = { music: fill('music', 12, '#fff'), timer: fill('stopwatch', 12, '#fff'), shelf: fill('archive', 12, '#fff'), tasks: fill('checklist', 12, '#fff'), system: fill('chip', 12, '#fff'), control: fill('sliders', 12, '#fff'), rates: fill('coin', 12, '#fff') }[page];
    return '<div class="hd">' + badge(colorOf(page), g) + '<b>' + title + '</b>' + (sub ? '<span class="mut">' + sub + '</span>' : '') + (right ? '<span class="hd-r">' + right + '</span>' : '') + '</div>';
  }
  function tabs() {
    return '<div class="tabs">' + pages().map(function (p) {
      var on = s.page === p, c = on ? colorOf(p) : 'var(--muted)', icon;
      if (p === 'music') icon = fill('music', 16, c);
      else if (p === 'home') icon = fill('cat', 16, c);
      else if (p === 'agent') icon = fill('paw', 16, c);
      else icon = glyph({ timer: '', tasks: '', shelf: '', system: '', control: '', rates: '' }[p], { timer: 'stopwatch', tasks: 'checklist', shelf: 'archive', system: 'chip', control: 'sliders', rates: 'coin' }[p], 16, c);
      var style = on ? ' style="background:linear-gradient(' + rgba(colorOf(p), .29) + ',' + rgba(colorOf(p), .12) + ');box-shadow:inset 0 0 0 1px ' + lighten(colorOf(p), .3).replace('rgb', 'rgba').replace(')', ',.38)') + '"' : '';
      return '<button type="button" data-act="page:' + p + '" class="' + (on ? 'on' : '') + '"' + style + ' aria-label="' + T('p.' + p) + '">' + icon + (on ? '<span>' + T('p.' + p) + '</span>' : '') + '</button>';
    }).join('') + '</div>';
  }
  function eq(color) { return '<span class="eq' + (s.playing ? '' : ' stop') + '" style="color:' + (color || track().a1) + '"><i></i><i></i><i></i><i></i></span>'; }
  function card(inner, extra, act) { return '<div class="card' + (act ? ' tap' : '') + (extra ? ' ' + extra : '') + '"' + (act ? ' data-act="' + act + '"' : '') + '>' + inner + '</div>'; }

  // Widget Beranda: tiap kartu adegan sendiri (WidgetScenes).
  var WIDGETS = ['prayer', 'weather', 'week', 'water', 'world', 'hijri', 'countdown'];
  function widget(name) {
    var t = '', art = '', bg = '';
    if (name === 'prayer') {
      var n = nextPrayer(), night = n.i === 0 || n.i === 4 && n.left > 0 && new Date().getHours() >= 18, at = PRAYER_AT[n.i];
      bg = night ? 'linear-gradient(160deg,#12204A,#0A1230)' : 'linear-gradient(160deg,#2F6BD8,#123E8C)';
      t = '<span class="wg-l">' + line('mosque', 12, '#6EA8FF', 2) + T('nextPrayer') + '</span><span class="wg-b">' + T('prayers')[n.i] + '</span><span class="wg-d" style="color:#CFE0FF">' + pad(at[0]) + SEP + pad(at[1]) + ' · ' + T('inTime', Math.floor(n.left / 60), n.left % 60) + '</span><span class="wg-s">Jakarta</span>';
      var pos = 1 - Math.min(1, n.left / 600);
      var px = 18 + pos * 92, py = 48 - Math.sin(pos * Math.PI) * 30;
      art = '<svg class="wart" viewBox="0 0 130 70" aria-hidden="true"><path d="M10 52 Q65 -6 120 52" fill="none" stroke="rgba(207,224,255,.5)" stroke-width="1.4" stroke-dasharray="1.5 5" stroke-linecap="round"/>' +
        [[10, 52], [40, 22], [65, 14], [90, 22], [120, 52]].map(function (p) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="#fff" opacity=".85"/>'; }).join('') +
        (night ? '<circle cx="' + px + '" cy="' + py + '" r="8" fill="#EDEFF7"/><circle cx="' + (px + 3.5) + '" cy="' + (py - 2.5) + '" r="7" fill="#12204A"/>' : '<circle cx="' + px + '" cy="' + py + '" r="8" fill="#FFE08A"/><circle cx="' + px + '" cy="' + py + '" r="13" fill="#FFE08A" opacity=".25"/>') + '</svg>';
    }
    if (name === 'weather') {
      bg = 'linear-gradient(160deg,#2A313D,#151A22)';
      t = '<span class="wg-l">' + line('cloud', 12, '#9ADCFF', 2) + T('weather') + '</span><span class="wg-b">29°</span><span class="wg-d">' + T('rain') + '</span><span class="wg-s">Jakarta · 24° / 32°</span>';
      art = '<svg class="wart" viewBox="0 0 130 70" aria-hidden="true"><g fill="#5B6577"><path d="M30 34h30a10 10 0 0 0 0-20 13 13 0 0 0-25 2 9 9 0 0 0-5 18z"/></g><g fill="#6E7A8E"><path d="M66 42h38a12 12 0 0 0 0-24 16 16 0 0 0-31 3 11 11 0 0 0-7 21z"/></g>' +
        '<g stroke="#8FB2D9" stroke-width="1.6" stroke-linecap="round" class="rain"><path d="M74 50l-3 9"/><path d="M86 48l-3 9"/><path d="M98 50l-3 9"/><path d="M80 60l-2 6"/><path d="M92 60l-2 6"/></g></svg>';
    }
    if (name === 'week') {
      bg = 'linear-gradient(160deg,#5A1F2C,#2A0E16)';
      var today = (new Date().getDay() + 6) % 7, names = EN ? 'MTWTFSS' : 'SSRKJSM';
      t = '<span class="wg-l">' + fill('checklist', 11, '#FF8FA3') + T('week') + '</span><span class="wg-b">' + s.tasks.length + ' ' + (EN ? 'tasks' : 'tugas') + '</span><span class="wg-d">' + T('weekDone', s.tasks.filter(function (x) { return x.d; }).length) + '</span>';
      art = '<svg class="wart" viewBox="0 0 130 70" aria-hidden="true">' + [0, 1, 2, 3, 4, 5, 6].map(function (i) {
        var x = 12 + i * 16, h = i === today ? 30 : i < today ? 12 + (i * 7) % 18 : 4;
        return '<rect x="' + x + '" y="10" width="9" height="40" rx="4.5" fill="rgba(255,255,255,.12)"/><rect x="' + x + '" y="' + (50 - h) + '" width="9" height="' + h + '" rx="4.5" fill="' + (i === today ? '#FF8FA3' : 'rgba(255,143,163,.45)') + '"/><text x="' + (x + 4.5) + '" y="64" text-anchor="middle" font-size="8" fill="#fff" opacity="' + (i === today ? 1 : .5) + '">' + names[i] + '</text>';
      }).join('') + '</svg>';
    }
    if (name === 'water') {
      bg = 'linear-gradient(160deg,#0F4C6E,#082638)';
      var lvl = s.water / 8;
      t = '<span class="wg-l">' + line('drop', 12, '#7FD4FF', 2) + T('water') + '</span><span class="wg-b">' + T('glasses', s.water) + '</span><button type="button" class="chip sm" data-act="water">' + T('plusGlass') + '</button>';
      art = '<svg class="wart" viewBox="0 0 130 70" aria-hidden="true"><path d="M70 8h40l-5 56H75z" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.45)" stroke-width="1.4"/><clipPath id="glassClip"><path d="M70 8h40l-5 56H75z"/></clipPath><rect clip-path="url(#glassClip)" x="60" y="' + (64 - lvl * 56) + '" width="60" height="70" fill="#32ADE6" opacity=".85"/></svg>';
    }
    if (name === 'world') {
      bg = 'linear-gradient(160deg,#3B2F7A,#1C1640)';
      var d = new Date(), tokyo = new Date(d.getTime() + 2 * 3600e3);
      t = '<span class="wg-l">' + fill('stopwatch', 11, '#B8B0FF') + T('world') + '</span><span class="wg-b">' + clock(d) + '</span><span class="wg-d">Jakarta</span><span class="wg-s">Tokyo ' + clock(tokyo) + '</span>';
      art = '<svg class="wart" viewBox="0 0 130 70" aria-hidden="true">' + dial(62, 34, 20, d, d.getHours() >= 6 && d.getHours() < 18) + dial(106, 40, 14, tokyo, tokyo.getHours() >= 6 && tokyo.getHours() < 18) + '</svg>';
    }
    if (name === 'hijri') {
      bg = 'linear-gradient(160deg,#1E2560,#0C102E)';
      var hd = '';
      try { hd = new Intl.DateTimeFormat(LOC + '-u-ca-islamic-umalqura', { day: 'numeric', month: 'long' }).format(new Date()); } catch (e) { hd = 'Jumadil Awal'; }
      t = '<span class="wg-l">' + line('moon', 12, '#C9D2FF', 2) + T('hijri') + '</span><span class="wg-b" style="font-size:16px">' + esc(hd.replace(/ AH$/, '')) + '</span><span class="wg-d">' + new Date().toLocaleDateString(LOC, { day: 'numeric', month: 'long' }) + '</span>';
      art = '<svg class="wart" viewBox="0 0 130 70" aria-hidden="true"><circle cx="90" cy="34" r="22" fill="#E9ECF7"/><circle cx="99" cy="29" r="21" fill="#1A2158"/><circle cx="32" cy="16" r="1.2" fill="#fff"/><circle cx="50" cy="52" r="1" fill="#fff" opacity=".7"/><circle cx="120" cy="12" r="1.2" fill="#fff"/></svg>';
    }
    if (name === 'countdown') {
      bg = 'linear-gradient(160deg,#6B1747,#2E0A1F)';
      t = '<span class="wg-l">' + fill('stopwatch', 11, '#FF8FC8') + T('countdown') + '</span><span class="wg-b">12 ' + T('days') + '</span><span class="wg-d">' + T('holiday') + '</span>';
      art = '<svg class="wart" viewBox="0 0 130 70" aria-hidden="true"><rect x="58" y="14" width="28" height="40" rx="5" fill="#111"/><rect x="92" y="14" width="28" height="40" rx="5" fill="#111"/><path d="M58 34h28M92 34h28" stroke="#2A2A2A" stroke-width="1.5"/><text x="72" y="44" text-anchor="middle" font-size="26" font-weight="700" fill="#fff">1</text><text x="106" y="44" text-anchor="middle" font-size="26" font-weight="700" fill="#fff">2</text></svg>';
    }
    return '<button type="button" class="card wcard" data-act="cyclew:' + name + '" style="background:' + bg + '"><span class="wtx">' + t + '</span>' + art + '</button>';
  }
  function dial(cx, cy, r, d, day) {
    var h = (d.getHours() % 12 + d.getMinutes() / 60) * 30 * Math.PI / 180, m = d.getMinutes() * 6 * Math.PI / 180;
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + (day ? '#F3EEE4' : '#15131F') + '" stroke="rgba(255,255,255,.4)"/>' +
      '<path d="M' + cx + ' ' + cy + 'L' + (cx + Math.sin(h) * r * .5).toFixed(1) + ' ' + (cy - Math.cos(h) * r * .5).toFixed(1) + '" stroke="' + (day ? '#15131F' : '#fff') + '" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M' + cx + ' ' + cy + 'L' + (cx + Math.sin(m) * r * .78).toFixed(1) + ' ' + (cy - Math.cos(m) * r * .78).toFixed(1) + '" stroke="' + (day ? '#15131F' : '#fff') + '" stroke-width="1.3" stroke-linecap="round"/>';
  }

  function pageView() {
    var size = SIZES[s.size], w = size.cw, tr = track();
    if (s.page === 'music' && s.media) {
      if (s.karaoke) {
        var pct = 20 + (s.posn * 7) % 70;
        return { w: w, h: 118, html: '<div class="v pg" style="padding-top:10px">' + (s.playing ? '<div class="aur" style="--a1:' + tr.a1 + ';--a2:' + tr.a2 + '"></div>' : '') +
          '<div class="rw" style="position:relative;flex:1"><div style="width:60px;display:grid;justify-items:center;gap:6px;flex:none">' + nix(s.playing ? 'happy' : 'neutral', 38) + '<div class="rw" style="gap:4px"><button type="button" class="chip sm" data-act="off:-1" aria-label="−">−</button><span data-act="off:0" style="cursor:pointer;font-size:11px;width:30px;text-align:center">' + (s.offset > 0 ? '+' : '') + dec(s.offset) + '</span><button type="button" class="chip sm" data-act="off:1" aria-label="+">+</button></div></div>' +
          '<div class="lines" style="flex:1;min-width:0"><span>' + T('lyricPrev') + '</span><b class="lineb" style="--f:' + pct + '%">' + T('lyricNow') + '</b><span>' + T('lyricNext') + '</span></div>' +
          '<div style="display:grid;gap:4px"><button type="button" class="ib" data-act="karaoke" aria-label="×">' + line('close', 15, '#fff', 2) + '</button><button type="button" class="ib" data-act="play" aria-label="▶">' + fill(s.playing ? 'pause' : 'play', 15) + '</button></div></div></div>' };
      }
      var ctls;
      if (s.volOpen) {
        var bars = '';
        for (var b = 0; b < 28; b++) bars += '<i data-act="vol:' + Math.round((b + 1) / 28 * 100) + '" class="' + (b / 28 < s.vol / 100 ? 'on' : '') + '" style="height:' + (4 + b * .55) + 'px"></i>';
        ctls = '<div class="ctls" style="gap:8px"><button type="button" class="ib" data-act="volopen" aria-label="Volume">' + line('speaker', 16) + '</button><div class="bars" style="--a1:' + tr.a1 + '">' + bars + '</div><span class="mut" style="width:24px;text-align:right">' + s.vol + '</span></div>';
      } else {
        ctls = '<div class="ctls"><button type="button" class="ib" data-act="volopen" aria-label="Volume">' + line('speaker', 15) + '</button><button type="button" class="ib" data-act="prev" aria-label="Previous">' + fill('prev', 17) + '</button><button type="button" class="ib disc" data-act="play" aria-label="Play">' + fill(s.playing ? 'pause' : 'play', 15, '#111') + '</button><button type="button" class="ib" data-act="next" aria-label="Next">' + fill('next', 17) + '</button><button type="button" class="ib' + (s.film ? ' dim' : '') + '" data-act="' + (s.film ? '' : 'karaoke') + '" aria-label="Lyrics">' + line('mic', 15) + '</button></div>';
      }
      return { w: w, h: 136, html: '<div class="v pg mus">' + (s.playing ? '<div class="aur" style="--a1:' + tr.a1 + ';--a2:' + tr.a2 + '"></div>' : '') +
        '<div class="rw top" data-act="open-source"><span class="cov ' + tr.c + '"></span><div class="mi"><b>' + esc(tr.t) + '</b><span class="mut">' + esc(s.film ? tr.src : tr.a + ' · ' + tr.src) + '</span></div>' + eq() + '</div>' +
        '<div class="rw prow"><span class="tm" data-b="pos">' + mmss(s.posn) + '</span><div class="prog" data-act="seek"><i data-b="bar" style="width:' + s.posn / tr.len * 100 + '%;background:' + tr.a1 + '"></i></div><span class="tm" data-b="rem" style="text-align:right">-' + mmss(tr.len - s.posn) + '</span></div>' +
        ctls + '<div style="flex:1"></div>' + tabs() + '</div>' };
    }
    if (s.page === 'home') {
      var chip = s.agent ? '<span class="pill agent">' + badge(COLOR.agent, fill('claude', 9, '#fff'), 13) + T('agentChip') + '</span>' : '';
      return { w: w, h: 164, html: '<div class="v pg"><div class="hd home">' + nix(s.focus ? 'sleep' : 'happy', 20) + '<b class="ell">' + greeting() + '</b>' + chip + '<span class="hd-r">' + dateLine() + '</span></div><div class="two">' + widget(s.widgetL) + widget(s.widgetR) + '</div><div style="flex:1"></div>' + tabs() + '</div>' };
    }
    if (s.page === 'timer') {
      if (s.timer) {
        var left = s.timer.left / s.timer.total, tc = s.timer.name === T('pomodoro') ? '#FF6347' : COLOR.timer, paused = s.timer.paused;
        return { w: w, h: 118, html: '<div class="v pg pool" style="--lvl:' + (left * 100).toFixed(1) + '%;--tc:' + tc + '"><div class="water"></div><div class="rw" style="flex:1;position:relative">' +
          '<span class="float">' + nix(paused ? 'sleep' : left < .12 ? 'sweat' : 'happy', 34) + '</span><div><div class="mut">' + esc(s.timer.name) + '</div><span class="tbig" data-b="timer">' + mmss(s.timer.left) + '</span></div>' +
          '<span class="r rw" style="gap:6px"><button type="button" class="ib ring" data-act="timerpause" aria-label="Pause">' + fill(paused ? 'play' : 'pause', 14) + '</button><button type="button" class="ib ring" data-act="timerstop" aria-label="Stop">' + line('close', 14, '#fff', 2) + '</button></span></div>' + tabs() + '</div>' };
      }
      var ticks = '';
      for (var i = -15; i <= 15; i++) {
        var v = s.pick + i, x = 50 + i * 3.1;
        if (v < 1 || v > 120) continue;
        ticks += '<i style="left:' + x + '%;height:' + (v % 5 === 0 ? 11 : 6) + 'px;opacity:' + (i === 0 ? 1 : 1 - Math.abs(i) / 19) + (i === 0 ? ';background:' + COLOR.timer + ';height:24px;width:2px' : '') + '"></i>' + (v % 15 === 0 && i !== 0 ? '<em style="left:' + x + '%">' + v + '</em>' : '');
      }
      return { w: w, h: 118, html: '<div class="v pg"><div class="rw" style="height:52px"><div class="tnum"><b>' + s.pick + '</b><span class="mut">' + T('min') + '</span></div><div class="ruler" data-act="ruler">' + ticks + '</div><button type="button" class="ib disc big" data-act="timerstart" aria-label="Start">' + fill('play', 18, '#111') + '</button></div>' +
        '<div class="chips">' + [5, 15, 25, 45].map(function (m) { return '<button type="button" class="chip o' + (s.pick === m ? ' on' : '') + '" data-act="timer:' + m + '">' + m + '</button>'; }).join('') + '<button type="button" class="chip o" data-act="pomo"><i class="tomato"></i>25 / 5</button></div>' + tabs() + '</div>' };
    }
    if (s.page === 'shelf') {
      var shelfHead = head('shelf', T('shelfName'), s.shelf.length ? s.shelf.length + '/40' : T('empty'), '<button type="button" class="chip sm" data-act="shelfadd">' + T('shelfAdd') + '</button>');
      if (!s.shelf.length) return { w: w, h: 132, html: '<div class="v pg">' + shelfHead + '<div class="drop">' + nix('neutral', 26) + '<div><b>' + T('shelfEmpty') + '</b><div class="mut">' + T('shelfHint') + '</div></div></div><div style="flex:1"></div>' + tabs() + '</div>' };
      var tint = { file: '#FF9F0A', image: '#30D158', link: '#0A84FF', text: '#BF5AF2' };
      return { w: w, h: 150, html: '<div class="v pg">' + shelfHead + '<div class="line-host"><svg class="rope" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M0 2 Q50 10 100 2" fill="none" stroke="rgba(255,255,255,.45)" stroke-width=".6" vector-effect="non-scaling-stroke"/></svg>' +
        s.shelf.slice(-5).map(function (it, i, all) {
          var tilt = (i - (all.length - 1) / 2) * 3, dip = Math.sin((i + .5) / all.length * Math.PI) * 6;
          return '<button type="button" class="peg" data-act="shelfopen:' + esc(it.n) + '" style="--tilt:' + tilt + 'deg;top:' + (4 + dip) + 'px"><i class="pin"></i><span class="pv" style="background:' + rgba(tint[it.k], .22) + ';color:' + tint[it.k] + '">' + line(it.k, 18, tint[it.k], 1.8) + '</span><span class="pn">' + esc(it.n) + '</span></button>';
        }).join('') + '</div>' + tabs() + '</div>' };
    }
    if (s.page === 'tasks') {
      var done = s.tasks.filter(function (t) { return t.d; }).length, all = s.tasks.length;
      var tasksHead = head('tasks', T('tasksToday'), done + '/' + all, '<button type="button" class="chip o sm" data-act="taskadd">' + T('add') + '</button>');
      if (s.taskAdd) return { w: w, h: 146, html: '<div class="v pg">' + tasksHead + '<div class="card tcard"><input class="ipt" id="taskIn" placeholder="' + esc(T('taskPlaceholder')) + '" aria-label="' + esc(T('taskPlaceholder')) + '"></div><div style="flex:1"></div>' + tabs() + '</div>' };
      if (!all) return { w: w, h: 120, html: '<div class="v pg">' + tasksHead + '<div class="rw" style="margin-top:10px">' + nix('neutral', 24) + '<span class="mut">' + T('noTasks') + '</span></div><div style="flex:1"></div>' + tabs() + '</div>' };
      s.taskSel = Math.min(s.taskSel, all - 1);
      var tk = s.tasks[s.taskSel];
      var paws = s.tasks.map(function (t, i) { return '<button type="button" class="paw' + (t.d ? ' d' : '') + (i === s.taskSel ? ' sel' : '') + '" data-act="tasksel:' + i + '" aria-label="' + esc(t.t) + '">' + fill('paw', 13) + '</button>'; }).join('');
      return { w: w, h: 146, html: '<div class="v pg">' + tasksHead +
        '<div class="card tcard"><button type="button" class="tring' + (tk.d ? ' d' : '') + '" data-act="task:' + s.taskSel + '" aria-label="✓">' + (tk.d ? line('check', 14, '#06230F', 2.6) : '') + '</button><div class="mi"><b' + (tk.d ? ' class="struck"' : '') + '>' + esc(tk.t) + '</b><span class="mut' + (s.taskDel ? ' warn' : '') + '">' + (s.taskDel ? T('clickAgain') : esc(tk.w)) + '</span></div>' +
        '<span class="r rw" style="gap:5px"><button type="button" class="ib ring' + (s.taskDel ? ' red' : '') + '" data-act="taskdel" aria-label="Delete">' + line('trash', 13) + '</button><button type="button" class="ib ring" data-act="taskmove:-1" aria-label="‹">' + line('left', 14, '#fff', 2) + '</button><button type="button" class="ib ring" data-act="taskmove:1" aria-label="›">' + line('right', 14, '#fff', 2) + '</button></span></div>' +
        '<div class="rw foot"><span class="paws">' + paws + '</span><span class="mut r">' + (done === all ? T('allDone') : T('doneOf', done, all)) + '</span></div>' + tabs() + '</div>' };
    }
    if (s.page === 'rates') {
      var rate = 16240, pts = [16120, 16180, 16150, 16210, 16190, 16230, 16240];
      var path = pts.map(function (p, i) { return (i ? 'L' : 'M') + (i * 20).toFixed(0) + ' ' + (28 - (p - 16100) / 6).toFixed(1); }).join(' ');
      return { w: w, h: 142, html: '<div class="v pg">' + head('rates', T('rateTitle'), 'USD → IDR', '<span style="color:#30D158">▲ ' + dec(.4) + '%</span>') +
        '<div class="rw" style="margin-top:8px"><div><span class="tbig" style="font-size:22px">Rp' + I.num(rate) + '</span><div class="mut">1 USD</div></div><svg class="spark" viewBox="0 0 120 30" aria-hidden="true"><path d="' + path + '" fill="none" stroke="#30D158" stroke-width="1.8" stroke-linecap="round"/></svg></div>' +
        '<div class="chips" style="justify-content:flex-start">' + [1, 10, 100, 1000].map(function (a) { return '<button type="button" class="chip o' + (s.rateAmt === a ? ' on' : '') + '" data-act="rate:' + a + '">' + I.num(a) + '</button>'; }).join('') + '<span class="mut r" data-act="ratecopy" style="cursor:pointer">= Rp' + I.num(rate * s.rateAmt) + '</span></div><div style="flex:1"></div>' + tabs() + '</div>' };
    }
    if (s.page === 'system') {
      var used = (15.8 * s.ram / 100);
      return { w: w, h: 166, html: '<div class="v pg">' + head('system', T('p.system'), '', T('uptime', 36, 14)) +
        '<div class="three"><div class="card st"><span>CPU</span><b data-b="cpu">' + s.cpu + '%</b></div>' +
        '<div class="card st"><span>RAM</span><b>' + s.ram + '%</b><div class="meter"><i style="width:' + s.ram + '%;background:#30D158"></i></div><em>' + dec(used) + ' GB / ' + dec(15.8) + ' GB</em></div>' +
        '<div class="card st"><span>Disk</span><b>' + s.disk + '%</b><div class="meter"><i style="width:' + s.disk + '%;background:#32ADE6"></i></div><em>' + T('free', dec(332.5 + (30 - s.disk) * 4)) + '</em></div></div>' +
        '<div class="rw btns"><button type="button" class="pillbtn" data-act="clean">' + badge('#8E7CFF', line('broom', 11, '#fff', 2), 18) + T('cleanBtn') + (s.dust > 0 ? ' · ' + dec(s.dust) + ' GB' : '') + '</button><button type="button" class="pillbtn" data-act="trash">' + badge('#8E8E93', line('trash', 11, '#fff', 2), 18) + 'Recycle Bin · ' + s.trash.length + ' · ' + (s.trash.length ? dec(1.4) + ' MB' : '0 B') + '</button></div>' + tabs() + '</div>' };
    }
    if (s.page === 'control') {
      var tile = function (icon, name, sub) { return '<button type="button" class="card ctile" data-act="setting:' + name + '">' + line(icon, 17) + '<span class="mi"><b>' + name + '</b><span class="mut">' + sub + '</span></span>' + line('chev', 12, 'var(--muted)', 2) + '</button>'; };
      var row = s.volOpen
        ? '<div class="bars" style="flex:1;justify-content:center;height:26px">' + Array.apply(null, Array(34)).map(function (_, b) { return '<i data-act="vol:' + Math.round((b + 1) / 34 * 100) + '" class="' + (b / 34 < s.vol / 100 ? 'on' : '') + '" style="height:' + (4 + b * .55) + 'px"></i>'; }).join('') + '</div><span class="mut">' + s.vol + '</span>'
        : [['lock', T('lock')], ['moon', T('sleep')], ['restart', T('restart')], ['power', T('shutdown')]].map(function (p) { return '<button type="button" class="pillbtn grow" data-act="power:' + p[1] + '">' + line(p[0], 13) + p[1] + '</button>'; }).join('');
      return { w: w, h: 166, html: '<div class="v pg">' + head('control', T('p.control')) +
        '<div class="three">' + tile('wifi', 'Wi-Fi', T('on')) + tile('bt', 'Bluetooth', T('on')) + tile('batt', T('battery'), '100%') + '</div>' +
        '<div class="rw btns"><button type="button" class="ib ring" data-act="volopen" aria-label="Volume" style="width:30px;height:30px">' + line('speaker', 15) + '</button>' + row + '</div>' + tabs() + '</div>' };
    }
    if (s.page === 'agent') {
      var pawsA = '';
      for (var p = 1; p <= 6; p++) pawsA += '<span style="opacity:' + (p <= s.agentStep ? 1 : .28) + '">' + fill('paw', 15, p <= s.agentStep ? COLOR.agent : '#fff') + '</span>';
      return { w: w, h: 140, html: '<div class="v pg"><div class="hd home"><span class="halo" style="--hc:' + COLOR.agent + '">' + nix('side', 26) + '</span><b>' + T('agentWorking') + ' · PULO</b><span class="hd-r"><span class="pill timer" style="--hc:' + COLOR.agent + '"><i class="ringi"></i>5:36</span></span></div>' +
        '<div class="rw" style="gap:5px;margin:10px 0 6px">' + pawsA + '</div><b class="step">' + T('agentStep') + '</b><div class="rw" style="margin-top:3px"><span class="mut ell">' + T('agentNow') + '</span><span class="mut r">' + T('steps', 27) + '</span></div><div style="flex:1"></div>' + tabs() + '</div>' };
    }
    s.page = 'home';
    return pageView();
  }
  function compactView() {
    var size = SIZES[s.size];
    if (s.timer && s.timer.left > 0 && s.size !== 'minimal') return { w: 250, h: size.cmp, html: '<div class="v cmp"><b>' + esc(s.timer.name) + '</b><span class="r" style="color:' + (s.timer.name === T('pomodoro') ? '#FF6347' : '#FF9F6B') + ';font-weight:600" data-b="timer">' + mmss(s.timer.left) + '</span></div>' };
    if (s.agent && s.size !== 'minimal') return { w: 300, h: size.cmp, html: '<div class="v cmp"><span class="halo" style="--hc:' + COLOR.agent + '">' + nix('side', size.head - 2) + '</span><b class="ell">' + T('agentNow') + '</b><span class="r rw" style="gap:5px;color:' + COLOR.agent + ';font-weight:600">' + fill('paw', 12, COLOR.agent) + s.agentStep + '/6<span class="pill timer" style="--hc:' + COLOR.agent + '"><i class="ringi"></i>4:08</span></span></div>' };
    if (s.size === 'minimal') return { w: 120, h: 18, html: '<div class="v cmp" style="padding:0 8px;font-size:11px;justify-content:space-between;gap:0"><span class="mbat"><i></i></span><b>' + clock() + '</b>' + (s.media && s.playing ? eq() : line('speaker', 11)) + '</div>' };
    if (s.media && (s.playing || s.film)) { var tr = track(); return { w: 300, h: size.cmp, html: '<div class="v cmp">' + (s.playing ? '<div class="aur" style="--a1:' + tr.a1 + ';--a2:' + tr.a2 + ';height:40px;bottom:-22px"></div>' : '') + '<span class="cov sm ' + tr.c + '"></span><b style="position:relative">' + esc(tr.t) + '</b>' + eq() + '</div>' }; }
    return { w: size.w, h: size.h, html: '<div class="v cmp" style="justify-content:center;padding:0">' + nix(s.focus ? 'sleep' : s.face, size.head) + '</div>' };
  }
  function islandClass() { return 'isl ' + (s.theme === 'glass' ? 'g ' + s.kind + ' ' : '') + s.size + ' ' + (s.pos === 'float' ? 'float' : 'dock'); }

  function draw() {
    var v = s.alert ? s.alert : s.open ? pageView() : compactView();
    isl.style.width = v.w + 'px';
    isl.style.height = v.h + 'px';
    isl.className = islandClass() + (shouldTuck() ? ' tuck' : '');
    stage.classList.toggle('g', s.theme === 'glass');
    stage.classList.toggle('bright', s.bright);
    var input = $('#taskIn');
    var keep = input && document.activeElement === input ? input.value : null;
    body.innerHTML = v.html + (s.cam ? '<i class="dotcam"></i>' : '') + (s.mic ? '<i class="dotmic"></i>' : '');
    var fresh = $('#taskIn');
    if (fresh) { if (keep !== null) fresh.value = keep; fresh.focus({ preventScroll: true }); }
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
  function closeIsland() { s.open = false; s.pin = false; s.karaoke = false; s.volOpen = false; s.taskDel = false; s.taskAdd = false; draw(); }

  // Tampilan sesaat: indikator 170 × 26 dan kartu.
  function indicator(left, mid) { return { w: 170, h: 26, html: '<div class="v cmp" style="padding:0 10px;font-size:12px;gap:7px">' + left + mid + '</div>' }; }
  function volBars(level, color) {
    var h = '';
    for (var i = 0; i < 16; i++) h += '<i class="' + (i / 16 < level ? 'on' : '') + '" style="height:' + (3 + i * .7) + 'px"></i>';
    return '<span class="bars" style="height:16px;--a1:' + color + '">' + h + '</span>';
  }
  function cardAlert(face, title, sub, extra, w, h) { return { w: w || 340, h: h || 62, html: '<div class="v cmp"><span class="fx-pop">' + nix(face, 34) + '</span><div style="min-width:0"><b>' + title + '</b><div class="mut ell">' + sub + '</div></div>' + (extra || '') + '</div>' }; }
  function eyesView() {
    return { w: SIZES[s.size].cw, h: 94, html: '<div class="v" style="background:linear-gradient(#27386E,#F09A62);align-items:center;gap:12px;padding:0 16px;overflow:hidden"><svg viewBox="0 0 400 70" preserveAspectRatio="none" style="position:absolute;left:0;right:0;bottom:0;width:100%;height:56px" aria-hidden="true"><path fill="#7A5E8E" d="M0 70V34c40-12 70-4 110-9 60-9 100 9 150 1 60-10 100 4 140-4v48z"/><path fill="#20224E" d="M0 70V52c40-12 90-8 140 6 60 12 160 4 260-4v16z"/></svg><span style="position:relative">' + nix('side', 42) + '</span><div style="position:relative;flex:1"><b style="font-size:15px">' + T('eyes') + '</b><div style="font-size:12px">' + T('eyesText') + '</div></div><b style="position:relative;width:40px;height:40px;border-radius:50%;box-shadow:inset 0 0 0 3px #fff;display:grid;place-items:center;font-size:15px" data-b="eyes">' + s.eyes + '</b></div>' };
  }
  function stretchView() {
    var cues = T('cues');
    return { w: SIZES[s.size].cw, h: 94, html: '<div class="v" style="background:linear-gradient(#145C5A,#0B242C);align-items:center;gap:12px;padding:0 16px"><span class="fx-pop" style="display:block;transform:scale(1,' + (s.cue === 1 ? 1.16 : 1) + ');transform-origin:50% 100%;transition:transform .8s">' + nix(s.cue === 1 ? 'closed' : 'neutral', 42) + '</span><div style="flex:1"><b style="font-size:15px">' + T('stretch') + '</b><div style="font-size:12px">' + cues[s.cue] + '</div><div style="margin-top:5px;display:flex;gap:4px">' + cues.map(function (_, i) { return '<i style="width:5px;height:5px;border-radius:50%;background:' + (i <= s.cue ? '#fff' : 'rgba(255,255,255,.3)') + '"></i>'; }).join('') + '</div></div><button type="button" class="ib disc" data-act="stretchdone" aria-label="✓">' + line('check', 15, '#111', 2.4) + '</button></div>' };
  }
  function runCycle(seconds, step, done) {
    var n = 0;
    clearInterval(runCycle.t);
    runCycle.t = setInterval(function () { n++; if (n >= seconds) { clearInterval(runCycle.t); done(); return; } step(n); }, 1000);
  }

  // Tombol di dalam pulau.
  var ACT = {
    'play': function () { s.playing = !s.playing; say(T(s.playing ? 'a.play' : 'a.pause')); },
    'next': function () { s.track = (s.track + 1) % TRACKS.length; s.posn = 0; s.film = false; s.playing = true; say(T('a.next', TRACKS[s.track].t)); },
    'prev': function () { s.track = (s.track + TRACKS.length - 1) % TRACKS.length; s.posn = 0; s.film = false; s.playing = true; say(T('a.prev', TRACKS[s.track].t)); },
    'volopen': function () { s.volOpen = !s.volOpen; say(T('a.vol')); },
    'karaoke': function () { s.karaoke = !s.karaoke; s.page = 'music'; say(T(s.karaoke ? 'a.karaokeOn' : 'a.karaokeOff')); },
    'seek': function () { s.posn = Math.min(track().len - 5, s.posn + 30); },
    'open-source': function () { say(T('a.source')); },
    'water': function () { s.water = Math.min(8, s.water + 1); say(T('a.water')); },
    'pomo': function () { startTimer(25, T('pomodoro')); s.focus = true; say(T('c.pomodoro')); },
    'timerstart': function () { startTimer(s.pick, T('p.timer')); say(T('a.timer', s.pick)); },
    'timerstop': function () { s.timer = null; s.focus = false; say(T('a.timerStop')); },
    'timerpause': function () { if (s.timer) { s.timer.paused = !s.timer.paused; if (s.timer.paused) say(T('a.timerPause')); } },
    'ruler': function (e) { var r = e.currentEl.getBoundingClientRect(); var k = (e.clientX - r.left) / r.width - .5; s.pick = Math.max(1, Math.min(120, s.pick + Math.round(k / .031))); say(T('a.pick', s.pick)); },
    'shelfadd': function () { s.shelfN++; s.shelf.push([{ n: 'ringkasan.docx', k: 'file' }, { n: 'tautan-rapat', k: 'link' }, { n: 'screenshot.png', k: 'image' }, { n: EN ? 'quote.txt' : 'kutipan.txt', k: 'text' }][s.shelfN % 4]); say(T('a.shelfAdd')); },
    'clean': function () { if (s.dust > 0) { var was = s.dust; s.dust = 0; s.disk = 28; say(T('c.clean', dec(was))); } else say(T('c.cleanDone')); },
    'trash': function () { if (s.trash.length) say(T('c.trash', s.trash.pop().n)); else say(T('c.trashEmpty')); },
    'stretchdone': function () { clearInterval(runCycle.t); s.alert = null; say(T('a.stretchDone')); },
    'callok': function () { s.alert = null; say(T('a.callOk')); },
    'callno': function () { s.alert = null; say(T('a.callNo')); },
    'allow': function () { s.alert = null; s.agentStep = Math.min(6, s.agentStep + 1); say(T('a.allow')); },
    'deny': function () { s.alert = null; say(T('a.deny')); },
    'taskadd': function () { s.taskAdd = !s.taskAdd; s.taskDel = false; },
    'taskdel': function () { if (!s.taskDel) { s.taskDel = true; clearTimeout(ACT.delT); ACT.delT = setTimeout(function () { s.taskDel = false; draw(); }, 3000); return; } s.tasks.splice(s.taskSel, 1); s.taskDel = false; s.taskSel = Math.max(0, s.taskSel - 1); say(T('a.taskDeleted')); },
    'ratecopy': function () { say(T('a.rate', 'Rp' + I.num(16240 * s.rateAmt))); },
  };
  function startTimer(minutes, name) { s.timer = { left: minutes * 60, total: minutes * 60, name: name, paused: false }; s.page = 'timer'; }

  stage.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (el && isl.contains(el)) {
      e.stopPropagation();
      var a = el.dataset.act, i = a.indexOf(':'), key = i < 0 ? a : a.slice(0, i), val = i < 0 ? '' : a.slice(i + 1);
      if (!a) return;
      if (key === 'page') { s.page = val; s.volOpen = false; s.karaoke = false; s.taskDel = false; s.taskAdd = false; }
      else if (key === 'vol') { s.vol = +val; }
      else if (key === 'off') { s.offset = val === '0' ? 0 : Math.max(-20, Math.min(20, s.offset + (+val) * .25)); say(T('a.offset', dec(s.offset))); }
      else if (key === 'timer') { s.pick = +val; say(T('a.pick', s.pick)); }
      else if (key === 'cyclew') {
        var other = val === s.widgetL ? s.widgetR : s.widgetL, nextName = WIDGETS[(WIDGETS.indexOf(val) + 1) % WIDGETS.length];
        if (nextName === other) nextName = WIDGETS[(WIDGETS.indexOf(nextName) + 1) % WIDGETS.length];
        if (val === s.widgetL) s.widgetL = nextName; else s.widgetR = nextName;
        say(T('a.widget', T('f.' + nextName)));
      }
      else if (key === 'task') { var tk = s.tasks[+val]; tk.d = !tk.d; say(T(tk.d ? 'a.taskDone' : 'a.taskOpen')); }
      else if (key === 'tasksel') { s.taskSel = +val; s.taskDel = false; }
      else if (key === 'taskmove') { s.taskSel = (s.taskSel + (+val) + s.tasks.length) % s.tasks.length; s.taskDel = false; }
      else if (key === 'shelfopen') { say(T('a.shelfOpen', val)); }
      else if (key === 'rate') { s.rateAmt = +val; ACT.ratecopy(); }
      else if (key === 'setting') { say(T('a.setting', val)); }
      else if (key === 'power') { say(T(val === T('restart') || val === T('shutdown') ? 'a.power2' : 'a.power1', val)); }
      else if (ACT[key]) { e.currentEl = el; ACT[key](e); }
      draw();
      return;
    }
    if (el) return;
    if (isl.contains(e.target)) {
      if (e.target.dataset.nix && !s.open && !s.alert) { pester(); return; }
      if (s.open) return;
      if (s.alert) { s.alert = null; draw(); return; }
      s.open = true; s.page = s.media ? 'music' : 'home'; draw();
      return;
    }
    if (s.open) closeIsland();
  });
  // Roda mouse di atas pita ukur Timer: satu menit per garis, seperti aplikasinya.
  stage.addEventListener('wheel', function (e) {
    if (!e.target.closest('.ruler')) return;
    e.preventDefault();
    s.pick = Math.max(1, Math.min(120, s.pick + (e.deltaY > 0 ? 1 : -1)));
    draw();
  }, { passive: false });
  var pesterTimer = 0;
  function pester() {
    var seq = ['surprised', 'sweat', 'sad', 'angry', 'angry', 'dizzy'];
    s.face = seq[Math.min(s.pestered++, seq.length - 1)];
    say(T('c.pestering'));
    draw();
    clearTimeout(pesterTimer);
    pesterTimer = setTimeout(function () { s.pestered = 0; s.face = 'neutral'; draw(); }, 2500);
  }

  // Buka karena kursor, tutup saat kursor pergi, seperti aplikasinya.
  var hover = 0, lastTarget = null;
  isl.addEventListener('mouseenter', function () { clearTimeout(hover); if (!s.open && !s.alert) hover = setTimeout(function () { if (!isIdleNix()) { s.open = true; s.page = s.media ? 'music' : s.page === 'music' ? 'home' : s.page; draw(); } }, 170); });
  isl.addEventListener('mouseleave', function () { clearTimeout(hover); if (s.pin) return; hover = setTimeout(function () { if (s.open && !s.karaoke && document.activeElement !== $('#taskIn')) closeIsland(); }, 650); });
  function isIdleNix() { return isl.matches(':hover') && lastTarget && lastTarget.dataset && lastTarget.dataset.nix; }
  isl.addEventListener('mousemove', function (e) { lastTarget = e.target; });
  // Tugas dari kalimat: "besok jam 9", "tomorrow at 5pm".
  body.addEventListener('keydown', function (e) {
    if (e.target.id !== 'taskIn') return;
    if (e.key === 'Escape') { s.taskAdd = false; draw(); return; }
    if (e.key !== 'Enter' || !e.target.value.trim()) return;
    var text = e.target.value.trim(), tomorrow = /\b(besok|tomorrow)\b/i.test(text), m = text.match(/\b(?:jam|at)\s*(\d{1,2})\s*(pm|am)?/i), w = T(tomorrow ? 'tomorrow' : 'today');
    if (m) { var h = +m[1]; if (m[2] && /pm/i.test(m[2]) && h < 12) h += 12; w += ' ' + pad(h) + SEP + '00'; }
    var title = text.replace(/\s*\b(besok|tomorrow|hari ini|today)\b/ig, '').replace(/\s*\b(jam|at)\s*\d{1,2}\s*(pm|am)?.*$/i, '').trim() || text;
    s.tasks.push({ t: title, w: w, d: false });
    s.taskSel = s.tasks.length - 1;
    s.taskAdd = false;
    say(T('a.taskAdded', w));
    draw();
  });

  // Jendela contoh.
  var WINDOWS = {
    web: { title: T('win.web'), x: 120, y: 90, w: 500, h: 290, html: '<h4>' + T('win.page') + '</h4><i style="width:90%"></i><i style="width:96%"></i><i style="width:70%"></i><i style="width:82%"></i>' },
    notes: { title: T('win.notes'), x: 330, y: 150, w: 420, h: 230, html: '<h4>' + T('win.notes') + '</h4><i style="width:60%"></i><i style="width:88%"></i><i style="width:74%"></i>' },
  };
  function drawWindows() {
    var host = $('#winHost');
    host.innerHTML = '';
    Object.keys(WINDOWS).forEach(function (id) { if (s.wins[id] === 'open') host.appendChild(buildWindow(id)); });
    if (s.fullscreen) {
      var f = document.createElement('div');
      f.className = 'win film max';
      f.style.cssText = 'left:0;top:0;width:' + LW + 'px;height:' + LH + 'px;z-index:15';
      f.innerHTML = '<div style="text-align:center"><div style="font:700 26px var(--display)">' + T('fullTitle') + '</div><button type="button" class="chip" id="exitFull" style="margin-top:10px">' + T('exitFull') + '</button></div>';
      host.appendChild(f);
      f.querySelector('#exitFull').onclick = function () { s.fullscreen = false; drawWindows(); draw(); say(T('a.full')); };
    }
    drawDock();
  }
  function buildWindow(id) {
    var w = WINDOWS[id], el = document.createElement('div'), max = s.max && id === s.front;
    el.className = 'win' + (max ? ' max' : '');
    el.dataset.win = id;
    var b = winBox(id);
    el.style.cssText = 'left:' + b.x + 'px;top:' + b.y + 'px;width:' + b.w + 'px;height:' + b.h + 'px;z-index:' + (id === s.front ? 6 : 5);
    el.innerHTML = '<div class="wt"><b>' + w.title + '</b><div><span data-w="min" title="' + T('w.min') + '">–</span><span data-w="max" title="' + T('w.max') + '">▢</span><span data-w="close" title="' + T('w.close') + '">×</span></div></div><div class="wb">' + w.html + '</div>';
    el.addEventListener('mousedown', function () { if (s.front !== id) { s.front = id; drawWindows(); } });
    el.querySelector('[data-w=min]').onclick = function () { genie(id, false); say(T('a.winMin')); };
    el.querySelector('[data-w=max]').onclick = function () { s.max = !s.max; s.front = id; drawWindows(); updateTuck(); };
    el.querySelector('[data-w=close]').onclick = function () { s.wins[id] = 'closed'; drawWindows(); };
    return el;
  }
  function winBox(id) { var w = WINDOWS[id]; if (s.max && id === s.front) return { x: 0, y: 0, w: LW, h: s.hideTaskbar ? LH : LH - 34 }; return { x: w.x, y: w.y, w: w.w, h: w.h }; }

  // Dock: rumus sama dengan aplikasinya.
  var DOCK = [
    { id: 'start', name: T('d.start'), bg: 'none', sym: '<svg viewBox="0 0 24 24" fill="#4FB6F5" style="width:68%"><path d="M3 3h8.4v8.4H3zm9.6 0H21v8.4h-8.4zM3 12.6h8.4V21H3zm9.6 0H21V21h-8.4z"/></svg>' },
    { id: 'web', name: T('win.web'), bg: 'linear-gradient(#59C2FF,#1466C9)', sym: '<svg viewBox="0 0 24 24" fill="#fff" style="width:60%"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 2a8 8 0 0 1 6.9 4H12a4 4 0 0 0-3.7 2.4L5.5 6.5A8 8 0 0 1 12 4z"/></svg>' },
    { id: 'notes', name: T('win.notes'), bg: 'linear-gradient(#FFD45C,#C78F14)', sym: '<svg viewBox="0 0 24 24" fill="#231A05" style="width:56%"><path d="M5 3h14v18H5zm3 4v2h8V7zm0 4v2h8v-2zm0 4v2h5v-2z"/></svg>' },
    { id: 'music', name: T('d.music'), bg: 'linear-gradient(#FF5C7A,#B4264B)', sym: '<svg viewBox="0 0 24 24" fill="#fff" style="width:58%"><path d="' + FILL.music + '"/></svg>' },
    { id: 'pulo', name: 'Pulo', bg: 'linear-gradient(#34373E,#0D0F13)', sym: '<img src="assets/nix-happy.png" alt="" style="width:92%">' },
  ];
  var dockScale = DOCK.map(function () { return 1; }), dockPointer = null, dockFrame = 0;
  function dockHtml(size, running) {
    var slot = size + 4;
    return DOCK.map(function (d) {
      return '<button type="button" data-d="' + d.id + '" class="' + (running(d) ? 'run' : '') + '" style="width:' + slot + 'px;height:' + slot + 'px" aria-label="' + d.name + '"><span style="background:' + d.bg + '">' + d.sym + '</span><span class="nm">' + d.name + '</span></button>';
    }).join('');
  }
  function drawDock() {
    simDock.classList.toggle('off', !s.dock);
    var size = s.iconSize;
    simDock.style.height = size + 18 + 'px';
    simDock.style.borderRadius = Math.round((size + 18) * .36) + 'px';
    simDock.innerHTML = dockHtml(size, function (d) { return (d.id === 'web' || d.id === 'notes') ? s.wins[d.id] !== 'closed' : d.id === 'music' ? s.media : d.id === 'pulo'; });
    simDock.style.bottom = (s.tucked ? -(size + 26) : s.hideTaskbar ? 6 : 40) + 'px';
    $('#taskbar').style.display = s.hideTaskbar ? 'none' : 'flex';
  }
  function stepDock() {
    dockFrame = 0;
    var buttons = simDock.querySelectorAll('button[data-d]'), moving = false, size = s.iconSize, slot = size + 4 + 3, reach = (size + 4) * 2.6, grow = .62;
    var left = simDock.offsetLeft - simDock.offsetWidth / 2 + 7, total = 0;
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
  $('#dockEdge').addEventListener('mouseenter', function () { if (s.tucked) { s.tucked = false; drawDock(); say(T('c.dockUp')); } });
  simDock.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-d]');
    if (!b) return;
    var id = b.dataset.d;
    if (id === 'start') { say(T('a.start')); return; }
    if (id === 'pulo') { say(T('a.pulo')); return; }
    if (id === 'music') { s.media = true; s.playing = true; s.film = false; openPage('music'); say(T('a.dockMusic')); return; }
    bounce(b);
    if (s.wins[id] === 'closed') { s.wins[id] = 'min'; s.front = id; genie(id, true); say(T('a.dockClosed')); return; }
    if (s.wins[id] === 'min') { s.front = id; genie(id, true); say(T('a.dockMin')); return; }
    if (s.front !== id) { s.front = id; drawWindows(); say(T('a.dockFront')); return; }
    genie(id, false);
    say(T('a.dockGenie'));
  });
  function bounce(b) {
    if (reduced || !b.animate) return;
    b.querySelector('span').animate([{ transform: 'translateY(0)' }, { transform: 'translateY(-60%)', offset: .25 }, { transform: 'translateY(0)', offset: .5 }, { transform: 'translateY(-26%)', offset: .72 }, { transform: 'translateY(0)' }], { duration: 760, easing: 'ease-in-out' });
  }
  // Turun otomatis (UpdateDodge): bawaan saat tertimpa jendela maksimal; "Selalu" juga di desktop. Hanya saat taskbar disembunyikan.
  function updateTuck() {
    var covered = s.max && s.wins[s.front] === 'open';
    var should = s.dock && s.hideTaskbar && (s.dockAlways || covered) && dockPointer === null;
    if (should !== s.tucked) { s.tucked = should; drawDock(); }
  }

  // Genie: pita miring menuju ikon, sama seperti GenieWindow di aplikasi.
  var genieBusy = false;
  function smooth(x) { return x * x * (3 - 2 * x); }
  function genie(id, opening) {
    if (genieBusy) return;
    var dockBtn = simDock.querySelector('[data-d=' + id + ']');
    var bx = winBox(id), iconX, iconY, iconW;
    if (s.dock && dockBtn) {
      var r = stage.getBoundingClientRect(), b = dockBtn.getBoundingClientRect(), k = LW / r.width;
      iconX = (b.left - r.left + b.width / 2) * k; iconY = (b.top - r.top + b.height / 2) * k; iconW = b.width * k;
      if (s.tucked) { s.tucked = false; drawDock(); iconY = LH - s.iconSize; }
    } else { iconX = LW / 2 + (id === 'web' ? -24 : 24); iconY = LH - 17; iconW = 22; }
    if (reduced) { s.wins[id] = opening ? 'open' : 'min'; drawWindows(); updateTuck(); return; }
    if (s.effect === 'standard') { standardFx(id, opening, bx, iconX, iconY); return; }
    genieBusy = true;
    var source = buildWindow(id), rows = Math.round(Math.min(150, bx.h / 2.4)), rowH = bx.h / rows, strips = [], host = $('#winHost');
    for (var i = 0; i < rows; i++) {
      var strip = document.createElement('div');
      strip.className = 'strip';
      strip.style.width = bx.w + 'px';
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
    var top = bx.y, height = bx.h, width = bx.w, cx = bx.x + bx.w / 2, span = Math.max(1, iconY - top), lag = .62;
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
  function standardFx(id, opening, bx, iconX, iconY) {
    genieBusy = true;
    s.wins[id] = 'open';
    drawWindows();
    var live = $('#winHost [data-win=' + id + ']');
    if (!live || !live.animate) { s.wins[id] = opening ? 'open' : 'min'; genieBusy = false; drawWindows(); updateTuck(); return; }
    var away = 'translate(' + (iconX - bx.x - bx.w / 2).toFixed(1) + 'px,' + (iconY - bx.y - bx.h / 2).toFixed(1) + 'px) scale(.12)';
    var frames = [{ transform: 'none', opacity: 1 }, { transform: away, opacity: 0 }];
    if (opening) frames.reverse();
    live.style.transformOrigin = '50% 50%';
    var done = false;
    function finish() { if (done) return; done = true; s.wins[id] = opening ? 'open' : 'min'; genieBusy = false; drawWindows(); updateTuck(); }
    live.animate(frames, { duration: 240, easing: opening ? 'cubic-bezier(.2,.8,.3,1)' : 'cubic-bezier(.6,0,.8,.4)', fill: 'forwards' }).onfinish = finish;
    setTimeout(finish, 320);
  }

  // Jam desktop: huruf sama dengan ClockLetters (satuan tinggi huruf; busur GDI+ dengan sudut sinar, searah jarum jam dari kanan).
  // Gaya (ClockLetters.LookOf): Garis 0,075/0,42/celah 0,16; Tebal 0,17/0,56/0,25 bersudut dipangkas; Bulat 0,12/0,44/0,22 ujung bulat.
  var LOOK = { line: { w: .075, tr: .42, cut: .16, cap: 'butt', join: 'miter' }, bold: { w: .17, tr: .56, cut: .25, cap: 'butt', join: 'bevel' }, round: { w: .12, tr: .44, cut: .22, cap: 'round', join: 'round' } };
  function letters(c) {
    return {
      A: [.9, [['L', 0, 1, .45, 0, .9, 1]]],
      B: [.75, [['L', 0, 0, 0, 1], ['L', c, 0, .5, 0], ['A', .25, 0, .5, .5, -90, 180], ['L', .5, .5, c, .5], ['A', .25, .5, .5, .5, -90, 180], ['L', .5, 1, c, 1]]],
      C: [.92, [['A', 0, 0, .92, 1, 40, 280]]],
      D: [.86, [['L', 0, 0, 0, 1], ['L', c, 0, .36, 0], ['A', -.14, 0, 1, 1, -90, 180], ['L', .36, 1, c, 1]]],
      E: [.72, [['L', 0, 0, .72, 0], ['L', 0, .5, .56, .5], ['L', 0, 1, .72, 1]]],
      F: [.72, [['L', 0, 0, .72, 0], ['L', 0, c, 0, 1], ['L', c, .5, .56, .5]]],
      G: [.95, [['A', 0, 0, .95, 1, 8, 307], ['L', .52, .57, .9, .57]]],
      H: [.8, [['L', 0, 0, 0, 1], ['L', .8, 0, .8, 1], ['L', c, .5, .8 - c, .5]]],
      I: [0, [['L', 0, 0, 0, 1]]],
      J: [.62, [['L', .62, 0, .62, .69], ['A', 0, .38, .62, .62, 0, 180]]],
      K: [.78, [['L', 0, 0, 0, 1], ['L', .78, 0, c, .5, .78, 1]]],
      L: [.66, [['L', 0, 0, 0, 1], ['L', c, 1, .66, 1]]],
      M: [1, [['L', 0, 1, 0, 0, .5, .62, 1, 0, 1, 1]]],
      N: [.82, [['L', 0, 1, 0, 0, .82, 1, .82, 0]]],
      O: [1, [['A', 0, 0, 1, 1, -60, 330]]],
      P: [.75, [['L', 0, 0, 0, 1], ['L', c, 0, .5, 0], ['A', .25, 0, .5, .55, -90, 180], ['L', .5, .55, c, .55]]],
      R: [.76, [['L', 0, 0, 0, 1], ['L', c, 0, .5, 0], ['A', .25, 0, .5, .5, -90, 180], ['L', .5, .5, c, .5], ['L', .44, .5, .76, 1]]],
      S: [.76, [['A', 0, 0, .76, .5, 345, -255], ['A', 0, .5, .76, .5, 270, 255]]],
      T: [.8, [['L', 0, 0, .8, 0], ['L', .4, c, .4, 1]]],
      U: [.8, [['L', 0, 0, 0, .6], ['A', 0, .2, .8, .8, 0, 180], ['L', .8, .6, .8, 0]]],
      V: [.84, [['L', 0, 0, .42, 1, .84, 0]]],
      W: [1.2, [['L', 0, 0, .3, 1, .6, 0, .9, 1, 1.2, 0]]],
      Y: [.84, [['L', 0, 0, .42, .5, .84, 0], ['L', .42, .5, .42, 1]]],
    };
  }
  // Sudut GDI+ adalah sudut sinar dari pusat elips, bukan sudut parameter.
  function onEllipse(cx, cy, rx, ry, deg) {
    var a = deg * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a), k = 1 / Math.sqrt(c * c / (rx * rx) + sn * sn / (ry * ry));
    return [cx + k * c, cy + k * sn];
  }
  function dayWord(cap, style, word) {
    var look = LOOK[style || 'line'], set = letters(look.cut), x = 0, d = '', pad = cap * look.w;
    word = (word || new Date().toLocaleDateString(LOC, { weekday: 'long' })).toUpperCase();
    function P(px, py) { return ((px) * cap + pad).toFixed(2) + ' ' + (py * cap + pad).toFixed(2); }
    word.split('').forEach(function (ch) {
      var l = set[ch];
      if (!l) return;
      l[1].forEach(function (k) {
        if (k[0] === 'L') { for (var i = 1; i < k.length; i += 2) d += (i === 1 ? 'M' : 'L') + P(x + k[i], k[i + 1]); }
        else {
          var rx = k[3] / 2, ry = k[4] / 2, cx = x + k[1] + rx, cy = k[2] + ry, p0 = onEllipse(cx, cy, rx, ry, k[5]), p1 = onEllipse(cx, cy, rx, ry, k[5] + k[6]);
          d += 'M' + P(p0[0], p0[1]) + 'A' + (rx * cap).toFixed(2) + ' ' + (ry * cap).toFixed(2) + ' 0 ' + (Math.abs(k[6]) > 180 ? 1 : 0) + ' ' + (k[6] > 0 ? 1 : 0) + ' ' + P(p1[0], p1[1]);
        }
      });
      x += l[0] + look.tr;
    });
    var w = (x - look.tr) * cap + pad * 2, h = cap + pad * 2;
    return '<svg width="' + w.toFixed(1) + '" height="' + h.toFixed(1) + '" viewBox="0 0 ' + w.toFixed(1) + ' ' + h.toFixed(1) + '" aria-hidden="true"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="' + (cap * look.w).toFixed(2) + '" stroke-linecap="' + look.cap + '" stroke-linejoin="' + look.join + '" stroke-miterlimit="4"/></svg>';
  }
  function clockText() {
    var d = new Date(), month = d.toLocaleDateString(LOC, { month: 'long' }).toUpperCase();
    return { date: pad(d.getDate()) + ' ' + month + ', ' + d.getFullYear() + '.', time: '- ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ' -' };
  }
  function clockMarkup(cap, style) {
    var t = clockText();
    return dayWord(cap, style || s.clockStyle) + '<span class="clk-d" style="font-size:' + (cap * .31).toFixed(1) + 'px;margin-top:' + (cap * .3).toFixed(1) + 'px">' + t.date + '</span><span class="clk-t" style="font-size:' + (cap * .26).toFixed(1) + 'px;margin-top:' + (cap * .18).toFixed(1) + 'px">' + t.time + '</span>';
  }
  var simClock = $('#simClock');
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
  simClock.addEventListener('dblclick', function () { if (s.clockLock) return; s.clockScale = 1; s.clockCx = .5; s.clockTop = null; drawClock(); say(T('c.clockReset')); });
  // Pratinjau besar di bagian Jam desktop, dengan pilihan gaya huruf.
  function drawClockShow() {
    var show = $('#clockShow');
    if (!show) return;
    show.innerHTML = '<div class="clk">' + clockMarkup(Math.max(22, Math.min(46, show.clientWidth * .062))) + '</div>';
    document.querySelectorAll('[data-clock-style]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.clockStyle === s.clockStyle ? 'true' : 'false'); });
  }
  function setClockStyle(style) { s.clockStyle = style; drawClock(); drawClockShow(); }
  document.querySelectorAll('[data-clock-style]').forEach(function (b) {
    b.addEventListener('click', function () { setClockStyle(b.dataset.clockStyle); });
  });
  setInterval(function () { if (s.clock) drawClock(); drawClockShow(); }, 30000);
  function revealDesktop() { if (s.wins.web === 'open') s.wins.web = 'min'; if (s.wins.notes === 'open') s.wins.notes = 'min'; s.max = false; s.open = false; drawWindows(); draw(); }

  // Semua fitur sebagai tombol, dikelompokkan seperti Pengaturan.
  function ensureDock() { if (!s.dock) { s.dock = true; drawDock(); } }
  function compactNow() { s.open = false; s.alert = null; draw(); }
  function sizeName(k) { return T('f.' + k); }
  var GROUPS = [
    ['g.music', [
      ['play', function () { s.media = true; s.film = false; s.playing = true; s.karaoke = false; openPage('music'); say(T('c.play')); }],
      ['compact', function () { s.media = true; s.film = false; s.playing = true; closeIsland(); say(T('c.compact')); }],
      ['karaoke', function () { s.media = true; s.film = false; s.playing = true; s.karaoke = true; openPage('music'); say(T('c.karaoke')); }],
      ['sync', function () { s.media = true; s.karaoke = true; s.offset = .5; openPage('music'); say(T('c.sync')); }],
      ['film', function () { s.media = true; s.film = true; s.playing = true; s.karaoke = false; openPage('music'); say(T('c.film')); }],
      ['full', function () { s.media = true; s.film = true; s.playing = true; s.fullscreen = true; s.open = false; drawWindows(); draw(); say(T('c.full')); }],
    ]],
    ['g.alerts', [
      ['message', function () { s.open = false; showAlert(cardAlert('surprised', s.masked ? T('msgMasked') : T('msgFrom'), s.masked ? T('msgMaskedText') : T('msgText')), 4200); say(T(s.masked ? 'c.masked' : 'c.message')); }],
      ['mask', function () { s.masked = !s.masked; run('message'); }],
      ['call', function () { s.open = false; showAlert(cardAlert('surprised', T('caller'), T('callType'), '<span class="r rw" style="gap:6px"><button type="button" class="ib" style="background:#E5484D" data-act="callno" aria-label="' + T('deny') + '">' + line('close', 15, '#fff', 2.2) + '</button><button type="button" class="ib" style="background:#30D158" data-act="callok" aria-label="' + T('allow') + '">' + line('check', 15, '#fff', 2.4) + '</button></span>', 350)); say(T('c.call')); }],
      ['volume', function () { s.vol = (s.vol + 18) % 100; s.open = false; showAlert(indicator('<span style="width:14px;flex:none;display:grid">' + line('speaker', 14) + '</span>', volBars(s.vol / 100, '#9ADCFF')), 1600); say(T('c.volume')); }],
      ['bright', function () { s.open = false; showAlert(indicator('<span style="width:14px;height:14px;border-radius:50%;background:#FFE08A;flex:none;box-shadow:0 0 10px #FFE08A"></span>', volBars(.7, '#FFE08A')), 1600); say(T('c.bright')); }],
      ['charger', function () { s.open = false; showAlert(indicator('<span style="width:14px;flex:none;display:grid">' + fill('bolt', 14, '#30D158') + '</span>', '<b>' + T('charging') + '</b><span class="r" style="color:#30D158">91%</span>'), 2200); say(T('c.charger')); }],
      ['headphone', function () { s.open = false; showAlert(indicator(nix('happy', 16), '<b class="ell">Buds Pro</b><span class="r">78%</span>'), 2200); say(T('c.headphone')); }],
      ['privacy', function () { s.cam = !s.cam; s.mic = s.cam; s.open = false; draw(); say(T(s.cam ? 'c.privacyOn' : 'c.privacyOff')); }],
    ]],
    ['g.home', [
      ['home', function () { openPage('home'); say(T('c.home')); }],
      ['prayer', function () { s.widgetL = 'prayer'; openPage('home'); say(T('c.prayer')); }],
      ['weather', function () { s.widgetR = 'weather'; openPage('home'); say(T('c.weather')); }],
      ['week', function () { s.widgetL = 'week'; openPage('home'); say(T('c.week')); }],
      ['water', function () { s.widgetR = 'water'; openPage('home'); say(T('c.water')); }],
      ['world', function () { s.widgetL = 'world'; openPage('home'); say(T('c.world')); }],
      ['hijri', function () { s.widgetR = 'hijri'; openPage('home'); say(T('c.hijri')); }],
      ['countdown', function () { s.widgetL = 'countdown'; openPage('home'); say(T('c.countdown')); }],
    ]],
    ['g.prod', [
      ['timer', function () { s.timer = null; openPage('timer'); say(T('c.timer')); }],
      ['pomodoro', function () { startTimer(25, T('pomodoro')); s.focus = true; openPage('timer'); say(T('c.pomodoro')); }],
      ['tasks', function () { s.taskAdd = false; openPage('tasks'); say(T('c.tasks')); }],
      ['shelf', function () { openPage('shelf'); say(T('c.shelf')); }],
      ['focus', function () { s.focus = !s.focus; s.open = false; s.media = !s.focus; s.playing = !s.focus; draw(); say(T(s.focus ? 'c.focusOn' : 'c.focusOff')); }],
    ]],
    ['g.health', [
      ['eyes', function () { s.open = false; s.eyes = 20; showAlert(eyesView()); say(T('c.eyes')); runCycle(20, function (n) { s.eyes = 20 - n; var e = $('[data-b=eyes]'); if (e) e.textContent = s.eyes; }, function () { s.alert = null; draw(); }); }],
      ['stretch', function () { s.open = false; s.cue = 0; showAlert(stretchView()); say(T('c.stretch')); runCycle(12, function (n) { var c = Math.floor(n / 4); if (c !== s.cue) { s.cue = c; if (s.alert) { s.alert = stretchView(); draw(); } } }, function () {}); }],
      ['drink', function () { s.open = false; showAlert(cardAlert('happy', T('drinkNow'), T('mlOf', I.num(s.water * 250)), '<button type="button" class="chip r" data-act="water">' + T('drank') + '</button>'), 5000); say(T('c.drink')); }],
      ['prayerTime', function () { s.open = false; showAlert({ w: 360, h: 72, html: '<div class="v cmp" style="background:linear-gradient(#27386E,#0C1430)"><span style="width:18px;height:18px;border-radius:50%;background:#FFE3A8;box-shadow:0 0 14px #FFE3A8;flex:none"></span><div><b>' + T('prayerNow', T('prayers')[3]) + '</b><div class="mut">17' + SEP + '52 · Jakarta</div></div></div>' }, 4500); say(T('c.prayerTime')); }],
      ['prayerCount', function () { startTimer(12, T('prayers')[3]); s.open = false; draw(); say(T('c.prayerCount')); }],
    ]],
    ['g.system', [
      ['system', function () { openPage('system'); say(T('c.system')); }],
      ['clean', function () { openPage('system'); ACT.clean(); draw(); }],
      ['trash', function () { openPage('system'); ACT.trash(); draw(); }],
      ['control', function () { s.volOpen = false; openPage('control'); say(T('c.control')); }],
      ['rates', function () { s.rates = true; openPage('rates'); say(T('c.rates')); }],
    ]],
    ['g.ai', [
      ['agentWork', function () { s.agent = true; s.agentStep = 3; s.open = false; draw(); say(T('c.agentWork')); }],
      ['agentPage', function () { s.agent = true; openPage('agent'); say(T('c.agentPage')); }],
      ['perm', function () { s.agent = true; s.open = false; showAlert({ w: 370, h: 84, html: '<div class="v pg" style="padding-top:9px"><div class="rw">' + nix('surprised', 26) + '<div><b>' + T('permTitle') + '</b><div class="mut">' + T('permText') + '</div></div></div><div class="rw" style="justify-content:flex-end;margin-top:3px;gap:6px"><button type="button" class="chip" data-act="deny">' + T('deny') + '</button><button type="button" class="chip" style="background:#30D158;color:#06230F" data-act="allow">' + T('allow') + '</button></div></div>' }); say(T('c.perm')); }],
      ['agentDone', function () { s.agent = false; s.open = false; showAlert(cardAlert('stars', T('agentDone'), 'PULO · ' + T('steps', 12)), 3500); say(T('c.agentDone')); }],
    ]],
    ['g.look', [
      ['themeDefault', function () { s.theme = 'hitam'; draw(); say(T('c.themeDefault')); }],
      ['clear', function () { s.theme = 'glass'; s.kind = 'Clear'; draw(); say(T('c.clear')); }],
      ['frosted', function () { s.theme = 'glass'; s.kind = 'Frosted'; draw(); say(T('c.frosted')); }],
      ['blur', function () { s.theme = 'glass'; s.kind = 'Blur'; draw(); say(T('c.blur')); }],
      ['brightBg', function () { s.bright = !s.bright; draw(); say(T('c.brightBg')); }],
      ['small', function () { s.size = 'small'; compactNow(); say(T('c.size', sizeName('small'))); }],
      ['medium', function () { s.size = 'medium'; compactNow(); say(T('c.size', sizeName('medium'))); }],
      ['large', function () { s.size = 'large'; compactNow(); say(T('c.size', sizeName('large'))); }],
      ['minimal', function () { s.size = 'minimal'; compactNow(); say(T('c.minimal')); }],
      ['docked', function () { s.pos = 'dock'; draw(); say(T('c.docked')); }],
      ['floating', function () { s.pos = 'float'; draw(); say(T('c.floating')); }],
      ['autohide', function () { s.autoHide = !s.autoHide; s.open = false; s.media = !s.autoHide; s.playing = !s.autoHide; draw(); say(T(s.autoHide ? 'c.autohideOn' : 'c.autohideOff')); }],
      ['greet', function () { s.open = false; showAlert(cardAlert('blush', T('greetCard', greeting()), T('greetSub'), '', 330), 4500); say(T('c.greet')); }],
      ['pester', function () { s.media = false; s.playing = false; s.timer = null; s.agent = false; s.open = false; s.alert = null; s.face = 'neutral'; draw(); say(T('c.pester')); }],
    ]],
    ['g.dock', [
      ['dock', function () { s.dock = !s.dock; drawWindows(); say(T(s.dock ? 'c.dockOn' : 'c.dockOff')); }],
      ['genie', function () { s.effect = 'genie'; ensureDock(); s.max = false; if (s.wins.web === 'closed') s.wins.web = 'open'; s.front = 'web'; drawWindows(); var opening = s.wins.web === 'min'; genie('web', opening); say(T(opening ? 'c.genieOpen' : 'c.genieMin')); }],
      ['standard', function () { s.effect = 'standard'; ensureDock(); s.max = false; if (s.wins.web === 'closed') s.wins.web = 'open'; s.front = 'web'; drawWindows(); genie('web', s.wins.web === 'min'); say(T('c.standard')); }],
      ['dockSize', function () { ensureDock(); s.iconSize = s.iconSize === 32 ? 44 : s.iconSize === 44 ? 24 : 32; drawDock(); say(T('c.dockSize', s.iconSize)); }],
      ['hideTaskbar', function () { ensureDock(); s.hideTaskbar = !s.hideTaskbar; drawWindows(); updateTuck(); say(T(s.hideTaskbar ? 'c.hideTaskbarOn' : 'c.hideTaskbarOff')); }],
      ['dockAuto', function () { ensureDock(); s.hideTaskbar = true; s.dockAlways = false; s.max = true; s.wins.web = 'open'; s.front = 'web'; drawWindows(); s.tucked = true; drawDock(); say(T('c.dockAuto')); }],
      ['dockAlways', function () { ensureDock(); s.hideTaskbar = true; s.dockAlways = !s.dockAlways; s.max = false; if (s.dockAlways) revealDesktop(); drawWindows(); updateTuck(); say(T(s.dockAlways ? 'c.dockAlwaysOn' : 'c.dockAlwaysOff')); }],
    ]],
    ['g.clock', [
      ['clock', function () { s.clock = !s.clock; if (s.clock) revealDesktop(); drawClock(); say(T(s.clock ? 'c.clockOn' : 'c.clockOff')); }],
      ['clockMove', function () { s.clock = true; s.clockLock = false; revealDesktop(); drawClock(); say(T('c.clockMove')); }],
      ['clockLock', function () { s.clock = true; s.clockLock = !s.clockLock; revealDesktop(); drawClock(); say(T(s.clockLock ? 'c.clockLockOn' : 'c.clockLockOff')); }],
      ['clockLine', function () { s.clock = true; revealDesktop(); setClockStyle('line'); say(T('c.clockStyle', T('clock.line'))); }],
      ['clockBold', function () { s.clock = true; revealDesktop(); setClockStyle('bold'); say(T('c.clockStyle', T('clock.bold'))); }],
      ['clockRound', function () { s.clock = true; revealDesktop(); setClockStyle('round'); say(T('c.clockStyle', T('clock.round'))); }],
    ]],
  ];
  // Tiap tombol adalah satu adegan: sisa adegan sebelumnya tidak boleh menutupinya. Tema, ukuran, posisi, dan dock tetap.
  function resetScene(name) {
    s.pin = false; s.alert = null; s.volOpen = false; s.face = 'neutral'; s.taskDel = false;
    clearTimeout(alertTimer);
    clearInterval(runCycle.t);
    if (name !== 'autohide') s.autoHide = false;
    if (name !== 'focus') s.focus = false;
    if (s.fullscreen) { s.fullscreen = false; drawWindows(); }
    if (/^(compact|small|medium|large|minimal|focus|autohide|agentWork|prayerCount)$/.test(name)) { s.timer = null; if (name !== 'agentWork') s.agent = false; }
  }
  var FEATURES = {};
  GROUPS.forEach(function (g) { g[1].forEach(function (f) { FEATURES[f[0]] = f[1]; }); });
  function run(name) { if (FEATURES[name]) FEATURES[name](); }

  // Daftar fitur: satu kelompok terbuka, seperti daftar pengaturan.
  var groupsEl = $('#groups'), featureButtons = {};
  function openGroup(section) {
    groupsEl.querySelectorAll('.grp').forEach(function (g) {
      var open = g === section;
      g.classList.toggle('open', open);
      g.querySelector('.grp-h').setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  function runFeature(button, name) {
    resetScene(name);
    run(name);
    groupsEl.querySelectorAll('.feat.on').forEach(function (x) { x.classList.remove('on'); });
    button.classList.add('on');
    openGroup(button.closest('.grp'));
  }
  GROUPS.forEach(function (g, i) {
    var section = document.createElement('div');
    section.className = 'grp' + (i === 0 ? ' open' : '');
    var headBtn = document.createElement('button');
    headBtn.type = 'button';
    headBtn.className = 'grp-h';
    headBtn.textContent = T(g[0]);
    headBtn.setAttribute('aria-expanded', i === 0 ? 'true' : 'false');
    headBtn.addEventListener('click', function () { openGroup(section); });
    section.appendChild(headBtn);
    var list = document.createElement('div');
    list.className = 'grp-b';
    g[1].forEach(function (f) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'feat';
      b.textContent = T('f.' + f[0]);
      b.addEventListener('click', function () { runFeature(b, f[0]); });
      featureButtons[f[0]] = b;
      list.appendChild(b);
    });
    section.appendChild(list);
    groupsEl.appendChild(section);
  });
  function tryFeature(name) { if (featureButtons[name]) featureButtons[name].click(); $('#coba').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' }); }
  document.querySelectorAll('[data-try]').forEach(function (b) { b.addEventListener('click', function () { tryFeature(b.dataset.try); }); });

  // Wajah NIX.
  var facesEl = $('#faces');
  T('faces').forEach(function (f) {
    var b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = '<img src="assets/nix-' + f[0] + '.png" width="310" height="280" alt="" loading="lazy">' + f[1];
    b.addEventListener('click', function () {
      s.media = false; s.playing = false; s.timer = null; s.agent = false; s.open = false; s.alert = null; s.focus = false; s.face = f[0];
      draw();
      say(T('nix.say', f[1]));
      $('#coba').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    });
    facesEl.appendChild(b);
  });

  // NIX di pembuka.
  var heroLines = T('hero.lines'), heroIndex = 0, heroBtn = $('#heroNix'), heroFace = $('#heroFace'), heroSay = $('#heroSay');
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
      var ln = $('.lineb');
      if (ln) ln.style.setProperty('--f', 15 + (s.posn * 6) % 80 + '%');
    }
    if (s.timer && !s.timer.paused) {
      s.timer.left -= 1;
      if (s.timer.left <= 0) { var name = s.timer.name; s.timer = null; s.focus = false; showAlert({ w: 300, h: 54, html: '<div class="v cmp">' + nix('stars', 28) + '<b>' + T('timerDone', esc(name)) + '</b></div>' }, 3500); }
      else {
        var t = $('[data-b=timer]');
        if (t) t.textContent = mmss(s.timer.left);
        var pool = $('.pool');
        if (pool) pool.style.setProperty('--lvl', (s.timer.left / s.timer.total * 100).toFixed(1) + '%');
      }
    }
    if (s.open && s.page === 'system') { s.cpu = 8 + Math.round(Math.random() * 14); var c = $('[data-b=cpu]'); if (c) c.textContent = s.cpu + '%'; }
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

  // Gambar pulau untuk kartu ringkasan fitur: dari fungsi tampilan yang sama, dengan keadaan contoh tersendiri.
  var BASE = JSON.parse(JSON.stringify(s));
  function snapshot(over, view) {
    var keep = s;
    s = JSON.parse(JSON.stringify(BASE));
    for (var k in over) s[k] = over[k];
    var v = view();
    var out = { w: v.w, h: v.h, html: v.html, cls: islandClass() };
    s = keep;
    return out;
  }
  window.PuloSim = {
    tryFeature: tryFeature,
    preview: function (name) {
      switch (name) {
        case 'music': return snapshot({ open: true, page: 'music' }, pageView);
        case 'alert': return snapshot({}, function () { return cardAlert('surprised', T('msgFrom'), T('msgText')); });
        case 'home': return snapshot({ open: true, page: 'home', media: false }, pageView);
        case 'timer': return snapshot({ open: true, page: 'timer', media: false }, pageView);
        case 'shelf': return snapshot({ open: true, page: 'shelf', media: false }, pageView);
        case 'tasks': return snapshot({ open: true, page: 'tasks', media: false }, pageView);
        case 'agent': return snapshot({ agent: true, media: false }, compactView);
        case 'system': return snapshot({ open: true, page: 'system', media: false }, pageView);
        case 'look': return snapshot({ theme: 'glass', kind: 'Blur', media: true, playing: true }, compactView);
        case 'idle': return snapshot({ media: false, playing: false }, compactView);
      }
      return null;
    },
    dock: function (size) { return dockHtml(size, function (d) { return d.id !== 'start' && d.id !== 'music'; }); },
    clock: function (cap, style) { return clockMarkup(cap, style); },
  };
  document.dispatchEvent(new Event('pulo-sim-ready'));
})();
