/**
 * Helper Utility dnzy Umroh ERP
 */

const Utils = {
  ok(data, message) {
    return {
      ok: true,
      message: message || 'Berhasil.',
      data: this.serialize(data || {})
    };
  },

  fail(message) {
    return {
      ok: false,
      message: message || 'Terjadi kesalahan.'
    };
  },

  error(err) {
    return this.fail(this.getErrorMessage(err));
  },

  getErrorMessage(err) {
    if (!err) return 'Terjadi kesalahan tidak diketahui.';
    if (err.message) return String(err.message);
    return String(err);
  },

  now() {
    return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  },

  today() {
    return Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  },

  id(prefix) {
    const stamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyMMddHHmmss');
    const rnd = Math.floor(100 + Math.random() * 900);
    return `${prefix || 'ID'}-${stamp}${rnd}`;
  },

  salt() {
    return Utilities.getUuid().replace(/-/g, '');
  },

  hashPassword(password, salt) {
    const text = `${String(salt || '')}:${String(password || '')}`;
    const bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, text);
    let hash = '';
    for (let i = 0; i < bytes.length; i++) {
      let b = bytes[i];
      if (b < 0) b += 256;
      let hex = b.toString(16);
      if (hex.length === 1) hex = '0' + hex;
      hash += hex;
    }
    return hash;
  },

  formatRupiah(val) {
    const num = Number(val || 0);
    return 'Rp ' + num.toLocaleString('id-ID');
  },

  formatSAR(val) {
    const num = Number(val || 0);
    return 'SAR ' + num.toLocaleString('id-ID');
  },

  normalizePhone(phone) {
    let p = String(phone || '').replace(/\D/g, '');
    if (p.startsWith('62')) p = '0' + p.substring(2);
    else if (p.startsWith('8')) p = '0' + p;
    return p;
  },

  serialize(val) {
    if (val === null || val === undefined) return null;
    if (val instanceof Date) {
      return Utilities.formatDate(val, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
    }
    if (Array.isArray(val)) {
      return val.map(item => this.serialize(item));
    }
    if (typeof val === 'object') {
      const out = {};
      for (const k in val) {
        out[k] = this.serialize(val[k]);
      }
      return out;
    }
    return val;
  },

  log(actor, action, entity, entityId, details) {
    try {
      const db = Database.table('audit_logs');
      db.create({
        id: this.id('LOG'),
        actor_id: actor ? (actor.id || actor.username) : 'SYSTEM',
        actor_name: actor ? (actor.nama_lengkap || actor.username) : 'Sistem',
        action: action,
        entity: entity,
        entity_id: entityId || '',
        details: typeof details === 'object' ? JSON.stringify(details) : String(details || ''),
        timestamp: this.now()
      });
    } catch (e) {
      Logger.log('Audit log error: ' + e);
    }
  }
};
