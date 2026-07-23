// Année dynamique dans le footer
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("open"))
  );
}

// Révélation au scroll, en cascade (stagger)
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced) {
  const revealEls = [];

  // Éléments révélés un par un
  document
    .querySelectorAll(".section-head, .intro-block p, .project-featured, .testimonial")
    .forEach((el) => {
      el.classList.add("reveal");
      revealEls.push(el);
    });

  // Groupes révélés en cascade (chaque enfant décalé dans le temps)
  document
    .querySelectorAll(".hero, .logos-row, .friction, .solutions, .pricing, .steps, .faq, .contact-inner")
    .forEach((group) => {
      Array.from(group.children).forEach((child, i) => {
        child.classList.add("reveal");
        child.dataset.delay = String(i * 90);
        revealEls.push(child);
      });
    });

  let ticking = false;
  function revealCheck() {
    ticking = false;
    const trigger = window.innerHeight * 0.88;
    for (let i = revealEls.length - 1; i >= 0; i--) {
      const el = revealEls[i];
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        // saut d'ancre : élément déjà dépassé → pas de délai
        el.style.transitionDelay = (top < 0 ? 0 : Number(el.dataset.delay || 0)) + "ms";
        el.classList.add("in");
        revealEls.splice(i, 1);
      }
    }
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(revealCheck);
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  revealCheck(); // état initial (hero visible dès le chargement)
}

// Compteurs animés sur les statistiques du hero (+5, +2…)
function animateCount(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/^(\D*)(\d+)(.*)$/);
  if (!match) return;
  const [, prefix, numStr, suffix] = match;
  const target = parseInt(numStr, 10);
  const duration = 1100;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
    el.textContent = prefix + Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const statNumbers = document.querySelectorAll(".hero-stats strong");
if (statNumbers.length && !prefersReduced && "IntersectionObserver" in window) {
  const statObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        // On n'anime que les valeurs commençant par "+" (on évite "n8n")
        if (entry.isIntersecting && entry.target.textContent.trim().startsWith("+")) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 1 }
  );
  statNumbers.forEach((el) => statObserver.observe(el));
}

// Envoi du formulaire de contact (AJAX vers Formspree) — messages bilingues
const form = document.getElementById("contact-form");
if (form) {
  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector(".form-submit");
  const isEN = (document.documentElement.lang || "fr").toLowerCase().startsWith("en");

  const t = isEN
    ? {
        notWired: "⚠ The form isn't connected yet: replace VOTRE_ID with your Formspree ID in index.html.",
        sending: "Sending…",
        ok: "✓ Thanks! Your message has been sent, I'll get back to you within 24-48h.",
        err: "Something went wrong. Please try again or email me directly.",
      }
    : {
        notWired: "⚠ Le formulaire n'est pas encore relié : remplacez VOTRE_ID par votre identifiant Formspree dans index.html.",
        sending: "Envoi en cours…",
        ok: "✓ Merci ! Votre message a bien été envoyé, je reviens vers vous sous 24-48h.",
        err: "Une erreur est survenue. Réessayez ou écrivez-moi directement par email.",
      };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Garde-fou : rappel si l'ID Formspree n'a pas encore été renseigné
    if (form.action.includes("VOTRE_ID")) {
      status.textContent = t.notWired;
      status.className = "form-status err";
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = t.sending;
    status.textContent = "";
    status.className = "form-status";

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        form.reset();
        status.textContent = t.ok;
        status.className = "form-status ok";
      } else {
        throw new Error("send failed");
      }
    } catch (err) {
      status.textContent = t.err;
      status.className = "form-status err";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
