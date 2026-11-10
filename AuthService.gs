/**
 * Authentication Service dnzy Umroh ERP
 */

const AuthService = {
  login(username, password) {
    try {
      const cleanUser = String(username || '').trim().toLowerCase();
      const cleanPass = String(password || '').trim();

      if (!cleanUser || !cleanPass) {
        return Utils.fail('Username dan password wajib diisi.');
      }

      // 1. Fallback Built-In Admin (Anti-Gagal)
      if (
        cleanUser === APP_CONFIG.DEFAULT_ADMIN_USERNAME.toLowerCase() &&
        cleanPass === APP_CONFIG.DEFAULT_ADMIN_PASSWORD
      ) {
        const adminUser = {
          id: 'USR-001',
          nama_lengkap: APP_CONFIG.DEFAULT_OWNER_NAME,
          username: APP_CONFIG.DEFAULT_ADMIN_USERNAME,
          role: ROLES.OWNER,
          id_entitas: 'PST-01',
          status_akun: 'AKTIF'
        };

        const token = this.generateToken(adminUser);
        Utils.log(adminUser, 'LOGIN', 'auth', adminUser.id, 'Login Owner Default');

        return Utils.ok({
          token: token,
          user: adminUser
        }, 'Selamat datang di dnzy Umroh ERP!');
      }

      // 2. Cek di Database Users Spreadsheet
      let userList = [];
      try {
        userList = Database.list('users');
      } catch (e) {
        userList = [];
      }

      const candidate = userList.find(u =>
        String(u.username || '').trim().toLowerCase() === cleanUser &&
        String(u.status_akun || '').toUpperCase() === 'AKTIF'
      );

      if (!candidate) {
        return Utils.fail('Username atau kata sandi tidak ditemukan.');
      }

      const hash = Utils.hashPassword(cleanPass, candidate.password_salt);
      if (hash !== candidate.password_hash) {
        return Utils.fail('Kata sandi yang Anda masukkan salah.');
      }

      const userData = {
        id: candidate.id || candidate.id_user,
        nama_lengkap: candidate.nama_lengkap || candidate.username,
        username: candidate.username,
        role: candidate.role || ROLES.ADMIN_OPERASIONAL,
        id_entitas: candidate.id_entitas || 'PST-01',
        status_akun: candidate.status_akun
      };

      const token = this.generateToken(userData);
      Utils.log(userData, 'LOGIN', 'auth', userData.id, 'Login Pengguna');

      return Utils.ok({
        token: token,
        user: userData
      }, 'Login berhasil.');

    } catch (err) {
      return Utils.error(err);
    }
  },

  generateToken(user) {
    const raw = `${user.id}:${user.username}:${user.role}:${Date.now()}`;
    return Utilities.base64EncodeWebSafe(raw);
  },

  parseToken(token) {
    if (!token) return null;
    try {
      const decoded = Utilities.newBlob(Utilities.base64DecodeWebSafe(token)).getDataAsString();
      const parts = decoded.split(':');
      if (parts.length >= 3) {
        return {
          id: parts[0],
          username: parts[1],
          role: parts[2]
        };
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  requireUser(token) {
    const parsed = this.parseToken(token);
    if (!parsed) {
      // Fallback user if token empty/invalid for quick dev
      return {
        id: 'USR-001',
        nama_lengkap: APP_CONFIG.DEFAULT_OWNER_NAME,
        username: APP_CONFIG.DEFAULT_ADMIN_USERNAME,
        role: ROLES.OWNER,
        id_entitas: 'PST-01'
      };
    }
    return parsed;
  }
};
