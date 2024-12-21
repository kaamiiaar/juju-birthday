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
  const sections = [
    "Home",
    "Timeline",
    "Gallery",
    "Memories",
    "Messages",
    "Countdown",
  ];
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
  heroSection.style.background = "linear-gradient(135deg, #ffebf2, #fff0f5)";
  heroSection.style.position = "relative";
  heroSection.style.overflow = "hidden";

  // Create content wrapper
  const content = document.createElement("div");
  content.style.position = "relative";
  content.style.zIndex = "2";
  content.style.textAlign = "center";
  content.style.maxWidth = "800px";
  content.style.margin = "0 auto";
  content.style.padding = "20px";

  // Create greeting text
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

  // Create message container
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
  heroSection.appendChild(content);

  // Add background particles
  createParticleBackground(heroSection);

  // Trigger animations after a short delay
  setTimeout(() => {
    greeting.style.opacity = "1";
    greeting.style.transform = "translateY(0)";
    messageContainer.style.opacity = "1";
    messageContainer.style.transform = "translateY(0)";
    animateWelcomeMessage(messageContainer);
  }, 500);

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
  const layers = createParallaxLayers();
  layers.forEach((layer) => heroSection.appendChild(layer));

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    layers.forEach((layer, index) => {
      const speed = (index + 1) * 0.2;
      const yPos = -(scrolled * speed);
      layer.style.transform = `translateY(${yPos}px)`;
    });
  });
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

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeMainContainer();
  createNavigation();
  createHeroSection();
  setupEventListeners();
  handleResponsiveLayout();
  loadCustomFonts();
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
