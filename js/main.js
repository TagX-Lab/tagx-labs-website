/**
 * TAGX Labs™ — Main Application Bootstrapper
 * Theme Engine (Light / Dark), Mobile Nav, Toast Notifications, Active Nav Highlighting & Icon Mounting
 */

// 1. Theme Engine System (Default: Crisp Modern Light Mode)
(function initThemeEngine() {
  function getPreferredTheme() {
    try {
      const savedTheme = localStorage.getItem('tagx_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
    } catch (_) {}
    return 'light'; // Default to light mode as requested!
  }

  window.applyTheme = function (theme, notify = false) {
    const isDark = theme === 'dark';
    const root = document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }

    try {
      localStorage.setItem('tagx_theme', theme);
    } catch (_) {}

    // Update meta theme-color for mobile address bar styling
    const metaThemeColor = document.getElementById('meta-theme-color');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#090e0d' : '#f8fafc');
    }

    // Update Desktop button icon
    const indicatorIcon = document.getElementById('theme-icon-indicator');
    if (indicatorIcon) {
      indicatorIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
      indicatorIcon.className = `w-4 h-4 ${isDark ? 'text-tagx-gold' : 'text-tagx-teal'}`;
    }

    // Update Mobile menu icon and text
    const mobileIcon = document.getElementById('mobile-theme-icon');
    const mobileText = document.getElementById('mobile-theme-text');
    if (mobileIcon) {
      mobileIcon.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    }
    if (mobileText) {
      mobileText.textContent = isDark ? 'Dark Mode' : 'Light Mode';
    }

    // Re-render Lucide icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }

    // Dispatch global event for 3D scene & components to adapt
    window.dispatchEvent(new CustomEvent('tagx-theme-changed', { detail: { theme } }));

    if (notify && typeof window.showToast === 'function') {
      window.showToast(isDark ? 'Switched to Cyber Dark Mode 🌙' : 'Switched to Studio Light Mode ☀️', 'info');
    }
  };

  window.toggleTheme = function () {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    window.applyTheme(newTheme, true);
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  // 1. Apply Initial Theme State
  const initialTheme = localStorage.getItem('tagx_theme') === 'dark' ? 'dark' : 'light';
  window.applyTheme(initialTheme, false);

  // 2. Initialize Lucide SVG Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 3. Attach Theme Toggle Listeners
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      window.toggleTheme();
    });
  }

  const mobileThemeToggleBtn = document.getElementById('mobile-theme-toggle-btn');
  if (mobileThemeToggleBtn) {
    mobileThemeToggleBtn.addEventListener('click', () => {
      window.toggleTheme();
    });
  }

  // Optional keyboard shortcut: Alt + T or Ctrl + Shift + L
  window.addEventListener('keydown', (e) => {
    if ((e.altKey && e.key.toLowerCase() === 't') || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'l')) {
      e.preventDefault();
      window.toggleTheme();
    }
  });

  // 4. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex', 'animate-fade-in');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
      });
    });
  }

  // 5. Active Link State on Scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('bg-white/10', 'text-white', 'text-cyan-300');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('bg-white/10', 'text-white');
      }
    });
  });

  // 6. Toast Notification Engine (Fallback if interactive.js has not attached yet)
  if (!window.showToast) {
    window.showToast = function (message, type = 'info') {
      const container = document.getElementById('toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = 'toast-item';

      let iconHtml = '⚡';
      if (type === 'success') iconHtml = '✔';
      if (type === 'error') iconHtml = '✖';

      toast.innerHTML = `
        <span class="text-tagx-teal font-bold">${iconHtml}</span>
        <span>${message}</span>
      `;

      container.appendChild(toast);

      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
      }, 3800);
    };
  }
});
