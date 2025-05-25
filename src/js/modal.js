import { modal, modalContent, closeModalBtn } from './domElements.js';

export function openModal(text) {
  if (!modal || !modalContent) return;
  modalContent.textContent = text;
  modal.classList.remove('opacity-0', 'pointer-events-none');
  modal.classList.add('opacity-100');
  document.body.classList.add('overflow-hidden');
}

export function closeModal() {
  if (!modal || !modalContent) return;
  modal.classList.add('opacity-0', 'pointer-events-none');
  modal.classList.remove('opacity-100');
  modalContent.textContent = '';
  document.body.classList.remove('overflow-hidden');
}

// ✅ Aggiungi controllo
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', closeModal);
}

// ✅ Anche qui controllo
if (modal) {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}
