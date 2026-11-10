/**
 * Universal Entity CRUD Service dnzy Umroh ERP
 */

const CrudService = {
  saveRecord(token, entity, data) {
    try {
      const user = AuthService.requireUser(token);
      if (!SCHEMA[entity]) {
        throw new Error(`Entitas [${entity}] tidak valid.`);
      }

      const table = Database.table(entity);
      const idKey = SCHEMA[entity][0];
      const recordId = data[idKey] || data.id;

      let result;
      if (recordId) {
        PermissionService.require(user, `${entity}.update`);
        result = table.update(recordId, data);
        Utils.log(user, 'UPDATE', entity, recordId, data);
      } else {
        PermissionService.require(user, `${entity}.create`);
        result = table.create(data);
        Utils.log(user, 'CREATE', entity, result[idKey], data);
      }

      return Utils.ok(result, `Data ${entity} berhasil disimpan.`);
    } catch (err) {
      return Utils.error(err);
    }
  },

  deleteRecord(token, entity, id) {
    try {
      const user = AuthService.requireUser(token);
      PermissionService.require(user, `${entity}.delete`);

      const table = Database.table(entity);
      table.delete(id);
      Utils.log(user, 'DELETE', entity, id, '');

      return Utils.ok({ id }, `Data ${entity} berhasil dihapus.`);
    } catch (err) {
      return Utils.error(err);
    }
  },

  listRecords(entity) {
    try {
      if (!SCHEMA[entity]) {
        throw new Error(`Entitas [${entity}] tidak valid.`);
      }
      const data = Database.list(entity);
      return Utils.ok(data);
    } catch (err) {
      return Utils.error(err);
    }
  },

  getRecord(entity, id) {
    try {
      if (!SCHEMA[entity]) {
        throw new Error(`Entitas [${entity}] tidak valid.`);
      }
      const item = Database.table(entity).get(id);
      if (!item) return Utils.fail('Data tidak ditemukan.');
      return Utils.ok(item);
    } catch (err) {
      return Utils.error(err);
    }
  }
};
