// Global Variables
let typed;
let musicPlaying = false;
const backgroundMusic = document.getElementById("background-music");

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initializePreloader();
  initializeParticles();
  initializeTypedAnimation();
  initializeThemeToggle();
  initializeMusicToggle();
  initializeNavigation();
  initializeScrollEffects();
  initializeSkillBars();
  initializeContactForm();
  initializeAOS();

  // Remove preloader after everything loads
  setTimeout(() => {
    document.body.classList.add("loaded");
  }, 2000);
});

// Preloader
function initializePreloader() {
  const preloader = document.getElementById("preloader");
  const progressBar = document.querySelector(".loading-progress");

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    progressBar.style.width = progress + "%";
  }, 100);
}

// Particles Background
function initializeParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: [
            "#ff6b6b",
            "#4ecdc4",
            "#45b7d1",
            "#a55eea",
            "#feca57",
            "#fd9644",
          ],
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ff6b6b",
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: ["repulse", "bubble"],
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 60,
            duration: 2,
            opacity: 0.8,
            speed: 3,
          },
          repulse: {
            distance: 150,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// Typed Animation
function initializeTypedAnimation() {
  if (typeof Typed !== "undefined") {
    typed = new Typed("#typed-text", {
      strings: [
        "BCA Student",
        "Tech Enthusiast",
        "Creative Learner",
        "Problem Solver",
        "Digital Innovator",
      ],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
  }
}

// Theme Toggle
function initializeThemeToggle() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = themeToggle.querySelector("i");

  // Check for saved theme preference or default to 'light'
  const currentTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", currentTheme);

  // Update icon based on current theme
  updateThemeIcon(currentTheme, themeIcon);

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeIcon(newTheme, themeIcon);

    // Restart particles with new theme
    setTimeout(() => {
      if (typeof particlesJS !== "undefined") {
        initializeParticles();
      }
    }, 300);
  });
}

function updateThemeIcon(theme, icon) {
  icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
}

// Music Toggle
function initializeMusicToggle() {
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = musicToggle.querySelector("i");

  musicToggle.addEventListener("click", () => {
    if (musicPlaying) {
      backgroundMusic.pause();
      musicIcon.className = "fas fa-volume-mute";
      musicToggle.classList.remove("playing");
    } else {
      backgroundMusic.play().catch((e) => {
        console.log("Could not play background music:", e);
      });
      musicIcon.className = "fas fa-volume-up";
      musicToggle.classList.add("playing");
    }
    musicPlaying = !musicPlaying;
  });

  // Handle music ended event
  backgroundMusic.addEventListener("ended", () => {
    musicPlaying = false;
    musicIcon.className = "fas fa-volume-mute";
    musicToggle.classList.remove("playing");
  });
}

// Navigation
function initializeNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("header");

  // Mobile menu toggle
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show");
  });

  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });

  // Close menu when clicking nav link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        header.style.background = "rgba(15, 23, 42, 0.95)";
      }
    } else {
      header.style.background = "rgba(255, 255, 255, 0.1)";
      if (document.documentElement.getAttribute("data-theme") === "dark") {
        header.style.background = "rgba(15, 23, 42, 0.9)";
      }
    }
  });

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Scroll Effects
function initializeScrollEffects() {
  const backToTopBtn = document.getElementById("back-to-top");

  // Back to top button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Active navigation link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightNavLink);
}

// Skill Bars Animation
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");
  const skillSection = document.getElementById("skills");
  const skillCards = document.querySelectorAll(".skill-card");

  const animateSkillBars = () => {
    const sectionTop = skillSection.offsetTop;
    const sectionHeight = skillSection.offsetHeight;
    const scrollY = window.pageYOffset + window.innerHeight;

    if (scrollY > sectionTop) {
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = width;
      });

      // Add staggered animation to skill cards
      skillCards.forEach((card, index) => {
        setTimeout(() => {
          card.style.transform = "translateY(0)";
          card.style.opacity = "1";
        }, index * 100);
      });

      // Remove event listener after animation
      window.removeEventListener("scroll", animateSkillBars);
    }
  };

  // Initialize skill cards
  skillCards.forEach((card) => {
    card.style.transform = "translateY(50px)";
    card.style.opacity = "0";
    card.style.transition = "all 0.6s ease";
  });

  window.addEventListener("scroll", animateSkillBars);
}

// Contact Form
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  const formInputs = contactForm.querySelectorAll("input, textarea");

  // Add floating label effect
  formInputs.forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.value !== "") {
        input.classList.add("filled");
      } else {
        input.classList.remove("filled");
      }
    });

    // Check initial state
    if (input.value !== "") {
      input.classList.add("filled");
    }
  });

  // Form submission
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      // Show success message
      showNotification("Message sent successfully!", "success");

      // Reset form
      contactForm.reset();
      formInputs.forEach((input) => {
        input.classList.remove("filled");
      });

      // Reset button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <i class="fas ${
          type === "success" ? "fa-check-circle" : "fa-info-circle"
        }"></i>
        <span>${message}</span>
    `;

  // Add notification styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success" ? "var(--success-color)" : "var(--primary-color)"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-heavy);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// AOS Animation Library
function initializeAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1200,
      once: true,
      offset: 50,
      delay: 100,
      easing: "ease-out-cubic",
    });
  }
}

// Enhanced Scroll Effects with Color Changes
function initializeEnhancedScrollEffects() {
  const sections = document.querySelectorAll("section");
  const colors = [
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#a55eea",
    "#feca57",
    "#fd9644",
    "#ff9ff3",
    "#10b981",
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const color = colors[index % colors.length];
          document.documentElement.style.setProperty("--dynamic-color", color);

          // Add floating elements
          createFloatingElements(color);
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));
}

// Create Floating Elements
function createFloatingElements(color) {
  for (let i = 0; i < 3; i++) {
    const element = document.createElement("div");
    element.style.cssText = `
            position: fixed;
            width: ${Math.random() * 20 + 10}px;
            height: ${Math.random() * 20 + 10}px;
            background: ${color};
            border-radius: 50%;
            opacity: 0.6;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: floatAway 4s ease-out forwards;
        `;

    document.body.appendChild(element);

    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }, 4000);
  }
}

// Initialize enhanced effects
document.addEventListener("DOMContentLoaded", function () {
  // ... existing initialization code ...
  initializeEnhancedScrollEffects();
});

// Resume Download
document.addEventListener("DOMContentLoaded", () => {
  const resumeButtons = document.querySelectorAll(
    "#download-resume, #resume-download"
  );

  resumeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      showNotification("Resume download will be available soon!", "info");

      // Here you would typically trigger the actual download
      // For now, we'll just show a message
      setTimeout(() => {
        // Simulate download
        const link = document.createElement("a");
        link.href = "#"; // Replace with actual resume URL
        link.download = "Saddam_Hossain_Resume.pdf";
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
      }, 1000);
    });
  });
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".fade-in, .slide-up");
  animateElements.forEach((el) => {
    observer.observe(el);
  });
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const navMenu = document.getElementById("nav-menu");
    navMenu.classList.remove("show");
  }

  // Space bar toggles music
  if (e.code === "Space" && e.target === document.body) {
    e.preventDefault();
    document.getElementById("music-toggle").click();
  }
});

// Performance Optimization
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Optimized scroll events
const optimizedScroll = debounce(() => {
  // Handle scroll events here
}, 10);

window.addEventListener("scroll", optimizedScroll);

// Add custom CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes floatAway {
        0% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100vh) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Console Welcome Message
console.log(
  `
%c🚀 Welcome to Saddam Hossain's Enhanced Portfolio! 
%c💻 Built with cutting-edge web technologies
%c🎨 Featuring vibrant animations and colors
%c📱 Fully responsive with stunning visuals
%c⚡ Optimized for performance and beauty
%c🌈 Enhanced with colorful interactions

Feel free to explore the code and reach out if you have any questions!
`,
  "color: #ff6b6b; font-size: 16px; font-weight: bold;",
  "color: #4ecdc4; font-size: 14px;",
  "color: #45b7d1; font-size: 14px;",
  "color: #10b981; font-size: 14px;",
  "color: #feca57; font-size: 14px;",
  "color: #a55eea; font-size: 14px;"
);
