/**
 * Canvas metaballs background – theme colors: --black, --purple, --mid-grey.
 */
const BLACK = "#0B0B0B";
const PURPLE_RGB = { r: 123, g: 92, b: 255 };
const MID_GREY_RGB = { r: 42, g: 42, b: 42 };

function initMetaballs() {
  const container = document.getElementById("container");
  if (!container) return;

  const canvas = document.createElement("canvas");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;display:block;";
  container.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const dpr = Math.min(2, typeof window !== "undefined" ? window.devicePixelRatio : 1);
  let width = 0;
  let height = 0;
  let animationId = null;

  const balls = [];
  const numBalls = 5;
  const minR = 50;
  const maxR = 100;

  for (let i = 0; i < numBalls; i++) {
    balls.push({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0015,
      vy: (Math.random() - 0.5) * 0.0015,
      r: minR + Math.random() * (maxR - minR),
    });
  }

  function resize() {
    width = container.offsetWidth;
    height = container.offsetHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(dpr, dpr);
  }

  function draw() {
    if (!width || !height) return;
    ctx.fillStyle = BLACK;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
      const b = balls[i];
      b.x += b.vx;
      b.y += b.vy;
      if (b.x < 0 || b.x > 1) b.vx *= -1;
      if (b.y < 0 || b.y > 1) b.vy *= -1;
    }

    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    for (let py = 0; py < height; py += 2) {
      for (let px = 0; px < width; px += 2) {
        let sum = 0;
        for (let i = 0; i < balls.length; i++) {
          const b = balls[i];
          const dx = px - b.x * width;
          const dy = py - b.y * height;
          sum += (b.r * b.r) / (dx * dx + dy * dy + 1);
        }
        const idx = (py * width + px) * 4;
        if (sum > 0.5) {
          const t = Math.min(1, (sum - 0.5) * 2);
          const r = Math.round(PURPLE_RGB.r * t + MID_GREY_RGB.r * (1 - t));
          const g = Math.round(PURPLE_RGB.g * t + MID_GREY_RGB.g * (1 - t));
          const b = Math.round(PURPLE_RGB.b * t + MID_GREY_RGB.b * (1 - t));
          const a = Math.round(45 + Math.min(90, sum * 50));
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = a;
        }
      }
    }
    ctx.putImageData(imageData, 0, 0);
    animationId = requestAnimationFrame(draw);
  }

  resize();
  draw();
  if (typeof window !== "undefined") {
    window.addEventListener("resize", resize);
  }

  return function cleanup() {
    if (animationId) cancelAnimationFrame(animationId);
    if (typeof window !== "undefined") window.removeEventListener("resize", resize);
    canvas.remove();
  };
}

export default initMetaballs;
