# dnzy Umroh ERP — Enterprise Travel Haji & Umroh Management

[![Platform](https://img.shields.io/badge/Platform-Google%20Apps%20Script%20V8-005136?style=for-the-badge&logo=google)](https://developers.google.com/apps-script)
[![Database](https://img.shields.io/badge/Database-Google%20Sheets-041F17?style=for-the-badge&logo=googlesheets)](https://www.google.com/sheets/about/)
[![Styling](https://img.shields.io/badge/Design-Tailwind%20CSS-C8A24B?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Icons](https://img.shields.io/badge/Icons-Phosphor%20Icons%20Light-005136?style=for-the-badge)](https://phosphoricons.com/)
[![License](https://img.shields.io/badge/License-Proprietary-041F17?style=for-the-badge)](LICENSE)

Aplikasi Enterprise Resource Planning (ERP) komprehensif untuk biro perjalanan umroh dan haji khusus berizin resmi PPIU Kemenag RI. Dibangun di atas fondasi serverless **Google Apps Script** dan database **Google Sheets**, menghadirkan keandalan skala korporat tanpa biaya server bulanan (*zero cloud hosting costs*).

---

## 🕋 Identitas Desain & Brand Visual

Aplikasi dirancang dengan estetika Islami kontemporer yang elegan dan berkelas tinggi:
- **Deep Emerald Navy** (`#041F17`) — Melambangkan ketenangan, stabilitas, dan profesionalisme.
- **Accent Royal Gold** (`#C8A24B` / `#D9BE79`) — Aksen kemewahan dan kehormatan tamu Allah.
- **Islamic Green** (`#005136`) — Warna aksi tombol utama dan indikator sukses.
- **Canvas Cream** (`#FAF8F3`) — Latar belakang lembut yang nyaman untuk operasional berjam-jam.
- **Tipografi**: Heading menggunakan font elegan *Fraunces*, sedangkan kontrol antarmuka menggunakan *Plus Jakarta Sans*.

---

## 🌟 16 Modul Terintegrasi Lengkap

Sistem terbagi ke dalam 16 modul operasional yang saling terhubung:

### 1. Dashboard Eksekutif (`ViewDashboard.html`)
- KPI ringkasan bisnis: Total omset terkumpul, total jamaah terdaftar, kloter aktif, okupansi kursi pesawat.
- Grafik analitik tren pendaftaran jamaah per bulan dan performa kuota seat.
- Tanda peringatan berkas kritis (paspor kedaluwarsa, visa belum terbit, sisa pelunasan).

### 2. Database Jamaah & Siskopatuh (`ViewJamaah.html`)
- Manajemen profil 19 jamaah terperinci: NIK, nomor paspor, riwayat vaksin, mahram, dan paket yang dipilih.
- Filter status kelengkapan dokumen (Paspor, Visa, Rekomendasi Kemenag, Kuitansi).
- Ekspor data siap impor format Siskopatuh Kemenag RI.

### 3. Jaringan Keagenan & Kemitraan (`ViewAgency.html`)
- Struktur kemitraan bertingkat: DCM (*District Channel Manager*), Mitra Cabang, dan Agen Reseller.
- Visualisasi pohon silsilah jaringan keagenan (*Interactive Genealogy Tree*).
- Status keaktifan agen dan pencatatan komisi tier bawaan.

### 4. Rekapitulasi Komisi Agen (`ViewKomisi.html`)
- Tabel matriks skema komisi agen per tingkatan (*Tier 1, Tier 2, Tier 3*) dan jenis paket (Standar, VIP Bintang 5, Spesial).
- Log pencairan komisi (*payout disbursement*) dengan alur persetujuan Admin Finance / Owner.

### 5. CRM & Pipeline Prospek (`ViewProspek.html`)
- Manajemen prospek jamaah berbasis kanban (*New Lead*, *Warm*, *Follow-up*, *Closed/Won*, *Lost*).
- Integrasi WhatsApp Generator satu klik untuk mengirim penawaran paket personal.

### 6. Katalog Paket Umroh Dinamis (`ViewKatalog.html`)
- Manajemen paket keberangkatan: Paket Reguler Bintang 5, VIP Ramadhan Lailatul Qadar, Umroh Plus Turki/Dubai.
- Rincian fasilitas: hotel, maskapai, durasi hari, kuota total kursi, dan harga per kamar (Quad, Triple, Double).

### 7. Katalog Hotel Makkah & Madinah (`ViewHotel.html`)
- Database hotel akomodasi Makkah (*Mihrab Al Safa, dsb.*) dan Madinah (*Wardah Al Munawwarah, dsb.*).
- Informasi jarak ke pelataran Masjidil Haram dan Masjid Nabawi, kelas bintang, dan galeri kamar.

### 8. Kalkulator HPP & Simulasi Margin (`ViewHitung.html`)
- Alat simulasi penetapan Harga Pokok Penjualan (HPP) per jamaah.
- Konversi kurs dinamis Saudi Riyal (SAR) ke Rupiah (IDR).
- Komponen biaya terperinci: Tiket pesawat, visa, hotel, bus AC, katering 3x sehari, handling bandara, muthawwif, dan profit margin travel.

### 9. Jadwal Keberangkatan & Maskapai (`ViewJadwal.html`)
- Kalender kloter keberangkatan, nomor penerbangan (*Saudia Airlines / SV*, *Garuda Indonesia / GA*), dan rute (CGK-JED, CGK-MED).
- Monitoring kuota seat tersisa per jadwal.

### 10. Laporan Performa & KPI (`ViewPerforma.html`)
- Analitik kinerja bulanan agen dan cabang travel.
- Peringkat konversi prospek dan pencapaian target penjualan tahunan.

### 11. Arus Kas & Laporan Keuangan (`ViewKeuangan.html`)
- Rekapitulasi arus kas masuk (*cash inflow*), pembayaran bertahap (DP dan pelunasan).
- Pemantauan sisa piutang per jamaah dan pencetakan kuitansi resmi bertanda tangan digital.

### 12. Rating & Ulasan Jamaah (`ViewFeedback.html`)
- Survei kepuasan jamaah pasca-ibadah terhadap 4 pilar layanan: Muthawwif, Hotel, Katering, dan Armada Bus.
- Skor rata-rata kepuasan dan catatan evaluasi operasional kloter.

### 13. Bank Konten Promosi (`ViewKonten.html`)
- Pusat materi promosi digital: draf pesan siaran (*broadcast*) WhatsApp promo, pengumuman manasik akbar, dan flyer sosial media.

### 14. Manajemen Staff & Entitas Cabang (`ViewUsers.html`)
- Pengelolaan tim multi-cabang (Kantor Pusat `PST-01`, Cabang Bandung `CAB-02`, dsb.).
- Penerapan hak akses berjenjang (*Role-Based Access Control / RBAC*):
  - **OWNER**: Akses penuh seluruh modul dan pengaturan finansial.
  - **KEPALA_ENTITAS**: Akses penuh operasional dan jamaah di cabang terkait.
  - **ADMIN_OPERASIONAL**: Pengelolaan jamaah, jadwal kloter, katalog, dan manifes.
  - **ADMIN_FINANCE**: Pengelolaan pembayaran, kuitansi, pencairan komisi, dan laporan laba-rugi.

### 15. Pengaturan Sistem & PPIU (`ViewSetting.html`)
- Pengaturan legalitas SK PPIU Kemenag RI dan identitas travel.
- Pengaturan logo perusahaan untuk kop kuitansi dan branding aplikasi.
- Rekening resmi penampung pembayaran jamaah.
- Konfigurasi integrasi WhatsApp gateway Fonnte dan push notification.

### 16. Akun Saya (`ViewAkun.html`)
- Kartu profil pengguna mandiri dengan unggah foto profil dari perangkat.
- Pemotongan otomatis gambar persegi tengah (*center square crop* 240x240 px, kompresi JPEG 0.85).
- Sinkronisasi instan foto avatar di 3 titik: Kartu Profil, TopBar (kanan atas), dan Sidebar (kiri atas).
- Form pembaruan kata sandi akun dengan validasi keamanan.

---

## 🔔 Sistem Notifikasi Modern (*Floating Toast*)

Aplikasi menggunakan engine notifikasi mengambang (*floating toast*) mandiri yang menggantikan jendela pop-up `alert()` bawaan browser:
- **Desain Mewah**: Panel *Deep Emerald Navy* dengan aksen garis emas, ikon Phosphor, dan efek *glassmorphism backdrop blur*.
- **Indikator Progres**: Dilengkapi animasi *progress bar* yang menghitung mundur durasi tampil (4 detik) secara elegan.
- **Interaksi Halus**: Tombol tutup cepat (**×**), jeda otomatis saat kursor diarahkan (*hover-to-pause*), dan transisi *slide-in/slide-out*.
- **Proteksi Global**: Mengintersepsi seluruh pemanggilan dialog tanpa memblokir interaksi pengguna di layar.

---

## 🗄️ Skema Database Google Sheets (18 Tabel)

Sistem database Google Sheets otomatis dibuat dan distrukturkan melalui fungsi `apiSetupDatabase()`:

1. `settings` — Konfigurasi umum travel, kurs SAR, legalitas PPIU, logo, rekening.
2. `users` — Akun pengguna, peran RBAC, entitas penempatan, hashed credentials.
3. `entitas` — Kantor pusat dan jaringan kantor cabang travel.
4. `jamaah` — Master database jamaah, identitas, paspor, mahram, paket.
5. `dokumen` — Berkas paspor, visa, sertifikat vaksin, kuitansi jamaah.
6. `agen` — Mitra jaringan keagenan per tier.
7. `tier_agen` — Skema komisi default dan aturan komisi khusus per tier.
8. `komisi` — Rekapitulasi mutasi komisi agen dan status pencairan (*disbursement*).
9. `prospek` — Pipeline CRM prospek pendaftaran.
10. `katalog` — Master paket umroh (Reguler, VIP, Plus).
11. `hotel` — Master akomodasi Makkah dan Madinah.
12. `jadwal` — Kloter keberangkatan, kuota seat, dan maskapai penerbangan.
13. `manifest` — Plotting peserta ke dalam kloter keberangkatan.
14. `pembayaran` — Riwayat transaksi masuk, DP, pelunasan, nomor kuitansi.
15. `logistik` — Perlengkapan jamaah (koper, kain ihram, seragam, buku panduan).
16. `feedback` — Rating dan ulasan kepuasan jamaah.
17. `konten` — Bank draf broadcast dan materi publikasi.
18. `audit_log` — Rekam jejak seluruh aktivitas perubahan data krusial.

---

## 🚀 Panduan Instalasi & Deployment

### 1. Prasyarat
- Node.js (v18+)
- Google Apps Script CLI (`@google/clasp`) terpasang secara global atau via npx:
  ```bash
  npm install -g @google/clasp
  clasp login
  ```

### 2. Kloning Repositori
```bash
git clone https://github.com/dnzykreatif-dev/dnzy-Umroh.git
cd dnzy-Umroh
```

### 3. Konfigurasi Clasp (`.clasp.json`)
Pastikan file `.clasp.json` telah mengarah ke Script ID proyek Google Apps Script Anda:
```json
{
  "scriptId": "YOUR_APPS_SCRIPT_ID",
  "rootDir": "."
}
```

### 4. Konfigurasi Web App (`appsscript.json`)
Pastikan konfigurasi manifest menyertakan blok webapp agar terbit sebagai Web App:
```json
{
  "timeZone": "Asia/Jakarta",
  "dependencies": {},
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE"
  }
}
```

### 5. Mengunggah Kode ke Apps Script
```bash
npx clasp push --force
```

### 6. Inisialisasi Database Pertama Kali
1. Buka editor proyek di browser: `npx clasp open`.
2. Di toolbar atas, pilih fungsi **`apiSetupDatabase`** lalu klik **Run**.
3. Berikan izin akses (*Authorization Granted*) untuk Google Sheets dan Drive.
4. Database Google Sheets dengan 18 tabel terstruktur otomatis dibuat.

### 7. Penerapan (*Deploy Web App*)
1. Di editor Apps Script, klik tombol **Deploy** > **Manage deployments** (Kelola penerapan).
2. Pilih deployment aktif > Klik ikon pensil (**Edit**).
3. Pada dropdown Version, pilih **New version** (Versi baru).
4. Klik **Deploy**.
5. Buka tautan Web App yang dihasilkan (`https://script.google.com/macros/s/.../exec`).

---

## 🔐 Kredensial Bawaan Demo

- **Username**: `admin`
- **Password**: `password123`
- **Role**: `OWNER` (Ummu Aisyah)
- **Entitas**: `PST-01` · Kantor Pusat

---

## 🛠️ Tim Pengembang & Dukungan

Dikembangkan secara profesional oleh **dnzy Kreatif Dev**.
- Repositori: [https://github.com/dnzykreatif-dev/dnzy-Umroh](https://github.com/dnzykreatif-dev/dnzy-Umroh)
- Solusi Sistem Informasi & Otomasi Berbasis Google Workspace / Apps Script.
