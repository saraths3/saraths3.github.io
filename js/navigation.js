/**
 * Navigation & Menu Module
 * Handles mobile top drawer, bottom navigation bar, and active scroll spy.
 */

export function initNavigation() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  const navLinks = document.querySelectorAll('.nav-item');
  const bottomLinks = document.querySelectorAll('.mobile-bottom-link');
  const sections = document.querySelectorAll('section[id]');

  // Toggle mobile navigation drawer
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        if (iconOpen) iconOpen.classList.add('hidden');
        if (iconClose) iconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      }
    });
  }

  // Auto-close mobile top drawer upon link click
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
        if (iconOpen) iconOpen.classList.remove('hidden');
        if (iconClose) iconClose.classList.add('hidden');
      }
    });
  });

  // Scroll Spy for highlighting active section on both desktop & mobile bottom bar
  const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -65% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Desktop nav links highlight
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-gb-l-green', 'dark:text-gb-green', 'font-bold');
            link.classList.remove('text-gb-l-fg-muted', 'dark:text-gb-fg-muted');
          } else {
            link.classList.remove('text-gb-l-green', 'dark:text-gb-green', 'font-bold');
            link.classList.add('text-gb-l-fg-muted', 'dark:text-gb-fg-muted');
          }
        });

        // Mobile bottom bar links highlight
        bottomLinks.forEach(blink => {
          const targetSection = blink.getAttribute('data-section');
          if (targetSection === id) {
            blink.classList.add('text-gb-l-green', 'dark:text-gb-green', 'font-bold', 'bg-gb-l-surface', 'dark:bg-gb-surface');
            blink.classList.remove('text-gb-l-fg-muted', 'dark:text-gb-fg-muted');
          } else {
            blink.classList.remove('text-gb-l-green', 'dark:text-gb-green', 'font-bold', 'bg-gb-l-surface', 'dark:bg-gb-surface');
            blink.classList.add('text-gb-l-fg-muted', 'dark:text-gb-fg-muted');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}
