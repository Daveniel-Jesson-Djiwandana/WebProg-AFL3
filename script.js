document.addEventListener("DOMContentLoaded", () => {
  const burgerButton = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burgerButton && mobileMenu) {
    burgerButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      burgerButton.classList.toggle("open");
    });
  }
});

const coverflowContainer = document.getElementById("coverflow");

if (coverflowContainer) {
  const allCards = Array.from(coverflowContainer.children);
  let activeCardIndex = Math.floor(allCards.length / 2);
  let isDragging = false;
  let dragStartX = 0;

  function updateCoverflow() {
    const containerWidth = coverflowContainer.clientWidth;
    const rotationAngle = 45;
    const spaceBetweenCards = Math.min(containerWidth * 0.38, 200);

    allCards.forEach((card, cardIndex) => {
      const distanceFromCenter = cardIndex - activeCardIndex;
      const stackOrder = 10 - Math.abs(distanceFromCenter);
      const cardScale = distanceFromCenter === 0 ? 1 : 0.75;
      const shadowSize = distanceFromCenter === 0 ? 40 : 20;
      const shadowDarkness = distanceFromCenter === 0 ? 0.9 : 0.5;

      card.style.zIndex = stackOrder;
      card.style.pointerEvents = distanceFromCenter === 0 ? "auto" : "none";
      card.style.filter = `drop-shadow(0px 20px ${shadowSize}px rgba(0,0,0,${shadowDarkness}))`;
      card.style.transform = `
        translateX(calc(-50% + ${distanceFromCenter * spaceBetweenCards}px))
        translateY(-50%)
        translateZ(${-Math.abs(distanceFromCenter) * 80}px)
        scale(${cardScale})
        rotateY(${distanceFromCenter * -rotationAngle}deg)
      `;
    });
  }

  updateCoverflow();

  window.addEventListener("resize", updateCoverflow);

  window.addEventListener("mousedown", (event) => {
    isDragging = true;
    dragStartX = event.clientX;
  });

  window.addEventListener("mousemove", (event) => {
    if (!isDragging) return;

    const dragDistance = event.clientX - dragStartX;

    if (dragDistance > 30 && activeCardIndex > 0) {
      activeCardIndex--;
      dragStartX = event.clientX;
      updateCoverflow();
    } else if (dragDistance < -30 && activeCardIndex < allCards.length - 1) {
      activeCardIndex++;
      dragStartX = event.clientX;
      updateCoverflow();
    }
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  window.addEventListener(
    "touchstart",
    (event) => {
      isDragging = true;
      dragStartX = event.touches[0].clientX;
    },
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      if (!isDragging) return;

      const dragDistance = event.touches[0].clientX - dragStartX;

      if (dragDistance > 30 && activeCardIndex > 0) {
        activeCardIndex--;
        dragStartX = event.touches[0].clientX;
        updateCoverflow();
      } else if (dragDistance < -30 && activeCardIndex < allCards.length - 1) {
        activeCardIndex++;
        dragStartX = event.touches[0].clientX;
        updateCoverflow();
      }
    },
    { passive: true }
  );

  window.addEventListener("touchend", () => {
    isDragging = false;
  });
}
