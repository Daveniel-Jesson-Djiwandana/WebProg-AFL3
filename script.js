const coverflow = document.getElementById('coverflow');
const cfCards = Array.from(coverflow.children);
let cfCurrentIndex = Math.floor(cfCards.length / 2);
let cfIsDragging = false;
let cfStartX = 0;

function updateCoverflow() {
  const containerWidth = coverflow.clientWidth;
  const angle = 45;
  const offset = containerWidth * 0.18;

  cfCards.forEach((card, i) => {
    const diff = i - cfCurrentIndex;
    const zIndex = 10 - Math.abs(diff);
    const scale = diff === 0 ? 1 : 0.75;
    const shadowBlur = diff === 0 ? 40 : 20;
    const shadowOpacity = diff === 0 ? 0.9 : 0.5;

    card.style.zIndex = zIndex;
    card.style.pointerEvents = diff === 0 ? 'auto' : 'none';
    card.style.filter = `drop-shadow(0px 20px ${shadowBlur}px rgba(0,0,0,${shadowOpacity}))`;
    card.style.transform = `
      translateX(calc(-50% + ${diff * offset}px))
      translateY(-50%)
      translateZ(${-Math.abs(diff) * 80}px)
      scale(${scale})
      rotateY(${diff * -angle}deg)
    `;
  });
}

updateCoverflow();

window.addEventListener('mousedown', e => {
  cfIsDragging = true;
  cfStartX = e.clientX;
});

window.addEventListener('mousemove', e => {
  if (!cfIsDragging) return;
  const deltaX = e.clientX - cfStartX;
  if (deltaX > 30 && cfCurrentIndex > 0) {
    cfCurrentIndex--;
    cfStartX = e.clientX;
    updateCoverflow();
  } else if (deltaX < -30 && cfCurrentIndex < cfCards.length - 1) {
    cfCurrentIndex++;
    cfStartX = e.clientX;
    updateCoverflow();
  }
});

window.addEventListener('mouseup', () => { cfIsDragging = false; });