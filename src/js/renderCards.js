import { resultsContainer } from './domElements.js';
import { showError, clearError } from './errors.js';
import { fetchDescription } from './fetchDescription.js';
import { openModal } from './modal.js';
import genericCover from '../images/copertina-generica.png';

export function displayResultsFromWorks(works) {
  resultsContainer.innerHTML = '';
  if (works.length === 0) {
    showError('Nessun libro trovato per questa categoria.');
    return;
  }

  clearError();

  works.forEach((work, index) => {
    const title = work.title || 'Titolo sconosciuto';
    const authors = (work.authors || []).map(a => a.name).join(', ') || 'Autore sconosciuto';
    const coverUrl = work.cover_id
      ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
      : genericCover;  // USO CORRETTO della variabile

    const card = document.createElement('div');
    card.className = `
      border rounded-lg p-4 hover:cursor-pointer hover:shadow-xl transition shadow-sm bg-white 
      flex flex-col items-start opacity-0 translate-y-8 transition-all duration-1000 ease-in-out
    `;

    card.innerHTML = `
      <img src="${coverUrl}" alt="Copertina libro" class="mb-3 w-full h-48 object-contain rounded"
           onerror="this.onerror=null;this.src='${genericCover}';">
      <h3 class="font-semibold text-lg mb-2">${title}</h3>
      <p class="text-sm text-gray-600 mb-2">${authors}</p>
      <button class="openDescriptionBtn bg-amber-400 p-2 rounded-md text-black active:bg-amber-600 md:hover:bg-amber-600 hover:cursor-pointer text-center text-sm font-medium">
        Mostra descrizione
      </button>
    `;

    const btn = card.querySelector('.openDescriptionBtn');
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Caricamento...';

      const description = await fetchDescription(work.key);
      openModal(description);
      btn.disabled = false;
      btn.textContent = 'Mostra descrizione';
    });

    resultsContainer.appendChild(card);

    setTimeout(() => {
      card.classList.remove('opacity-0', 'translate-y-8');
      card.classList.add('opacity-100', 'translate-y-0');
    }, index * 100);
  });
}

export function displayResultsFromSearch(docs) {
  resultsContainer.innerHTML = '';
  if (docs.length === 0) {
    showError('Nessun libro trovato per questa ricerca.');
    return;
  }

  clearError();

  docs.forEach((doc, index) => {
    const title = doc.title || 'Titolo sconosciuto';
    const authors = (doc.author_name || []).join(', ') || 'Autore sconosciuto';
    const coverUrl = doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : genericCover;  // USO CORRETTO della variabile

    const card = document.createElement('div');
    card.className = `
      border rounded-lg p-4 hover:cursor-pointer hover:shadow-xl transition shadow-sm bg-white 
      flex flex-col items-start opacity-0 translate-y-8 transition-all duration-1000 ease-in-out
    `;

    card.innerHTML = `
      <img src="${coverUrl}" alt="Copertina libro" class="mb-3 w-full h-48 object-contain rounded"
           onerror="this.onerror=null;this.src='${genericCover}';">
      <h3 class="font-semibold text-lg mb-2">${title}</h3>
      <p class="text-sm text-gray-600 mb-2">${authors}</p>
      <button class="openDescriptionBtn bg-amber-400 p-2 rounded-md text-black hover:underline hover:cursor-pointer text-center text-sm font-medium">
        Mostra descrizione
      </button>
    `;

    const btn = card.querySelector('.openDescriptionBtn');
    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Caricamento...';

      let workKey = doc.key?.startsWith('/works/') ? doc.key : doc.work_key?.[0];
      if (!workKey) {
        openModal('Descrizione non disponibile.');
        btn.disabled = false;
        btn.textContent = 'Mostra descrizione';
        return;
      }

      const description = await fetchDescription(workKey);
      openModal(description);
      btn.disabled = false;
      btn.textContent = 'Mostra descrizione';
    });

    resultsContainer.appendChild(card);

    setTimeout(() => {
      card.classList.remove('opacity-0', 'translate-y-8');
      card.classList.add('opacity-100', 'translate-y-0');
    }, index * 100);
  });
}

