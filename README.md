# OneTeamEvents

**OneTeamEvents** este o aplicație web dedicată organizării, promovării și gestionării evenimentelor din mediul universitar, dar și a celor desfășurate în afara facultății. Platforma are ca scop îmbunătățirea comunicării între studenți și facilitarea participării la activități academice, sociale sau recreative.

 **Live Demo:** [[OneTeamEvents on Vercel]](https://oneteamevents.vercel.app/](https://one-team-events.vercel.app))

---

##  Despre Proiect

Această aplicație simplifică procesul de planificare, permițând utilizatorilor să creeze și să monitorizeze evenimente într-un mod centralizat și securizat.

### Caracteristici Principale:
* **Autentificare și Autorizare:** Gestionarea securizată a accesului.
* **Dashboard Dinamic:** Vizualizarea rapidă a activităților planificate.
* **Integrare Cloud:** Bază de date serverless pentru scalabilitate și viteză.
* **Design Responsiv:** Optimizat pentru orice dispozitiv (Desktop/Mobile).

---

##  Tehnologii Utilizate (Demo)

Proiectul este construit pe o stivă tehnologică modernă:

| Tehnologie | Scop / Utilizare |
| :--- | :--- |
| **Next.js 15** | Framework-ul principal (App Router). |
| **React 19** | Biblioteca pentru interfața de utilizator. |
| **TypeScript** | Limbajul principal (96.8% din proiect). |
| **Neon (Postgres)** | Bază de date SQL serverless pentru stocarea datelor. |
| **Gemini AI** | Utilizat pentru asistență în dezvoltarea codului și optimizarea logicii. |
| **Tailwind CSS** | Pentru stilizare rapidă și design modern. |
| **Vercel** | Platformă pentru deployment și hosting automat. |
| **HTML5** | Structura fundamentală a paginilor de Login și Register. |

---

### Prerequisites

Înainte de a începe, asigură-te că ai următoarele instalate și configurate:

* **Node.js (v18.17 sau mai nou)** — Esențial pentru rularea Next.js 15.
* **Manager de pachete** — Recomandăm **npm** (vine instalat cu Node.js) sau **pnpm**.
* **Cont Neon.tech** — Pentru a accesa și configura instanța de bază de date Postgres.
* **Google Gemini API Key** — Necesară pentru funcționalitățile de AI (o poți obține din [Google AI Studio](https://aistudio.google.com/)).

---

##  Configurare și Instalare

### 1. Clonarea repository-ului
```bash
git clone [https://github.com/FifMihai/OneTeamEvents.git](https://github.com/FifMihai/OneTeamEvents.git)
cd OneTeamEvents
```
### 2. Instalarea dependențelor
```bash
npm install
```
### 3. Configurarea variabilelor de mediu
```bash
# Link-ul de conexiune de la Neon.tech
DATABASE_URL=postgresql://utilizator:parola@ep-nume-proiect.eu-central-1.aws.neon.tech/neondb?sslmode=require

# Cheia ta API pentru Gemini
NEXT_PUBLIC_GEMINI_API_KEY=cheia_ta_secreta_aici
```
### 4. Rularea serverului de dezvoltare
```bash
npm run dev
```
Deschide http://localhost:3000 pentru a vedea aplicația.

---

##  Utilizare (Demo)

Aplicația **OneTeamEvents** este concepută pentru a fi intuitivă și ușor de navigat. Iată principalele fluxuri de utilizare:

### 1. Explorarea și Căutarea Evenimentelor
* **Dashboard:** La accesarea aplicației, vei vedea toate evenimentele disponibile în campus sub formă de carduri interactive.
* **Căutare:** Folosește bara de căutare din partea de sus pentru a găsi rapid un eveniment după nume sau cuvinte cheie.
* **Filtrare:** Poți filtra evenimentele folosind categoriile: **Toate**, **Favorite** sau **Participări**.

### 2. Detalii Eveniment și Înscriere
* **Vizualizare:** Dă click pe butonul **Detalii** al unui card pentru a deschide fereastra informativă.
* **Informații:** Aici poți vedea locația exactă (ex: *Sala EC105*), o scurtă descriere a activității și numărul de persoane care s-au înscris deja.
* **Participare:** Dacă dorești să mergi, apasă pe butonul albastru **Vreau să particip**. Lista de participanți se va actualiza instantaneu.

### 3. Gestionarea Evenimentelor
* **Adăugare:** Dacă ești organizator, folosește butonul **+ Adaugă Eveniment** din colțul din dreapta sus pentru a propune o nouă activitate.
* **Favorite:** Poți salva evenimentele care te interesează apăsând pe pictograma în formă de inimă de pe fiecare card.
* **Ștergere Completă:** În cazul în care un eveniment nu mai are loc, îl poți elimina definitiv din platformă folosind butonul de Ștergere, asigurând astfel o listă de activități mereu actualizată pentru ceilalți utilizatori.
* **Editare și Modificare:** Ai control deplin asupra evenimentelor create de tine. Dacă detaliile se schimbă (ora, locația sau descrierea), poți accesa opțiunea de Editare pentru a actualiza informațiile în timp real.


---

### Deployment :
**Aplicația este configurată pentru deployment automat pe Vercel. Orice push în ramura main va declanșa un build nou și actualizarea site-ului live.**
**Pentru a-l publica:**
* **Conectează contul de GitHub la Vercel.**
* **Selectează repository-ul OneTeamEvents.**
* **Adaugă aceleași variabile de mediu (DATABASE_URL, etc.) în setările proiectului din dashboard-ul Vercel.**
* **Apasă pe Deploy.**

---

### Echipa :
```bash
Caravai Artiom (Backend (API)
Ciobanu Raul (Frontend logic)
Fifiita Mihai-Ionut (Database & Ops, Frontend Design)
Popescu Iulian-Cristian (Frontend Design)

