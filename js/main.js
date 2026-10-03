/**
 * TAGX Labs™ — Main Application Bootstrapper
 * Crisp Studio Light Mode Engine, Mobile Nav, Toast Notifications, Active Nav Highlighting & Icon Mounting
 */

// Clean up any legacy theme localStorage entry to ensure pure light mode
try {
  localStorage.removeItem('tagx_theme');
} catch (_) {}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide SVG Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Mobile Navigation Toggle
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
