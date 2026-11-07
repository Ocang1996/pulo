// Dua bahasa untuk landing page dan simulator. Bahasa dipilih dari ?lang=, lalu pilihan terakhir pengunjung, lalu bahasa browser.
// Tiap kunci menyimpan [Indonesia, English] berdampingan supaya keduanya selalu diubah bersama. Nilai boleh fungsi.
(function () {
  'use strict';
  var S = {
    // Umum
    'meta.title': ['Pulo untuk Windows', 'Pulo for Windows'],
    'meta.desc': ['Pulo adalah pulau kecil di tepi atas layar Windows, rumah NIX si kucing hitam. Musik, notifikasi, timer, tugas, widget, dock, dan jam desktop. Coba langsung di browser.',
      'Pulo is a small island at the top of your Windows screen, home to NIX the black cat. Music, notifications, timers, tasks, widgets, a dock, and a desktop clock. Try it right in your browser.'],
    'lang.switch': ['EN', 'ID'],
    'lang.switchLabel': ['Switch to English', 'Ganti ke bahasa Indonesia'],
    'nav.label': ['Halaman ini', 'This page'],
    'nav.features': ['Fitur', 'Features'],
    'nav.try': ['Coba', 'Try'],
    'nav.dock': ['Dock', 'Dock'],
    'nav.clock': ['Jam', 'Clock'],
    'nav.get': ['Unduh', 'Get'],
    'nav.faq': ['Tanya', 'FAQ'],
    'version': [function (v) { return 'Versi ' + v; }, function (v) { return 'Version ' + v; }],

    // Pembuka
    'hero.title': ['Layar Anda punya pulau.<br>NIX tinggal di sana.', 'Your screen has an island.<br>NIX lives there.'],
    'hero.lede': ['Pulo adalah pulau kecil di tepi atas layar Windows. Lagu, pesan, timer, dan pekerjaan yang sedang berjalan muncul di sana, dan NIX, kucing hitam penghuninya, ikut bereaksi. Di tepi bawah, dock menampung aplikasi Anda.',
      'Pulo is a small island at the top edge of your Windows screen. Songs, messages, timers, and work in progress show up there, and NIX, the black cat who lives on it, reacts along. At the bottom edge, a dock holds your apps.'],
    'hero.try': ['Coba di browser', 'Try it in your browser'],
    'hero.get': ['Unduh untuk Windows', 'Get it for Windows'],
    'hero.meta': ['Windows 10 dan 11 · x64 dan ARM64 · Gratis', 'Windows 10 and 11 · x64 and ARM64 · Free'],
    'hero.count': [function (n) { return n + ' kali diunduh'; }, function (n) { return n + ' downloads'; }],
    'hero.say': ['Klik aku.', 'Click me.'],
    'hero.nixLabel': ['Sapa NIX', 'Say hi to NIX'],
    'hero.nixAlt': ['NIX, kucing hitam bermata kuning', 'NIX, a black cat with yellow eyes'],
    'hero.lines': [
      [['surprised', 'Eh! Kaget aku.'], ['blush', 'Hehe, geli.'], ['stars', 'Aku tinggal di tepi atas layarmu.'], ['love', 'Coba simulator di bawah, ya.'], ['sweat', 'Sudah, sudah...'], ['angry', 'Berhenti mengklik!'], ['dizzy', 'Pusing...'], ['happy', 'Oke, aku maafkan.']],
      [['surprised', 'Oh! You startled me.'], ['blush', 'Hehe, that tickles.'], ['stars', 'I live at the top of your screen.'], ['love', 'Try the simulator below.'], ['sweat', 'Okay, okay...'], ['angry', 'Stop clicking!'], ['dizzy', 'So dizzy...'], ['happy', 'Fine, you are forgiven.']]],

    // Ringkasan fitur
    'bento.title': ['Satu pulau, banyak pekerjaan.', 'One island, plenty of work.'],
    'bento.lede': ['Semua yang biasanya tersebar di pojok layar, pop-up, dan jendela kecil, sekarang di satu tempat. Gambar di setiap kartu digambar dari tampilan Pulo yang sebenarnya.',
      'Everything that usually hides in screen corners, pop-ups, and little windows, now in one place. Each card is drawn from what Pulo actually looks like.'],
    'bento.try': ['Coba', 'Try it'],
    'b.music.t': ['Musik dari aplikasi apa pun', 'Music from any app'],
    'b.music.d': ['Spotify, YouTube di browser, atau pemutar lain. Sampul, kontrol, volume, dan lirik tersinkron, tanpa menghubungkan akun.', 'Spotify, YouTube in the browser, or any player. Cover art, controls, volume, and synced lyrics, with no account to connect.'],
    'b.alert.t': ['Notifikasi di pulau', 'Notifications on the island'],
    'b.alert.d': ['WhatsApp, Telegram, Outlook, dan lainnya. Isinya disamarkan saat presentasi.', 'WhatsApp, Telegram, Outlook, and more. Contents are hidden while you present.'],
    'b.home.t': ['Beranda dengan widget', 'Home with widgets'],
    'b.home.d': ['Jadwal sholat yang dihitung di perangkat, cuaca, minum, jam dunia, Hijriah, dan hitung mundur.', 'Prayer times calculated on your device, weather, water, world clock, Hijri calendar, and countdown.'],
    'b.timer.t': ['Timer dan Pomodoro', 'Timer and Pomodoro'],
    'b.timer.d': ['Putar pita ukurnya, lalu fokus. Notifikasi ditahan sampai selesai.', 'Spin the ruler, then focus. Notifications wait until you are done.'],
    'b.shelf.t': ['Saku NIX', 'NIX\'s Pocket'],
    'b.shelf.d': ['Seret file, teks, tautan, atau gambar ke pulau. Ambil lagi kapan saja.', 'Drop files, text, links, or images on the island. Grab them back anytime.'],
    'b.tasks.t': ['Tugas dengan bahasa sehari-hari', 'Tasks in plain words'],
    'b.tasks.d': ['Tulis "kirim laporan besok jam 9". Pulo membaca waktunya dan mengetuk saat jatuh tempo.', 'Type "send the report tomorrow at 9". Pulo reads the time and taps you when it is due.'],
    'b.agent.t': ['Asisten AI yang terlihat', 'Your AI assistant, in view'],
    'b.agent.d': ['Langkah Claude Code tampil di pulau, dan izinnya bisa dijawab dari sana.', 'Claude Code\'s steps show on the island, and you can answer its permission requests there.'],
    'b.system.t': ['Sistem dan Kontrol', 'System and Controls'],
    'b.system.d': ['CPU, RAM, disk, Wi-Fi, Bluetooth, kunci, dan tidur, tanpa membuka Pengaturan.', 'CPU, RAM, disk, Wi-Fi, Bluetooth, lock, and sleep, without opening Settings.'],
    'b.look.t': ['Hitam atau Liquid Glass', 'Black or Liquid Glass'],
    'b.look.d': ['Menempel atau mengambang, empat ukuran, dan sembunyi otomatis.', 'Docked or floating, four sizes, and auto-hide.'],
    'b.dock.t': ['Dock dengan efek Genie', 'A dock with a Genie effect'],
    'b.dock.d': ['Aplikasi yang sama dengan taskbar Anda, di tepi bawah. Opsional.', 'The same apps as your taskbar, at the bottom edge. Optional.'],
    'b.clock.t': ['Jam desktop', 'Desktop clock'],
    'b.clock.d': ['Nama hari dengan huruf buatan sendiri, dalam tiga gaya. Opsional.', 'The day name in custom lettering, in three styles. Optional.'],
    'b.light.t': ['Ringan dan pribadi', 'Light and private'],
    'b.light.d': ['Tanpa akun, iklan, atau telemetri. Data tetap di komputer Anda.', 'No account, ads, or telemetry. Your data stays on your PC.'],

    // Simulator
    'try.title': ['Coba di sini.', 'Try it here.'],
    'try.lede': ['Arahkan kursor ke pulau di layar contoh, atau pilih fitur di daftar. Semua berjalan di browser dan tidak menyentuh komputer Anda.',
      'Hover over the island on the sample screen, or pick a feature from the list. Everything runs in your browser and never touches your computer.'],
    'try.caption': ['Layar contoh. Lagu, pesan, dan data di sini hanya contoh.', 'Sample screen. Songs, messages, and data here are only examples.'],
    'try.clockLabel': ['Jam desktop contoh', 'Sample desktop clock'],
    'try.dockLabel': ['Dock contoh', 'Sample dock'],

    // NIX
    'nix.title': ['Kenalkan, NIX.', 'Meet NIX.'],
    'nix.lede': ['Kaget saat ada pesan, berbinar saat pekerjaan selesai, tidur saat Anda fokus, dan marah kalau diganggu terus. Klik satu wajah untuk melihatnya di pulau.',
      'Startled by a message, sparkling when work is done, asleep while you focus, and grumpy if you keep poking. Click a face to see it on the island.'],
    'faces': [
      [['neutral', 'Diam'], ['side', 'Melirik'], ['closed', 'Berkedip'], ['happy', 'Senang'], ['blush', 'Tersipu'], ['stars', 'Berbinar'], ['love', 'Sayang'], ['surprised', 'Kaget'], ['sweat', 'Keringat'], ['angry', 'Marah'], ['dizzy', 'Pusing'], ['sleep', 'Tidur'], ['sad', 'Sedih']],
      [['neutral', 'Calm'], ['side', 'Glance'], ['closed', 'Blink'], ['happy', 'Happy'], ['blush', 'Shy'], ['stars', 'Sparkle'], ['love', 'Love'], ['surprised', 'Startled'], ['sweat', 'Sweat'], ['angry', 'Angry'], ['dizzy', 'Dizzy'], ['sleep', 'Asleep'], ['sad', 'Sad']]],
    'nix.say': [function (f) { return 'NIX ' + f.toLowerCase() + '. Di aplikasi, wajahnya berganti sendiri mengikuti apa yang terjadi.'; }, function (f) { return 'NIX: ' + f.toLowerCase() + '. In the app, the face changes by itself with whatever is happening.'; }],

    // Dock
    'dock.title': ['Pulau di atas, dermaga di bawah.', 'An island on top, a pier below.'],
    'dock.lede': ['Dock Pulo berisi aplikasi yang sama dengan taskbar Anda, dalam urutan yang sama, tanpa pengaturan apa pun. Mati secara bawaan. Saat dimatikan, taskbar Windows kembali seperti semula.',
      'Pulo\'s dock holds the same apps as your taskbar, in the same order, with nothing to set up. Off by default. Turn it off and the Windows taskbar is back as it was.'],
    'dock.r1': ['Ikon membesar mengikuti kursor.', 'Icons grow under your cursor.'],
    'dock.r2': ['Jendela tersedot ke ikonnya saat diperkecil, lalu keluar lagi saat dibuka.', 'Windows pour into their icon when minimized, and flow back out when opened.'],
    'dock.r3': ['Lebih suka animasi Windows biasa? Pilih efek Standar di Pengaturan.', 'Prefer the usual Windows animation? Pick the Standard effect in Settings.'],
    'dock.r4': ['Ukuran ikon bisa diatur dari 24 sampai 56 piksel.', 'Icon size goes from 24 to 56 pixels.'],
    'dock.r5': ['Bisa menggantikan taskbar Windows sepenuhnya.', 'It can replace the Windows taskbar completely.'],
    'dock.r6': ['Turun sendiri saat tertimpa jendela, atau selalu bersembunyi sampai kursor menyentuh tepi bawah.', 'It slips away when a window covers it, or always stays hidden until your cursor touches the bottom edge.'],
    'try.btn': ['Coba', 'Try'],

    // Jam
    'clock.title': ['Hari ini, di wallpaper Anda.', 'Today, on your wallpaper.'],
    'clock.lede': ['Jam desktop menulis nama hari, tanggal, dan jam di desktop, dengan huruf yang dibuat khusus untuk Pulo. Hanya terlihat saat desktop terlihat. Mati secara bawaan.',
      'The desktop clock writes the day, date, and time on your desktop, in lettering drawn just for Pulo. It shows only when the desktop does. Off by default.'],
    'clock.styles': ['Gaya huruf', 'Lettering'],
    'clock.line': ['Garis', 'Line'],
    'clock.bold': ['Tebal', 'Bold'],
    'clock.round': ['Bulat', 'Rounded'],
    'clock.r1': ['Tarik bagian tengahnya untuk menggeser ke mana saja.', 'Drag the middle to move it anywhere.'],
    'clock.r2': ['Tarik tepi atas atau bawah untuk mengubah ukurannya. Klik dua kali di tepi untuk kembali semula.', 'Drag the top or bottom edge to resize it. Double-click an edge to reset.'],
    'clock.r3': ['Kunci supaya tidak tergeser, dan klik tembus ke desktop.', 'Lock it so it stays put, and clicks pass through to the desktop.'],
    'clock.showLabel': ['Contoh jam desktop', 'Desktop clock example'],

    // Ringan dan pribadi
    'privacy.statement': ['Tanpa akun, tanpa iklan, tanpa telemetri. <span>Data Anda tetap di komputer Anda.</span>', 'No account, no ads, no telemetry. <span>Your data stays on your PC.</span>'],
    'stat.ram': ['RAM saat diam', 'RAM when idle'],
    'stat.cpu': ['CPU saat diam', 'CPU when idle'],
    'stat.size': ['ukuran paket', 'package size'],
    'stat.account': ['akun yang perlu dibuat', 'accounts to create'],
    'privacy.fine': ['Batas yang kami jaga: pulau di bawah 40 MB RAM dan 0% CPU saat diam (terukur 27 MB pada build rilis). Dock berjalan di proses sendiri dan menambah sekitar 22–31 MB bila dinyalakan. Internet hanya dipakai untuk lirik, kurs, cuaca, dan sampul film, keempatnya mati sampai Anda menyalakannya. <a href="privacy.html">Kebijakan privasi</a>.',
      'The limits we keep: the island stays under 40 MB of RAM and 0% CPU when idle (measured 27 MB on the release build). The dock runs in its own process and adds about 22–31 MB when turned on. The internet is used only for lyrics, exchange rates, weather, and film posters, and all four stay off until you turn them on. <a href="privacy.html">Privacy policy</a>.'],

    // Unduh
    'get.title': ['Bawa NIX pulang.', 'Take NIX home.'],
    'get.store': ['Microsoft Store', 'Microsoft Store'],
    'get.storeText': ['Cara termudah. Pasang sekali, pembaruan diurus Store. Fitur yang mengubah perilaku Windows mati sampai Anda menyalakannya di Pengaturan: telepon WhatsApp di pulau, buka chat pengirim, notifikasi hanya di pulau, dan tombol volume.',
      'The easiest way. Install once and the Store keeps it updated. Features that change how Windows behaves stay off until you turn them on in Settings: WhatsApp calls on the island, opening the sender\'s chat, notifications only on the island, and the volume keys.'],
    'get.zip': ['Unduh Zip', 'Download Zip'],
    'get.zipText': ['Untuk yang tidak memakai Store. x64 dan ARM64. Semua fitur langsung menyala, dan Windows memperbaruinya sendiri.', 'For those who skip the Store. x64 and ARM64. Every feature is on from the start, and Windows keeps it updated.'],
    'get.zipCount': [function (n) { return ' Sudah ' + n + ' kali diunduh.'; }, function (n) { return ' Downloaded ' + n + ' times.'; }],
    'get.coffee': ['Traktir kopi', 'Buy me a coffee'],
    'get.coffeeText': ['Pulo gratis. Kalau Pulo membantu, Anda bisa mentraktir pembuatnya kopi lewat Saweria. Pindai kodenya dengan ponsel, atau buka tautannya. Tidak ada fitur yang dikunci.',
      'Pulo is free. If it helps you, you can buy its maker a coffee on Saweria. Scan the code with your phone, or open the link. No features are locked.'],
    'get.qrAlt': ['Kode QR ke saweria.co/CloVerX', 'QR code to saweria.co/CloVerX'],
    'get.soon': ['Segera hadir', 'Coming soon'],
    'get.openStore': ['Buka Store', 'Open the Store'],
    'get.openSaweria': ['Buka Saweria', 'Open Saweria'],
    'get.downloadZip': ['Unduh Pulo.zip', 'Download Pulo.zip'],
    // Cara memasang
    'install.title': ['Cara memasang', 'How to install'],
    'install.lede': ['Pilih salah satu. Keduanya Pulo yang sama; bedanya cara memasang dan memperbarui.', 'Pick one. Both are the same Pulo; only installing and updating differ.'],
    'install.tabs': ['Cara memasang', 'How to install'],
    'install.store': [[
      ['Buka halaman Pulo di Store', 'Klik <kbd>Buka Store</kbd> di atas, atau buka aplikasi Microsoft Store lalu cari <b>Pulo</b>. Pastikan penerbitnya <b>CloVerX</b>.'],
      ['Klik Dapatkan', 'Klik <kbd>Dapatkan</kbd> (atau <kbd>Instal</kbd>). Gratis, dan untuk aplikasi gratis biasanya tidak perlu masuk akun Microsoft. Windows App Runtime ikut terpasang bila belum ada.'],
      ['Buka Pulo', 'Setelah selesai, klik <kbd>Buka</kbd>, atau cari <b>Pulo</b> di Start. Pulau muncul di tepi atas layar dan NIX menyapa.'],
      ['Nyalakan yang Anda mau', 'Buka Pulo sekali lagi dari Start untuk membuka Pengaturan. Di versi Store, mulai bersama Windows, notifikasi hanya di pulau, tombol volume, dan telepon WhatsApp mati sampai Anda menyalakannya.'],
    ], [
      ['Open Pulo in the Store', 'Click <kbd>Open the Store</kbd> above, or open the Microsoft Store app and search for <b>Pulo</b>. Check that the publisher is <b>CloVerX</b>.'],
      ['Click Get', 'Click <kbd>Get</kbd> (or <kbd>Install</kbd>). It is free, and free apps usually do not need a Microsoft account sign-in. The Windows App Runtime comes along if you do not have it.'],
      ['Open Pulo', 'When it finishes, click <kbd>Open</kbd>, or search for <b>Pulo</b> in Start. The island appears at the top of your screen and NIX says hi.'],
      ['Turn on what you want', 'Open Pulo from Start once more to open Settings. In the Store version, start with Windows, notifications only on the island, the volume keys, and WhatsApp calls stay off until you turn them on.'],
    ]],
    'install.storeNote': ['Pembaruan diurus Microsoft Store. Menghapus: Pengaturan Windows › Aplikasi › Pulo › Hapus instalan.', 'The Microsoft Store handles updates. To remove: Windows Settings › Apps › Pulo › Uninstall.'],
    'install.zip': [[
      ['Unduh Pulo.zip', 'Klik <kbd>Unduh Pulo.zip</kbd> di atas (sekitar 1 MB). Isinya pemasang, sertifikat Pulo, dan panduan BACA-SAYA.'],
      ['Ekstrak dulu', 'Klik kanan Pulo.zip, pilih <kbd>Ekstrak Semua</kbd>, lalu <kbd>Ekstrak</kbd>. Jangan menjalankan pemasang dari dalam Zip, karena berkas lain di sebelahnya tidak ikut terbaca.'],
      ['Jalankan Pasang Pulo', 'Di folder hasil ekstrak, klik dua kali <b>Pasang Pulo.cmd</b>. Tetap tersambung internet: Windows mengunduh Pulo (sekitar 8 MB) dan Windows App Runtime (48 MB, hanya bila belum ada).'],
      ['Lewati peringatan SmartScreen', 'Bila muncul "Windows protected your PC", klik <kbd>More info</kbd> lalu <kbd>Run anyway</kbd>. Peringatan ini muncul karena versi Zip memakai sertifikat buatan sendiri, bukan sertifikat berbayar.'],
      ['Setujui izin admin sekali', 'Pilih <kbd>Ya</kbd> saat Windows meminta izin. Izin ini hanya untuk mempercayai sertifikat Pulo; Pulo sendiri tidak berjalan sebagai administrator.'],
      ['Tunggu sampai selesai', 'Jendela hitam menulis kemajuannya, bisa beberapa menit. Saat tertulis "Selesai", pulau muncul di tepi atas layar. Tekan tombol apa saja untuk menutup jendela itu.'],
    ], [
      ['Download Pulo.zip', 'Click <kbd>Download Pulo.zip</kbd> above (about 1 MB). It holds the installer, Pulo\'s certificate, and a README.'],
      ['Extract it first', 'Right-click Pulo.zip, choose <kbd>Extract All</kbd>, then <kbd>Extract</kbd>. Do not run the installer from inside the Zip, because the files next to it would not be found.'],
      ['Run Install Pulo', 'In the extracted folder, double-click <b>Pasang Pulo.cmd</b> (Install Pulo). Stay online: Windows downloads Pulo (about 8 MB) and the Windows App Runtime (48 MB, only if missing).'],
      ['Get past SmartScreen', 'If you see "Windows protected your PC", click <kbd>More info</kbd>, then <kbd>Run anyway</kbd>. It shows up because the Zip version uses a self-made certificate, not a paid one.'],
      ['Approve the admin prompt once', 'Choose <kbd>Yes</kbd> when Windows asks. This is only to trust Pulo\'s certificate; Pulo itself never runs as administrator.'],
      ['Wait until it is done', 'A black window shows the progress, which can take a few minutes. When it says "Done", the island appears at the top of your screen. Press any key to close that window.'],
    ]],
    'install.zipNote': ['Windows memeriksa versi baru sendiri sekali sehari. Menghapus: klik dua kali <b>Hapus Pulo.cmd</b> di folder yang sama, atau Pengaturan Windows › Aplikasi.', 'Windows checks for new versions by itself once a day. To remove: double-click <b>Hapus Pulo.cmd</b> in the same folder, or use Windows Settings › Apps.'],
    'install.helpTitle': ['Ada kendala?', 'Something wrong?'],
    'install.help': [[
      ['Tertulis "Gagal memasang"', 'Periksa internet, lalu jalankan <b>Pasang Pulo.cmd</b> lagi. Pulo butuh Windows 10 versi 2004 atau lebih baru; ketik <kbd>winver</kbd> di Start untuk melihat versi Anda.'],
      ['Pulau tidak terlihat', 'Cari <b>Pulo</b> di Start lalu buka. Pulau bersembunyi saat game atau aplikasi layar penuh terbuka, dan bisa naik keluar layar bila sembunyi otomatis menyala.'],
      ['Notifikasi tidak muncul di pulau', 'Saat pertama, Windows meminta izin akses notifikasi untuk Pulo. Bila terlewat, nyalakan di Pengaturan Pulo › Notifikasi & perangkat.'],
    ], [
      ['It says "Install failed"', 'Check your internet, then run <b>Pasang Pulo.cmd</b> again. Pulo needs Windows 10 version 2004 or later; type <kbd>winver</kbd> in Start to see yours.'],
      ['I cannot see the island', 'Search for <b>Pulo</b> in Start and open it. The island hides while a game or full-screen app is open, and slides off the screen when auto-hide is on.'],
      ['Notifications do not show on the island', 'The first time, Windows asks to let Pulo read notifications. If you missed it, turn it on in Pulo Settings › Notifications & devices.'],
    ]],

    // Persyaratan
    'req.title': ['Persyaratan', 'Requirements'],
    'req.os': ['Sistem', 'System'],
    'req.osV': ['Windows 10 versi 2004 (19041) atau lebih baru, atau Windows 11', 'Windows 10 version 2004 (19041) or later, or Windows 11'],
    'req.cpu': ['Prosesor', 'Processor'],
    'req.cpuV': ['x64 atau ARM64', 'x64 or ARM64'],
    'req.mem': ['Memori', 'Memory'],
    'req.memV': ['Di bawah 40 MB saat diam, ditambah 22–31 MB bila dock dinyalakan', 'Under 40 MB when idle, plus 22–31 MB with the dock on'],
    'req.disk': ['Ruang', 'Disk'],
    'req.diskV': ['Sekitar 8 MB, ditambah Windows App Runtime 48 MB bila belum ada', 'About 8 MB, plus the 48 MB Windows App Runtime if not installed'],
    'req.net': ['Internet', 'Internet'],
    'req.netV': ['Tidak perlu. Hanya untuk lirik, kurs, cuaca, dan sampul film bila Anda menyalakannya', 'Not needed. Only for lyrics, exchange rates, weather, and film posters when you turn them on'],

    // Tanya jawab
    'faq.title': ['Tanya jawab', 'Questions'],
    'faq': [[
      ['Apakah Pulo aman dipasang?', 'Ya. Versi Store diperiksa dan ditandatangani Microsoft. Pulo tidak memasang driver atau layanan, tidak berjalan sebagai administrator, dan bisa dihapus bersih lewat Pengaturan Windows › Aplikasi.'],
      ['Apakah Pulo mengirim data saya ke mana pun?', 'Tidak. Tanpa akun, iklan, dan telemetri. Internet hanya dipakai untuk lirik, kurs, cuaca, dan sampul film, dan keempatnya mati sampai Anda menyalakannya. Rinciannya ada di <a href="privacy.html">kebijakan privasi</a>.'],
      ['Apa beda versi Store dan Zip?', 'Isinya sama. Versi Store diperbarui oleh Store, dan fitur yang mengubah perilaku Windows (telepon WhatsApp di pulau, notifikasi hanya di pulau, tombol volume, mulai bersama Windows) mati sampai Anda menyalakannya. Versi Zip menyalakannya sejak awal dan diperbarui Windows App Installer.'],
      ['Kenapa SmartScreen memperingatkan versi Zip?', 'Versi Zip ditandatangani dengan sertifikat buatan sendiri, bukan sertifikat berbayar, jadi Windows belum mengenalnya. Pilih More info lalu Run anyway. Versi Store tidak memunculkan peringatan ini.'],
      ['Apakah Pulo memperlambat komputer?', 'Pulo dijaga di bawah 40 MB RAM dan 0% CPU saat diam, dan hanya bergerak saat ada yang terjadi. Selama musik diputar, CPU-nya di bawah 0,5%. Animasi mengikuti pengaturan "Animation effects" Windows dan berhenti saat Battery Saver aktif.'],
      ['Apakah jalan di Windows 10?', 'Ya, mulai Windows 10 versi 2004 (19041). Beberapa efek kaca terlihat paling bagus di Windows 11.'],
      ['Musik dari aplikasi mana saja yang tampil?', 'Semua aplikasi yang melapor ke kontrol media Windows: Spotify, YouTube dan situs lain di Chrome atau Edge, Apple Music, VLC, dan lainnya. Tidak perlu menghubungkan akun.'],
      ['Bagaimana cara menghapus Pulo?', 'Pengaturan Windows › Aplikasi › Pulo › Hapus. Bila dock menyembunyikan taskbar, taskbar dikembalikan saat Pulo keluar. Versi Zip juga bisa dihapus lewat Hapus Pulo di folder Zip-nya.'],
      ['Apakah ini Dynamic Island?', 'Bukan. Dynamic Island adalah merek Apple Inc. Pulo adalah aplikasi Windows mandiri dengan bentuk serupa, dibuat oleh CloVerX, dan tidak berafiliasi dengan Apple.'],
    ], [
      ['Is Pulo safe to install?', 'Yes. The Store version is checked and signed by Microsoft. Pulo installs no drivers or services, never runs as administrator, and removes cleanly from Windows Settings › Apps.'],
      ['Does Pulo send my data anywhere?', 'No. No account, ads, or telemetry. The internet is used only for lyrics, exchange rates, weather, and film posters, and all four stay off until you turn them on. Details are in the <a href="privacy.html">privacy policy</a>.'],
      ['What is the difference between the Store and Zip versions?', 'They are the same app. The Store version is updated by the Store, and features that change how Windows behaves (WhatsApp calls on the island, notifications only on the island, volume keys, start with Windows) stay off until you turn them on. The Zip version has them on from the start and is updated by Windows App Installer.'],
      ['Why does SmartScreen warn about the Zip version?', 'The Zip version is signed with a self-made certificate, not a paid one, so Windows does not know it yet. Choose More info, then Run anyway. The Store version shows no such warning.'],
      ['Will Pulo slow my PC down?', 'Pulo stays under 40 MB of RAM and 0% CPU when idle, and only moves when something happens. While music plays, it uses under 0.5% CPU. Animations follow the Windows "Animation effects" setting and stop when Battery Saver is on.'],
      ['Does it run on Windows 10?', 'Yes, from Windows 10 version 2004 (19041). Some glass effects look best on Windows 11.'],
      ['Which music apps show up?', 'Any app that reports to the Windows media controls: Spotify, YouTube and other sites in Chrome or Edge, Apple Music, VLC, and more. No account to connect.'],
      ['How do I remove Pulo?', 'Windows Settings › Apps › Pulo › Uninstall. If the dock hid your taskbar, the taskbar comes back when Pulo exits. The Zip version can also be removed with Remove Pulo in its Zip folder.'],
      ['Is this Dynamic Island?', 'No. Dynamic Island is a trademark of Apple Inc. Pulo is an independent Windows app with a similar shape, made by CloVerX, and is not affiliated with Apple.'],
    ]],

    // Masukan
    'fb.title': ['Ada ide atau menemukan masalah?', 'Have an idea or found a problem?'],
    'fb.lede': ['Pulo dibuat oleh satu orang, dan setiap masukan dibaca. Tulis apa yang Anda harapkan, atau apa yang terjadi beserta versi Windows Anda.', 'Pulo is made by one person, and every note gets read. Tell us what you hoped for, or what happened along with your Windows version.'],
    'fb.new': ['Kirim masukan', 'Send feedback'],
    'fb.list': ['Lihat yang sudah dilaporkan', 'See what others reported'],
    'fb.note': ['Lewat GitHub Issues. Butuh akun GitHub gratis; jangan tulis data pribadi.', 'Through GitHub Issues. Needs a free GitHub account; please leave out personal details.'],

    // Kaki
    'foot.by': ['Pulo dibuat oleh CloVerX.', 'Pulo is made by CloVerX.'],
    'foot.privacy': ['Privasi', 'Privacy'],
    'foot.note': ['Layar contoh digambar ulang dari aplikasinya; lagu, nama, dan data di sana hanya contoh. Dynamic Island adalah merek Apple Inc., dan Pulo tidak berafiliasi dengan Apple. Nama aplikasi lain adalah merek pemiliknya.',
      'The sample screen is redrawn from the app; songs, names, and data in it are only examples. Dynamic Island is a trademark of Apple Inc., and Pulo is not affiliated with Apple. Other app names are trademarks of their owners.'],
  };

  function pick() {
    var q = (location.search.match(/[?&]lang=(id|en)\b/) || [])[1];
    if (q) return q;
    try { var saved = localStorage.getItem('pulo.lang'); if (saved === 'id' || saved === 'en') return saved; } catch (e) { /* penyimpanan ditolak */ }
    return /^(id|ms)\b/i.test(navigator.language || '') ? 'id' : 'en';
  }
  var lang = pick(), at = lang === 'id' ? 0 : 1;
  var extra = {};

  function t(key) {
    var v = extra[key] || S[key];
    if (!v) return key;
    v = v[at];
    if (typeof v === 'function') return v.apply(null, Array.prototype.slice.call(arguments, 1));
    return v;
  }
  function apply(root) {
    root = root || document;
    root.querySelectorAll('[data-i18n]').forEach(function (el) { el.innerHTML = t(el.dataset.i18n); });
    root.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.dataset.i18nAttr.split(';').forEach(function (pair) { var p = pair.split(':'); el.setAttribute(p[0].trim(), t(p[1].trim())); });
    });
  }
  function set(next) {
    try { localStorage.setItem('pulo.lang', next); } catch (e) { /* lihat di atas */ }
    var url = new URL(location.href);
    url.searchParams.set('lang', next);
    location.replace(url.toString());
  }
  document.documentElement.lang = lang;
  window.PuloI18n = {
    lang: lang,
    locale: lang === 'id' ? 'id-ID' : 'en-US',
    t: t,
    apply: apply,
    set: set,
    // Simulator menambah kuncinya sendiri dengan format yang sama.
    add: function (table) { for (var k in table) extra[k] = table[k]; },
    num: function (n, digits) { return Number(n).toLocaleString(lang === 'id' ? 'id-ID' : 'en-US', { maximumFractionDigits: digits || 0, minimumFractionDigits: digits || 0 }); },
  };
})();
