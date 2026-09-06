/**
 * TraceGuardAI — script.js
 *
 * Responsibilities:
 *  1. Mobile navigation toggle (aria-expanded state + open/close behavior)
 *  2. Demo-action feedback for buttons with no real backend (Get Started, Sign In)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initDemoActions();
});

/* --------------------------------------------------------------------------
   Mobile Navigation
   -------------------------------------------------------------------------- */

function initMobileNav() {
  const toggle = document.querySelector('.nav__toggle');
  const panel = document.getElementById('primary-navigation');

  if (!toggle || !panel) return;

  const desktopQuery = window.matchMedia('(min-width: 1024px)');

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  const openMenu = () => {
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = ({ returnFocus = false } = {}) => {
    toggle.setAttribute('aria-expanded', 'false');
    if (returnFocus) {
      toggle.focus();
    }
  };

  const toggleMenu = () => {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  toggle.addEventListener('click', toggleMenu);

  // Close the menu after choosing a real link (mobile only; harmless on desktop).
  panel.querySelectorAll('a.nav__link').forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  // Close on Escape and return focus to the toggle button.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      closeMenu({ returnFocus: true });
    }
  });

  // Close when clicking outside the nav (mobile only; desktop ignores aria-expanded).
  document.addEventListener('click', (event) => {
    if (!isOpen()) return;
    const clickedInsideNav = event.target.closest('.nav');
    if (!clickedInsideNav) {
      closeMenu();
    }
  });

  // Keep state tidy when crossing the desktop breakpoint.
  desktopQuery.addEventListener('change', () => {
    closeMenu();
  });
}

/* --------------------------------------------------------------------------
   Demo Action Feedback (Get Started / Sign In)
   -------------------------------------------------------------------------- */

function initDemoActions() {
  const demoButtons = document.querySelectorAll('[data-demo-action]');
  if (demoButtons.length === 0) return;

  const messages = {
    'get-started': "This is a student/internship demo — there's no live backend to sign up with yet.",
    'sign-in': 'Sign in is not connected to a real account system in this demo build.',
  };

  demoButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const action = button.getAttribute('data-demo-action');
      const message = messages[action] || 'This action is not connected to a live backend in this demo.';
      showToast(message);
    });
  });
}

/* --------------------------------------------------------------------------
   Lightweight accessible toast (used by demo actions above)
   -------------------------------------------------------------------------- */

let toastEl = null;
let toastTimeoutId = null;

function getToastElement() {
  if (toastEl) return toastEl;

  toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastEl);

  return toastEl;
}

function showToast(message) {
  const el = getToastElement();

  el.textContent = message;
  el.classList.add('is-visible');

  if (toastTimeoutId) {
    clearTimeout(toastTimeoutId);
  }

  toastTimeoutId = setTimeout(() => {
    el.classList.remove('is-visible');
  }, 4000);
}