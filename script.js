// 1.1. initializeMainContainer
function initializeMainContainer() {
  const container = document.getElementById("container");

  // Set initial viewport properties
  container.style.width = "100%";
  container.style.minHeight = "100vh";
  container.style.margin = "0";
  container.style.padding = "0";
  container.style.position = "relative";
  container.style.overflow = "hidden";
  container.style.boxSizing = "border-box";

  // Apply base styles
  document.body.style.margin = "0";
  document.body.style.padding = "0";
  document.body.style.fontFamily = "'Dancing Script', 'Quicksand', sans-serif";
  document.body.style.overflow = "hidden auto";
  document.body.style.width = "100%";

  return container;
}

// 1.2. setupEventListeners
function setupEventListeners() {
  const container = document.getElementById("container");

  // Scroll event listener
  window.addEventListener("scroll", () => {
    // Will be implemented when we add sections
    handleScroll();
  });

  // Resize handler
  window.addEventListener("resize", () => {
    handleResponsiveLayout();
  });

  // Touch events for mobile
  container.addEventListener("touchstart", handleTouchStart);
  container.addEventListener("touchmove", handleTouchMove);
  container.addEventListener("touchend", handleTouchEnd);

  // Set up intersection observer
  setupIntersectionObserver();
}

// 1.3. handleResponsiveLayout
function handleResponsiveLayout() {
  const width = window.innerWidth;

  // Define breakpoints
  const breakpoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
  };

  // Apply responsive styles based on screen size
  if (width <= breakpoints.mobile) {
    applyMobileStyles();
  } else if (width <= breakpoints.tablet) {
    applyTabletStyles();
  } else {
    applyDesktopStyles();
  }
}

// Helper functions for responsive layout
function applyMobileStyles() {
  const container = document.getElementById("container");
  // container.style.padding = "10px";
  // More mobile-specific styles will be added as we create content
}

function applyTabletStyles() {
  const container = document.getElementById("container");
  // container.style.padding = "20px";
  // More tablet-specific styles will be added as we create content
}

function applyDesktopStyles() {
  const container = document.getElementById("container");
  // container.style.padding = "30px";
  // More desktop-specific styles will be added as we create content
}

// Placeholder functions to be implemented later
function handleScroll() {
  // Will be implemented when adding sections
}

function handleTouchStart(e) {
  // Will be implemented for mobile interactions
}

function handleTouchMove(e) {
  // Will be implemented for mobile interactions
}

function handleTouchEnd(e) {
  // Will be implemented for mobile interactions
}

function setupIntersectionObserver() {
  // Will be implemented when adding animated sections
}

// 2.1. createNavigation
function createNavigation() {
  const nav = document.createElement("nav");
  nav.style.position = "fixed";
  nav.style.top = "0";
  nav.style.left = "0";
  nav.style.right = "0";
  nav.style.width = "100%";
  nav.style.padding = "20px 0";
  nav.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  nav.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  nav.style.zIndex = "1000";
  nav.style.transition = "all 0.3s ease";
  nav.style.boxSizing = "border-box";

  // Create navigation items
  const sections = ["Home", "Memories"];
  const navList = document.createElement("ul");
  navList.style.listStyle = "none";
  navList.style.margin = "0";
  navList.style.padding = "0";
  navList.style.display = "flex";
  navList.style.justifyContent = "center";
  navList.style.gap = "20px";
  navList.style.width = "100%";
  navList.style.boxSizing = "border-box";
  navList.style.fontFamily = "'Quicksand', sans-serif";

  sections.forEach((section) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = section;
    a.href = `#${section.toLowerCase()}`;
    a.style.textDecoration = "none";
    a.style.color = "#333";
    a.style.fontWeight = "500";
    a.style.transition = "color 0.3s ease";
    a.style.fontFamily = "'Quicksand', sans-serif";
    a.style.fontSize = "1.1em";
    a.style.letterSpacing = "0.5px";

    a.addEventListener("mouseover", () => {
      a.style.color = "#ff69b4"; // Pink highlight on hover
    });

    a.addEventListener("mouseout", () => {
      a.style.color = "#333";
    });

    a.addEventListener("click", (e) => {
      e.preventDefault();
      smoothScrollTo(section.toLowerCase());
    });

    li.appendChild(a);
    navList.appendChild(li);
  });

  // Create hamburger menu for mobile
  const hamburger = createHamburgerMenu();
  nav.appendChild(hamburger);
  nav.appendChild(navList);

  // Add to container
  const container = document.getElementById("container");
  container.appendChild(nav);

  // Handle mobile menu visibility
  handleMobileMenu(hamburger, navList);
}

// 2.2. implementSmoothScroll
function smoothScrollTo(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const startPosition = window.pageYOffset;
  const targetPosition = section.offsetTop - 80; // Account for fixed header
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const progress = Math.min(timeElapsed / duration, 1);

    window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  // Easing function
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }

  requestAnimationFrame(animation);
}

// 2.3. createSection
function createSection(sectionId, content) {
  const section = document.createElement("section");
  section.id = sectionId;
  section.style.minHeight = "100vh";
  section.style.padding = "80px 20px";
  section.style.display = "flex";
  section.style.flexDirection = "column";
  section.style.alignItems = "center";
  section.style.justifyContent = "center";
  section.style.position = "relative";
  section.style.transition = "opacity 0.5s ease";
  section.style.boxSizing = "border-box";
  section.style.width = "100%";
  section.style.overflow = "hidden";

  // Add content
  if (typeof content === "string") {
    section.innerHTML = content;
  } else if (content instanceof Element) {
    section.appendChild(content);
  }

  // Add to container
  const container = document.getElementById("container");
  container.appendChild(section);

  return section;
}

// Helper functions for mobile menu
function createHamburgerMenu() {
  const hamburger = document.createElement("div");
  hamburger.style.display = "none"; // Hidden by default, shown in mobile
  hamburger.style.flexDirection = "column";
  hamburger.style.gap = "4px";
  hamburger.style.cursor = "pointer";
  hamburger.style.padding = "10px";

  // Create hamburger lines
  for (let i = 0; i < 3; i++) {
    const line = document.createElement("div");
    line.style.width = "25px";
    line.style.height = "3px";
    line.style.backgroundColor = "#333";
    line.style.transition = "all 0.3s ease";
    hamburger.appendChild(line);
  }

  return hamburger;
}

function handleMobileMenu(hamburger, navList) {
  let isOpen = false;

  // Update mobile menu visibility on resize
  window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
      hamburger.style.display = "flex";
      navList.style.display = "none";
      isOpen = false;
    } else {
      hamburger.style.display = "none";
      navList.style.display = "flex";
    }
  });

  // Toggle menu on hamburger click
  hamburger.addEventListener("click", () => {
    isOpen = !isOpen;
    navList.style.display = isOpen ? "flex" : "none";
    if (isOpen) {
      navList.style.flexDirection = "column";
      navList.style.position = "absolute";
      navList.style.top = "100%";
      navList.style.left = "0";
      navList.style.right = "0";
      navList.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      navList.style.padding = "20px";
    }
  });

  // Initial check for mobile view
  if (window.innerWidth <= 768) {
    hamburger.style.display = "flex";
    navList.style.display = "none";
  }
}

// 3.1. createHeroSection
function createHeroSection() {
  const heroSection = createSection("home", "");

  // Update background with a more interesting gradient
  heroSection.style.background = `
    linear-gradient(
      135deg, 
      #fff0f5 0%,
      #ffebf2 25%,
      #ffe1ee 50%,
      #ffd6e9 75%,
      #ffcce5 100%
    )
  `;

  // Add a subtle radial gradient overlay
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = `
    radial-gradient(
      circle at 50% 50%,
      rgba(255, 255, 255, 0.4) 0%,
      rgba(255, 192, 203, 0.1) 100%
    )
  `;
  overlay.style.zIndex = "1";

  heroSection.style.position = "relative";
  heroSection.style.overflow = "hidden";

  // Create content wrapper with higher z-index
  const content = document.createElement("div");
  content.style.position = "relative";
  content.style.zIndex = "2";
  content.style.textAlign = "center";
  content.style.maxWidth = "800px";
  content.style.margin = "0 auto";
  content.style.padding = "20px";

  // Rest of the hero section content...
  const greeting = document.createElement("h1");
  greeting.style.fontFamily = "'Dancing Script', cursive";
  greeting.style.fontSize = "4.5em";
  greeting.style.fontWeight = "700";
  greeting.style.textShadow = "2px 2px 4px rgba(255, 105, 180, 0.3)";
  greeting.style.color = "#ff69b4";
  greeting.style.marginBottom = "20px";
  greeting.style.opacity = "0";
  greeting.style.transform = "translateY(20px)";
  greeting.style.transition = "all 1s ease";
  greeting.textContent = "Happy Birthday juju!";

  const messageContainer = document.createElement("div");
  messageContainer.style.fontFamily = "'Quicksand', sans-serif";
  messageContainer.style.fontSize = "1.8em";
  messageContainer.style.fontWeight = "500";
  messageContainer.style.lineHeight = "1.6";
  messageContainer.style.color = "#666";
  messageContainer.style.marginBottom = "30px";
  messageContainer.style.opacity = "0";
  messageContainer.style.transform = "translateY(20px)";
  messageContainer.style.transition = "all 1s ease";
  messageContainer.style.transitionDelay = "0.5s";

  content.appendChild(greeting);
  content.appendChild(messageContainer);

  heroSection.appendChild(overlay);
  heroSection.appendChild(content);

  // Add parallax effect after creating content
  setupParallaxEffect(heroSection);

  // Trigger animations after a short delay
  setTimeout(() => {
    greeting.style.opacity = "1";
    greeting.style.transform = "translateY(0)";
    messageContainer.style.opacity = "1";
    messageContainer.style.transform = "translateY(0)";
    animateWelcomeMessage(messageContainer);
  }, 500);

  // Add the scroll prompt at the end
  const scrollPrompt = createScrollPrompt();
  heroSection.appendChild(scrollPrompt);

  return heroSection;
}

// 3.2. animateWelcomeMessage
function animateWelcomeMessage(container) {
  const messages = [
    "To my qinqinable girlfriend... 💝 🐥",
    "Thank you for being in my life... ✨ 🐥",
    "Every moment with you is precious... 💫 🐥",
    "Let's celebrate your special day! 🎉 🐥",
  ];

  let currentIndex = 0;
  let currentText = "";
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const message = messages[currentIndex];

    if (isDeleting) {
      currentText = message.substring(0, currentText.length - 1);
      container.textContent = currentText;
      typingSpeed = 50;

      if (currentText === "") {
        isDeleting = false;
        currentIndex = (currentIndex + 1) % messages.length;
        typingSpeed = 100;
      }
    } else {
      currentText = message.substring(0, currentText.length + 1);
      container.textContent = currentText;
      typingSpeed = 100;

      if (currentText === message) {
        isDeleting = true;
        typingSpeed = 1500; // Pause before starting to delete
      }
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

// 3.3. setupParallaxEffect
function setupParallaxEffect(heroSection) {
  const parallaxContainer = document.createElement("div");
  parallaxContainer.style.position = "absolute";
  parallaxContainer.style.top = "0";
  parallaxContainer.style.left = "0";
  parallaxContainer.style.width = "100%";
  parallaxContainer.style.height = "100%";
  parallaxContainer.style.overflow = "hidden";
  parallaxContainer.style.pointerEvents = "none";
  parallaxContainer.style.zIndex = "1";

  const layers = [
    {
      speed: 1,
      elements: [["🐥", "🐿️"]],
      size: "32px",
      count: 9,
      opacity: "0.3",
    },
    {
      speed: 1.5,
      elements: ["💝", "✨", "💖", "🎀"],
      size: "28px",
      count: 9,
      opacity: "0.2",
    },
    {
      speed: 2,
      elements: ["❤️", "🌸", "⭐"],
      size: "24px",
      count: 9,
      opacity: "0.2",
    },
  ];

  // Helper function to get exact grid positions
  function getGridPosition(index, gridSize = 3) {
    const cellWidth = 100 / gridSize;
    const cellHeight = 100 / gridSize;

    const row = Math.floor(index / gridSize);
    const col = index % gridSize;

    // Calculate center position of each cell
    return {
      left: col * cellWidth + cellWidth / 2,
      top: row * cellHeight + cellHeight / 2,
    };
  }

  layers.forEach((layer, layerIndex) => {
    const layerDiv = document.createElement("div");
    layerDiv.style.position = "absolute";
    layerDiv.style.top = "0";
    layerDiv.style.left = "0";
    layerDiv.style.width = "100%";
    layerDiv.style.height = "100%";
    layerDiv.style.zIndex = `${layerIndex + 1}`;

    for (let i = 0; i < layer.count; i++) {
      const position = getGridPosition(i);

      if (layerIndex === 0) {
        // Chick and squirrel pairs
        const pairContainer = document.createElement("div");
        pairContainer.style.position = "absolute";
        pairContainer.style.left = `${position.left}%`;
        pairContainer.style.top = `${position.top}%`;
        pairContainer.style.opacity = layer.opacity;
        pairContainer.style.transform = "translate(-50%, -50%)"; // Center in grid cell

        const pair = layer.elements[0];
        const chick = document.createElement("span");
        const squirrel = document.createElement("span");

        chick.textContent = pair[0];
        squirrel.textContent = pair[1];

        chick.style.fontSize = layer.size;
        squirrel.style.fontSize = layer.size;
        squirrel.style.marginLeft = "5px";

        pairContainer.appendChild(chick);
        pairContainer.appendChild(squirrel);

        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * 2;

        pairContainer.style.animation = `
          float ${duration}s ease-in-out ${delay}s infinite,
          sway ${duration * 1.5}s ease-in-out ${delay}s infinite
        `;

        layerDiv.appendChild(pairContainer);
      } else {
        const element = document.createElement("div");
        element.style.position = "absolute";
        element.style.fontSize = layer.size;
        element.textContent =
          layer.elements[Math.floor(Math.random() * layer.elements.length)];
        element.style.left = `${position.left}%`;
        element.style.top = `${position.top}%`;
        element.style.opacity = layer.opacity;
        element.style.transform = "translate(-50%, -50%)"; // Center in grid cell

        const duration = 3 + Math.random() * 2;
        const delay = Math.random() * 2;

        element.style.animation = `
          float ${duration}s ease-in-out ${delay}s infinite,
          sway ${duration * 1.5}s ease-in-out ${delay}s infinite
        `;

        layerDiv.appendChild(element);
      }
    }

    parallaxContainer.appendChild(layerDiv);
  });

  heroSection.appendChild(parallaxContainer);

  // Add animation keyframes
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes float {
      0%, 100% { transform: translate(-50%, -50%); }
      50% { transform: translate(-50%, calc(-50% - 30px)); }
    }
    
    @keyframes sway {
      0%, 100% { transform: translate(-50%, -50%); }
      50% { transform: translate(calc(-50% + 30px), -50%); }
    }
  `;
  document.head.appendChild(styleSheet);
}

// Helper function to create particle background
function createParticleBackground(container) {
  const particleCount = 30;
  const colors = ["#ffb6c1", "#ffc0cb", "#fff0f5", "#ff69b4"];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.fontSize = `${Math.random() * 20 + 10}px`;
    particle.style.opacity = "0.6";
    particle.style.pointerEvents = "none";

    // Randomly choose between chick, squirrel, and heart
    const random = Math.random();
    if (random < 0.33) {
      particle.innerHTML = "🐥";
    } else if (random < 0.66) {
      particle.innerHTML = "🐿️";
    } else {
      particle.innerHTML = "❤️";
    }

    // Random initial position
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";

    // Animation
    particle.style.animation = `
      float ${Math.random() * 10 + 5}s linear infinite,
      fade ${Math.random() * 3 + 2}s ease-in-out infinite
    `;

    container.appendChild(particle);
  }

  // Add keyframe animations to document
  addParticleKeyframes();
}

// Helper function to create parallax layers
function createParallaxLayers() {
  const layerCount = 3;
  const layers = [];

  // Define colors for each layer
  const layerColors = [
    "rgba(255, 182, 193, 0.2)", // Light pink
    "rgba(255, 105, 180, 0.1)", // Hot pink
    "rgba(255, 192, 203, 0.15)", // Pink
  ];

  // Define shapes for each layer
  const layerShapes = [createHearts, createChicks, createSquirrels];

  for (let i = 0; i < layerCount; i++) {
    const layer = document.createElement("div");
    layer.style.position = "absolute";
    layer.style.width = "100%";
    layer.style.height = "100%";
    layer.style.pointerEvents = "none";
    layer.style.zIndex = "1";

    // Add 10-15 random shapes to each layer
    const shapeCount = Math.floor(Math.random() * 6) + 10;
    for (let j = 0; j < shapeCount; j++) {
      const shape = layerShapes[i]();
      shape.style.color = layerColors[i];
      shape.style.left = `${Math.random() * 100}%`;
      shape.style.top = `${Math.random() * 100}%`;
      layer.appendChild(shape);
    }

    layers.push(layer);
  }

  return layers;
}

// Helper functions to create different shapes
function createHearts() {
  const heart = document.createElement("div");
  heart.style.position = "absolute";
  heart.style.fontSize = `${Math.random() * 20 + 10}px`;
  heart.innerHTML = "❤";
  heart.style.opacity = "0.7";
  return heart;
}

function createChicks() {
  const chick = document.createElement("div");
  chick.style.position = "absolute";
  chick.style.fontSize = `${Math.random() * 20 + 10}px`;
  chick.innerHTML = "🐥";
  chick.style.opacity = "0.7";
  return chick;
}

function createSquirrels() {
  const squirrel = document.createElement("div");
  squirrel.style.position = "absolute";
  squirrel.style.fontSize = `${Math.random() * 20 + 10}px`;
  squirrel.innerHTML = "🐿️";
  squirrel.style.opacity = "0.7";
  return squirrel;
}

// Helper function to add particle animations
function addParticleKeyframes() {
  const style = document.createElement("style");
  style.textContent = `
        @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
            100% { transform: translateY(0) rotate(360deg); }
        }
        
        @keyframes fade {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 0.3; }
        }
    `;
  document.head.appendChild(style);
}

// Create Memories Section
function createMemoriesSection() {
  const memoriesSection = createSection("memories", "");

  // Style the section
  memoriesSection.style.background = `
    linear-gradient(
      135deg, 
      #fff5f8 0%,
      #fff0f5 50%,
      #ffebf2 100%
    )
  `;
  memoriesSection.style.padding = "100px 20px";

  // Create slider container
  const sliderContainer = document.createElement("div");
  sliderContainer.style.width = "100%";
  sliderContainer.style.maxWidth = "1200px";
  sliderContainer.style.margin = "0 auto";
  sliderContainer.style.position = "relative";
  sliderContainer.style.overflow = "hidden";
  sliderContainer.style.borderRadius = "15px";
  sliderContainer.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";

  // Create slider
  const slider = document.createElement("div");
  slider.style.display = "flex";
  slider.style.transition = "transform 0.5s ease";
  slider.style.height = "80vh";

  // Create navigation buttons
  const prevButton = createNavButton("←");
  const nextButton = createNavButton("→");
  prevButton.style.left = "20px";
  nextButton.style.right = "20px";

  // Create gratitude note container
  const noteContainer = document.createElement("div");
  noteContainer.style.position = "absolute";
  noteContainer.style.bottom = "40px";
  noteContainer.style.left = "50%";
  noteContainer.style.transform = "translateX(-50%)";
  noteContainer.style.background = "rgba(255, 255, 255, 0.9)";
  noteContainer.style.padding = "20px";
  noteContainer.style.borderRadius = "10px";
  noteContainer.style.maxWidth = "80%";
  noteContainer.style.textAlign = "center";
  noteContainer.style.fontFamily = "'Dancing Script', cursive";
  noteContainer.style.fontSize = "1.5em";
  noteContainer.style.color = "#ff69b4";
  noteContainer.style.boxShadow = "0 4px 15px rgba(0,0,0,0.1)";

  // Add elements to container
  sliderContainer.appendChild(slider);
  sliderContainer.appendChild(prevButton);
  sliderContainer.appendChild(nextButton);
  sliderContainer.appendChild(noteContainer);
  memoriesSection.appendChild(sliderContainer);

  return memoriesSection;
}

// Helper function to create navigation buttons
function createNavButton(text) {
  const button = document.createElement("button");
  button.textContent = text;
  button.style.position = "absolute";
  button.style.top = "50%";
  button.style.transform = "translateY(-50%)";
  button.style.background = "rgba(255, 255, 255, 0.8)";
  button.style.border = "none";
  button.style.borderRadius = "50%";
  button.style.width = "50px";
  button.style.height = "50px";
  button.style.fontSize = "24px";
  button.style.cursor = "pointer";
  button.style.transition = "all 0.3s ease";
  button.style.zIndex = "2";

  button.addEventListener("mouseover", () => {
    button.style.background = "rgba(255, 105, 180, 0.8)";
    button.style.color = "white";
  });

  button.addEventListener("mouseout", () => {
    button.style.background = "rgba(255, 255, 255, 0.8)";
    button.style.color = "black";
  });

  return button;
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeMainContainer();
  createNavigation();
  createHeroSection();
  setupEventListeners();
  handleResponsiveLayout();
  loadCustomFonts();
  createMemoriesSection();
  displayMemories();
});

// Add at the top of your file or in the DOMContentLoaded event
function loadCustomFonts() {
  const fontLinks = [
    "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap",
    "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap",
  ];

  fontLinks.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  });
}

// Add this new function
function createScrollPrompt() {
  const arrow = document.createElement("div");
  arrow.style.cssText = `
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
    z-index: 10;
    text-align: center;
  `;

  const text = document.createElement("div");
  text.textContent = "View Memories";
  text.style.cssText = `
    color: #ff69b4;
    font-family: 'Quicksand', sans-serif;
    font-size: 1.2em;
    margin-bottom: 10px;
    font-weight: 600;
  `;

  const arrowSymbol = document.createElement("div");
  arrowSymbol.style.cssText = `
    width: 40px;
    height: 40px;
    border-right: 6px solid #ff69b4;
    border-bottom: 6px solid #ff69b4;
    transform: rotate(45deg);
    margin: 0 auto;
    animation: bounce 2s infinite;
  `;

  // Add bounce animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% {
        transform: rotate(45deg) translateY(0);
      }
      40% {
        transform: rotate(45deg) translateY(-20px);
      }
      60% {
        transform: rotate(45deg) translateY(-10px);
      }
    }
  `;
  document.head.appendChild(style);

  arrow.appendChild(text);
  arrow.appendChild(arrowSymbol);

  // Add click handler
  arrow.addEventListener("click", () => {
    const memoriesSection = document.querySelector("#memories");
    if (memoriesSection) {
      memoriesSection.scrollIntoView({ behavior: "smooth" });
      startFallingAnimation(); // Make sure this function is accessible
    }
  });

  return arrow;
}

// Modify the displayMemories function
function displayMemories() {
  const memoriesSection = document.querySelector("#memories");
  if (!memoriesSection) return;

  // Clear and style memories section
  memoriesSection.innerHTML = "";
  memoriesSection.style.position = "relative";
  memoriesSection.style.overflow = "hidden";
  memoriesSection.style.minHeight = "200vh";

  // Create container for falling photos
  const photoContainer = document.createElement("div");
  photoContainer.style.position = "absolute";
  photoContainer.style.top = "0";
  photoContainer.style.left = "0";
  photoContainer.style.width = "100%";
  photoContainer.style.height = "100%";
  memoriesSection.appendChild(photoContainer);

  // Create all photos but keep them hidden initially
  const photos = [];
  const totalImages = 49;

  for (let i = 1; i <= totalImages; i++) {
    const photo = createPhoto(i);
    photo.style.opacity = "0";
    photo.style.top = "-20%";
    photoContainer.appendChild(photo);
    photos.push(photo);
  }

  // Make startFallingAnimation available in wider scope
  window.startFallingAnimation = function () {
    if (window.animationStarted) return;
    window.animationStarted = true;

    photos.forEach((photo, index) => {
      photo.style.opacity = "1";
      photo.animate(
        [
          { top: "-20%", offset: 0 },
          { top: `${70 + Math.random() * 20}%`, offset: 1 },
        ],
        {
          duration: 3000 + Math.random() * 2000,
          delay: Math.random() * 5 * 1000,
          easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          fill: "forwards",
        }
      );
    });
  };

  // Remove the Intersection Observer

  // Update click handler for navigation link
  const memoriesLink = document.querySelector('a[href="#memories"]');
  if (memoriesLink) {
    memoriesLink.addEventListener("click", (e) => {
      e.preventDefault();
      memoriesSection.scrollIntoView({ behavior: "smooth" });
      window.startFallingAnimation();
    });
  }
}

// Helper function to create photo (moved outside displayMemories)
function createPhoto(index, totalImages = 49) {
  const photo = document.createElement("div");
  photo.className = "memory-photo";

  const rotation = Math.random() * 30 - 15;
  const scale = 0.8 + Math.random() * 0.4;
  const startX = Math.random() * 100;

  photo.style.cssText = `
    position: absolute;
    left: ${startX}%;
    transform: rotate(${rotation}deg) scale(${scale});
    width: 300px;
    height: 300px;
    background: white;
    padding: 10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
    cursor: pointer;
    z-index: 1;
  `;

  // Add hover effect
  photo.addEventListener("mouseover", () => {
    photo.style.transform = `rotate(${rotation}deg) scale(${scale * 1.1})`;
    photo.style.zIndex = "2";
    photo.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
  });

  photo.addEventListener("mouseout", () => {
    photo.style.transform = `rotate(${rotation}deg) scale(${scale})`;
    photo.style.zIndex = "1";
    photo.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
  });

  // Add click handler for fullscreen view
  photo.addEventListener("click", () => {
    showFullscreenView(index, totalImages);
  });

  const img = document.createElement("img");
  img.src = `./assets/images/${index}.jpeg`;
  img.style.cssText = `
    width: 100%;
    height: 100%;
    object-fit: cover;
  `;

  photo.appendChild(img);
  return photo;
}

function showFullscreenView(currentIndex, totalImages) {
  // Store original body style
  const originalStyle = window.getComputedStyle(document.body);
  const originalOverflow = originalStyle.overflow;

  // Prevent body scrolling
  document.body.style.overflow = "hidden";

  const fullscreen = document.createElement("div");
  fullscreen.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;

  // Create image container
  const imgContainer = document.createElement("div");
  imgContainer.style.cssText = `
    position: relative;
    max-width: 90%;
    max-height: 90vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  // Create image
  const fullImg = document.createElement("img");
  fullImg.src = `./assets/images/${currentIndex}.jpeg`;
  fullImg.style.cssText = `
    max-width: 100%;
    max-height: 90vh;
    object-fit: contain;
    margin: auto;
  `;

  // Create close button with mobile-friendly positioning
  const closeBtn = document.createElement("button");
  closeBtn.innerHTML = "×";
  closeBtn.style.cssText = `
    position: absolute;
    top: 10px;
    right: 10px;
    width: 44px;
    height: 44px;
    border: none;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 30px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    border-radius: 50%;
    z-index: 1002;
    padding: 0;
    line-height: 1;
  `;

  // Create navigation buttons with mobile-friendly styling
  const createNavButton = (text, isNext) => {
    const button = document.createElement("button");
    button.innerHTML = text;
    button.style.cssText = `
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(0, 0, 0, 0.5);
      border: none;
      color: white;
      font-size: 40px;
      cursor: pointer;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      border-radius: 50%;
      z-index: 1001;
      ${isNext ? "right: 10px" : "left: 10px"};
      padding: 0;
      line-height: 1;

      @media (min-width: 768px) {
        width: 60px;
        height: 60px;
        font-size: 50px;
        ${isNext ? "right: 20px" : "left: 20px"};
      }
    `;

    // Add hover effects for non-touch devices
    if (window.matchMedia("(hover: hover)").matches) {
      button.addEventListener("mouseover", () => {
        button.style.background = "rgba(0, 0, 0, 0.8)";
        button.style.transform = "translateY(-50%) scale(1.1)";
      });

      button.addEventListener("mouseout", () => {
        button.style.background = "rgba(0, 0, 0, 0.5)";
        button.style.transform = "translateY(-50%) scale(1)";
      });
    }

    return button;
  };

  const prevBtn = createNavButton("‹", false);
  const nextBtn = createNavButton("›", true);

  // Add navigation functionality
  const navigate = (direction) => {
    let newIndex = currentIndex + direction;
    if (newIndex < 1) newIndex = totalImages;
    if (newIndex > totalImages) newIndex = 1;
    fullImg.src = `./assets/images/${newIndex}.jpeg`;
    currentIndex = newIndex;
  };

  // Add touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  fullscreen.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    false
  );

  fullscreen.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    false
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        navigate(-1); // Swipe right = previous
      } else {
        navigate(1); // Swipe left = next
      }
    }
  }

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(-1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    navigate(1);
  });

  // Add keyboard navigation
  const handleKeydown = (e) => {
    if (e.key === "ArrowLeft") navigate(-1);
    if (e.key === "ArrowRight") navigate(1);
    if (e.key === "Escape") closeFullscreen();
  };

  document.addEventListener("keydown", handleKeydown);

  // Close fullscreen function
  const closeFullscreen = () => {
    document.removeEventListener("keydown", handleKeydown);
    // Restore original body overflow
    document.body.style.overflow = originalOverflow;
    fullscreen.remove();
  };

  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeFullscreen();
  });

  // Prevent closing when clicking the image
  imgContainer.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Close on background click
  fullscreen.addEventListener("click", closeFullscreen);

  // Append elements
  imgContainer.appendChild(fullImg);
  imgContainer.appendChild(closeBtn);
  imgContainer.appendChild(prevBtn);
  imgContainer.appendChild(nextBtn);
  fullscreen.appendChild(imgContainer);
  document.body.appendChild(fullscreen);
}
