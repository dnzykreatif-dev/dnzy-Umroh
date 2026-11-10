/**
 * Database Engine Spreadsheet dnzy Umroh ERP
 */

const Database = {
  _spreadsheet: null,
  _tableCache: {},

  spreadsheet() {
    if (!this._spreadsheet) {
      let id = getConfiguredSpreadsheetId_();
      if (!id) {
        // Otomatis buat spreadsheet baru jika belum ada ID terkonfigurasi
        const newSs = SpreadsheetApp.create('dnzy Umroh ERP - Database');
        id = newSs.getId();
        PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', id);
        this._spreadsheet = newSs;
        Logger.log('Spreadsheet baru dibuat otomatis: ' + newSs.getUrl());
      } else {
        this._spreadsheet = SpreadsheetApp.openById(id);
      }
    }
    return this._spreadsheet;
  },

  setup() {
    const ss = this.spreadsheet();

    Object.keys(SCHEMA).forEach(name => {
      let sheet = ss.getSheetByName(name);
      if (!sheet) {
        sheet = ss.insertSheet(name);
      }

      const headers = SCHEMA[name];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, headers.length)
        .setFontWeight('bold')
        .setFontColor('#FAF8F3')
        .setBackground('#041F17');
    });

    // Bersihkan sheet bawaan (Sheet1/Lembar1) agar rapi
    const defaultSheet = ss.getSheetByName('Sheet1') || ss.getSheetByName('Lembar1');
    if (defaultSheet && ss.getSheets().length > 1) {
      try {
        ss.deleteSheet(defaultSheet);
      } catch (e) {}
    }

    SpreadsheetApp.flush();
  },

  table(name) {
    if (!SCHEMA[name]) {
      throw new Error(`Tabel ${name} tidak terdaftar di SCHEMA.`);
    }

    if (this._tableCache[name]) {
      return this._tableCache[name];
    }

    const ss = this.spreadsheet();
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      this.ensureHeaders(sheet, name);
    }

    const expectedHeaders = SCHEMA[name];
    const actualLastCol = Math.max(sheet.getLastColumn(), 1);
    const lastCol = Math.max(actualLastCol, expectedHeaders.length);

    let headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => String(h || '').trim());

    const missing = expectedHeaders.filter(h => !headers.includes(h));
    if (missing.length > 0) {
      const startCol = headers.filter(Boolean).length + 1;
      sheet.getRange(1, startCol, 1, missing.length).setValues([missing]);
      headers = sheet.getRange(1, 1, 1, startCol + missing.length - 1).getValues()[0].map(h => String(h || '').trim());
    }

    const colIndex = {};
    headers.forEach((h, idx) => {
      if (h) colIndex[h] = idx + 1;
    });

    const inst = {
      sheet,
      headers,
      colIndex,

      all() {
        const lastRow = sheet.getLastRow();
        if (lastRow <= 1) return [];

        const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
        const records = [];

        for (let i = 0; i < values.length; i++) {
          const row = values[i];
          const obj = { _row: i + 2 };

          headers.forEach((h, hIdx) => {
            obj[h] = row[hIdx];
          });

          if (!obj.is_deleted) {
            records.push(obj);
          }
        }
        return records;
      },

      get(id) {
        if (!id) return null;
        const records = this.all();
        const idKey = headers[0]; // Biasanya id atau id_jamaah, dll
        return records.find(r => String(r[idKey] || r.id) === String(id)) || null;
      },

      find(predicate) {
        return this.all().filter(predicate);
      },

      create(data) {
        const idKey = headers[0];
        const record = Object.assign({}, data);
        if (!record[idKey] && !record.id) {
          record[idKey] = Utils.id(name.toUpperCase().slice(0, 3));
        }
        record.created_at = record.created_at || Utils.now();
        record.updated_at = Utils.now();
        record.is_deleted = false;

        const row = headers.map(h => {
          const v = record[h];
          return v !== undefined && v !== null ? v : '';
        });

        sheet.appendRow(row);
        return record;
      },

      update(id, data) {
        const lastRow = sheet.getLastRow();
        if (lastRow <= 1) throw new Error('Data tidak ditemukan.');

        const idKey = headers[0];
        const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
        let targetRow = -1;

        for (let i = 0; i < values.length; i++) {
          const rowVal = values[i][0];
          if (String(rowVal) === String(id)) {
            targetRow = i + 2;
            break;
          }
        }

        if (targetRow === -1) throw new Error(`Data dengan ID ${id} tidak ditemukan.`);

        const updated = Object.assign({}, data);
        updated.updated_at = Utils.now();

        headers.forEach((h, idx) => {
          if (updated[h] !== undefined) {
            sheet.getRange(targetRow, idx + 1).setValue(updated[h]);
          }
        });

        return this.get(id);
      },

      delete(id) {
        return this.update(id, { is_deleted: true });
      }
    };

    this._tableCache[name] = inst;
    return inst;
  },

  list(name) {
    try {
      return this.table(name).all();
    } catch (e) {
      return [];
    }
  },

  ensureHeaders(sheet, name) {
    const headers = SCHEMA[name];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setFontColor('#FAF8F3')
      .setBackground('#041F17');
  }
};
