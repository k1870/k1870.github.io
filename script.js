// line 2 - 17 deals with the navbar transition to be hidden
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop) {
    // Scrolling down
    navbar.classList.add("hide");
  } else {
    // Scrolling up
    navbar.classList.remove("hide");
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
});



import { initMeteor } from './theme/meteor.js';
import { initRain } from './theme/rain.js';
import { initMatrixRain } from './theme/matrix.js';
// Utility: Hide all canvases
function hideAllCanvases() {
  document.getElementById('matrixCanvas').style.display = 'none';
  document.getElementById('meteorCanvas').style.display = 'none';
  document.getElementById('rainCanvas').style.display = 'none';
}

// Track animation frames so we can cancel them when switching themes
let currentAnimationFrame;

function startTheme(initFunction, canvasId) {
  // Cancel previous animation if exists
  if (typeof cancelAnimationFrame === 'function' && currentAnimationFrame) {
    cancelAnimationFrame(currentAnimationFrame);
  }

  hideAllCanvases(); // Hide all others
  document.getElementById(canvasId).style.display = 'block'; // Show selected canvas

  // Start new animation
  currentAnimationFrame = initFunction(canvasId); // Modified to return the requestAnimationFrame ID
}

// Button event listeners
document.getElementById('btn-matrix').addEventListener('click', () => {
  startTheme(initMatrixRain, 'matrixCanvas');
  applySimpleTheme('matrix');
  localStorage.setItem('selectedTheme', 'matrix');
});

document.getElementById('btn-meteor').addEventListener('click', () => {
  startTheme(initMeteor, 'meteorCanvas');
  applySimpleTheme('meteor');
  localStorage.setItem('selectedTheme', 'meteor');
});

document.getElementById('btn-rain').addEventListener('click', () => {
  startTheme(initRain, 'rainCanvas');
  applySimpleTheme('rain');
});


// Simple theme colors
const simpleThemeColors = {
  matrix: "green",
  meteor: "rgba(255, 60, 0, 1)",
  rain: "rgba(0, 150, 255, 0.6)"
};

// Apply color styling
function applySimpleTheme(theme) {
  const color = simpleThemeColors[theme];

  const colorElements = document.querySelectorAll(
    '.project-label, .myemail, #logo, #introSubheading, #intro h1, #contactbtn, #resumebtn, form button, nav li, .project-content, form, form input, form textarea'
  );

  colorElements.forEach(el => {
    el.style.color = color;
    el.style.borderColor = color;
  });

  const bgElements = document.querySelectorAll('.resume, #skills-wrapper');
  bgElements.forEach(el => {
    el.style.backgroundColor = color;
  });

  let style = document.getElementById("dynamic-theme-style");
  if (!style) {
    style = document.createElement("style");
    style.id = "dynamic-theme-style";
    document.head.appendChild(style);
  }

  style.textContent = `
    nav li:hover {
      background-color: ${color} !important;
    }

    #contactbtn:hover,
    #resumebtn:hover,
    form button:hover {
      background-color: ${color} !important;
      color: black !important;
    }
  `;
}

//  Always start with matrix on page load
startTheme(initMatrixRain, 'matrixCanvas');
applySimpleTheme('matrix');

async function loadProjects() {
  try {
    const response = await fetch('./projects.json');

    if (!response.ok) {
      throw new Error(`Failed to load projects: ${response.status}`);
    }

    const projects = await response.json();
    const projectsSection = document.getElementById('projects');

    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('project-card');

      const technologies = project.technologies
        .map(technology => `<li>${technology}</li>`)
        .join('');

      const githubLink = project.github
        ? `
          <a href="${project.github}"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="${project.title} GitHub repository">
            <img src="github-icon.svg" alt="GitHub" />
          </a>
        `
        : '';

      const liveLink = project.live
        ? `
          <a href="${project.live}"
             target="_blank"
             rel="noopener noreferrer"
             aria-label="${project.title} live site">
            <img src="external-link-icon.svg" alt="Live Site" />
          </a>
        `
        : '';

      projectCard.innerHTML = `
        <div class="project-image">
          <img
            src="${project.image}"
            alt="${project.title} project preview"
            style="width: ${project.imageWidth};"
          />
        </div>

        <div class="project-content">
          <p class="project-label">${project.label}</p>

          <h3 class="project-title">
            ${project.title}
          </h3>

          <div class="project-description">
            <p>${project.shortDescription || project.description || ''}</p>
          </div>

          <ul class="tech-stack">
            ${technologies}
          </ul>

          <div class="project-links">
            ${githubLink}
            ${liveLink}
          </div>
        </div>
      `;

      projectsSection.appendChild(projectCard);
    });

  } catch (error) {
    console.error('Unable to load projects:', error);
  }
}

loadProjects();