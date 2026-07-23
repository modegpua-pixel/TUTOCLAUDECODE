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

// Apparition douce des sections au scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".section, .hero").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
  observer.observe(el);
});

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
