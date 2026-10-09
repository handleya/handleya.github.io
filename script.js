// Set to false before you publish, so visitors don't see the "Choose image" buttons.
const SHOW_UPLOAD_BUTTONS = true;

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

document.querySelectorAll(".project-image").forEach((slot) => {
  const img = slot.querySelector("img");
  const input = slot.querySelector('input[type="file"]');
  const pickerButton = slot.querySelector(".upload-btn");

  // Show the placeholder whenever the image is missing or fails to load.
  const syncPlaceholder = () => {
    const loaded = img.complete && img.naturalWidth > 0;
    slot.classList.toggle("empty", !loaded);
  };
  img.addEventListener("load", syncPlaceholder);
  img.addEventListener("error", syncPlaceholder);
  syncPlaceholder();

  if (!SHOW_UPLOAD_BUTTONS) {
    pickerButton.remove();
    return;
  }

  // Local preview only: nothing is uploaded anywhere, and it resets on refresh.
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    img.src = URL.createObjectURL(file);
  });
});
