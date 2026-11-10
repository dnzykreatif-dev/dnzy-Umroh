# dnzy Umroh ERP — Rules & Technical Guidelines

## 1. Identitas Produk
- **Nama Aplikasi**: dnzy Umroh ERP (Enterprise Resource Planning Travel Haji & Umroh)
- **Basis Platform**: Google Apps Script (V8 Engine) + Google Sheets Database + Tailwind CSS + Phosphor Icons Light
- **Warna & Visual Brand**:
  - Deep Emerald Navy (`#041F17`)
  - Accent Gold (`#C8A24B` / `#D9BE79`)
  - Islamic Green Button (`#005136`)
  - Background Canvas Cream (`#FAF8F3`)
  - Typography: Fraunces (Heading/KPI) & Plus Jakarta Sans (UI Controls)

## 2. Struktur Modul (16 Modul Lengkap)
1. `ViewDashboard.html`: KPI Ringkasan (Omset, 19 Jamaah, 3 Kloter, Seat 85%), Grafik Tren Pendaftaran.
2. `ViewJamaah.html`: Database 19 Jamaah, filter status dokumen (Paspor/Visa/Kuitansi), Siskopatuh Export.
3. `ViewAgency.html`: Jaringan Kemitraan (DCM, Mitra Cabang, Reseller) & Pohon Jaringan (Genealogy).
4. `ViewKomisi.html`: Rekapitulasi bagi hasil komisi agen & persetujuan transfer payout.
5. `ViewProspek.html`: CRM Pipeline Prospek (New, Warm, Follow-up, Closed/Won) & integrasi WhatsApp.
6. `ViewKatalog.html`: Katalog Paket Umroh (VIP Ramadhan, Reguler Bintang 5, Plus Turki).
7. `ViewHotel.html`: Katalog Hotel Makkah (Mihrab Al Safa) & Madinah (Wardah Al Munawwarah).
8. `ViewHitung.html`: Kalkulator simulasi HPP paket, konversi kurs SAR/IDR, margin travel.
9. `ViewJadwal.html`: Kalender kloter keberangkatan & status maskapai penerbangan (SV/GA).
10. `ViewPerforma.html`: Analitik performa agen bulanan & konversi lead.
11. `ViewKeuangan.html`: Laporan arus kas, pembayaran masuk, & sisa piutang jamaah.
12. `ViewFeedback.html`: Rating kepuasan jamaah (Muthawwif, Hotel, Katering, Bus).
13. `ViewKonten.html`: Bank konten portal, broadcast WhatsApp promo & pengumuman manasik.
14. `ViewUsers.html`: Manajemen staff multi-entitas (Owner, Kepala Cabang, Admin Ops, Admin Finance).
15. `ViewSetting.html`: Pengaturan izin PPIU Kemenag, legalitas, logo, & rekening bank penampung.
16. `ViewAkun.html`: Manajemen akun, profil pengguna, & pembaharuan kata sandi.

## 3. Akun Default & Kredensial
- **Role**: OWNER (Ummu Aisyah)
- **Username**: `admin`
- **Password**: `password123`
- **Fallback Token**: `demo-token-ummu-aisyah`
- **Entitas Default**: `PST-01 · Kantor Pusat`
