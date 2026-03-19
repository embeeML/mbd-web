const cardsContainer = document.querySelector(".cards");
const cards = Array.from(document.querySelectorAll(".cards .card"));
const overlay = document.querySelector(".cards .overlay");

if (cardsContainer && overlay && cards.length) {
  const applyOverlayMask = (e) => {
    const rect = cardsContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    overlay.style.setProperty("--opacity", "1");
    overlay.style.setProperty("--x", `${x}px`);
    overlay.style.setProperty("--y", `${y}px`);
  };

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const cardIndex = cards.indexOf(entry.target);
      if (cardIndex < 0) return;

      const box = entry.borderBoxSize?.[0];
      const width = box ? box.inlineSize : entry.target.offsetWidth;
      const height = box ? box.blockSize : entry.target.offsetHeight;

      const overlayCard = overlay.children[cardIndex];
      if (overlayCard) {
        overlayCard.style.width = `${width}px`;
        overlayCard.style.height = `${height}px`;
      }
    });
  });

  // Build overlay clones
  overlay.innerHTML = "";
  cards.forEach((cardEl) => {
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("card");
    overlay.append(overlayCard);
    observer.observe(cardEl);
  });

  cardsContainer.addEventListener("pointermove", applyOverlayMask);

  // Optional: fade out overlay when leaving
  cardsContainer.addEventListener("pointerleave", () => {
    overlay.style.setProperty("--opacity", "0");
  });
}
