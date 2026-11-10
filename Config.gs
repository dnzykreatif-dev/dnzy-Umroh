/**
 * Konfigurasi Utama dnzy Umroh ERP
 */

const APP_CONFIG = Object.freeze({
  APP_NAME: 'dnzy Umroh',
  TAGLINE: 'Sistem ERP Manajemen Travel Umroh & Haji Khusus',
  VERSION: '1.0.0',
  SPREADSHEET_ID: '', // Isi melalui Script Properties 'SPREADSHEET_ID' atau langsung di sini
  DEFAULT_ADMIN_USERNAME: 'admin',
  DEFAULT_ADMIN_PASSWORD: 'password123',
  DEFAULT_OWNER_NAME: 'Ummu Aisyah',
  DEFAULT_ROLE: 'OWNER',
  DEFAULT_CURRENCY: 'IDR',
  DEFAULT_SAR_RATE: 4250, // Nilai tukar SAR ke IDR
  DRIVE_ROOT_FOLDER: 'dnzy Umroh Assets'
});

/**
 * Mendapatkan ID Spreadsheet aktif atau terkonfigurasi
 */
function getConfiguredSpreadsheetId_() {
  const configured = String(
    PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID') || ''
  ).trim();
  if (configured) return configured;
  if (APP_CONFIG.SPREADSHEET_ID) return APP_CONFIG.SPREADSHEET_ID;

  try {
    const active = SpreadsheetApp.getActiveSpreadsheet();
    if (active) return active.getId();
  } catch (e) {}

  return '';
}
