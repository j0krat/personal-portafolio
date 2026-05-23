const canvas = document.querySelector("#network-canvas");
const ctx = canvas.getContext("2d");
const terminalOutput = document.querySelector("#terminal-output");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const nodes = [];
let width = 0;
let height = 0;
let animationFrame = 0;

terminalOutput.textContent = [
  "jokrat@portfolio:~$ whoami",
  "Developer in progress",
  "",
  "jokrat@skills:~$ stack",
  "JavaScript  Python  HTML  CSS",
  "SQL         MongoDB",
  "",
  "jokrat@learning:~$ focus",
  "Linux + Cybersecurity foundations",
].join("\n");

function resizeCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  createNodes();
}

function createNodes() {
  nodes.length = 0;
  const count = Math.max(28, Math.floor((width * height) / 24000));

  for (let index = 0; index < count; index += 1) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.34,
      radius: Math.random() * 1.7 + 0.7,
    });
  }
}

function drawNetwork() {
  ctx.clearRect(0, 0, width, height);

  for (const node of nodes) {
    if (!prefersReducedMotion.matches) {
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;
    }

    ctx.beginPath();
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(110, 231, 183, 0.72)";
    ctx.fill();
  }

  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      const first = nodes[i];
      const second = nodes[j];
      const distance = Math.hypot(first.x - second.x, first.y - second.y);

      if (distance < 145) {
        ctx.beginPath();
        ctx.moveTo(first.x, first.y);
        ctx.lineTo(second.x, second.y);
        ctx.strokeStyle = `rgba(103, 232, 249, ${0.16 * (1 - distance / 145)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  animationFrame = window.requestAnimationFrame(drawNetwork);
}

function revealSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.18 },
  );

  document
    .querySelectorAll(".hero-copy, .terminal-panel, .section, .contact-section")
    .forEach((element) => observer.observe(element));
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawNetwork();
revealSections();

prefersReducedMotion.addEventListener("change", () => {
  window.cancelAnimationFrame(animationFrame);
  drawNetwork();
});
