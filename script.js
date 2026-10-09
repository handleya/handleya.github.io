// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Popup window used to show a project image at full size
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox ? lightbox.querySelector("img") : null;

document.querySelectorAll(".project-image").forEach((slot) => {
  const img = slot.querySelector("img");
  if (!img) return;

  // Show the gray placeholder only when the image is missing or fails to load.
  const syncPlaceholder = () => {
    const loaded = img.complete && img.naturalWidth > 0;
    slot.classList.toggle("empty", !loaded);
  };
  img.addEventListener("load", syncPlaceholder);
  img.addEventListener("error", syncPlaceholder);
  syncPlaceholder();

  // Click (or Enter / Space) to open the full image in the popup.
  if (!lightbox || !lightboxImg) return;

  const openLightbox = () => {
    if (slot.classList.contains("empty")) return;
    lightboxImg.src = img.currentSrc || img.src;
    lightboxImg.alt = img.alt;
    lightbox.showModal();
  };

  slot.tabIndex = 0;
  slot.setAttribute("role", "button");
  slot.setAttribute("aria-label", "Enlarge image: " + img.alt);
  slot.addEventListener("click", openLightbox);
  slot.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openLightbox();
    }
  });
});

// Click anywhere on the popup (image, backdrop, or × button) to close it.
// Pressing Escape also closes it.
if (lightbox) {
  lightbox.addEventListener("click", () => lightbox.close());
}
