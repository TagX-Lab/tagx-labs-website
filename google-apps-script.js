/**
 * =========================================================================
 * TAGX Labs™ — Google Sheets Cloud Backend Automation Script
 * Spreadsheet: "TagX informachions from web site"
 * ID: 1AxFVMilf42lJ0nJUiV9EATb1ldwST0R2LdLFGG4UBpE
 * =========================================================================
 * 
 * INSTRUCTIONS TO DEPLOY (Takes 1 minute):
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1AxFVMilf42lJ0nJUiV9EATb1ldwST0R2LdLFGG4UBpE/edit
 * 2. In the top menu, click: Extensions > Apps Script
 * 3. Delete any default code in Code.gs and PASTE ALL THIS CODE.
 * 4. Select function "setupTagXSheet" from the top dropdown and click "Run".
 *    -> This will automatically format your sheets, columns, colors (#3D74B6 & #DC3C22), and frozen headers!
 * 5. (Optional for auto-live sync) Click "Deploy" > "New deployment" > Select type "Web app".
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 *    - Click "Deploy" and copy the Web App URL into the website Secret Vault!
 */

function setupTagXSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // -------------------------------------------------------------
  // 1. SHEET 1: Client Inquiries
  // -------------------------------------------------------------
  let sheet1 = ss.getSheetByName('Client Inquiries');
  if (!sheet1) {
    sheet1 = ss.getSheets()[0];
    sheet1.setName('Client Inquiries');
  }

  const headers1 = [
    'Timestamp', 
    'Inquiry ID', 
    'Client / Company Name', 
    'Work Email', 
    'Service Requested', 
    'Project Brief / Scope', 
    'Estimated Budget', 
    'Inquiry Status', 
    'Founder Notes'
  ];

  sheet1.clear();
  sheet1.getRange(1, 1, 1, headers1.length).setValues([headers1]);
  
  // Format Header 1 with #3D74B6 (Royal Ocean Blue)
  const headerRange1 = sheet1.getRange(1, 1, 1, headers1.length);
  headerRange1.setBackground('#3D74B6');
  headerRange1.setFontColor('#FFFFFF');
  headerRange1.setFontFamily('Plus Jakarta Sans');
  headerRange1.setFontSize(11);
  headerRange1.setFontWeight('bold');
  headerRange1.setHorizontalAlignment('center');
  headerRange1.setVerticalAlignment('middle');
  sheet1.setRowHeight(1, 36);
  sheet1.setFrozenRows(1);

  // Column Widths
  sheet1.setColumnWidth(1, 150); // Timestamp
  sheet1.setColumnWidth(2, 110); // Inquiry ID
  sheet1.setColumnWidth(3, 200); // Client Name
  sheet1.setColumnWidth(4, 220); // Work Email
  sheet1.setColumnWidth(5, 200); // Service Requested
  sheet1.setColumnWidth(6, 340); // Project Brief
  sheet1.setColumnWidth(7, 150); // Estimated Budget
  sheet1.setColumnWidth(8, 140); // Status
  sheet1.setColumnWidth(9, 200); // Founder Notes

  // Data Validation for Status Dropdown
  const ruleStatus = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New', 'In Review', 'Contacted', 'Proposal Sent', 'Contract Signed', 'Completed'], true)
    .build();
  sheet1.getRange('H2:H1000').setDataValidation(ruleStatus);

  // Add Initial Sample Row
  sheet1.appendRow([
    new Date().toLocaleString(),
    'TX-1001',
    'Apex FinTech (Sample Client)',
    'founder@apexfin.io',
    '3D WebGL Web Experiences',
    'Interactive 3D WebGL software showcase with 60 FPS performance and dark/ocean aesthetic.',
    '$3,000 - $6,000',
    'New',
    'Sample row from TAGX Labs setup'
  ]);

  // -------------------------------------------------------------
  // 2. SHEET 2: Product VIP Waitlist
  // -------------------------------------------------------------
  let sheet2 = ss.getSheetByName('Product VIP Waitlist');
  if (!sheet2) {
    sheet2 = ss.insertSheet('Product VIP Waitlist');
  }

  const headers2 = [
    '#', 
    'Registration Timestamp', 
    'Developer / User Email', 
    'Access Tier', 
    'Invitation Status', 
    'Platform / Source', 
    'Notes / Feedback'
  ];

  sheet2.clear();
  sheet2.getRange(1, 1, 1, headers2.length).setValues([headers2]);

  // Format Header 2 with #DC3C22 (Terracotta Crimson)
  const headerRange2 = sheet2.getRange(1, 1, 1, headers2.length);
  headerRange2.setBackground('#DC3C22');
  headerRange2.setFontColor('#FFFFFF');
  headerRange2.setFontFamily('Plus Jakarta Sans');
  headerRange2.setFontSize(11);
  headerRange2.setFontWeight('bold');
  headerRange2.setHorizontalAlignment('center');
  headerRange2.setVerticalAlignment('middle');
  sheet2.setRowHeight(1, 36);
  sheet2.setFrozenRows(1);

  // Column Widths
  sheet2.setColumnWidth(1, 60);  // #
  sheet2.setColumnWidth(2, 170); // Timestamp
  sheet2.setColumnWidth(3, 250); // Email
  sheet2.setColumnWidth(4, 180); // Access Tier
  sheet2.setColumnWidth(5, 140); // Invitation Status
  sheet2.setColumnWidth(6, 180); // Source
  sheet2.setColumnWidth(7, 240); // Notes

  // Data Validation for Invitation Status Dropdown
  const ruleWaitStatus = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Pending Launch', 'Invite Sent', 'Active Beta User', 'Unsubscribed'], true)
    .build();
  sheet2.getRange('E2:E1000').setDataValidation(ruleWaitStatus);

  // Add Initial Sample Row
  sheet2.appendRow([
    1,
    new Date().toLocaleString(),
    'early.adopter@tagxlabs.com',
    'VIP Early Access 🚀',
    'Pending Launch',
    'Website Hero Section',
    'Sample VIP subscriber'
  ]);

  SpreadsheetApp.flush();
  Logger.log('TAGX Labs Google Sheet setup successfully completed!');
}

/**
 * Sanitizes input against CSV / Formula Injection (CWE-1236)
 * Prevents malicious strings starting with =, +, -, @, or tab from executing formulas.
 */
function sanitizeCell(val) {
  if (val === null || val === undefined) return '';
  let s = String(val).trim();
  if (/^[=\+\-@\t\r]/.test(s)) {
    s = "'" + s;
  }
  return s;
}

/**
 * Real-Time HTTP POST Endpoint (Web App)
 * Receives form submissions from the TAGX Labs website and writes into the respective sheet.
 */
function doPost(e) {
  try {
    const rawData = e.postData ? e.postData.contents : '';
    const data = JSON.parse(rawData);
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    if (data.type === 'inquiry') {
      const sheet = ss.getSheetByName('Client Inquiries');
      if (sheet) {
        sheet.appendRow([
          sanitizeCell(data.date || new Date().toLocaleString()),
          sanitizeCell(data.id || 'TX-' + Math.floor(1000 + Math.random() * 9000)),
          sanitizeCell(data.name || 'Anonymous'),
          sanitizeCell(data.email || ''),
          sanitizeCell(data.projectType || 'Software Engineering'),
          sanitizeCell(data.message || ''),
          sanitizeCell(data.budget || 'Open / Discussion'),
          'New',
          'Direct submission from website'
        ]);
      }
    } else if (data.type === 'waitlist') {
      const sheet = ss.getSheetByName('Product VIP Waitlist');
      if (sheet) {
        const lastRow = sheet.getLastRow();
        sheet.appendRow([
          lastRow,
          sanitizeCell(data.date || new Date().toLocaleString()),
          sanitizeCell(data.email || ''),
          sanitizeCell(data.tier || 'VIP Early Access 🚀'),
          'Pending Launch',
          sanitizeCell(data.source || 'Website Form'),
          ''
        ]);
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, message: 'Saved to TagX Sheet' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ status: 'online', app: 'TAGX Labs Cloud Sheet Engine' }))
    .setMimeType(ContentService.MimeType.JSON);
}
