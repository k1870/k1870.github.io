let animationId; // Track current animation frame

export function initRain(canvasId) {
  // Cancel any existing animation
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const floorY = canvas.height * 0.95;
  const drops = [];
  const splashes = [];
  const dropCount = 120;

  // Create raindrops
  for (let i = 0; i < dropCount; i++) {
    drops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      length: Math.random() * 15 + 10,
      speed: Math.random() * 6 + 4,
      width: Math.random() * 0.8 + 0.8
    });
  }

  function createSplash(x) {
    const lines = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < lines; i++) {
      const angle = Math.random() * Math.PI;
      const speed = Math.random() * 1.5 + 0.5;
      splashes.push({
        x,
        y: floorY,
        vx: Math.cos(angle) * speed,
        vy: -Math.sin(angle) * speed,
        alpha: 1
      });
    }
  }

  function animate() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw rain drops
    for (let drop of drops) {
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0, 150, 255, 0.6)";
      ctx.lineWidth = drop.width;
      ctx.moveTo(drop.x, drop.y);
      ctx.lineTo(drop.x, drop.y + drop.length);
      ctx.stroke();

      drop.y += drop.speed;

      if (drop.y + drop.length > floorY) {
        createSplash(drop.x);
        drop.y = -drop.length;
        drop.x = Math.random() * canvas.width;
      }
    }

    // Draw splashes
    for (let i = splashes.length - 1; i >= 0; i--) {
      const s = splashes[i];
      ctx.beginPath();
      ctx.strokeStyle = `rgba(0, 180, 255, ${s.alpha})`;
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x + s.vx * 2, s.y + s.vy * 2);
      ctx.stroke();

      s.x += s.vx;
      s.y += s.vy;
      s.vy += 0.05; // gravity
      s.alpha -= 0.02;

      if (s.alpha <= 0) {
        splashes.splice(i, 1);
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  return animationId;
}
