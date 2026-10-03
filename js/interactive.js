/**
 * TAGX Labs™ — Interactive Experience Module
 * Command Palette (⌘K), Early Access Waitlist Engine, Contact Submissions,
 * Secret Executive Vault (6-Click Trigger), and 1-Click Excel / CSV Exporter Engine
 * Styled with the Official TAGX Brand Palette (#3D74B6, #FBF5DE, #EAC8A6, #DC3C22)
 */

// Global Toast System
window.showToast = function (message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'glass-card px-4 py-3 rounded-xl border border-tagx-teal/50 shadow-2xl flex items-center gap-3 text-xs font-mono text-white pointer-events-auto transition-all duration-300 transform translate-y-4 opacity-0 bg-slate-900/95';
  
  let iconName = 'info';
  let iconColor = 'text-tagx-teal';
  if (type === 'success') {
    iconName = 'check-circle';
    iconColor = 'text-tagx-teal';
  } else if (type === 'error') {
    iconName = 'alert-triangle';
    iconColor = 'text-tagx-rose';
  }

  toast.innerHTML = `
    <i data-lucide="${iconName}" class="w-4 h-4 ${iconColor} flex-shrink-0"></i>
    <span class="flex-grow">${message}</span>
  `;

  container.appendChild(toast);
  if (window.lucide) window.lucide.createIcons();

  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

// =========================================================================
// SECURITY UTILITIES & SHIELD HELPERS (A to E)
// =========================================================================

// Anti-XSS Sanitizer & Input Hardener
function sanitizeInput(str, maxLength = 500) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Strip HTML tags
    .replace(/javascript:/gi, '') // Strip javascript: protocol
    .replace(/on\w+=/gi, '') // Strip inline event handlers
    .replace(/data:/gi, '') // Strip data URIs
    .trim()
    .slice(0, maxLength);
}

// Client-side Rate Limiter / Velocity Guard
const RATE_LIMIT_WINDOWS = {};
function isRateLimited(actionKey, cooldownMs = 4000) {
  const now = Date.now();
  const lastTime = RATE_LIMIT_WINDOWS[actionKey] || 0;
  if (now - lastTime < cooldownMs) {
    return true;
  }
  RATE_LIMIT_WINDOWS[actionKey] = now;
  return false;
}

// Cryptographic SHA-256 Hashing Engine (Native Web Crypto API)
async function sha256Hex(message) {
  if (!window.crypto || !window.crypto.subtle) {
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      hash = ((hash << 5) - hash) + message.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
  }
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// =========================================================================
// OFFICIAL GOOGLE FORM CLOUD DATABASE BRIDGE (Zero-OAuth Real-Time Sync)
// Form ID: 1FAIpQLScLMj-oVzDsMf4_De8f4K1xpPb7RXac2AAbCZZiArXsKv3Ggg
// Connected to Official Database Google Sheet
// =========================================================================
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScLMj-oVzDsMf4_De8f4K1xpPb7RXac2AAbCZZiArXsKv3Ggg/formResponse';
const GOOGLE_FORM_ENTRY_NAME = 'entry.683735407';
const GOOGLE_FORM_ENTRY_EMAIL = 'entry.1044320817';
const GOOGLE_FORM_ENTRY_SERVICE = 'entry.308938277';
const GOOGLE_FORM_ENTRY_BRIEF = 'entry.85843337';

function syncToGoogleDatabase(data) {
  try {
    const formData = new URLSearchParams();
    if (data.name) formData.append(GOOGLE_FORM_ENTRY_NAME, data.name);
    if (data.email) formData.append(GOOGLE_FORM_ENTRY_EMAIL, data.email);
    if (data.service) formData.append(GOOGLE_FORM_ENTRY_SERVICE, data.service);
    if (data.brief) formData.append(GOOGLE_FORM_ENTRY_BRIEF, data.brief);

    fetch(GOOGLE_FORM_ACTION_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formData.toString()
    }).then(() => {
      console.log('[TAGX Database] Auto-recorded to Google Sheet database!');
    }).catch(err => {
      console.warn('[TAGX Database Sync Error]:', err);
    });
  } catch (err) {
    console.warn('[TAGX Database Sync Exception]:', err);
  }
}

// 1. Early Access & Product Launch Waitlist Handler (Persists to Local Storage with Security Shield)
window.handleEarlyAccessSubmit = function (e) {
  e.preventDefault();

  // Anti-Bot Honeypot check
  const honey = document.getElementById('early-access-hp');
  if (honey && honey.value) {
    console.warn('[TAGX Shield] Honeypot triggered in early access form.');
    return;
  }

  // Rate Limiting Guard (4-second throttle)
  if (isRateLimited('early_access_submit', 4000)) {
    window.showToast('⚠️ Please wait a few seconds before submitting again.', 'error');
    return;
  }

  const emailInput = document.getElementById('early-access-email');
  const submitBtn = document.getElementById('early-access-btn');
  const rawEmail = emailInput ? emailInput.value : '';
  const email = sanitizeInput(rawEmail, 120);

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    window.showToast('⚠️ Please enter a valid email address.', 'error');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> <span>Securing VIP Slot...</span>`;
    if (window.lucide) window.lucide.createIcons();
  }

  // Store registered waitlist email locally with metadata
  try {
    const list = JSON.parse(localStorage.getItem('tagx_product_waitlist') || '[]');
    const exists = list.some(item => (typeof item === 'string' ? item === email : item.email === email));
    if (!exists) {
      list.push({
        email: email,
        date: new Date().toLocaleString(),
        tier: 'VIP Early Access'
      });
      localStorage.setItem('tagx_product_waitlist', JSON.stringify(list));
    }
  } catch (_) {}

  // 100% Automatic Real-Time Cloud Sync to Official Google Sheet Database
  syncToGoogleDatabase({
    name: 'Product VIP Waitlist Subscriber',
    email: email,
    service: 'VIP Early Access 🚀',
    brief: 'Auto-subscribed to Product VIP Early Access from TAGX Labs website.'
  });

  // Optional Live Google Cloud Sheet Webhook Dispatch
  try {
    const webhookUrl = localStorage.getItem('tagx_gsheet_webhook');
    if (webhookUrl && webhookUrl.startsWith('https://script.google.com/')) {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'waitlist',
          email: email,
          date: new Date().toLocaleString(),
          tier: 'VIP Early Access 🚀',
          source: 'Website Landing Page'
        })
      }).catch(err => console.warn('[TAGX GSheet Sync Error]', err));
    }
  } catch (_) {}

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-tagx-teal"></i> <span>VIP Early Access Granted!</span>`;
      if (window.lucide) window.lucide.createIcons();
    }

    window.showToast(`🎉 You're on the TAGX Early Access list! Notification armed for ${escapeHtml(email)}.`, 'success');

    if (emailInput) emailInput.value = '';

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = `<i data-lucide="sparkles" class="w-4 h-4"></i> <span>Get Launch Notification</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }, 4000);
  }, 900);
};

// 2. Contact / Service Form Submission Handler (Persists to Local Storage with Security Shield)
window.handleContactSubmit = function (e) {
  e.preventDefault();

  // Anti-Bot Honeypot check
  const honey = document.getElementById('contact-hp');
  if (honey && honey.value) {
    console.warn('[TAGX Shield] Honeypot triggered in contact form.');
    return;
  }

  // Rate Limiting Guard (5-second throttle)
  if (isRateLimited('contact_submit', 5000)) {
    window.showToast('⚠️ Please wait a few seconds before submitting another request.', 'error');
    return;
  }

  const nameEl = document.getElementById('client-name');
  const emailEl = document.getElementById('client-email');
  const descEl = document.getElementById('project-desc');
  
  // Extract all selected services (multi-checkbox)
  const checkedBoxes = Array.from(document.querySelectorAll('input[name="project_type"]:checked'));
  const selectedServices = checkedBoxes.map(cb => sanitizeInput(cb.value, 60));
  const projectType = selectedServices.length > 0 ? selectedServices.join(', ') : 'Custom Systems & AI Solutions';

  // Extract selected timeline / urgency
  const timelineRadio = document.querySelector('input[name="project_timeline"]:checked');
  const projectTimeline = sanitizeInput(timelineRadio ? timelineRadio.value : '1 - 2 Months', 40);

  const name = sanitizeInput(nameEl ? nameEl.value : '', 80) || 'Partner';
  const email = sanitizeInput(emailEl ? emailEl.value : '', 120);
  const message = sanitizeInput(descEl ? descEl.value : '', 2000);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    window.showToast('⚠️ Please enter a valid email address.', 'error');
    return;
  }

  const submitBtn = document.getElementById('submit-btn');

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> <span>Transmitting Brief...</span>`;
    if (window.lucide) window.lucide.createIcons();
  }

  // Persist structured inquiry into localStorage
  try {
    const inquiries = JSON.parse(localStorage.getItem('tagx_inquiries') || '[]');
    inquiries.unshift({
      id: 'TX-' + Math.floor(1000 + Math.random() * 9000),
      name: name,
      email: email,
      projectType: projectType,
      timeline: projectTimeline,
      message: message,
      date: new Date().toLocaleString()
    });
    localStorage.setItem('tagx_inquiries', JSON.stringify(inquiries));
  } catch (_) {}

  // 100% Automatic Real-Time Cloud Sync to Official Google Sheet Database
  syncToGoogleDatabase({
    name: name,
    email: email,
    service: `${projectType} [${projectTimeline}]`,
    brief: message
  });

  // Optional Live Google Cloud Sheet Webhook Dispatch
  try {
    const webhookUrl = localStorage.getItem('tagx_gsheet_webhook');
    if (webhookUrl && webhookUrl.startsWith('https://script.google.com/')) {
      fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'inquiry',
          name: name,
          email: email,
          projectType: projectType,
          timeline: projectTimeline,
          message: message,
          date: new Date().toLocaleString()
        })
      }).catch(err => console.warn('[TAGX GSheet Sync Error]', err));
    }
  } catch (_) {}

  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4 text-tagx-teal"></i> <span>Project Brief Received!</span>`;
      if (window.lucide) window.lucide.createIcons();
    }

    window.showToast(`Thank you ${escapeHtml(name)}! TAGX engineering team received your project brief.`, 'success');

    const form = document.getElementById('contact-form');
    if (form) form.reset();

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.innerHTML = `<i data-lucide="send" class="w-4 h-4"></i> <span>Transmit Project Request</span>`;
        if (window.lucide) window.lucide.createIcons();
      }
    }, 4000);
  }, 1000);
};

// =========================================================================
// 3. SECRET EXECUTIVE VAULT & EXCEL DASHBOARD ENGINE
// =========================================================================

// Open / Close Vault Modals
window.openSecretVault = function () {
  const modal = document.getElementById('secret-vault-modal');
  if (!modal) return;
  modal.classList.remove('hidden');

  const isAuth = sessionStorage.getItem('tagx_vault_auth') === 'true';
  const loginView = document.getElementById('vault-login-view');
  const dashView = document.getElementById('vault-dashboard-view');

  if (isAuth && dashView && loginView) {
    loginView.classList.add('hidden');
    dashView.classList.remove('hidden');
    window.renderVaultDashboard();
  } else if (loginView && dashView) {
    loginView.classList.remove('hidden');
    dashView.classList.add('hidden');
    const pwdInput = document.getElementById('vault-password');
    if (pwdInput) {
      pwdInput.value = '';
      setTimeout(() => pwdInput.focus(), 150);
    }
  }

  if (window.lucide) window.lucide.createIcons();
};

window.closeSecretVault = function () {
  const modal = document.getElementById('secret-vault-modal');
  if (modal) modal.classList.add('hidden');
};

window.lockSecretVault = function () {
  sessionStorage.removeItem('tagx_vault_auth');
  const loginView = document.getElementById('vault-login-view');
  const dashView = document.getElementById('vault-dashboard-view');
  if (loginView) loginView.classList.remove('hidden');
  if (dashView) dashView.classList.add('hidden');
  window.showToast('🔒 Secret Vault locked.', 'info');
};

// Dynamic IST Time Key Validator
function getValidISTPasswords() {
  const now = new Date();
  // Compute exact Indian Standard Time (UTC+5:30)
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const istNow = new Date(utc + (3600000 * 5.5));

  function generateTimeFormats(d) {
    const h24 = d.getHours();
    const m = d.getMinutes();
    const ampm = h24 >= 12 ? 'pm' : 'am';
    let h12 = h24 % 12;
    h12 = h12 ? h12 : 12; // 0 becomes 12

    const hStr = String(h12);
    const hPad = String(h12).padStart(2, '0');
    const mPad = String(m).padStart(2, '0');
    const h24Pad = String(h24).padStart(2, '0');

    return [
      `${hStr}:${mPad}${ampm}`,        // 10:04am
      `${hStr}:${mPad} ${ampm}`,       // 10:04 am
      `${hPad}:${mPad}${ampm}`,        // 10:04am
      `${hPad}:${mPad} ${ampm}`,       // 10:04 am
      `${hStr}:${mPad}`,               // 10:04
      `${hPad}:${mPad}`,               // 10:04
      `${h24Pad}:${mPad}`,             // 22:04
      `${hStr}.${mPad}${ampm}`,        // 10.04am
      `${hStr}.${mPad} ${ampm}`,       // 10.04 am
      `${hStr}${mPad}${ampm}`,         // 1004am
    ];
  }

  // Include current minute, previous minute, and next minute for smooth 1-min grace window
  const prevMinute = new Date(istNow.getTime() - 60000);
  const nextMinute = new Date(istNow.getTime() + 60000);

  const allFormats = [
    ...generateTimeFormats(istNow),
    ...generateTimeFormats(prevMinute),
    ...generateTimeFormats(nextMinute)
  ];

  return allFormats.map(s => s.toLowerCase().trim());
}

// Pre-computed Cryptographic SHA-256 Hashes for Authorized Principals
const AUTH_USER_HASHES = [
  '6e11c766a4858dd4473d3660f59c24edc2e40c7009fcecd164addc481562baa2', // "poda punda"
  '7f2489a277f40df84f3ac6490f9e340c664356678eb826e1078eec235019979e', // "tagx"
  'efc12bd74a8eab2015774d8c58368f54bab9920446c5578376b5bb2d618a0d3a', // "tagx-lab"
  '59458508a0827cff5f80ed091ebd8808fbe67c97357b58ca00a278e7359dec20'  // "founder"
];

// Pre-computed Cryptographic SHA-256 Hashes for Static Master Passwords
const MASTER_PASS_HASHES = [
  '8ff674cad4d6c671eb40a96213a80c1b1eb8e288ccd8dd4e7a82cfc8251780bf', // "tagx2026"
  '7f2489a277f40df84f3ac6490f9e340c664356678eb826e1078eec235019979e'  // "tagx"
];

// Vault Authentication Logic with Cryptographic SHA-256 & Brute-Force Lockout Defense
window.handleVaultLogin = async function (e) {
  e.preventDefault();
  const user = (document.getElementById('vault-username')?.value || '').trim().toLowerCase();
  const pass = (document.getElementById('vault-password')?.value || '').trim().toLowerCase();
  const errEl = document.getElementById('vault-error-msg');

  // Check Brute Force Lockout
  const lockoutUntil = parseInt(sessionStorage.getItem('tagx_vault_lockout_until') || '0', 10);
  const now = Date.now();
  if (lockoutUntil > now) {
    const remainingSecs = Math.ceil((lockoutUntil - now) / 1000);
    window.showToast(`⛔ Too many failed attempts. Vault locked for ${remainingSecs}s.`, 'error');
    if (errEl) {
      errEl.textContent = `Security lockout active. Try again in ${remainingSecs}s.`;
      errEl.classList.remove('hidden');
    }
    return;
  }

  // Hash user input using Web Crypto SHA-256
  const userHash = await sha256Hex(user);
  const passHash = await sha256Hex(pass);

  const isUserValid = AUTH_USER_HASHES.includes(userHash);

  // Check dynamic IST time passwords
  const validTimePasswords = getValidISTPasswords();
  let isPassValid = MASTER_PASS_HASHES.includes(passHash);

  if (!isPassValid) {
    for (const timeStr of validTimePasswords) {
      const timeHash = await sha256Hex(timeStr);
      if (timeHash === passHash) {
        isPassValid = true;
        break;
      }
    }
  }

  if (isUserValid && isPassValid) {
    sessionStorage.removeItem('tagx_vault_fail_count');
    sessionStorage.removeItem('tagx_vault_lockout_until');

    if (errEl) errEl.classList.add('hidden');
    sessionStorage.setItem('tagx_vault_auth', 'true');
    
    const loginView = document.getElementById('vault-login-view');
    const dashView = document.getElementById('vault-dashboard-view');
    if (loginView) loginView.classList.add('hidden');
    if (dashView) dashView.classList.remove('hidden');
    
    window.renderVaultDashboard();
    window.showToast('🔓 Access Granted: Time-Lock Cryptographically Verified!', 'success');
  } else {
    let failCount = parseInt(sessionStorage.getItem('tagx_vault_fail_count') || '0', 10) + 1;
    sessionStorage.setItem('tagx_vault_fail_count', failCount.toString());

    if (failCount >= 4) {
      sessionStorage.setItem('tagx_vault_lockout_until', (Date.now() + 60000).toString());
      window.showToast('⛔ 4 Failed attempts! Vault locked for 60 seconds.', 'error');
      if (errEl) {
        errEl.textContent = 'Too many failed attempts. Vault locked for 60s.';
        errEl.classList.remove('hidden');
      }
    } else {
      if (errEl) {
        errEl.textContent = `Invalid credentials. (${4 - failCount} attempts remaining)`;
        errEl.classList.remove('hidden');
        errEl.classList.add('animate-shake');
        setTimeout(() => errEl.classList.remove('animate-shake'), 600);
      }
    }
  }
};

// Render Dashboard Tables & Telemetry
window.renderVaultDashboard = function () {
  let inquiries = [];
  let waitlist = [];

  try {
    inquiries = JSON.parse(localStorage.getItem('tagx_inquiries') || '[]');
    waitlist = JSON.parse(localStorage.getItem('tagx_product_waitlist') || '[]');
  } catch (_) {}

  // Update Counters
  const inqCountEl = document.getElementById('metric-inquiries-count');
  const waitCountEl = document.getElementById('metric-waitlist-count');
  if (inqCountEl) inqCountEl.textContent = inquiries.length;
  if (waitCountEl) waitCountEl.textContent = waitlist.length;

  // Render Inquiries Table
  const inqBody = document.getElementById('inquiries-table-body');
  if (inqBody) {
    if (inquiries.length === 0) {
      inqBody.innerHTML = `
        <tr>
          <td colspan="6" class="p-8 text-center text-slate-400 font-mono text-xs">
            <i data-lucide="inbox" class="w-6 h-6 text-slate-500 mx-auto mb-2"></i>
            No client inquiries yet. Test submitting the brief form on the website or click "Load Sample Data".
          </td>
        </tr>
      `;
    } else {
      inqBody.innerHTML = inquiries.map((item, idx) => `
        <tr class="hover:bg-white/[0.03] transition-colors">
          <td class="p-3.5 text-slate-400 text-[11px]">${item.date || 'N/A'}</td>
          <td class="p-3.5 font-bold text-white">${escapeHtml(item.name || 'Anonymous')}</td>
          <td class="p-3.5 text-tagx-teal">
            <a href="mailto:${escapeHtml(item.email)}" class="hover:underline flex items-center gap-1.5">
              <span>${escapeHtml(item.email)}</span>
            </a>
          </td>
          <td class="p-3.5">
            <span class="px-2 py-0.5 rounded-full bg-tagx-rose/15 text-tagx-rose border border-tagx-rose/30 text-[10px] font-bold inline-block">
              ${escapeHtml(item.projectType || 'Software')}
            </span>
            ${item.timeline ? `<span class="block mt-1 text-[10px] text-tagx-gold font-mono">⏱️ ${escapeHtml(item.timeline)}</span>` : ''}
          </td>
          <td class="p-3.5 text-slate-300 text-[11px] max-w-xs truncate" title="${escapeHtml(item.message)}">
            ${escapeHtml(item.message || 'No description provided.')}
          </td>
          <td class="p-3.5 text-right">
            <button onclick="deleteInquiry(${idx})" class="p-1.5 rounded-lg bg-white/5 hover:bg-tagx-rose/20 text-slate-400 hover:text-tagx-rose transition-colors" title="Delete record">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Render VIP Waitlist Table
  const waitBody = document.getElementById('waitlist-table-body');
  if (waitBody) {
    if (waitlist.length === 0) {
      waitBody.innerHTML = `
        <tr>
          <td colspan="5" class="p-8 text-center text-slate-400 font-mono text-xs">
            <i data-lucide="users" class="w-6 h-6 text-slate-500 mx-auto mb-2"></i>
            No product VIP waitlist subscriptions yet.
          </td>
        </tr>
      `;
    } else {
      waitBody.innerHTML = waitlist.map((item, idx) => {
        const email = typeof item === 'string' ? item : item.email;
        const date = (typeof item === 'object' && item.date) ? item.date : 'Recent';
        return `
          <tr class="hover:bg-white/[0.03] transition-colors">
            <td class="p-3.5 text-slate-400 font-bold text-[11px]">${idx + 1}</td>
            <td class="p-3.5 font-bold text-white">
              <a href="mailto:${escapeHtml(email)}" class="hover:text-tagx-teal transition-colors flex items-center gap-1.5">
                <i data-lucide="mail" class="w-3.5 h-3.5 text-tagx-gold"></i>
                <span>${escapeHtml(email)}</span>
              </a>
            </td>
            <td class="p-3.5 text-slate-400 text-[11px]">${date}</td>
            <td class="p-3.5">
              <span class="px-2 py-0.5 rounded-full bg-tagx-teal/15 text-tagx-teal border border-tagx-teal/30 text-[10px] font-bold">
                VIP Early Access 🚀
              </span>
            </td>
            <td class="p-3.5 text-right">
              <button onclick="deleteWaitlist(${idx})" class="p-1.5 rounded-lg bg-white/5 hover:bg-tagx-rose/20 text-slate-400 hover:text-tagx-rose transition-colors" title="Delete record">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  if (window.lucide) window.lucide.createIcons();
};

// Official Google Cloud Sheet Integration for Secret Vault
const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1AxFVMilf42lJ0nJUiV9EATb1ldwST0R2LdLFGG4UBpE/edit?usp=sharing';
const GOOGLE_SHEET_ID = '1AxFVMilf42lJ0nJUiV9EATb1ldwST0R2LdLFGG4UBpE';

// Tab Switching inside Vault
window.switchVaultTab = function (tabName) {
  const inqTab = document.getElementById('vault-tab-inquiries');
  const waitTab = document.getElementById('vault-tab-waitlist');
  const gsheetTab = document.getElementById('vault-tab-gsheet');
  const inqBtn = document.getElementById('tab-btn-inquiries');
  const waitBtn = document.getElementById('tab-btn-waitlist');
  const gsheetBtn = document.getElementById('tab-btn-gsheet');

  // Hide all tabs
  if (inqTab) inqTab.classList.add('hidden');
  if (waitTab) waitTab.classList.add('hidden');
  if (gsheetTab) gsheetTab.classList.add('hidden');

  // Default button style
  const defaultClass = 'px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 transition-all flex items-center gap-2';
  if (inqBtn) inqBtn.className = defaultClass;
  if (waitBtn) waitBtn.className = defaultClass;
  if (gsheetBtn) gsheetBtn.className = defaultClass;

  if (tabName === 'inquiries') {
    if (inqTab) inqTab.classList.remove('hidden');
    if (inqBtn) {
      inqBtn.className = 'px-4 py-2 rounded-xl text-xs font-mono font-bold bg-tagx-teal/20 text-tagx-teal border border-tagx-teal/40 transition-all flex items-center gap-2';
    }
  } else if (tabName === 'waitlist') {
    if (waitTab) waitTab.classList.remove('hidden');
    if (waitBtn) {
      waitBtn.className = 'px-4 py-2 rounded-xl text-xs font-mono font-bold bg-tagx-rose/20 text-tagx-rose border border-tagx-rose/40 transition-all flex items-center gap-2';
    }
  } else if (tabName === 'gsheet') {
    if (gsheetTab) gsheetTab.classList.remove('hidden');
    if (gsheetBtn) {
      gsheetBtn.className = 'px-4 py-2 rounded-xl text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 transition-all flex items-center gap-2';
    }
  }

  if (window.lucide) window.lucide.createIcons();
};

// 1-Click Copy All Vault Data Formatted for Google Sheet (TSV Format)
window.copyDataForGoogleSheet = function () {
  let inquiries = [];
  let waitlist = [];

  try {
    inquiries = JSON.parse(localStorage.getItem('tagx_inquiries') || '[]');
    waitlist = JSON.parse(localStorage.getItem('tagx_product_waitlist') || '[]');
  } catch (_) {}

  if (inquiries.length === 0 && waitlist.length === 0) {
    window.showToast('⚠️ No records to copy yet! Submit a form or click "Load Sample" first.', 'error');
    return;
  }

  const rows = [];
  // TSV Header row for direct Google Sheet Cell A1 pasting
  rows.push(['Timestamp', 'Record Type', 'Client / Partner Name', 'Work Email', 'Service / Tier', 'Timeline / Urgency', 'Project Scope / Message', 'Status'].join('\t'));

  // Inquiries rows
  inquiries.forEach((item, idx) => {
    rows.push([
      item.date || new Date().toLocaleString(),
      'Client Inquiry',
      item.name || 'Anonymous',
      item.email || '',
      item.projectType || 'Software Engineering',
      item.timeline || 'Flexible Timeline',
      (item.message || '').replace(/[\r\n\t]+/g, ' '),
      'New'
    ].join('\t'));
  });

  // Waitlist rows
  waitlist.forEach((item, idx) => {
    const email = typeof item === 'string' ? item : item.email;
    const date = (typeof item === 'object' && item.date) ? item.date : new Date().toLocaleString();
    const tier = (typeof item === 'object' && item.tier) ? item.tier : 'VIP Early Access';
    rows.push([
      date,
      'Product VIP Waitlist',
      'Early Adopter',
      email,
      tier,
      'Immediate Launch',
      'Launching Soon VIP Access',
      'Pending Launch'
    ].join('\t'));
  });

  const tsvText = rows.join('\n');
  const count = inquiries.length + waitlist.length;

  function doFallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      window.showToast(`✔ Copied ${count} rows! Open Google Sheet and press Ctrl+V in Cell A1.`, 'success');
    } catch (_) {
      window.showToast('Could not copy automatically. Please open the Google Sheet directly.', 'error');
    }
    document.body.removeChild(ta);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(tsvText).then(() => {
      window.showToast(`✔ Copied ${count} rows! Open Google Sheet and press Ctrl+V in Cell A1.`, 'success');
    }).catch(() => {
      doFallbackCopy(tsvText);
    });
  } else {
    doFallbackCopy(tsvText);
  }
};

// Copy Sheet 1 Headers for Client Inquiries
window.copySheet1Headers = function () {
  const headers = ['Timestamp', 'Inquiry ID', 'Client / Company Name', 'Work Email', 'Service Requested', 'Timeline / Urgency', 'Project Brief / Scope', 'Estimated Budget', 'Inquiry Status', 'Founder Notes'].join('\t');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(headers).then(() => {
      window.showToast('✔ Sheet 1 (Client Inquiries) headers copied! Paste into Cell A1 of Sheet 1.', 'success');
    });
  }
};

// Copy Sheet 2 Headers for Product VIP Waitlist
window.copySheet2Headers = function () {
  const headers = ['#', 'Registration Timestamp', 'Developer / User Email', 'Access Tier', 'Invitation Status', 'Platform / Source', 'Notes / Feedback'].join('\t');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(headers).then(() => {
      window.showToast('✔ Sheet 2 (VIP Waitlist) headers copied! Paste into Cell A1 of Sheet 2.', 'success');
    });
  }
};

// Save Google Apps Script Webhook URL into localStorage
window.saveGSheetWebhook = function () {
  const input = document.getElementById('gsheet-webhook-input');
  if (!input) return;
  const val = input.value.trim();
  if (!val) {
    localStorage.removeItem('tagx_gsheet_webhook');
    window.showToast('Webhook cleared.', 'info');
    return;
  }
  if (!val.startsWith('https://script.google.com/')) {
    window.showToast('⚠️ Please enter a valid Google Apps Script Web App URL.', 'error');
    return;
  }
  localStorage.setItem('tagx_gsheet_webhook', val);
  window.showToast('🎉 Google Sheets Auto-Sync Webhook saved! All future website submissions will auto-append to your sheet.', 'success');
};

// Excel / CSV Export Generators
window.exportInquiriesToCSV = function () {
  const inquiries = JSON.parse(localStorage.getItem('tagx_inquiries') || '[]');
  if (inquiries.length === 0) {
    window.showToast('No inquiries to export! Add or seed data first.', 'error');
    return;
  }

  let csvContent = 'ID,Timestamp,Client Name,Work Email,Services Requested,Timeline / Urgency,Project Overview\n';
  inquiries.forEach(item => {
    const row = [
      escapeCSV(item.id || 'TX-0000'),
      escapeCSV(item.date || ''),
      escapeCSV(item.name || ''),
      escapeCSV(item.email || ''),
      escapeCSV(item.projectType || ''),
      escapeCSV(item.timeline || ''),
      escapeCSV(item.message || '')
    ].join(',');
    csvContent += row + '\n';
  });

  downloadBlobFile(csvContent, `TAGX_Client_Inquiries_${formatDateFile(new Date())}.csv`, 'text/csv;charset=utf-8;');
  window.showToast('📥 Exported Client Inquiries to Excel (.csv) successfully!', 'success');
};

window.exportWaitlistToCSV = function () {
  const waitlist = JSON.parse(localStorage.getItem('tagx_product_waitlist') || '[]');
  if (waitlist.length === 0) {
    window.showToast('No VIP waitlist leads to export!', 'error');
    return;
  }

  let csvContent = 'No.,Developer Email,Registration Timestamp,Access Tier\n';
  waitlist.forEach((item, idx) => {
    const email = typeof item === 'string' ? item : item.email;
    const date = typeof item === 'object' && item.date ? item.date : 'N/A';
    const tier = typeof item === 'object' && item.tier ? item.tier : 'VIP Early Access';
    const row = [idx + 1, escapeCSV(email), escapeCSV(date), escapeCSV(tier)].join(',');
    csvContent += row + '\n';
  });

  downloadBlobFile(csvContent, `TAGX_VIP_Early_Access_${formatDateFile(new Date())}.csv`, 'text/csv;charset=utf-8;');
  window.showToast('📥 Exported Product VIP Waitlist to Excel (.csv)!', 'success');
};

// Helper Helpers for Data & CSV
function escapeCSV(str) {
  if (typeof str !== 'string') return `"${str}"`;
  return `"${str.replace(/"/g, '""')}"`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDateFile(d) {
  return d.toISOString().split('T')[0];
}

function downloadBlobFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Data Record Actions
window.deleteInquiry = function (idx) {
  const inquiries = JSON.parse(localStorage.getItem('tagx_inquiries') || '[]');
  inquiries.splice(idx, 1);
  localStorage.setItem('tagx_inquiries', JSON.stringify(inquiries));
  window.renderVaultDashboard();
  window.showToast('Inquiry removed.', 'info');
};

window.deleteWaitlist = function (idx) {
  const waitlist = JSON.parse(localStorage.getItem('tagx_product_waitlist') || '[]');
  waitlist.splice(idx, 1);
  localStorage.setItem('tagx_product_waitlist', JSON.stringify(waitlist));
  window.renderVaultDashboard();
  window.showToast('Waitlist entry removed.', 'info');
};

window.clearVaultData = function () {
  if (confirm('Are you sure you want to clear all inquiries and waitlists from local storage?')) {
    localStorage.removeItem('tagx_inquiries');
    localStorage.removeItem('tagx_product_waitlist');
    window.renderVaultDashboard();
    window.showToast('Vault data cleared.', 'info');
  }
};

window.seedSampleVaultData = function () {
  const sampleInquiries = [
    {
      id: 'TX-7801',
      name: 'Sarah Chen (Aero Dynamics)',
      email: 'sarah.chen@aerodynamics.io',
      projectType: 'Websites & 3D Web Apps',
      timeline: 'Urgent (< 2 Weeks)',
      message: 'Need a high-performance 3D WebGL interactive landing experience for our aerospace SaaS launch.',
      date: new Date(Date.now() - 3600000 * 4).toLocaleString()
    },
    {
      id: 'TX-8924',
      name: 'Marcus Vance (Quantum CLI)',
      email: 'marcus@quantumcore.dev',
      projectType: 'Desktop & Laptop Softwares',
      timeline: '1 - 2 Months',
      message: 'Looking for a native offline Windows & Mac desktop developer tool with SQLite and zero telemetry.',
      date: new Date(Date.now() - 3600000 * 24).toLocaleString()
    },
    {
      id: 'TX-9102',
      name: 'Devin Thorne (FinPulse)',
      email: 'devin@finpulse.app',
      projectType: 'Mobile Apps (iOS & Android), Custom Systems & AI',
      timeline: 'Flexible Timeline',
      message: 'Need a 120 FPS Flutter mobile app for iOS and Android with biometric auth and real-time websockets.',
      date: new Date(Date.now() - 3600000 * 48).toLocaleString()
    }
  ];

  const sampleWaitlist = [
    { email: 'alex.rivera@synthcode.io', date: new Date(Date.now() - 3600000 * 6).toLocaleString(), tier: 'VIP Early Access' },
    { email: 'elena.rostova@vectorbyte.ai', date: new Date(Date.now() - 3600000 * 18).toLocaleString(), tier: 'VIP Early Access' },
    { email: 'karthik.ram@devopsprime.net', date: new Date(Date.now() - 3600000 * 30).toLocaleString(), tier: 'VIP Early Access' },
    { email: 'lucas.muller@cloudscale.ch', date: new Date(Date.now() - 3600000 * 50).toLocaleString(), tier: 'VIP Early Access' },
    { email: 'maya.patel@vertexui.dev', date: new Date(Date.now() - 3600000 * 72).toLocaleString(), tier: 'VIP Early Access' }
  ];

  localStorage.setItem('tagx_inquiries', JSON.stringify(sampleInquiries));
  localStorage.setItem('tagx_product_waitlist', JSON.stringify(sampleWaitlist));
  window.renderVaultDashboard();
  window.showToast('🚀 Sample client inquiries and VIP waitlists loaded into vault!', 'success');
};

// =========================================================================
// 4. INTERACTIVE EVENT BINDINGS & SECRET 6-CLICK TRIGGER
// =========================================================================
document.addEventListener('DOMContentLoaded', () => {
  // A. SECRET 6-CLICK TRIGGER ON FOOTER "TAGX Labs™"
  const secretTrigger = document.getElementById('secret-vault-trigger');
  let clickCount = 0;
  let clickTimer = null;

  if (secretTrigger) {
    secretTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      clickCount++;

      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => {
        clickCount = 0;
      }, 3000); // 3-second window to complete 6 clicks

      if (clickCount >= 6) {
        clickCount = 0;
        clearTimeout(clickTimer);
        window.openSecretVault();
        window.showToast('🔒 Decrypting Secret Founder Vault...', 'info');
      }
    });
  }

  // B. Command Palette ⌘K Modal Handling
  const cmdModal = document.getElementById('cmd-modal');
  const cmdBtn = document.getElementById('cmd-palette-btn');
  const cmdInput = document.getElementById('cmd-search-input');
  const cmdResults = document.getElementById('cmd-results');

  function openCmdModal() {
    if (cmdModal) {
      cmdModal.classList.remove('hidden');
      if (cmdInput) {
        cmdInput.value = '';
        cmdInput.focus();
      }
    }
  }

  window.closeCmdModal = function () {
    if (cmdModal) cmdModal.classList.add('hidden');
  };

  if (cmdBtn) {
    cmdBtn.addEventListener('click', openCmdModal);
  }

  // Keyboard shortcut: Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal && cmdModal.classList.contains('hidden')) {
        openCmdModal();
      } else {
        closeCmdModal();
      }
    }
    // Secret shortcut: Ctrl+Shift+V for Vault
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'v') {
      e.preventDefault();
      window.openSecretVault();
    }
    if (e.key === 'Escape') {
      closeCmdModal();
      window.closeSecretVault();
    }
  });

  // Filter Command Palette items
  if (cmdInput && cmdResults) {
    cmdInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const items = cmdResults.querySelectorAll('a');
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        if (text.includes(query)) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  // Close modals when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === cmdModal) closeCmdModal();
    const vaultModal = document.getElementById('secret-vault-modal');
    if (e.target === vaultModal) window.closeSecretVault();
  });

  // 6. Interactive Terminal Diagnostic Simulator
  const runDemoBtn = document.getElementById('terminal-run-demo');
  if (runDemoBtn) {
    runDemoBtn.addEventListener('click', () => {
      runDemoBtn.disabled = true;
      runDemoBtn.innerHTML = `<i data-lucide="loader-2" class="w-3 h-3 animate-spin text-tagx-teal"></i> Running...`;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        runDemoBtn.disabled = false;
        runDemoBtn.innerHTML = `<i data-lucide="check" class="w-3 h-3 text-tagx-teal"></i> Diagnostic 100% OK`;
        if (window.lucide) window.lucide.createIcons();
        window.showToast('TAGX Core Telemetry: All systems operational!', 'success');
      }, 1200);
    });
  }
});
