document.addEventListener('DOMContentLoaded', function() {
    // 1. Obținem referințele la elemente
    const formularLogin = document.querySelector('form'); 
    const campEroare = document.getElementById('error-message'); 
    
    // Verificăm dacă elementele există
    if (!formularLogin || !campEroare) {
        console.error("Formularul sau câmpul de eroare lipsesc din HTML.");
        return;
    }

    // 2. Oprim trimiterea standard și executăm logica noastră
    formularLogin.addEventListener('submit', function(e) {
        e.preventDefault(); // Oprește reîncărcarea paginii
        campEroare.textContent = ''; // Șterge mesajele de eroare vechi
        
        handleLogin(); 
    });

    async function handleLogin() {
        // Obținem datele din câmpuri
        const email = document.getElementById('email_username').value;
        const password = document.getElementById('password').value;
        
        // **ATENȚIE: Modificați calea la endpoint-ul serverului Dvs.**
        const serverEndpoint = '/api/login'; 

        try {
            // 3. Trimitere asincronă a datelor la server (AJAX/Fetch)
            const raspuns = await fetch(serverEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password }) // Trimitem datele ca JSON
            });

            // 4. Procesăm răspunsul de la server
            const dateRaspuns = await raspuns.json();

            if (raspuns.ok) {
                // Cazul 1: Logare REUȘITĂ (Cod 200)
                // Modificați '/dashboard.html' cu pagina principală reală
                window.location.href = '/dashboard.html'; 
            } else {
                // Cazul 2: Logare EȘUATĂ (Serverul a returnat o eroare, ex: 401)
                // Afișăm mesajul de eroare primit de la server
                campEroare.textContent = dateRaspuns.message || 'Login failed. Invalid credentials.';
            }

        } catch (error) {
            // Cazul 3: Eroare de rețea sau server inaccesibil
            campEroare.textContent = 'Network error. Could not connect to the authentication server.';
            console.error('Fetch Error:', error);
        }
    }
});