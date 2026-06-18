document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. PREMIUM LOADING SCREEN TIMER
  // ==========================================
  const loader = document.getElementById('loader');
  
  window.addEventListener('load', () => {
    // Keep loader for 2 seconds to showcase the animation
    setTimeout(() => {
      loader.classList.add('fade-out');
      // Enable scroll once loader is gone
      document.body.style.overflow = 'auto';
      
      // Trigger animations for visible elements on load
      triggerScrollReveal();
    }, 2000);
  });
  
  // Fallback in case load event takes too long
  setTimeout(() => {
    if (!loader.classList.contains('fade-out')) {
      loader.classList.add('fade-out');
      document.body.style.overflow = 'auto';
      triggerScrollReveal();
    }
  }, 4000);


  // ==========================================
  // 2. THEME TOGGLE (DARK / LIGHT)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Set default theme or load saved
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Refresh canvas particle color styles on theme change
    initParticlesColors();
  });
  
  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }


  // ==========================================
  // 3. CURSOR GLOW EFFECT
  // ==========================================
  const cursorGlow = document.getElementById('cursor-glow');
  
  document.addEventListener('mousemove', (e) => {
    // Center the glow at mouse position
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });
  
  document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
  });


  // ==========================================
  // 4. NAVIGATION EFFECTS
  // ==========================================
  const header = document.querySelector('header');
  const navLinks = document.querySelector('.nav-links');
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const scrollProgress = document.getElementById('scroll-progress');
  
  // Scroll Listener for Navbar resize and progress indicator
  window.addEventListener('scroll', () => {
    // Shrink header on scroll
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Progress Indicator calculation
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll > 0) {
      const scrollPercent = (window.scrollY / totalScroll) * 100;
      scrollProgress.style.width = `${scrollPercent}%`;
    }
  });
  
  // Mobile Nav Toggle
  mobileNavToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileNavToggle.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.className = 'fas fa-times';
    } else {
      icon.className = 'fas fa-bars';
    }
  });
  
  // Close menu on click of navigation links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileNavToggle.querySelector('i').className = 'fas fa-bars';
    });
  });


  // ==========================================
  // 5. HERO TYPING EFFECT
  // ==========================================
  const typedTextSpan = document.querySelector('.typed-text');
  const textArray = ["Full Stack Developer", "Laravel Developer", "React Enthusiast", "AI Explorer", "UI/UX Lover"];
  const typingDelay = 100;
  const erasingDelay = 60;
  const newTextDelay = 1800; // Delay between words
  let textArrayIndex = 0;
  let charIndex = 0;
  
  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }
  
  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 300);
    }
  }
  
  // Start the typing animation
  setTimeout(type, 2200);


  // ==========================================
  // 6. CANVAS PARTICLES SYSTEM
  // ==========================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  
  let particlesArray = [];
  let particleColor = 'rgba(212, 175, 55, 0.15)'; // Gold tint
  let accentColor = 'rgba(139, 92, 246, 0.15)';   // Purple tint
  
  function initParticlesColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      particleColor = 'rgba(184, 134, 11, 0.15)';
      accentColor = 'rgba(109, 40, 217, 0.12)';
    } else {
      particleColor = 'rgba(212, 175, 55, 0.12)';
      accentColor = 'rgba(139, 92, 246, 0.12)';
    }
  }
  
  initParticlesColors();
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }
  
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      this.color = Math.random() > 0.4 ? particleColor : accentColor;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Bounce off borders
      if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
      if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  }
  
  function initParticles() {
    particlesArray = [];
    const count = Math.floor((canvas.width * canvas.height) / 14000); // Responsive amount
    for (let i = 0; i < count; i++) {
      particlesArray.push(new Particle());
    }
  }
  
  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    
    requestAnimationFrame(animateParticles);
  }
  
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  animateParticles();


  // ==========================================
  // 7. INTERACTIVE SKILLS CIRCULAR INDICATORS
  // ==========================================
  const progressCircles = document.querySelectorAll('.circle-progress');
  
  function animateSkillsProgress() {
    progressCircles.forEach(circle => {
      const parent = circle.closest('.skill-circular-item');
      const valElement = parent.querySelector('.skill-circle-value');
      const targetPercent = parseInt(valElement.dataset.val);
      
      // Calculate SVG dashoffset (circumference = 2 * Math.PI * 40 = 251.2)
      const circumference = 251.2;
      const offset = circumference - (targetPercent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    });
  }


  // ==========================================
  // 8. VIEWPORT STATISTICS COUNT-UP & CIRCULAR PROGRESS TRIGGER
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;
  
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.target);
          const suffix = stat.dataset.suffix || '';
          animateCounter(stat, target, suffix);
        });
        statsAnimated = true;
      }
    });
  }, { threshold: 0.5 });
  
  // Observe about-right stats container
  const statsSection = document.querySelector('.about-right-grid');
  if (statsSection) statsObserver.observe(statsSection);
  
  function animateCounter(element, target, suffix) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;
    
    const counterTimer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(counterTimer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, stepTime);
  }

  // Observe skills section to trigger circles
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillsProgress();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  
  const skillsGrid = document.querySelector('.skills-grid');
  if (skillsGrid) skillsObserver.observe(skillsGrid);


  // ==========================================
  // 9. 3D HOVER TILT & SPOTLIGHT ON PROJECT CARDS
  // ==========================================
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Spotlight coordinates update
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      
      // Calculate 3D tilt angles
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const tiltX = (y - centerY) / 12; // tilt angle factor
      const tiltY = (centerX - x) / 12; // tilt angle factor
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });


  // ==========================================
  // 10. SCROLL REVEAL ANIMATIONS
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        // Stop observing once animated
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  function triggerScrollReveal() {
    // Check initial layout visibility
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add('reveal-visible');
      }
    });
  }


  // ==========================================
  // 11. CONTACT FORM HANDLER WITH FEEDBACK ANIMATION
  // ==========================================
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const sendBtn = contactForm.querySelector('.btn-send');
  const sendBtnIcon = sendBtn.querySelector('i');
  const sendBtnText = sendBtn.querySelector('span');
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Clear feedback
    formFeedback.className = 'form-feedback';
    formFeedback.style.display = 'none';
    
    if (!name || !email || !subject || !message) {
      showFeedback("Please fill out all input fields.", "error");
      return;
    }
    
    // Simulate API Submission
    sendBtn.disabled = true;
    sendBtnText.textContent = "Sending...";
    sendBtnIcon.className = "fas fa-spinner fa-spin";
    
    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtnText.textContent = "Send Message";
      sendBtnIcon.className = "fas fa-paper-plane";
      
      // Successfully submitted
      showFeedback("Message sent successfully! Let's build something amazing.", "success");
      contactForm.reset();
    }, 1800);
  });
  
  function showFeedback(text, status) {
    formFeedback.textContent = text;
    formFeedback.className = `form-feedback ${status}`;
    formFeedback.style.display = 'block';
  }

  // ==========================================
  // 12. DEMO STAGING NOTIFICATION
  // ==========================================
  const demoLinks = document.querySelectorAll('.demo-link');
  
  demoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showToast("🔔 Staging: This project's live demo is currently offline. Source code is available on GitHub!");
    });
  });
  
  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      document.body.appendChild(toast);
    }
    
    toast.textContent = message;
    toast.className = 'show';
    
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    
    toast.timeoutId = setTimeout(() => {
      toast.className = '';
    }, 4000);
  }
});
