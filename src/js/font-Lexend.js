    // Font Lexend: toggle con interlinea solo nella modale
    document.addEventListener('DOMContentLoaded', function () {
        const toggleFontButton = document.getElementById('toggleFontButton');
        const body = document.body;
        const modalContent = document.getElementById('modalContent');
      
        if (toggleFontButton) {
          let isLexend = false;
      
          toggleFontButton.addEventListener('click', () => {
            if (isLexend) {
              body.classList.remove('font-lexend');
              if (modalContent) modalContent.classList.remove('leading-relaxed');
              toggleFontButton.textContent = 'Attiva font Lexend';
            } else {
              body.classList.add('font-lexend');
              if (modalContent) modalContent.classList.add('leading-relaxed');
              toggleFontButton.textContent = 'Disattiva font Lexend';
            }
            isLexend = !isLexend;
          });
        } else {
          console.error('Elemento non trovato: toggleFontButton');
        }
      });