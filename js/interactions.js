/**
 * User Interactions Module
 * Handles clipboard copy, toast notifications, and mailto form handler.
 */

let toastTimeout = null;

export function showToast(message, duration = 3000) {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, duration);
}

export function copyEmailToClipboard(email = 'contactme.saraths@gmail.com') {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email)
      .then(() => showToast(`Copied ${email} to clipboard!`))
      .catch(() => showToast(`Email: ${email}`));
  } else {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${email} to clipboard!`);
    } catch (err) {
      showToast(`Email: ${email}`);
    }
    document.body.removeChild(textarea);
  }
}

export function handleContactSubmit(event) {
  event.preventDefault();
  const nameEl = document.getElementById('contact-name');
  const subjectEl = document.getElementById('contact-subject');
  const messageEl = document.getElementById('contact-message');

  const name = nameEl ? nameEl.value.trim() : '';
  const subject = subjectEl ? subjectEl.value.trim() : 'Project Inquiry';
  const message = messageEl ? messageEl.value.trim() : '';

  const body = `Hi Sarath,\n\nName: ${name}\n\nMessage:\n${message}\n\n---\nSent from your portfolio website`;
  const mailtoLink = `mailto:contactme.saraths@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  showToast('Launching email client...');
  window.location.href = mailtoLink;
}

export function initInteractions() {
  // Bind email copy buttons
  const copyButtons = document.querySelectorAll('[data-action="copy-email"]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => copyEmailToClipboard());
  });

  // Bind contact form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleContactSubmit);
  }
}
