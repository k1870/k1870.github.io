let animationId; // Global to track and cancel animation loop

export function initMeteor(canvasId) {
  // Cancel any previous animation
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let meteors = [];

  function createMeteor() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      length: Math.random() * 60 + 10,
      speed: Math.random() * 3 + 1,
      angle: Math.PI / 6,
      alpha: 1
    };
  }

  // Reset meteors
  meteors = [];
  for (let i = 0; i < 80; i++) {
    meteors.push(createMeteor());
  }

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let meteor of meteors) {
      ctx.beginPath();
      ctx.moveTo(meteor.x, meteor.y);
      ctx.lineTo(
        meteor.x - meteor.length * Math.cos(meteor.angle),
        meteor.y - meteor.length * Math.sin(meteor.angle)
      );
      ctx.strokeStyle = `rgba(255, 60, 0, ${meteor.alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();

      meteor.x += meteor.speed * Math.cos(meteor.angle);
      meteor.y += meteor.speed * Math.sin(meteor.angle);

      if (meteor.x > canvas.width || meteor.y > canvas.height) {
        Object.assign(meteor, createMeteor());
        meteor.y = -10;
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  return animationId;
}
