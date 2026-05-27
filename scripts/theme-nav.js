import AOS from 'aos';
import 'aos/dist/aos.css';

// Set initial theme immediately to avoid a flash of the wrong theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

AOS.init({
  duration: 800,
  once: true,
  offset: 100,
});

const updateThemeIcon = (theme) => {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  const svgContainer = themeToggle.querySelector('svg');
  if (!svgContainer) return;

  if (theme === 'light') {
    svgContainer.innerHTML = `
      <rect width="100" height="100" rx="22" fill="#131919"/>
      <g fill="#18F856">
        <path d="M 40,30 A 24,24 0 1,0 70,60 A 22,22 0 1,1 40,30 Z"/>
        <path d="M 60,28 Q 60,35 67,35 Q 60,35 60,42 Q 60,35 53,35 Q 60,35 60,28 Z"/>
        <path d="M 72,23 Q 72,28 77,28 Q 72,28 72,33 Q 72,28 67,28 Q 72,28 72,23 Z"/>
        <path d="M 70,41 Q 70,45 74,45 Q 70,45 70,49 Q 70,45 66,45 Q 70,45 70,41 Z"/>
      </g>`;
  } else {
    svgContainer.innerHTML = `
      <rect width="100" height="100" rx="20" fill="#778565"/>
      <circle cx="50" cy="50" r="16" fill="#18F856"/>
      <g stroke="#C64422" stroke-width="4" stroke-linecap="round">
        <line x1="50" y1="15" x2="50" y2="25"/>
        <line x1="50" y1="75" x2="50" y2="85"/>
        <line x1="15" y1="50" x2="25" y2="50"/>
        <line x1="75" y1="50" x2="85" y2="50"/>
        <line x1="25.25" y1="25.25" x2="32.32" y2="32.32"/>
        <line x1="67.68" y1="67.68" x2="74.75" y2="74.75"/>
        <line x1="25.25" y1="74.75" x2="32.32" y2="67.68"/>
        <line x1="67.68" y1="32.32" x2="74.75" y2="25.25"/>
      </g>`;
  }
};

const initThemeNav = () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  const hamburger = document.querySelector('.hamburger');
  const navUl = document.querySelector('nav ul');

  // Create and inject the mobile nav overlay
  let overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  const openNav = () => {
    navUl.classList.add('active');
    hamburger.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    navUl.classList.remove('active');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
      if (navUl.classList.contains('active')) {
        closeNav();
      } else {
        openNav();
      }
    });
  }

  // Close menu when overlay is clicked
  overlay.addEventListener('click', closeNav);

  // Close menu when a nav link is clicked
  if (navUl) {
    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeNav);
} else {
  initThemeNav();
}
