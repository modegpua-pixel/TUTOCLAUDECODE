# Portfolio — Rudy Montois

Portfolio en une page (MVP v1). Thème sombre + violet, orienté « offre » façon landing page freelance.

## Structure

- `index.html` — contenu de la page
- `style.css` — design (thème sombre / violet)
- `script.js` — menu mobile, année dynamique, animations au scroll

## Comment le voir

Ouvre simplement `index.html` dans ton navigateur (double-clic).

## Contenu

Le portfolio présente Rudy Montois — consultant en automatisation spécialisé service client (startups SaaS). Positionnement, offre (Audit & Conseil / Automatisation sur-mesure / Accompagnement continu), bio et compétences sont renseignés.

Reste à personnaliser quand tu le souhaites :

- **Projets** — les 3 exemples d'automatisations sont des cas types, à remplacer par tes vrais projets clients.
- **À propos** — tu peux ajouter ta ville si tu veux.
- **Contact** — l'email et le lien LinkedIn sont déjà renseignés.

## Activer le formulaire de contact (Formspree)

Le formulaire envoie les messages par email via **Formspree** (gratuit, sans serveur) :

1. Crée un compte sur [formspree.io](https://formspree.io) et connecte ton email (`modegpua@gmail.com`).
2. Crée un nouveau formulaire → Formspree te donne une URL du type `https://formspree.io/f/abcdwxyz`.
3. Dans `index.html`, remplace `VOTRE_ID` par ton identifiant (la partie après `/f/`) :
   `action="https://formspree.io/f/VOTRE_ID"` → `action="https://formspree.io/f/abcdwxyz"`.
4. Publie, envoie un test : le premier message te demandera de confirmer ton email, puis tout arrive dans ta boîte.

Tant que `VOTRE_ID` n'est pas remplacé, le formulaire affiche un rappel au lieu d'envoyer.

## Mettre en ligne (gratuit)

Le plus simple : **GitHub Pages** (Settings → Pages → branche `main` → dossier `/root`), ou glisser le dossier sur [Netlify](https://app.netlify.com/drop).
