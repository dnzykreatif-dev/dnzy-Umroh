/**
 * Configuration & Travel Settings Service dnzy Umroh ERP
 */

const ConfigService = {
  getSettings() {
    try {
      const rows = Database.list('settings');
      const map = {};
      rows.forEach(r => {
        if (r.key) map[r.key] = r.value;
      });

      return Utils.ok({
        NAMA_PT: map.NAMA_PT || 'PT BERKAH UMROH SEJAHTERA',
        NAMA_TRAVEL: map.NAMA_TRAVEL || 'Berkah Umroh Sejahtera',
        IZIN_PPIU: map.IZIN_PPIU || 'PPIU-2024-11-0821',
        ALAMAT_TRAVEL: map.ALAMAT_TRAVEL || 'Jl. Raya Bogor Km 24, Jakarta Timur',
        REKENING_BANK: map.REKENING_BANK || 'BANK SYARIAH INDONESIA (BSI)',
        REKENING_NOMOR: map.REKENING_NOMOR || '7123456789',
        REKENING_NAMA: map.REKENING_NAMA || 'PT BERKAH UMROH SEJAHTERA',
        LOGO_URL: map.LOGO_URL || '',
        SAR_RATE: map.SAR_RATE || 4250
      });
    } catch (err) {
      return Utils.ok({
        NAMA_PT: 'PT BERKAH UMROH SEJAHTERA',
        NAMA_TRAVEL: 'Berkah Umroh Sejahtera',
        IZIN_PPIU: 'PPIU-2024-11-0821',
        ALAMAT_TRAVEL: 'Jl. Raya Bogor Km 24, Jakarta Timur',
        REKENING_BANK: 'BANK SYARIAH INDONESIA (BSI)',
        REKENING_NOMOR: '7123456789',
        REKENING_NAMA: 'PT BERKAH UMROH SEJAHTERA',
        SAR_RATE: 4250
      });
    }
  },

  updateSetting(token, key, value, description) {
    try {
      const user = AuthService.requireUser(token);
      PermissionService.require(user, 'setting.update');

      const table = Database.table('settings');
      const existing = table.find(r => r.key === key);

      if (existing.length > 0) {
        table.update(existing[0].id || existing[0]._row, { value, description, updated_at: Utils.now() });
      } else {
        table.create({
          id: Utils.id('SET'),
          key,
          value,
          description: description || '',
          updated_at: Utils.now()
        });
      }

      Utils.log(user, 'UPDATE_SETTING', 'settings', key, { value });
      return Utils.ok({}, 'Pengaturan berhasil diperbarui.');
    } catch (err) {
      return Utils.error(err);
    }
  }
};
