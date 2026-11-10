/**
 * Setup & Database Provisioning Service dnzy Umroh ERP
 */

function setupDatabase() {
  Database.setup();
  seedInitialData();
  const ss = Database.spreadsheet();
  const msg = 'Inisialisasi database dnzy Umroh ERP berhasil! ' +
    'Spreadsheet URL: ' + ss.getUrl() + ' | Akun default: admin / password123';
  Logger.log(msg);
  return msg;
}

function seedInitialData() {
  const seed = getInitialSeedData_();

  // 1. Seed Users
  const userTable = Database.table('users');
  if (userTable.all().length === 0 && seed.users) {
    seed.users.forEach(u => {
      const salt = Utils.salt();
      userTable.create({
        id_user: u.id_user,
        nama_lengkap: u.nama_lengkap,
        username: u.username,
        password_salt: salt,
        password_hash: Utils.hashPassword('password123', salt),
        role: u.role,
        status_akun: u.status_akun,
        id_entitas: u.id_entitas
      });
    });
  }

  // 2. Seed Jamaah
  const jamaahTable = Database.table('jamaah');
  if (jamaahTable.all().length === 0 && seed.jamaah) {
    seed.jamaah.forEach(j => jamaahTable.create(j));
  }

  // 3. Seed Agen
  const agenTable = Database.table('agen');
  if (agenTable.all().length === 0 && seed.agen) {
    seed.agen.forEach(a => agenTable.create(a));
  }

  // 4. Seed Prospek
  const prospekTable = Database.table('prospek');
  if (prospekTable.all().length === 0 && seed.prospek) {
    seed.prospek.forEach(p => prospekTable.create(p));
  }

  // 5. Seed Paket (katalog)
  const paketTable = Database.table('paket');
  if (paketTable.all().length === 0 && seed.katalog) {
    seed.katalog.forEach(k => paketTable.create(k));
  }

  // 6. Seed Hotel (katalog_hotel)
  const hotelTable = Database.table('hotel');
  if (hotelTable.all().length === 0 && seed.katalog_hotel) {
    seed.katalog_hotel.forEach(h => hotelTable.create(h));
  }

  // 7. Seed Jadwal
  const jadwalTable = Database.table('jadwal');
  if (jadwalTable.all().length === 0 && seed.jadwal) {
    seed.jadwal.forEach(j => jadwalTable.create(j));
  }

  // 8. Seed Keuangan (pembayaran)
  const keuanganTable = Database.table('keuangan');
  if (keuanganTable.all().length === 0 && seed.pembayaran) {
    seed.pembayaran.forEach(b => keuanganTable.create(b));
  }

  // 9. Seed Feedback
  const feedbackTable = Database.table('feedback');
  if (feedbackTable.all().length === 0 && seed.feedback) {
    seed.feedback.forEach(f => feedbackTable.create(f));
  }

  // 10. Seed Bank Konten
  const kontenTable = Database.table('bank_konten');
  if (kontenTable.all().length === 0 && seed.bank_konten) {
    seed.bank_konten.forEach(m => kontenTable.create(m));
  }

  // 11. Seed Entitas
  const entitasTable = Database.table('entitas');
  if (entitasTable.all().length === 0 && seed.entitas) {
    seed.entitas.forEach(e => entitasTable.create(e));
  }

  // 12. Seed Tier Agen
  const tierTable = Database.table('tier_agen');
  if (tierTable.all().length === 0 && seed.tier_agen) {
    seed.tier_agen.forEach(t => {
      tierTable.create({
        id: t.id,
        id_entitas: t.id_entitas,
        nama: t.nama,
        urutan: t.urutan,
        nominal_bawaan: t.nominal_bawaan,
        aktif: t.aktif,
        penimpa: typeof t.penimpa === 'object' ? JSON.stringify(t.penimpa) : (t.penimpa || '{}')
      });
    });
  }

  // 13. Seed Settings
  const settingsTable = Database.table('settings');
  if (settingsTable.all().length === 0 && seed.settings) {
    for (const [k, v] of Object.entries(seed.settings)) {
      settingsTable.create({
        key: k,
        value: typeof v === 'object' ? JSON.stringify(v) : String(v),
        description: 'Default setting ' + k,
        updated_at: Utils.now()
      });
    }
  }
}

function getInitialSeedData_() {
  const namaJamaah = [
    "AHMAD SULAIMAN", "SITI AMINAH", "MUHAMMAD RIZKI", "NUR HALIMAH", "ABDUL ROHMAN",
    "FATIMAH AZ-ZAHRA", "H. MAHMUD", "IBU NURHAYATI", "KELUARGA H. ABBAS", "UST. ZAINAL",
    "ROHMAH SAFITRI", "IBNU HAJAR", "DEWI KARTIKA", "SUTRISNO WIBOWO", "MULYADI RAHMAN",
    "HJ. RUFIAH", "SYAIFUL BAHRI", "LAILATUL BADRIYAH", "AGUS SETIAWAN", "KHODIJAH PUTRI"
  ];
  const provinsi = ["JAWA BARAT", "DKI JAKARTA", "JAWA TIMUR", "BANTEN", "JAWA TENGAH"];

  const jamaahList = [];
  for (let i = 0; i < namaJamaah.length; i++) {
    jamaahList.push({
      id_jamaah: "JMH-" + (1001 + i),
      nama: namaJamaah[i],
      j_kelamin: i % 3 === 1 ? "P" : "L",
      no_identitas: "3204010" + String(20300000 + i * 137).padStart(9, "0").slice(0, 9) + "21",
      no_paspor: i % 4 === 3 ? "" : "X" + (9012000 + i * 31),
      tgl_lahir: "19" + (60 + (i % 30)) + "-0" + (1 + (i % 9)) + "-1" + (i % 9),
      no_hp: "0812" + String(33000000 + i * 12345),
      provinsi: provinsi[i % provinsi.length],
      status_dokumen: i % 3 === 0 ? "Lengkap" : "Pending",
      status_void: i === 2 ? 1 : 0,
      id_entitas: "PST-01",
      created_at: "2026-0" + (4 + (i % 5)) + "-1" + (i % 9) + " 09:00:00"
    });
  }

  return {
    users: [
      { id_user: "USR-001", nama_lengkap: "UMMU AISYAH", username: "admin", role: "OWNER", status_akun: "AKTIF", id_entitas: "PST-01" },
      { id_user: "USR-002", nama_lengkap: "AHMAD FAUZI", username: "finance", role: "ADMIN_FINANCE", status_akun: "AKTIF", id_entitas: "PST-01" },
      { id_user: "USR-003", nama_lengkap: "SITI KHADIJAH", username: "ops", role: "ADMIN_OPERASIONAL", status_akun: "AKTIF", id_entitas: "PST-01" },
      { id_user: "USR-004", nama_lengkap: "HASAN BASRI", username: "cabang", role: "KEPALA_ENTITAS", status_akun: "AKTIF", id_entitas: "CAB-02" }
    ],

    entitas: [
      { id: "PST-01", nama_entitas: "Kantor Pusat", tipe_entitas: "PUSAT", kedalaman_level: 3, status_aktif: "Aktif", komisi_cabang: 0, kota: "Jakarta Timur" },
      { id: "CAB-02", nama_entitas: "Cabang Bandung", tipe_entitas: "CABANG", kedalaman_level: 3, status_aktif: "Aktif", komisi_cabang: 2000000, kota: "Bandung" },
      { id: "CAB-03", nama_entitas: "Cabang Surabaya", tipe_entitas: "CABANG", kedalaman_level: 3, status_aktif: "Nonaktif", komisi_cabang: 1500000, kota: "Surabaya" }
    ],

    tier_agen: [
      { id: 1, id_entitas: "PST-01", nama: "Tier 1", urutan: 1, nominal_bawaan: 2500000, aktif: true, penimpa: { "VIP *4/*5": 3000000 } },
      { id: 2, id_entitas: "PST-01", nama: "Tier 2", urutan: 2, nominal_bawaan: 1500000, aktif: true, penimpa: {} },
      { id: 3, id_entitas: "PST-01", nama: "Tier 3", urutan: 3, nominal_bawaan: 800000, aktif: true, penimpa: {} },
      { id: 4, id_entitas: "CAB-02", nama: "Senior", urutan: 1, nominal_bawaan: 1500000, aktif: true, penimpa: {} },
      { id: 5, id_entitas: "CAB-02", nama: "Junior", urutan: 2, nominal_bawaan: 800000, aktif: true, penimpa: {} },
      { id: 6, id_entitas: "CAB-03", nama: "Tier 1", urutan: 1, nominal_bawaan: 1000000, aktif: true, penimpa: {} }
    ],

    agen: [
      { id_agen: "AGN-101", nama: "H. Karimullah", role: "DCM", no_hp: "081288991020", wilayah: "Jakarta Timur", alamat: "Jl. Pemuda No. 12", status_akun: "AKTIF", id_tier: 1, id_upline: "", nama_bank: "BCA", no_rekening: "1234567890", nama_rekening: "H. KARIMULLAH" },
      { id_agen: "AGN-104", nama: "Fatimah Az-Zahra", role: "SCM", no_hp: "085722113030", wilayah: "Depok", alamat: "Jl. Margonda Raya No. 45", status_akun: "AKTIF", id_tier: 2, id_upline: "AGN-101", nama_bank: "BANK SYARIAH INDONESIA (BSI)", no_rekening: "7211987654", nama_rekening: "FATIMAH AZ-ZAHRA" },
      { id_agen: "AGN-106", nama: "Salman Al-Farisi", role: "UCM", no_hp: "082144556677", wilayah: "Bekasi", alamat: "Jl. Ahmad Yani No. 88", status_akun: "NONAKTIF", id_tier: 3, id_upline: "AGN-104", nama_bank: "MANDIRI", no_rekening: "1560001234567", nama_rekening: "SALMAN AL-FARISI" }
    ],

    prospek: [
      { id_prospek: "PRP-1", nama: "ABDUL ROHMAN", no_hp: "081388991020", status_pipeline: "NEW", tgl_followup: "", catatan: "Baru masuk", id_agen: "AGN-101" },
      { id_prospek: "PRP-2", nama: "H. MAHMUD", no_hp: "081255667788", status_pipeline: "WARM", tgl_followup: "", catatan: "Tertarik - edukasi", id_agen: "AGN-101" },
      { id_prospek: "PRP-3", nama: "UST. SALMAN", no_hp: "082144556677", status_pipeline: "FOLLOW_UP", tgl_followup: "2026-09-09", catatan: "Lewat 2 hari", id_agen: "AGN-101" },
      { id_prospek: "PRP-4", nama: "IBU NURHAYATI", no_hp: "081933445566", status_pipeline: "FOLLOW_UP", tgl_followup: "2026-09-16", catatan: "Besok", id_agen: "AGN-101" },
      { id_prospek: "PRP-5", nama: "KELUARGA H. ABBAS", no_hp: "081122334455", status_pipeline: "CLOSED/WON", tgl_followup: "", catatan: "3 jamaah - VIP", id_agen: "AGN-101" }
    ],

    jamaah: jamaahList,

    katalog_hotel: [
      { id_hotel: "HTL-1001", nama: "MIHRAB AL SAFA TOWER", kota: "MAKKAH", bintang: 5, jarak_meter: 180, foto_url: "", status_aktif: true },
      { id_hotel: "HTL-1002", nama: "NAJMAH AJYAD SUITES", kota: "MAKKAH", bintang: 4, jarak_meter: 450, foto_url: "", status_aktif: true },
      { id_hotel: "HTL-1003", nama: "QAMAR AL MISFALAH", kota: "MAKKAH", bintang: 3, jarak_meter: 1200, foto_url: "", status_aktif: true },
      { id_hotel: "HTL-1004", nama: "WARDAH AL MUNAWWARAH", kota: "MADINAH", bintang: 5, jarak_meter: 120, foto_url: "", status_aktif: true },
      { id_hotel: "HTL-1005", nama: "RAUDHAH SAKINAH INN", kota: "MADINAH", bintang: 4, jarak_meter: 300, foto_url: "", status_aktif: true },
      { id_hotel: "HTL-1006", nama: "NAKHLAH CENTRAL MADINAH", kota: "MADINAH", bintang: 3, jarak_meter: 650, foto_url: "", status_aktif: true }
    ],

    jadwal: [
      { id_jadwal: "JDWL-1725", nama_paket: "Umrah VIP Oktober", tipe_tanggal: "Pasti", tgl_keberangkatan: "2026-10-12", kuota: 40, blokir_kuota: 2, status_aktif: "Aktif", link_brosur: "" },
      { id_jadwal: "JDWL-1731", nama_paket: "Umrah Reguler Desember", tipe_tanggal: "Pasti", tgl_keberangkatan: "2026-12-05", kuota: 40, blokir_kuota: 3, status_aktif: "Aktif", link_brosur: "" },
      { id_jadwal: "JDWL-1740", nama_paket: "Umrah Plus Turki Awal Tahun", tipe_tanggal: "Pasti", tgl_keberangkatan: "2027-01-15", kuota: 35, blokir_kuota: 0, status_aktif: "Aktif", link_brosur: "" }
    ],

    katalog: [
      { id_katalog: "KAT-5001", jadwal_id: "JDWL-1725", jenis_paket: "VIP *4/*5", harga_jual_std: 38500000, harga_setor_std: 35000000, durasi_hari: 9, maskapai: "Saudia Airlines", hotel_mekkah: "MIHRAB AL SAFA TOWER", hotel_madinah: "WARDAH AL MUNAWWARAH", nama_paket: "Umrah VIP Oktober" },
      { id_katalog: "KAT-5002", jadwal_id: "JDWL-1731", jenis_paket: "Spesial", harga_jual_std: 29800000, harga_setor_std: 27000000, durasi_hari: 10, maskapai: "Lion Air", hotel_mekkah: "NAJMAH AJYAD SUITES", hotel_madinah: "RAUDHAH SAKINAH INN", nama_paket: "Umrah Reguler Desember" },
      { id_katalog: "KAT-5003", jadwal_id: "JDWL-1740", jenis_paket: "Plus Turki", harga_jual_std: 44500000, harga_setor_std: 40000000, durasi_hari: 12, maskapai: "Turkish Airlines", hotel_mekkah: "MIHRAB AL SAFA TOWER", hotel_madinah: "WARDAH AL MUNAWWARAH", nama_paket: "Umrah Plus Turki Awal Tahun" }
    ],

    pembayaran: [
      { id_bayar: "INV-08921-4470", jamaah_id: "JMH-1001", jadwal_id: "JDWL-1725", nominal: 10000000, jenis: "Uang Muka", tanggal: "2026-09-02", jamaah_nama: "AHMAD SULAIMAN" },
      { id_bayar: "INV-08918-2213", jamaah_id: "JMH-1004", jadwal_id: "JDWL-1725", nominal: 38500000, jenis: "Pelunasan", tanggal: "2026-09-01", jamaah_nama: "NUR HALIMAH" },
      { id_bayar: "INV-08914-8831", jamaah_id: "JMH-1002", jadwal_id: "JDWL-1731", nominal: 29800000, jenis: "Pelunasan", tanggal: "2026-08-28", jamaah_nama: "SITI AMINAH" }
    ],

    feedback: [
      { id_feedback: "FB-001", tanggal: "2026-01-04 09:12:00", jamaah_id: "JMH-0912", nama_jamaah: "HJ. ROSMIATI", jadwal_id: "JDWL-1601", nama_paket: "Umrah Akhir Tahun 2025", jenis_paket: "Spesial", rating: 5, komentar: "Pembimbing sabar, hotel dekat Masjidil Haram. Insya Allah berangkat lagi bersama keluarga.", id_entitas: "PST-01" },
      { id_feedback: "FB-002", tanggal: "2026-01-03 20:40:00", jamaah_id: "JMH-0915", nama_jamaah: "BAMBANG SUTRISNO", jadwal_id: "JDWL-1601", nama_paket: "Umrah Akhir Tahun 2025", jenis_paket: "Ekonomis", rating: 4, komentar: "Secara umum baik. Bus di Madinah sempat terlambat satu kali.", id_entitas: "PST-01" }
    ],

    bank_konten: [
      { id_media: "MED-1", judul: "Promo daftar awal", jenis: "PROMO", status: "TERBIT", urutan: 1, caption: "Bismillah, kursi umrah bersama PT Berkah Umroh Sejahtera untuk keberangkatan Desember masih tersedia.\n\nDP mulai Rp 5.000.000, pelunasan paling lambat 30 hari sebelum berangkat.\n\nBalas pesan ini untuk info jadwal dan harga lengkap." },
      { id_media: "MED-2", judul: "Testimoni jamaah", jenis: "TESTIMONI", status: "TERBIT", urutan: 2, caption: "\"Pembimbing sabar, hotel dekat Masjidil Haram.\" Hj. Rosmiati, jamaah Berkah Umroh Sejahtera.\n\nIngin merasakan pengalaman yang sama? Tanyakan jadwal terdekat ke saya." },
      { id_media: "MED-3", judul: "Manasik bulanan (draf)", jenis: "EVENT", status: "DRAFT", urutan: 3, caption: "Manasik umrah gratis bersama Berkah Umroh Sejahtera setiap Ahad pertama. Terbuka untuk calon jamaah dan keluarga." }
    ],

    settings: {
      NAMA_PT: "PT BERKAH UMROH SEJAHTERA",
      NAMA_TRAVEL: "Berkah Umroh Sejahtera",
      IZIN_PPIU: "PPIU-2024-11-0821",
      ALAMAT_TRAVEL: "Jl. Raya Bogor Km 24, Jakarta Timur",
      REKENING_BANK: "BANK SYARIAH INDONESIA (BSI)",
      REKENING_NOMOR: "7123456789",
      REKENING_NAMA: "PT BERKAH UMROH SEJAHTERA",
      LOGO_URL: "",
      SAR_RATE: "4250"
    }
  };
}
