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
    '.project-label, .myemail, #logo, #introSubheading, #intro h1, #contactbtn, form button, nav li, .project-content, form, form input, form textarea'
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
    form button:hover {
      background-color: ${color} !important;
      color: black !important;
    }
  `;
}

//  Always start with matrix on page load
startTheme(initMatrixRain, 'matrixCanvas');
applySimpleTheme('matrix');