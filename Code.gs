/**
 * Web App Controller & Public API dnzy Umroh ERP
 */

function doGet(e) {
  const template = HtmlService.createTemplateFromFile('Index');

  return template
    .evaluate()
    .setTitle('dnzy Umroh ERP - Berkah Umroh Sejahtera')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  try {
    let content = HtmlService.createHtmlOutputFromFile(filename).getContent();
    if (content.charCodeAt(0) === 0xFEFF) {
      content = content.substring(1);
    }
    return content;
  } catch (e) {
    return `<!-- Include error: ${filename} - ${e.message} -->`;
  }
}

// ================= API WRAPPERS =================

function apiLogin(username, password) {
  return AuthService.login(username, password);
}

function apiGetDashboardData() {
  return DashboardService.getStats();
}

function apiGetSettings() {
  return ConfigService.getSettings();
}

function apiUpdateSetting(token, key, value, description) {
  return ConfigService.updateSetting(token, key, value, description);
}

function apiListRecords(entity) {
  return CrudService.listRecords(entity);
}

function apiGetRecord(entity, id) {
  return CrudService.getRecord(entity, id);
}

function apiSaveRecord(token, entity, data) {
  return CrudService.saveRecord(token, entity, data);
}

function apiDeleteRecord(token, entity, id) {
  return CrudService.deleteRecord(token, entity, id);
}

function apiUploadDocument(token, payload) {
  return FileService.uploadDocument(token, payload);
}

function apiSetupDatabase() {
  return setupDatabase();
}
