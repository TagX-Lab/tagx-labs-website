/**
 * TAGX Labs™ — Motion & Animation Engine
 * Lenis Momentum Smooth Scrolling, Cinematic Parallax & Interactive Spring Tilts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lenis Studio-Grade Momentum Smooth Scrolling Engine
  let lenis = null;

  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Apple exponential inertia curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
      infinite: false,
    });

    window.lenisInstance = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Smooth Anchor Navigation Routing via Lenis
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -20, duration: 1.3 });
          }
        }
      });
    });
  }

  // 2. Hero Content Scroll Parallax & Fade
  const heroContent = document.getElementById('hero-content');
  const heroSection = document.getElementById('hero');

  function updateHeroParallax(scrollY) {
    if (!heroContent || !heroSection) return;
    const heroHeight = heroSection.offsetHeight;

    if (scrollY <= heroHeight) {
      const progress = Math.min(scrollY / (heroHeight * 0.75), 1);
      const opacity = Math.max(1 - progress * 1.15, 0);
      const translateY = progress * -45;
      const scale = 1 - progress * 0.04;

      heroContent.style.opacity = opacity.toString();
      heroContent.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
    }
  }

  if (lenis) {
    lenis.on('scroll', (e) => {
      updateHeroParallax(e.scroll);
    });
  } else {
    window.addEventListener('scroll', () => {
      updateHeroParallax(window.scrollY);
    }, { passive: true });
  }

  // 3. Intersection Observer for Smooth Staggered Scroll Reveals
  const revealElements = document.querySelectorAll(
    'section:not(#hero), .glass-card, .service-card, .download-card, .bento-card'
  );

  // Auto-apply stagger classes to sibling cards inside grids
  document.querySelectorAll('.grid').forEach((grid) => {
    const children = grid.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].classList.contains('glass-card') || children[i].classList.contains('service-card')) {
        const staggerIndex = (i % 5) + 1;
        children[i].classList.add(`stagger-${staggerIndex}`);
      }
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal-on-scroll');
    revealObserver.observe(el);
  });

  // 4. Animated Number Counters
  const counterElements = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-counter'), 10);
          animateCounter(entry.target, target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterElements.forEach((el) => counterObserver.observe(el));

  function animateCounter(element, target) {
    let start = 0;
    const duration = 1800; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = `${target}+`;
        clearInterval(timer);
      } else {
        element.textContent = `${Math.floor(start)}+`;
      }
    }, stepTime);
  }

  // 5. 3D Tilt Card Physics on Hover
  const tiltCards = document.querySelectorAll('.service-card, .glass-card');

  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
});
