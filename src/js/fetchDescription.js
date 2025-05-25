export async function fetchDescription(key) {
    try {
      const res = await fetch(`https://openlibrary.org${key}.json`);
      if (!res.ok) throw new Error('Impossibile caricare la descrizione.');
      const data = await res.json();
      if (!data.description) return 'Descrizione non disponibile.';
      if (typeof data.description === 'string') return data.description;
      if (typeof data.description === 'object' && data.description.value) return data.description.value;
      return 'Descrizione non disponibile.';
    } catch {
      return 'Errore nel recupero della descrizione.';
    }
  }
  