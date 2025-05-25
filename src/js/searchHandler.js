import { searchForm, searchInput, resultsContainer } from './domElements.js';
import { showError, clearError } from './errors.js';
import { displayResultsFromWorks, displayResultsFromSearch } from './renderCards.js';

if (searchForm && searchInput && resultsContainer) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const query = searchInput.value.trim();
  
      if (!query) {
        showError('Inserisci un termine di ricerca.');
        return;
      }
  
      clearError();
      resultsContainer.innerHTML = 'Caricamento...';
  
      try {
        const subjectQuery = query.toLowerCase().replace(/\s+/g, '_');
        const subjectRes = await fetch(`https://openlibrary.org/subjects/${encodeURIComponent(subjectQuery)}.json`);
  
        if (subjectRes.ok) {
          const subjectData = await subjectRes.json();
          if (subjectData.works?.length > 0) {
            displayResultsFromWorks(subjectData.works);
            return;
          }
        }
  
        const searchRes = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
        if (!searchRes.ok) throw new Error('Errore nel recupero dati.');
        const searchData = await searchRes.json();
  
        if (!searchData.docs || searchData.docs.length === 0) {
          showError('Nessun libro trovato per questa ricerca.');
          return;
        }
  
        displayResultsFromSearch(searchData.docs);
      } catch (error) {
        showError('Errore durante la ricerca. Riprova più tardi.');
        console.error(error);
      }
    });
  }
  