🚨 Emergency Panic Button Web App

A minimal, responsive, and offline-friendly panic alert system built using HTML, CSS, and JavaScript. This web app allows users to:

Add/edit/delete emergency contact numbers.

Automatically send their live location via SMS and WhatsApp to saved contacts.

Cancel alerts within 5 seconds using a password.



---

🔧 Features

✅ Add, edit, and delete emergency contact numbers

📍 Send GPS location using browser's geolocation API

📲 Alerts via WhatsApp (desktop & mobile) and SMS (mobile only)

⏱ 5-second countdown before alerts are triggered

🔐 Password-protected alert cancellation (default: 1234)

💾 Contacts stored in localStorage

📱 Fully responsive design



---

🧪 How It Works

1. Add contact numbers (with country code, e.g., +919876543210)


2. Hit the Panic button to start a 5-second countdown


3. If not cancelled, the app sends your location via SMS & WhatsApp to each contact


4. Cancel within 5 seconds by entering the correct password




---

📁 File Structure

emergency-panic-button/
├── index.html          # Main HTML file
├── styles.css          # App styling and layout
├── script.js           # Core logic and functionality
└── README.md           # You're here!


---

📦 How To Use

✅ Online (static hosting)

1. Upload the 3 files (index.html, styles.css, script.js) to Netlify, Vercel, or GitHub Pages.


2. Open the URL in any browser (mobile or desktop).



🖥 Offline (local use)

1. Download the project folder.


2. Open index.html directly in any modern browser (Chrome, Firefox, Edge, etc.)




---

🔐 Default Cancel Password

1234

You can change this in script.js under:

if (cancelPassword.value === "1234") { ... }


---

⚠ Important Notes

SMS functionality only works on mobile devices with an SMS app installed.

WhatsApp works on both desktop and mobile.

Geolocation must be enabled in the browser.

This project does not store contacts or location in a database — it uses localStorage only.



---

💡 Example Use Cases

Solo travelers wanting an emergency fallback.

Elderly users who need one-tap access to help.
