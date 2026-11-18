/**
 * CAI Alumni Gathering RSVP: receives the website form and appends a row
 * to the "CAI Gathering 26 RSVP" Google Sheet.
 *
 * Setup (from the club.iraq@alpbach.network account):
 *   1. Open the sheet, then Extensions > Apps Script.
 *   2. Replace the contents of Code.gs with this file and save.
 *   3. Deploy > New deployment > type "Web app".
 *        Execute as: Me (club.iraq@alpbach.network)
 *        Who has access: Anyone
 *   4. Authorise when asked, then copy the Web app URL (ends in /exec).
 *   5. Put that URL in `rsvp.endpoint` in src/content.js and push.
 *
 * After editing this script later, use Deploy > Manage deployments > Edit >
 * Version: New version, so the same URL keeps working.
 */

var SPREADSHEET_ID = '1zFn9y0AHDt65KD2-SUZ0Ym0NWJND-y3KsHextCTnjwc';
var SHEET_NAME = 'RSVPs';
var HEADERS = [
  'Submitted at',
  'Full name',
  'Will you join us?',
  'Bringing a guest?',
  'Year attended EFA',
  'Suggestion / activity',
];

var ATTENDING = ['Yes, I’ll be there', 'Maybe', 'No, I can’t make it'];
var GUESTS = ['No, just me', 'Yes, one guest', 'Yes, two guests'];

function doPost(e) {
  try {
    var data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

    // Honeypot field: real visitors never fill it in.
    if (data.website) return json({ ok: true });

    var name = clean(data.name, 120);
    var attending = clean(data.attending, 40);
    var guests = clean(data.guests, 40);
    var year = clean(data.year, 4);
    var suggestion = clean(data.suggestion, 2000);

    if (!name) return json({ ok: false, error: 'Please enter your full name.' });
    if (ATTENDING.indexOf(attending) === -1) return json({ ok: false, error: 'Please tell us if you will join.' });
    if (GUESTS.indexOf(guests) === -1) return json({ ok: false, error: 'Please tell us about guests.' });
    if (!/^\d{4}$/.test(year)) return json({ ok: false, error: 'Please enter the year you attended.' });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var sheet = getSheet();
      sheet.appendRow([new Date(), name, attending, guests, year, suggestion]);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: 'Something went wrong. Please try again.' });
  }
}

// Visiting the web app URL in a browser shows this, which confirms the deployment works.
function doGet() {
  return json({ ok: true, service: 'CAI RSVP' });
}

function getSheet() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Trim, cap the length, and stop text being read as a spreadsheet formula.
function clean(value, max) {
  var s = String(value == null ? '' : value).trim().slice(0, max);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
