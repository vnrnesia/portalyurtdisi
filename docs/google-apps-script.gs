/**
 * Portal Yurtdışı — Google Sheets webhook (Apps Script Web App)
 *
 * KURULUM:
 * 1) Bir Google Sheets dosyası oluştur. İki sekme aç ve isimlerini AYNEN şöyle ver:
 *      "Leadler"   ve   "PortalGPT"
 *    (Aşağıdaki ensureHeaders() ilk POST'ta başlık satırlarını otomatik yazar.)
 * 2) Uzantılar → Apps Script. Bu dosyanın TAMAMINI yapıştır.
 * 3) Aşağıdaki SECRET değerini uzun, rastgele bir dizeyle değiştir
 *    (aynısını .env.local içindeki SHEETS_WEBHOOK_SECRET'a yaz).
 * 4) Dağıt → Yeni dağıtım → Tür: Web uygulaması.
 *      - "Şu kişi olarak çalıştır": Ben
 *      - "Erişimi olan": Herkes
 *    Dağıt'a bas, izinleri onayla, çıkan .../exec URL'ini kopyala
 *    (.env.local içindeki GOOGLE_SHEETS_WEBHOOK_URL'a yaz).
 * 5) Kodu her güncellediğinde: Dağıt → Dağıtımları yönet → mevcut dağıtımı düzenle
 *    → Sürüm: Yeni sürüm → Dağıt. (URL değişmez.)
 */

var SECRET = 'BURAYA_UZUN_RASTGELE_BIR_DIZE_YAZ';

var LEAD_SHEET = 'Leadler';
var GPT_SHEET = 'PortalGPT';

var LEAD_HEADERS = ['Tarih', 'Kaynak', 'Ad Soyad', 'Telefon', 'E-posta', 'Şehir', 'Hizmet', 'Program', 'Bütçe', 'Detay', 'Mesaj'];
var GPT_HEADERS = ['Tarih', 'Oturum ID', 'İletişim', 'İlk Soru', 'Tam Sohbet', 'Son Öneriler'];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (data.secret !== SECRET) {
      return json({ ok: false, error: 'unauthorized' });
    }

    if (data.type === 'lead') {
      handleLead(data);
    } else if (data.type === 'portalgpt') {
      handleGpt(data);
    } else if (data.type === 'portalgpt-contact') {
      handleGptContact(data);
    } else {
      return json({ ok: false, error: 'unknown type' });
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function handleLead(d) {
  var sheet = getSheet(LEAD_SHEET, LEAD_HEADERS);
  sheet.appendRow([
    formatDate(d.tarih),
    d.kaynak || '',
    d.ad || '',
    d.telefon || '',
    d.email || '',
    d.sehir || '',
    d.hizmet || '',
    d.program || '',
    d.butce || '',
    d.detay || '',
    d.mesaj || '',
  ]);
}

function handleGpt(d) {
  var sheet = getSheet(GPT_SHEET, GPT_HEADERS);
  var row = findRowBySession(sheet, d.sessionId); // 2. sütun = Oturum ID

  if (row > 0) {
    // Var olan sohbeti güncelle (Tarih, İlk Soru, Tam Sohbet, Son Öneriler)
    sheet.getRange(row, 1).setValue(formatDate(d.tarih));
    if (!sheet.getRange(row, 4).getValue()) sheet.getRange(row, 4).setValue(d.ilkSoru || '');
    sheet.getRange(row, 5).setValue(d.transcript || '');
    sheet.getRange(row, 6).setValue(d.sonOneriler || '');
  } else {
    // Yeni sohbet satırı (İletişim boş başlar)
    sheet.appendRow([
      formatDate(d.tarih),
      d.sessionId || '',
      '',
      d.ilkSoru || '',
      d.transcript || '',
      d.sonOneriler || '',
    ]);
  }
}

function handleGptContact(d) {
  var sheet = getSheet(GPT_SHEET, GPT_HEADERS);
  var row = findRowBySession(sheet, d.sessionId);
  if (row > 0) {
    sheet.getRange(row, 3).setValue(d.iletisim || ''); // 3. sütun = İletişim
  } else {
    // Sohbet henüz loglanmadıysa en azından iletişimle bir satır aç
    sheet.appendRow([formatDate(new Date().toISOString()), d.sessionId || '', d.iletisim || '', '', '', '']);
  }
}

/* --------- yardımcılar --------- */

function getSheet(name, headers) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function findRowBySession(sheet, sessionId) {
  if (!sessionId) return -1;
  var last = sheet.getLastRow();
  if (last < 2) return -1;
  var ids = sheet.getRange(2, 2, last - 1, 1).getValues(); // Oturum ID sütunu
  for (var i = 0; i < ids.length; i++) {
    if (ids[i][0] === sessionId) return i + 2;
  }
  return -1;
}

function formatDate(iso) {
  var d = iso ? new Date(iso) : new Date();
  return Utilities.formatDate(d, 'Europe/Istanbul', 'yyyy-MM-dd HH:mm:ss');
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
