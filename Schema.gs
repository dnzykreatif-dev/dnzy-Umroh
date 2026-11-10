/**
 * Skema Database & Permission Matrix dnzy Umroh ERP
 */

const ROLES = Object.freeze({
  OWNER: 'OWNER',
  KEPALA_ENTITAS: 'KEPALA_ENTITAS',
  ADMIN_OPERASIONAL: 'ADMIN_OPERASIONAL',
  ADMIN_FINANCE: 'ADMIN_FINANCE'
});

const PERMISSIONS = Object.freeze({
  [ROLES.OWNER]: ['*'],
  [ROLES.KEPALA_ENTITAS]: [
    'dashboard.view',
    'jamaah.*',
    'agen.*',
    'komisi.view',
    'prospek.*',
    'paket.view',
    'hotel.view',
    'hitung.view',
    'jadwal.view',
    'performa.view',
    'keuangan.view',
    'feedback.view',
    'bank_konten.view'
  ],
  [ROLES.ADMIN_OPERASIONAL]: [
    'dashboard.view',
    'jamaah.*',
    'jadwal.*',
    'hotel.*',
    'paket.*',
    'feedback.*',
    'bank_konten.*',
    'prospek.view'
  ],
  [ROLES.ADMIN_FINANCE]: [
    'dashboard.view',
    'keuangan.*',
    'komisi.*',
    'hitung.*',
    'jamaah.view',
    'agen.view',
    'performa.view'
  ]
});

const SCHEMA = Object.freeze({
  users: [
    'id_user',
    'nama_lengkap',
    'username',
    'password_hash',
    'password_salt',
    'role',
    'status_akun',
    'id_entitas',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  entitas: [
    'id',
    'nama_entitas',
    'tipe_entitas',
    'kedalaman_level',
    'status_aktif',
    'komisi_cabang',
    'kota',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  jamaah: [
    'id_jamaah',
    'nama',
    'j_kelamin',
    'no_identitas',
    'no_paspor',
    'tgl_lahir',
    'no_hp',
    'provinsi',
    'status_dokumen',
    'status_void',
    'id_entitas',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  agen: [
    'id_agen',
    'nama',
    'role',
    'no_hp',
    'wilayah',
    'alamat',
    'status_akun',
    'id_tier',
    'id_upline',
    'nama_bank',
    'no_rekening',
    'nama_rekening',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  tier_agen: [
    'id',
    'id_entitas',
    'nama',
    'urutan',
    'nominal_bawaan',
    'aktif',
    'penimpa',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  prospek: [
    'id_prospek',
    'nama',
    'no_hp',
    'status_pipeline',
    'tgl_followup',
    'catatan',
    'id_agen',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  paket: [
    'id_katalog',
    'jadwal_id',
    'nama_paket',
    'jenis_paket',
    'harga_jual_std',
    'harga_setor_std',
    'durasi_hari',
    'maskapai',
    'hotel_mekkah',
    'hotel_madinah',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  hotel: [
    'id_hotel',
    'nama',
    'kota',
    'bintang',
    'jarak_meter',
    'foto_url',
    'status_aktif',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  jadwal: [
    'id_jadwal',
    'nama_paket',
    'tipe_tanggal',
    'tgl_keberangkatan',
    'kuota',
    'blokir_kuota',
    'status_aktif',
    'link_brosur',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  keuangan: [
    'id_bayar',
    'jamaah_id',
    'jadwal_id',
    'nominal',
    'jenis',
    'tanggal',
    'jamaah_nama',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  feedback: [
    'id_feedback',
    'tanggal',
    'jamaah_id',
    'nama_jamaah',
    'jadwal_id',
    'nama_paket',
    'jenis_paket',
    'rating',
    'komentar',
    'id_entitas',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  bank_konten: [
    'id_media',
    'judul',
    'jenis',
    'status',
    'urutan',
    'caption',
    'created_at',
    'updated_at',
    'is_deleted'
  ],

  settings: [
    'key',
    'value',
    'description',
    'updated_at'
  ],

  audit_logs: [
    'id',
    'actor_id',
    'actor_name',
    'action',
    'entity',
    'entity_id',
    'details',
    'timestamp'
  ]
});
