  // Script menu navbar mobile
  const toggleBtn = document.getElementById("menuToggle");
  const menu = document.getElementById("menu");
  
  toggleBtn.addEventListener("click", () => {
    //console.log('click rilevato');
    menu.classList.toggle("hidden");
    //console.log('Menu hidden?', menu.classList.contains('hidden'));
  });
  
  // Chiudi menu al click su voce
  document.querySelectorAll('#menu a').forEach(item => {
    item.addEventListener('click', () => {
      document.getElementById('menu').classList.add('hidden');
    });
  });