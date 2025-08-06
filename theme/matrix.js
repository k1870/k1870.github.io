// matrix.js
let animationId; // store globally to cancel later

export function initMatrixRain(canvasId) {
  // Cancel any ongoing animation
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const characters = 'アァイィウエカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charArray = characters.split('');

  const fontSize = 18;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = new Array(columns).fill(0);

  let frame = 0;
  const speed = 6;

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = `${fontSize}px monospace`;

    if (frame % speed === 0) {
      for (let i = 0; i < columns; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i]++;
        }
      }
    }

    frame++;
    animationId = requestAnimationFrame(draw);
  }

  draw();

  // Resize handling
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  return animationId;
}
