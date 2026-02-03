// ============================================
// PORTFOLIO AGUNG UBAIDILLAH - MAIN SCRIPT
// ============================================

// Configuration
const CONFIG = {
  whatsappNumber: "6283148584061",
  email: "agungubaidillah50@gmail.com",
  website: "s.id/websiteagungubaidillah",
  owner: "Agung Ubaidillah",
  position: "Web Developer & IT Specialist",
};

// Initialize application
document.addEventListener("DOMContentLoaded", function () {
  console.log(`${CONFIG.owner} Portfolio - Initializing...`);

  // Initialize all modules
  initLoadingScreen();
  initNavigation();
  initThemeToggle();
  initTypewriter();
  initProfileImage();
  initSkillBars();
  initContactForm();
  initBackToTop();
  initCurrentYear();
  initScrollSpy();
  initAnimations();

  // Log initialization
  console.log(`Website: ${CONFIG.website}`);
  console.log(`Owner: ${CONFIG.owner}`);
  console.log(`Position: ${CONFIG.position}`);
  console.log("Portfolio initialized successfully!");
});

// ============================================
// LOADING SCREEN
// ============================================

function initLoadingScreen() {
  const loadingScreen = document.getElementById("loadingScreen");

  // Hide loading screen after 1.5 seconds
  setTimeout(() => {
    loadingScreen.classList.add("hidden");

    // Remove from DOM after animation
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 1500);
}

// ============================================
// NAVIGATION SYSTEM
// ============================================

function initNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const mobileOverlay = document.getElementById("mobileOverlay");
  const body = document.body;
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  function toggleMenu() {
    const isActive = navMenu.classList.contains("active");

    // Toggle menu state
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
    mobileOverlay.classList.toggle("active");
    body.classList.toggle("menu-open", !isActive);

    // Update ARIA attributes
    menuToggle.setAttribute("aria-expanded", !isActive);

    // Prevent body scroll when menu is open
    if (!isActive) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }

  // Close mobile menu
  function closeMenu() {
    navMenu.classList.remove("active");
    menuToggle.classList.remove("active");
    mobileOverlay.classList.remove("active");
    body.classList.remove("menu-open");
    body.style.overflow = "";
    menuToggle.setAttribute("aria-expanded", "false");
  }

  // Event Listeners
  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMenu);
  }

  // Close menu when clicking on nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Close menu on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Navbar scroll effect
  function handleNavbarScroll() {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavbarScroll);
  handleNavbarScroll(); // Initial check
}

// ============================================
// THEME TOGGLE
// ============================================

function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle?.querySelector("i");

  // Check for saved theme or prefer color scheme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // Set initial theme
  if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
    document.documentElement.setAttribute("data-theme", "light");
    if (themeIcon) {
      themeIcon.className = "fas fa-sun";
      themeToggle.setAttribute("aria-label", "Switch to dark mode");
    }
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    if (themeIcon) {
      themeIcon.className = "fas fa-moon";
      themeToggle.setAttribute("aria-label", "Switch to light mode");
    }
  }

  // Toggle theme function
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Apply new theme
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Update icon and label
    if (themeIcon) {
      if (newTheme === "light") {
        themeIcon.className = "fas fa-sun";
        themeToggle.setAttribute("aria-label", "Switch to dark mode");
      } else {
        themeIcon.className = "fas fa-moon";
        themeToggle.setAttribute("aria-label", "Switch to light mode");
      }
    }

    // Show notification
    showToast(`Switched to ${newTheme} mode`, "info");
  }

  // Event listener
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
}

// ============================================
// TYPEWRITER EFFECT
// ============================================

function initTypewriter() {
  const typewriterText = document.querySelector(".typewriter-text");
  if (!typewriterText) return;

  const texts = [
    "Web Developer",
    "IT Specialist",
    "Problem Solver",
    "Tech Enthusiast",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      // Deleting text
      typewriterText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Typing text
      typewriterText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    // Speed variation
    let typeSpeed = 100;

    if (isDeleting) {
      typeSpeed /= 2;
    }

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at end
      isEnd = true;
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // Start typewriter effect after 1 second
  setTimeout(() => {
    type();
  }, 1000);
}

// ============================================
// PROFILE IMAGE HANDLING
// ============================================

function initProfileImage() {
  const profileImage = document.getElementById("profileImage");
  const imageFallback = document.getElementById("imageFallback");

  if (!profileImage || !imageFallback) return;

  // Check if image loads successfully
  profileImage.addEventListener("load", function () {
    console.log("Profile image loaded successfully");
    imageFallback.style.display = "none";
    profileImage.style.display = "block";
  });

  // Handle image error
  profileImage.addEventListener("error", function () {
    console.log("Profile image failed to load, showing fallback");
    profileImage.style.display = "none";
    imageFallback.style.display = "flex";

    // Show notification
    showToast(
      "Profile image not found. Please add your photo to assets/img/agung.jpg",
      "warning"
    );
  });

  // Check image status on load
  if (profileImage.complete) {
    if (profileImage.naturalHeight === 0) {
      // Image failed to load
      profileImage.dispatchEvent(new Event("error"));
    }
  }
}

// ============================================
// SKILL BARS ANIMATION
// ============================================

function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress");

  if (skillBars.length === 0) return;

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.getAttribute("data-width") || "0";

          // Animate progress bar
          setTimeout(() => {
            progressBar.style.width = `${width}%`;
          }, 300);

          // Stop observing after animation
          observer.unobserve(progressBar);
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe each skill bar
  skillBars.forEach((bar) => {
    observer.observe(bar);
  });
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) return;

  // Form elements
  const nameInput = document.getElementById("contactName");
  const emailInput = document.getElementById("contactEmail");
  const subjectInput = document.getElementById("contactSubject");
  const messageInput = document.getElementById("contactMessage");
  const submitBtn = contactForm.querySelector(".submit-btn");
  const spinner = submitBtn?.querySelector(".spinner");

  // Validation patterns
  const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    subject: /^.{5,100}$/,
    message: /^.{10,1000}$/,
  };

  // Error messages
  const errorMessages = {
    name: "Please enter a valid name (2-50 characters, letters and spaces only)",
    email: "Please enter a valid email address",
    subject: "Subject must be 5-100 characters long",
    message: "Message must be 10-1000 characters long",
  };

  // Validate field
  function validateField(field, pattern) {
    const value = field.value.trim();
    const isValid = pattern.test(value);

    // Get error element
    const errorId = field.id + "Error";
    const errorElement = document.getElementById(errorId);

    if (errorElement) {
      if (!isValid && value !== "") {
        errorElement.textContent = errorMessages[field.name];
        errorElement.classList.add("show");
        field.classList.add("error");
      } else {
        errorElement.classList.remove("show");
        field.classList.remove("error");
      }
    }

    return isValid;
  }

  // Validate all fields
  function validateForm() {
    const isNameValid = validateField(nameInput, patterns.name);
    const isEmailValid = validateField(emailInput, patterns.email);
    const isSubjectValid = validateField(subjectInput, patterns.subject);
    const isMessageValid = validateField(messageInput, patterns.message);

    return isNameValid && isEmailValid && isSubjectValid && isMessageValid;
  }

  // Real-time validation
  [nameInput, emailInput, subjectInput, messageInput].forEach((field) => {
    if (field) {
      field.addEventListener("input", function () {
        const pattern = patterns[this.name];
        if (pattern) {
          validateField(this, pattern);
        }
      });

      field.addEventListener("blur", function () {
        const pattern = patterns[this.name];
        if (pattern) {
          validateField(this, pattern);
        }
      });
    }
  });

  // Form submission
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    // Get form data
    const formData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      subject: subjectInput.value.trim(),
      message: messageInput.value.trim(),
      timestamp: new Date().toISOString(),
    };

    // Show loading state
    if (submitBtn && spinner) {
      submitBtn.classList.add("loading");
      submitBtn.disabled = true;
    }

    try {
      // Create WhatsApp message
      const whatsappMessage =
        `*New Message from Portfolio Website*\n\n` +
        `*Name:* ${formData.name}\n` +
        `*Email:* ${formData.email}\n` +
        `*Subject:* ${formData.subject}\n` +
        `*Message:* ${formData.message}\n\n` +
        `_Sent from ${CONFIG.website}_`;

      // Encode message for URL
      const encodedMessage = encodeURIComponent(whatsappMessage);

      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");

      // Show success message
      showToast("Opening WhatsApp... Please send your message.", "success");

      // Reset form
      contactForm.reset();

      // Remove validation errors
      document.querySelectorAll(".error-message").forEach((el) => {
        el.classList.remove("show");
      });
      document.querySelectorAll(".error").forEach((el) => {
        el.classList.remove("error");
      });
    } catch (error) {
      console.error("Form submission error:", error);
      showToast("An error occurred. Please try again.", "error");
    } finally {
      // Remove loading state
      if (submitBtn && spinner) {
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
      }
    }
  });

  // Auto-resize textarea
  if (messageInput) {
    messageInput.addEventListener("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  }
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  function toggleBackToTop() {
    if (window.scrollY > 500) {
      backToTopBtn.style.opacity = "1";
      backToTopBtn.style.visibility = "visible";
      backToTopBtn.style.transform = "translateY(0)";
    } else {
      backToTopBtn.style.opacity = "0";
      backToTopBtn.style.visibility = "hidden";
      backToTopBtn.style.transform = "translateY(20px)";
    }
  }

  // Smooth scroll to top
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Event listeners
  window.addEventListener("scroll", toggleBackToTop);
  backToTopBtn.addEventListener("click", scrollToTop);

  // Initial state
  toggleBackToTop();
}

// ============================================
// CURRENT YEAR IN FOOTER
// ============================================

function initCurrentYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// ============================================
// SCROLL SPY FOR NAVIGATION
// ============================================

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (sections.length === 0 || navLinks.length === 0) return;

  function updateActiveLink() {
    let current = "";
    const scrollPosition = window.scrollY + 100;

    // Find current section
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    // Update active link
    navLinks.forEach((link) => {
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if (href === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  // Update on scroll
  window.addEventListener("scroll", updateActiveLink);

  // Initial update
  updateActiveLink();
}

// ============================================
// ANIMATIONS ON SCROLL
// ============================================

function initAnimations() {
  // Elements to animate
  const animatedElements = document.querySelectorAll(
    ".hero-badge, .hero-title, .hero-subtitle, " +
      ".hero-description, .hero-stats, .hero-actions, " +
      ".info-card, .education-card, .stat-card, " +
      ".category-card, .timeline-item, .contact-item"
  );

  if (animatedElements.length === 0) return;

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Observe each element
  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero-badge { animation-delay: 0.1s; }
        .hero-title { animation-delay: 0.2s; }
        .hero-subtitle { animation-delay: 0.3s; }
        .hero-description { animation-delay: 0.4s; }
        .hero-stats { animation-delay: 0.5s; }
        .hero-actions { animation-delay: 0.6s; }
        
        .info-card:nth-child(1) { animation-delay: 0.1s; }
        .info-card:nth-child(2) { animation-delay: 0.2s; }
        .education-card { animation-delay: 0.3s; }
        
        .stat-card:nth-child(1) { animation-delay: 0.1s; }
        .stat-card:nth-child(2) { animation-delay: 0.2s; }
        .stat-card:nth-child(3) { animation-delay: 0.3s; }
        .stat-card:nth-child(4) { animation-delay: 0.4s; }
        
        .timeline-item:nth-child(1) { animation-delay: 0.1s; }
        .timeline-item:nth-child(2) { animation-delay: 0.2s; }
        .timeline-item:nth-child(3) { animation-delay: 0.3s; }
        
        .contact-item:nth-child(1) { animation-delay: 0.1s; }
        .contact-item:nth-child(2) { animation-delay: 0.2s; }
        .contact-item:nth-child(3) { animation-delay: 0.3s; }
    `;
  document.head.appendChild(style);
}

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================

function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  // Create toast element
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  // Icons for each type
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    warning: "fas fa-exclamation-triangle",
    info: "fas fa-info-circle",
  };

  // Toast content
  toast.innerHTML = `
        <div class="toast-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="toast-content">
            <div class="toast-title">${
              type.charAt(0).toUpperCase() + type.slice(1)
            }</div>
            <p class="toast-message">${message}</p>
        </div>
        <button class="toast-close" aria-label="Close notification">
            <i class="fas fa-times"></i>
        </button>
    `;

  // Add to container
  toastContainer.appendChild(toast);

  // Auto remove after 5 seconds
  const autoRemove = setTimeout(() => {
    removeToast(toast);
  }, 5000);

  // Close button event
  const closeBtn = toast.querySelector(".toast-close");
  closeBtn.addEventListener("click", () => {
    clearTimeout(autoRemove);
    removeToast(toast);
  });

  // Remove toast function
  function removeToast(toastElement) {
    toastElement.classList.add("hiding");
    setTimeout(() => {
      if (toastElement.parentNode) {
        toastElement.parentNode.removeChild(toastElement);
      }
    }, 300);
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function for performance
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Smooth scroll to element
function smoothScrollTo(element) {
  if (!element) return;

  const targetPosition = element.offsetTop - 80;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800;
  let start = null;

  function animation(currentTime) {
    if (start === null) start = currentTime;
    const timeElapsed = currentTime - start;
    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// ============================================
// ERROR HANDLING
// ============================================

// Global error handler
window.addEventListener("error", function (e) {
  console.error("Global error:", e.error);
  showToast("An error occurred. Please refresh the page.", "error");
});

// Unhandled promise rejection handler
window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled promise rejection:", e.reason);
  showToast("An error occurred. Please try again.", "error");
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Lazy load images
function initLazyLoading() {
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll("img.lazy").forEach((img) => {
      imageObserver.observe(img);
    });
  }
}

// Initialize lazy loading
initLazyLoading();

// ============================================
// ANALYTICS (Basic)
// ============================================

function initAnalytics() {
  // Track page view
  console.log(`Page viewed: ${window.location.pathname}`);

  // Track time on page
  let startTime = Date.now();

  window.addEventListener("beforeunload", () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    console.log(`Time spent on page: ${timeSpent} seconds`);
  });

  // Track external link clicks
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (
      link &&
      link.href &&
      link.href.includes("//") &&
      !link.href.includes(window.location.hostname)
    ) {
      console.log(`External link clicked: ${link.href}`);
    }
  });
}

// Initialize analytics
initAnalytics();

// ============================================
// SERVICE WORKER (PWA Support)
// ============================================

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("ServiceWorker registration successful");
      })
      .catch((err) => {
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}

// ============================================
// OFFLINE DETECTION
// ============================================

function initOfflineDetection() {
  function updateOnlineStatus() {
    if (!navigator.onLine) {
      showToast("You are offline. Some features may not work.", "warning");
    }
  }

  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);

  // Initial check
  updateOnlineStatus();
}

// Initialize offline detection
initOfflineDetection();
