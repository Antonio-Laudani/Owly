 //Contatti:
 // Aggiunge la classe per attivare l'effetto fade-in quando la pagina è pronta
 window.addEventListener('DOMContentLoaded', () => {
    //console.log('DOM completamente caricato');
    requestAnimationFrame(() => {
      const form = document.getElementById('contactForm');
      if (form) {
        //console.log('Form trovato, animazione attivata');
        form.classList.remove('opacity-0', 'translate-y-8');
        form.classList.add('opacity-100', 'translate-y-0');
      } else {
        //console.warn('Form non trovato nella pagina attuale');
      }
    });
  });

  //About:
  // Animazione all'apertura
  
  const elements = document.querySelectorAll('.reveal');
  elements.forEach((el, i) => {
    const delay = i * 200; // 0ms, 200ms, 400ms...
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  }); 