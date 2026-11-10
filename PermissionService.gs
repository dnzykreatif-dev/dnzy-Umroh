/**
 * RBAC Permission Service dnzy Umroh ERP
 */

const PermissionService = {
  can(user, permission) {
    if (!user) return false;
    const role = String(user.role || '').toUpperCase();

    if (role === ROLES.OWNER) {
      return true;
    }

    const list = PERMISSIONS[role] || [];
    if (list.includes('*')) return true;
    if (list.includes(permission)) return true;

    const parts = permission.split('.');
    const wildcard = `${parts[0]}.*`;
    return list.includes(wildcard);
  },

  require(user, permission) {
    if (!this.can(user, permission)) {
      throw new Error(`Akses ditolak. Anda tidak memiliki izin [${permission}].`);
    }
  },

  roleLabel(role) {
    const map = {
      [ROLES.OWNER]: 'Owner / Direktur Utama',
      [ROLES.KEPALA_ENTITAS]: 'Kepala Cabang / Entitas',
      [ROLES.ADMIN_OPERASIONAL]: 'Admin Operasional',
      [ROLES.ADMIN_FINANCE]: 'Admin Keuangan'
    };
    return map[role] || role;
  }
};
