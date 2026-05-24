const canvas = document.querySelector("#network-canvas");
const ctx = canvas.getContext("2d");
const terminalOutput = document.querySelector("#terminal-output");
const languageButtons = document.querySelectorAll(".language-button");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const nodes = [];
let width = 0;
let height = 0;
let animationFrame = 0;

const translations = {
  es: {
    "meta.description":
      "Portafolio de Jokrat, desarrollador con conocimientos en JavaScript, Python, HTML, CSS, SQL y MongoDB.",
    "brand.home": "Ir al inicio",
    "nav.main": "Navegacion principal",
    "nav.profile": "Perfil",
    "nav.skills": "Habilidades",
    "nav.learning": "Aprendizaje",
    "nav.contact": "Contacto",
    "language.label": "Selector de idioma",
    "hero.eyebrow": "Desarrollo web, datos y ciberseguridad",
    "hero.lead":
      "Construyo bases solidas en software combinando JavaScript, Python, HTML, CSS, SQL y MongoDB. Actualmente estoy profundizando en Linux y Fundamentos de la Ciberseguridad.",
    "hero.actions": "Acciones principales",
    "hero.contact": "Contactar",
    "hero.skills": "Ver habilidades",
    "terminal.label": "Resumen tecnico",
    "profile.eyebrow": "Perfil",
    "profile.title": "Un perfil tecnico en crecimiento",
    "profile.aboutTitle": "Sobre mi",
    "profile.aboutText":
      "Soy Jokrat, una persona enfocada en aprender, practicar y crear soluciones con tecnologia. Me interesa entender tanto la parte visual de una aplicacion como la logica, los datos y la seguridad que la sostienen.",
    "profile.workTitle": "Forma de trabajo",
    "profile.workText":
      "Me gusta avanzar con bases claras: escribir codigo legible, ordenar ideas, resolver problemas por partes y mejorar cada proyecto con lo aprendido.",
    "skills.eyebrow": "Stack",
    "skills.title": "Habilidades principales",
    "skills.programmingTag": "Programacion",
    "skills.dataTag": "Datos",
    "skills.frontendText":
      "Estructura, estilos responsivos e interacciones para interfaces web limpias y funcionales.",
    "skills.backendText":
      "Logica de aplicacion, automatizacion, scripts y resolucion de problemas con enfoque practico.",
    "skills.dataText":
      "Manejo de datos relacionales y documentales para consultar, organizar y modelar informacion.",
    "learning.eyebrow": "Ahora",
    "learning.title": "En aprendizaje activo",
    "learning.linuxText":
      "Comandos, terminal, permisos, estructura del sistema y flujo de trabajo para entornos tecnicos.",
    "learning.cyberTitle": "Fundamentos de la Ciberseguridad",
    "learning.cyberText":
      "Conceptos base de seguridad, buenas practicas, riesgos, defensa y pensamiento analitico.",
    "contact.eyebrow": "Contacto",
    "contact.title": "Listo para seguir creando",
    "contact.text":
      "Este espacio puede conectarse luego con tu correo, GitHub, LinkedIn o proyectos destacados.",
    "contact.email": "Correo",
    "contact.emailAria": "Enviar correo a Jokrat",
    "contact.githubAria": "Ver GitHub de Jokrat",
    "contact.linkedinAria": "Ver LinkedIn de Jokrat",
    "footer.text": "Jokrat | Portafolio personal",
    terminal: [
      "jokrat@portfolio:~$ whoami",
      "Desarrollador en progreso",
      "",
      "jokrat@skills:~$ stack",
      "JavaScript  Python  HTML  CSS",
      "SQL         MongoDB",
      "",
      "jokrat@learning:~$ focus",
      "Linux + Fundamentos de ciberseguridad",
    ],
  },
  en: {
    "meta.description":
      "Jokrat's portfolio, a developer with knowledge of JavaScript, Python, HTML, CSS, SQL, and MongoDB.",
    "brand.home": "Go to home",
    "nav.main": "Main navigation",
    "nav.profile": "Profile",
    "nav.skills": "Skills",
    "nav.learning": "Learning",
    "nav.contact": "Contact",
    "language.label": "Language selector",
    "hero.eyebrow": "Web development, data, and cybersecurity",
    "hero.lead":
      "I build solid software foundations by combining JavaScript, Python, HTML, CSS, SQL, and MongoDB. I am currently going deeper into Linux and Cybersecurity Fundamentals.",
    "hero.actions": "Main actions",
    "hero.contact": "Contact",
    "hero.skills": "View skills",
    "terminal.label": "Technical summary",
    "profile.eyebrow": "Profile",
    "profile.title": "A growing technical profile",
    "profile.aboutTitle": "About me",
    "profile.aboutText":
      "I am Jokrat, focused on learning, practicing, and creating solutions with technology. I am interested in understanding both the visual side of an application and the logic, data, and security that support it.",
    "profile.workTitle": "Work style",
    "profile.workText":
      "I like moving forward with clear foundations: writing readable code, organizing ideas, solving problems step by step, and improving each project with what I learn.",
    "skills.eyebrow": "Stack",
    "skills.title": "Core skills",
    "skills.programmingTag": "Programming",
    "skills.dataTag": "Data",
    "skills.frontendText":
      "Structure, responsive styles, and interactions for clean, functional web interfaces.",
    "skills.backendText":
      "Application logic, automation, scripts, and problem solving with a practical approach.",
    "skills.dataText":
      "Handling relational and document data to query, organize, and model information.",
    "learning.eyebrow": "Now",
    "learning.title": "Active learning",
    "learning.linuxText":
      "Commands, terminal, permissions, system structure, and workflow for technical environments.",
    "learning.cyberTitle": "Cybersecurity Fundamentals",
    "learning.cyberText":
      "Core security concepts, best practices, risks, defense, and analytical thinking.",
    "contact.eyebrow": "Contact",
    "contact.title": "Ready to keep creating",
    "contact.text":
      "This space can later connect with your email, GitHub, LinkedIn, or featured projects.",
    "contact.email": "Email",
    "contact.emailAria": "Send an email to Jokrat",
    "contact.githubAria": "View Jokrat's GitHub",
    "contact.linkedinAria": "View Jokrat's LinkedIn",
    "footer.text": "Jokrat | Personal portfolio",
    terminal: [
      "jokrat@portfolio:~$ whoami",
      "Developer in progress",
      "",
      "jokrat@skills:~$ stack",
      "JavaScript  Python  HTML  CSS",
      "SQL         MongoDB",
      "",
      "jokrat@learning:~$ focus",
      "Linux + Cybersecurity foundations",
    ],
  },
};

function getInitialLanguage() {
  const storedLanguage = localStorage.getItem("portfolio-language");
  if (storedLanguage && translations[storedLanguage]) {
    return storedLanguage;
  }

  return navigator.language.toLowerCase().startsWith("en") ? "en" : "es";
}

function setLanguage(language) {
  const dictionary = translations[language] || translations.es;

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = dictionary[key];
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    element.setAttribute("aria-label", dictionary[key]);
  });

  document.querySelectorAll("[data-i18n-content]").forEach((element) => {
    const key = element.dataset.i18nContent;
    element.setAttribute("content", dictionary[key]);
  });

  terminalOutput.textContent = dictionary.terminal.join("\n");
  localStorage.setItem("portfolio-language", language);

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

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
languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.lang));
});

setLanguage(getInitialLanguage());
resizeCanvas();
drawNetwork();
revealSections();

prefersReducedMotion.addEventListener("change", () => {
  window.cancelAnimationFrame(animationFrame);
  drawNetwork();
});
