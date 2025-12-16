document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Obținem referințele la elemente
    const formularReset = document.querySelector('form'); 
    const campMesaj = document.getElementById('reset-message'); 
    const campEmail = document.getElementById('email');

    if (!formularReset || !campMesaj || !campEmail) {
        console.error("Eroare: Elementele formularului de resetare lipsesc din HTML.");
        return;
    }

    // 2. Oprim trimiterea standard și executăm logica noastră
    formularReset.addEventListener('submit', function(e) {
        e.preventDefault(); // Oprește reîncărcarea paginii
        campMesaj.textContent = ''; // Șterge mesajele vechi
        
        handlePasswordReset(); 
    });

    async function handlePasswordReset() {
        const email = campEmail.value;
        
        // **ATENȚIE: Modificați calea la endpoint-ul serverului Dvs. pentru resetare**
        const serverEndpoint = '/api/reset-password'; 

        try {
            // 3. Trimitere asincronă a email-ului la server (Fetch)
            const raspuns = await fetch(serverEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email })
            });

            // 4. Procesăm răspunsul de la server
            const dateRaspuns = await raspuns.json();

            // Logica crucială: Indiferent dacă contul există sau nu, 
            // este o bună practică de securitate să NU dezvăluiți starea contului.
            
            // Serverul ar trebui să răspundă cu succes chiar dacă emailul nu este găsit,
            // pentru a nu ajuta atacatorii să ghicească conturi valide.
            
            if (raspuns.ok || dateRaspuns.status === 'ok_maybe_sent') {
                
                // Cazul 1: Succes (sau răspuns neutru de succes)
                campMesaj.textContent = 'If an account with that email exists, a password reset link has been sent.';
                campMesaj.style.color = 'green';
                
            } else {
                
                // Cazul 2: Eroare (e.g., Eroare la trimiterea email-ului de pe server)
                campMesaj.textContent = dateRaspuns.message || 'An error occurred while processing your request. Please try again later.';
                campMesaj.style.color = 'red';
            }

        } catch (error) {
            // Cazul 3: Eroare de rețea
            campMesaj.textContent = 'Network error. Could not connect to the server.';
            campMesaj.style.color = 'red';
            console.error('Fetch Error:', error);
        }
    }
});