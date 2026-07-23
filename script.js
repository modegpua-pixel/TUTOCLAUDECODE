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

// Envoi du formulaire de contact (AJAX vers Formspree)
const form = document.getElementById("contact-form");
if (form) {
  const status = form.querySelector(".form-status");
  const submitBtn = form.querySelector(".form-submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Garde-fou : rappel si l'ID Formspree n'a pas encore été renseigné
    if (form.action.includes("VOTRE_ID")) {
      status.textContent =
        "⚠ Le formulaire n'est pas encore relié : remplacez VOTRE_ID par votre identifiant Formspree dans index.html.";
      status.className = "form-status err";
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours…";
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
        status.textContent = "✓ Merci ! Votre message a bien été envoyé, je reviens vers vous sous 24-48h.";
        status.className = "form-status ok";
      } else {
        throw new Error("send failed");
      }
    } catch (err) {
      status.textContent = "Une erreur est survenue. Réessayez ou écrivez-moi directement par email.";
      status.className = "form-status err";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  });
}
