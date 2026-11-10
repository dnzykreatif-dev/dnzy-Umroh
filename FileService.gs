/**
 * File Storage Service Google Drive dnzy Umroh ERP
 */

const FileService = {
  getRootFolder() {
    let folderName = APP_CONFIG.DRIVE_ROOT_FOLDER;
    let folders = DriveApp.getFoldersByName(folderName);

    if (folders.hasNext()) {
      return folders.next();
    } else {
      const folder = DriveApp.createFolder(folderName);
      folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      return folder;
    }
  },

  getSubFolder(subName) {
    const root = this.getRootFolder();
    let folders = root.getFoldersByName(subName);
    if (folders.hasNext()) {
      return folders.next();
    }
    const folder = root.createFolder(subName);
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return folder;
  },

  saveBase64File(base64Data, fileName, subFolder) {
    let raw = base64Data;
    let mimeType = 'application/octet-stream';

    if (raw.indexOf(';base64,') > -1) {
      const parts = raw.split(';base64,');
      mimeType = parts[0].replace('data:', '');
      raw = parts[1];
    }

    const decoded = Utilities.base64Decode(raw);
    const blob = Utilities.newBlob(decoded, mimeType, fileName);
    const targetFolder = subFolder ? this.getSubFolder(subFolder) : this.getRootFolder();
    const file = targetFolder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return `https://drive.google.com/uc?export=view&id=${file.getId()}`;
  },

  uploadDocument(token, payload) {
    try {
      const user = AuthService.requireUser(token);
      if (!payload || !payload.base64 || !payload.fileName) {
        throw new Error('Data file tidak valid.');
      }

      const fileUrl = this.saveBase64File(payload.base64, payload.fileName, payload.category || 'Dokumen Jamaah');
      Utils.log(user, 'UPLOAD_FILE', 'drive', payload.category || '', payload.fileName);

      return Utils.ok({ url: fileUrl }, 'Berkas berhasil diunggah ke Google Drive.');
    } catch (err) {
      return Utils.error(err);
    }
  }
};
