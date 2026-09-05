const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

menuToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document
  .querySelectorAll(".reveal")
  .forEach((element) => revealObserver.observe(element));

document.querySelector("#year").textContent = new Date().getFullYear();

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const submitButton = form.querySelector("button");
  const formData = new FormData(form);
  submitButton.disabled = true;
  formStatus.textContent = "Sending...";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message);
    formStatus.textContent = result.message;
    form.reset();
  } catch (error) {
    formStatus.textContent =
      error.message || "Something went wrong. Please try again.";
  } finally {
    submitButton.disabled = false;
  }
});
