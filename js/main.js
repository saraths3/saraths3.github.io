/**
 * Main Application Entry Point
 * Orchestrates modular components for the Gruvbox Minimal Modern Portfolio.
 */

import { initTheme, toggleTheme } from './theme.js';
import { initNavigation } from './navigation.js';
import { initInteractions, copyEmailToClipboard } from './interactions.js';

// Expose on window for inline template onclicks if needed
window.toggleTheme = toggleTheme;
window.copyEmail = copyEmailToClipboard;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Theme (Gruvbox dark / light)
  initTheme();

  // 2. Initialize Navigation & Mobile Drawer
  initNavigation();

  // 3. Initialize Interactive Features (Toast, Mailto, Copy)
  initInteractions();

  // 4. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 5. Set Dynamic Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
