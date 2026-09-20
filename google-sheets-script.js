/**
 * ScaleUp CoWork — Google Sheets Live Lead Capture Webhook
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet (create a new one at sheets.new if needed).
 * 2. In the top menu, click Extensions > Apps Script.
 * 3. Delete any existing code in the editor and paste this entire code.
 * 4. Click the "Save" (disk icon) button.
 * 5. Click "Deploy" (top right) > "New deployment".
 * 6. Under "Select type", choose "Web app".
 * 7. Set:
 *    - Description: ScaleUp Lead Capture
 *    - Execute as: "Me"
 *    - Who has access: "Anyone" (IMPORTANT: Do NOT select "Only myself", select "Anyone")
 * 8. Click "Deploy" and authorize access when prompted.
 * 9. Copy the "Web app URL" (looks like: https://script.google.com/macros/s/.../exec).
 * 10. Paste that URL into assets/js/lead-capture.js where it says GOOGLE_SHEET_WEBAPP_URL.
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Set column headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (IST)",
        "Full Name",
        "Phone Number",
        "Interested Workspace",
        "Preferred Visit Date",
        "Source Center / Page",
        "Lead Status",
        "WhatsApp Direct Link"
      ]);
      
      // Style header row
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight("bold")
                 .setBackground("#0f172a")
                 .setFontColor("#38bdf8")
                 .setFontSize(11);
      sheet.setFrozenRows(1);
    }
    
    // Parse incoming payload (supports both JSON body and Form POST)
    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }
    
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss");
    var name = data.name || "Unknown";
    var phone = data.phone || "Not Provided";
    var workspace = data.workspace || "General Inquiry";
    var visitDate = data.visitDate || "Flexible";
    var source = data.source || "ScaleUp Website";
    var status = "New Lead - Needs Call";
    
    // Generate clickable WhatsApp call URL for staff
    var cleanPhone = String(phone).replace(/[^0-9]/g, "");
    if (cleanPhone.length === 10) cleanPhone = "91" + cleanPhone;
    var waUrl = cleanPhone.length >= 10 ? 'https://wa.me/' + cleanPhone : "";
    
    // Append lead row to sheet
    sheet.appendRow([
      timestamp,
      name,
      phone,
      workspace,
      visitDate,
      source,
      status,
      waUrl
    ]);
    
    // Auto-fit columns
    sheet.autoResizeColumns(1, 8);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "message": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ "status": "active", "service": "ScaleUp Lead Capture Webhook" }))
    .setMimeType(ContentService.MimeType.JSON);
}
