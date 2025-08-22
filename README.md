# 🍝 Nuovo Rustichello - Sito Web Ufficiale

## 📖 Panoramica

**Nuovo Rustichello** è un elegante sito web moderno per il ristorante tradizionale italiano situato nel cuore di Brescia. Il sito presenta un design responsive, animazioni fluide e un'esperienza utente immersiva che riflette l'autentica tradizione culinaria lombarda.

## ✨ Caratteristiche Principali

### 🎨 Design & UX
- **Design Responsive** ottimizzato per mobile, tablet e desktop
- **Animazioni fluide** con CSS3 e JavaScript ES6+
- **Loading screen** animato con progress bar
- **Parallax scrolling** sulla hero section
- **Modal gallery** interattiva con navigazione keyboard
- **Smooth scrolling** tra le sezioni

### 🗺️ Integrazione Mappe Google
- **Google Maps embed** con iframe (nessuna API key richiesta)
- **Street View** integrato per anteprima location
- **Marker personalizzato** sempre visibile
- **Indicazioni stradali** automatiche
- **Design responsive** per dispositivi mobili

### 📱 Tecnologie Moderne
- **HTML5 semantico** con structured data
- **CSS3 avanzato** con custom properties e grid layout
- **JavaScript ES6+** con classi, arrow functions, async/await
- **Intersection Observer** per animazioni performance-friendly
- **Web Performance** ottimizzato (lazy loading, throttling, debouncing)

### 🎯 Funzionalità Interattive
- **Gallery filtrata** per categoria (piatti, atmosfera, specialità)
- **Menu dinamico** con filtri per portate
- **Form di prenotazione** con validazione real-time
- **Navigation responsive** con hamburger menu
- **Hero slider** automatico con più immagini

## 📁 Struttura del Progetto

```
Nuovo Rustichello/
├── index.html              # Pagina principale del sito
├── styles.css              # Fogli di stile CSS3 completi
├── app.js                  # JavaScript ES6+ modulare
├── README.md               # Documentazione del progetto
└── images/                 # Directory delle immagini
    ├── logo.jpg            # Logo del ristorante
    ├── esterno.jpg         # Foto esterno ristorante
    ├── interno.jpg         # Foto ambiente interno
    ├── piatti.jpg          # Selezione di piatti
    ├── pastasciutta.jpg    # Pasta fatta in casa
    ├── RISOTTO Cacio e Pepe.jpg
    └── 🟣 RISOTTO DELLA SETTIMANA 🟣[...].webp
```

## 🚀 Quick Start

### 1. **Visualizzazione Locale**
```bash
# Opzione 1: Con Live Server (VS Code)
# Installa l'estensione Live Server
# Click destro su index.html → "Open with Live Server"

# Opzione 2: Con Python
python -m http.server 8000
# Apri http://localhost:8000

# Opzione 3: Con Node.js
npx serve .
# Apri http://localhost:3000
```

### 2. **Personalizzazione Rapida**

#### Informazioni di Contatto
```html
<!-- Modifica in index.html nelle sezioni contact e location -->
<p>Via dei Sapori 25, Brescia</p>
<p>+39 030 25203</p>
<p>info@nuovorustichello.it</p>
```

#### Coordinate Google Maps
```javascript
// Modifica in app.js nelle funzioni map
const lat = 45.5416; // Latitudine Brescia
const lng = 10.2118; // Longitudine Brescia
```

#### Colori Brand
```css
/* Modifica in styles.css nelle CSS custom properties */
:root {
    --primary-color: #8B4513;   /* Saddle Brown */
    --secondary-color: #CD853F; /* Peru */
    --accent-color: #DAA520;    /* Goldenrod */
}
```

## 🎨 Sezioni del Sito

### 1. **Hero Section**
- Slideshow automatico con immagini del ristorante
- Titolo animato con reveal progressivo
- Call-to-action per menu e prenotazioni
- Parallax scrolling effect

### 2. **Gallery Interattiva**
```javascript
// Categorie disponibili
const categories = [
    'all',        // Tutte le immagini
    'piatti',     // Foto dei piatti
    'atmosfera',  // Ambiente del ristorante
    'specialita'  // Piatti speciali/risotti
];
```

### 3. **Menu Showcase**
```javascript
// Categorie menu
const menuCategories = [
    'antipasti',  // Antipasti tradizionali
    'primi',      // Primi piatti e pasta
    'risotti',    // Specialità risotti
    'secondi',    // Secondi piatti
    'dolci'       // Dolci della casa
];
```

### 4. **La Nostra Storia**
- Layout split con immagine e contenuto
- Highlights con icone animate
- Background decorativo

### 5. **Experience Timeline**
- Timeline verticale del percorso culinario
- Animazioni progressive al scroll
- Icone rappresentative per ogni step

### 6. **Location & Maps**
```html
<!-- Google Maps Iframe (Brescia) -->
<iframe src="https://maps.google.com/maps?width=100%25&amp;height=400&amp;hl=it&amp;q=45.5416,10.2118+(Nuovo%20Rustichello%20Ristorante)&amp;t=&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>

<!-- Street View Iframe -->
<iframe src="https://www.google.com/maps/embed?pb=!4v1692000000000!6m8!1m7!1s2a0QMNmN46dGAaE3cWyqXQ!2m2!1d45.541553!2d10.211874!3f45!4f0!5f0.7820865974627469"></iframe>
```

### 7. **Contact & Reservation**
- Form di prenotazione con validazione
- Informazioni di contatto complete
- Background con overlay effect

## 🛠️ Personalizzazione Avanzata

### **Aggiungere Nuove Immagini alla Gallery**
```javascript
// Modifica in app.js nel metodo loadGalleryData()
this.galleryItems.push({
    id: 7,
    category: 'piatti',
    title: 'Nome del Piatto',
    description: 'Descrizione dettagliata',
    image: './images/nuovo-piatto.jpg'
});
```

### **Aggiungere Piatti al Menu**
```javascript
// Modifica in app.js nel metodo loadMenuData()
this.menuItems.push({
    id: 12,
    category: 'primi',
    title: 'Nome Piatto',
    description: 'Descrizione ingredienti e preparazione',
    price: '€XX',
    image: './images/piatto.jpg'
});
```

### **Modificare Orari di Apertura**
```html
<!-- Modifica in index.html nella sezione location -->
<div class="schedule-item">
    <span class="day">Martedì - Giovedì</span>
    <span class="hours">19:00 - 23:00</span>
</div>
```

### **Personalizzare l'Hero Slider**
```javascript
// Modifica gli URL delle immagini in index.html
<div class="hero-bg" style="background-image: url('./images/tua-immagine.jpg')"></div>
```

## 📱 Responsive Design

### **Breakpoints**
```css
/* Mobile First Approach */
/* Base: 320px+ */

/* Tablet */
@media (max-width: 768px) {
    /* Layout grid diventa single column */
    /* Navigation diventa hamburger menu */
    /* Form inputs stack verticalmente */
}

/* Desktop */
@media (min-width: 769px) {
    /* Layout completo con sidebar */
    /* Hover effects attivi */
    /* Gallery grid a più colonne */
}
```

### **Performance Mobile**
- **Lazy loading** per tutte le immagini
- **Touch-friendly** interactions (48px+ touch targets)
- **Compressed images** ottimizzate per web
- **Reduced motion** per utenti con preferenze accessibilità

## ⚡ Performance & SEO

### **Ottimizzazioni Performance**
```javascript
// Intersection Observer per lazy loading
const observer = new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Throttling e debouncing per scroll events
this.handleScroll = this.throttle(this.handleScroll.bind(this), 100);
```

### **SEO Ready**
```html
<!-- Meta tags ottimizzati -->
<meta name="description" content="Nuovo Rustichello - Ristorante tradizionale italiano nel cuore di Brescia">
<meta name="keywords" content="ristorante, Brescia, cucina italiana, risotto, pasta">

<!-- Open Graph per social media -->
<meta property="og:title" content="Nuovo Rustichello - Autentica Tradizione Italiana">
<meta property="og:image" content="./images/esterno.jpg">

<!-- Structured Data per Google -->
<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Nuovo Rustichello",
    // ... dati strutturati completi
}
</script>
```

## 🌐 Deployment

### **Hosting Statico (Consigliato)**
```bash
# Netlify
netlify deploy --prod --dir .

# Vercel
vercel --prod

# GitHub Pages
# Commit e push su repository GitHub
# Attiva Pages nelle repository settings
```

### **Server Locale per Sviluppo**
```bash
# PHP
php -S localhost:8000

# Ruby
ruby -run -e httpd . -p 8000

# Node.js con http-server
npm install -g http-server
http-server -p 8000
```

## 🔧 Troubleshooting

### **Mappe Non Caricate**
1. Verifica la connessione internet
2. Controlla che l'iframe non sia bloccato da ad-blocker
3. Testa le coordinate su Google Maps

### **Immagini Non Visualizzate**
1. Verifica i percorsi delle immagini in app.js
2. Controlla che i file esistano nella cartella images/
3. Verifica i permessi dei file

### **Animazioni Non Funzionanti**
1. Controlla la console browser per errori JavaScript
2. Verifica che Intersection Observer sia supportato
3. Testa su browser moderni (Chrome 80+, Firefox 75+)

## 📞 Supporto & Contatti

Per supporto tecnico o personalizzazioni:
- **Email**: info@nuovorustichello.it
- **Telefono**: +39 030 25203
- **Indirizzo**: Via dei Sapori 25, 25121 Brescia (BS)

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Libero per uso commerciale e personale.

## 🚀 Prossimi Sviluppi

- [ ] **PWA capabilities** con service worker
- [ ] **Online ordering** system integration
- [ ] **Multi-language** support (IT/EN)
- [ ] **WordPress** theme conversion
- [ ] **E-commerce** integration per prodotti tipici
- [ ] **Blog** sezione per ricette e news
- [ ] **Instagram** feed integration
- [ ] **Newsletter** subscription

---

**Progetto**: Nuovo Rustichello Website  
**Versione**: 1.0.0  
**Ultima modifica**: Agosto 2025  
**Sviluppato con**: ❤️ per la tradizione culinaria italiana
