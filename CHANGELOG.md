# Changelog — dnzy Umroh ERP

Semua perubahan penting pada aplikasi dnzy Umroh ERP didokumentasikan di berkas ini.

Format pencatatan mengacu pada panduan [Keep a Changelog](https://keepachangelog.com/id/1.0.0/).

---

## [1.2.0] - 2026-11-11

### Ditambahkan
- **Sistem Notifikasi Modern (*Floating Toast*)**:
  - Menggantikan jendela modal `alert()` bawaan browser dengan floating toast bernuansa *Deep Emerald Navy* (`#041F17`) dan aksen *Royal Gold* (`#C8A24B`).
  - Animasi halus *slide-in* dan *slide-out* dengan progress bar waktu tersisa (4 detik), tombol tutup instan, serta fitur *hover-to-pause*.
  - Interceptor global `window.alert` otomatis mengonversi seluruh dialog peringatan di modul aplikasi menjadi toast cerdas (*success*, *warning*, *error*, *info*).
- **Pengaturan Profil Akun Mandiri**:
  - Kartu "Akun Saya" dengan pratinjau avatar lingkaran 76x76 px, lencana status aktif, dan tombol "Simpan Profil".
  - Unggah foto profil dari perangkat dengan pemotongan otomatis persegi tengah (*center square crop* 240x240 px, kompresi JPEG 0.85).
  - Sinkronisasi instan foto avatar di 3 lokasi: Kartu Akun, TopBar kanan atas, dan Sidebar kiri atas.
  - Tombol hapus foto profil untuk beralih kembali ke inisial huruf emas.
- **Pola Akses Native Label & Event Listener**:
  - Mengubah pemicu tombol unggah foto profil dan unggah logo menjadi elemen `<label for="...">` dengan input tersembunyi non-`display: none` (ukuran 1px off-screen), mengatasi pemblokiran interaksi file picker pada iframe sandbox Google Apps Script.
  - Pemasangan event listener menggunakan `addEventListener` asli pada DOMContentLoaded untuk mematuhi kebijakan Content Security Policy (`strict-dynamic`).

### Diperbaiki
- **Manifest Web App (`appsscript.json`)**:
  - Menambahkan konfigurasi blok `"webapp": { "executeAs": "USER_DEPLOYING", "access": "ANYONE" }` sehingga opsi *Manage Deployments* menampilkan tautan Web App resmi, bukan hanya tautan *Library*.
- **Pemisahan Logika Skrip Mandiri**:
  - Memindahkan fungsi kontrol profil (`akunUploadFoto`, `akunSimpanProfil`, `akunHapusFoto`, `renderUserAvatar`) ke dalam skrip mandiri di `ViewAkun.html` dan `Scripts.html`, mencegah kegagalan eksekusi jika file `ErpApp.html` tertunda dalam proses pemuatan.
- **Pembersihan Encoding Karakter**:
  - Memastikan seluruh berkas `.html` dan `.gs` bersih 100% dari karakter non-ASCII (pure 7-bit ASCII) guna mencegah risiko mojibake pada Google Apps Script editor.

---

## [1.1.0] - 2026-11-10

### Ditambahkan
- **Desain Logo Profesional Full Colour**:
  - Emblem bundar simetris bernuansa *Deep Emerald Navy* dan ornamen kubah masjid & Ka'bah berwarna emas mewah.
  - Penggantian logo di Sidebar, modul Pengaturan Sistem, dan formulir pendaftaran.

### Diubah
- Standardisasi identitas brand visual ERP dengan palet Deep Emerald Navy, Accent Gold, Islamic Green, dan Canvas Cream.

---

## [1.0.0] - 2026-10-25

### Rilis Perdana
- Rilis awal 16 modul ERP terintegrasi:
  1. `ViewDashboard`: Ringkasan omset, jamaah, kloter, okupansi kursi.
  2. `ViewJamaah`: Database jamaah dan ekspor format Siskopatuh Kemenag.
  3. `ViewAgency`: Jaringan keagenan bertingkat dan diagram pohon silsilah (*genealogy*).
  4. `ViewKomisi`: Rekapitulasi bagi hasil dan persetujuan pencairan komisi agen.
  5. `ViewProspek`: CRM pipeline prospek dan integrasi pesan WhatsApp.
  6. `ViewKatalog`: Katalog paket reguler bintang 5, VIP Ramadhan, dan plus negara lain.
  7. `ViewHotel`: Database hotel Makkah dan Madinah beserta jarak pelataran.
  8. `ViewHitung`: Kalkulator simulasi HPP, margin travel, dan konversi kurs SAR.
  9. `ViewJadwal`: Kalender kloter keberangkatan dan monitoring maskapai (SV/GA).
  10. `ViewPerforma`: Analitik performa bulanan agen dan cabang travel.
  11. `ViewKeuangan`: Laporan arus kas, pembayaran masuk, piutang, dan kuitansi resmi.
  12. `ViewFeedback`: Rating dan ulasan kepuasan jamaah pasca-ibadah.
  13. `ViewKonten`: Bank materi promosi dan draf broadcast WhatsApp.
  14. `ViewUsers`: Manajemen staff multi-cabang dengan RBAC 4 tingkat.
  15. `ViewSetting`: Pengaturan legalitas PPIU Kemenag, logo, dan rekening travel.
  16. `ViewAkun`: Manajemen profil akun pengguna dan pembaruan kata sandi.
- Mesin backend serverless Google Apps Script dengan 18 tabel database Google Sheets otomatis.
