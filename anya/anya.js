// ANYA — interactions

// Scroll reveal
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
  );
  items.forEach((el) => io.observe(el));
})();

// Anya Core — capability selector
(function () {
  const capabilities = [
    {
      title: 'Brief du matin',
      strong: 'Commencez la journée avec un plan clair.',
      desc: "Agenda, rappels, veille et priorités sont réunis dans un brief unique. Vous savez quoi regarder, quoi décider et ce qui peut attendre.",
    },
    {
      title: 'Inbox',
      strong: 'Votre messagerie, triée et priorisée.',
      desc: "Anya lit, qualifie et hiérarchise vos emails, prépare les réponses dans votre ton et ne remonte que ce qui exige votre décision.",
    },
    {
      title: 'Agenda',
      strong: 'Le temps revient à la stratégie.',
      desc: "Rendez-vous, arbitrages et créneaux protégés sont orchestrés autour de vos priorités réelles, pas de la pression du moment.",
    },
    {
      title: 'Gestion du CRM',
      strong: 'Un pipeline toujours à jour, sans ressaisie.',
      desc: "Chaque échange enrichit la fiche client. Les statuts, les relances et le contexte commercial restent alignés en continu.",
    },
    {
      title: 'Réunions',
      strong: 'Préparées, synthétisées, actionnées.',
      desc: "Anya réunit le contexte avant, produit le compte rendu après et transforme les décisions en tâches suivies.",
    },
    {
      title: 'Documents',
      strong: 'Vos documents, retrouvés et exploités.',
      desc: "Contrats, factures, propositions et notes sont organisés, reliés et mobilisés au moment exact où ils comptent.",
    },
    {
      title: 'Veille & recherche',
      strong: 'Les signaux faibles avant l’urgence.',
      desc: "Anya surveille votre marché et vos concurrents, analyse dans le contexte de votre entreprise et prépare des recommandations.",
    },
    {
      title: 'Mémoire & contexte',
      strong: 'Une mémoire longue durée.',
      desc: "Chiffres, décisions, relations et raisons derrière chaque choix sont conservés et replacés dans leur contexte exact.",
    },
    {
      title: 'Anya Soul',
      strong: 'Votre ton, votre jugement, votre style.',
      desc: "Anya écrit et arbitre comme vous le feriez, fidèle à votre voix et à vos principes de décision.",
    },
    {
      title: 'Canal de pilotage',
      strong: 'Un seul point d’entrée pour tout piloter.',
      desc: "Depuis votre messagerie, vous validez, ajustez et déclenchez. Anya exécute dans vos outils et vous rend compte.",
    },
  ];

  const buttons = document.querySelectorAll('.core-item');
  const count = document.getElementById('core-count');
  const title = document.getElementById('core-title');
  const strong = document.getElementById('core-strong');
  const desc = document.getElementById('core-desc');

  function select(i) {
    const cap = capabilities[i];
    if (!cap) return;
    buttons.forEach((b, idx) => b.classList.toggle('active', idx === i));
    const n = String(i + 1).padStart(2, '0');
    count.textContent = n + ' / 10 · Capacité active';
    title.textContent = cap.title;
    strong.textContent = cap.strong;
    desc.textContent = cap.desc;
  }

  buttons.forEach((btn) => {
    const i = parseInt(btn.dataset.cap, 10);
    btn.addEventListener('click', () => select(i));
    btn.addEventListener('mouseenter', () => select(i));
  });
})();

// Header shadow on scroll
(function () {
  const hdr = document.querySelector('.hdr');
  const onScroll = () => {
    hdr.style.boxShadow = window.scrollY > 30 ? '0 12px 40px -20px rgba(0,0,0,0.9)' : 'none';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
