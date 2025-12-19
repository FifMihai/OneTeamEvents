document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Obținem referințele la elementele HTML
    const campParola = document.getElementById('password'); 
    const butonToggle = document.getElementById('togglePassword');
    const iconitaOchi = document.getElementById('eyeIcon'); 

    // Verificare rapidă a elementelor esențiale
    if (!campParola || !butonToggle || !iconitaOchi) {
        console.error("Initialization Error: One or more required elements (password, togglePassword, eyeIcon) were not found.");
        return; 
    }

    // 2. Atașăm un ascultător de evenimente la butonul de comutare
    butonToggle.addEventListener('click', function (e) {
        
        const tipCurent = campParola.getAttribute('type');
        // Schimbă tipul input-ului între 'password' și 'text'
        const tipNou = tipCurent === 'password' ? 'text' : 'password';
        campParola.setAttribute('type', tipNou);

        // 3. Schimbăm sursa imaginii folosind folderul 'media/'
        if (tipNou === 'text') {
            // Parola este VIZIBILĂ -> arată iconița de ochi închis/tăiat
            // Calea: media/hidden.png
            iconitaOchi.src = 'media/hidden.png'; 
            iconitaOchi.alt = 'Hide password';
        } else {
            // Parola este ASCUNSĂ -> arată iconița de ochi deschis
            // Calea: media/eye.png
            iconitaOchi.src = 'media/eye.png';
            iconitaOchi.alt = 'Show password';
        }
    });
});