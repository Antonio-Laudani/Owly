import { errorMessage, resultsContainer } from './domElements.js';

export function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.remove('hidden');
  resultsContainer.innerHTML = '';
}

export function clearError() {
  errorMessage.textContent = '';
  errorMessage.classList.add('hidden');
}
