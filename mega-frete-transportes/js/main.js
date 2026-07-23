/* ==========================================================================
   MEGA FRETE TRANSPORTES - JAVASCRIPT & FUTURISTIC 3D SCROLL ANIMATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (mobileToggle.querySelector('i')) {
          mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        }
      });
    });
  }

  // 2. Header Scroll Shadow & Active Link Highlight
  const header = document.querySelector('.header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active Section Highlight
    let currentScroll = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const link = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);

      if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link?.classList.add('active');
      }
    });
  });

  // 3. Futuristic 3D Parallax Perspective Scroll Animation on Mascot
  const mascotImg = document.getElementById('hero-mascot-img');
  const mascotContainer = document.getElementById('hero-mascot-container');

  if (mascotImg && mascotContainer) {
    window.addEventListener('scroll', () => {
      const rect = mascotContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Only calculate when element is in viewport
      if (rect.top < viewportHeight && rect.bottom > 0) {
        // Calculate scroll progress ratio (0 to 1)
        const scrollPercent = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        
        // Futuristic 3D perspective rotation math
        const rotateX = (scrollPercent - 0.5) * 30; // Smooth forward/backward tilt
        const rotateY = (scrollPercent - 0.5) * -20; // Subtle side 3D turn
        const translateY = (scrollPercent - 0.5) * -35; // Parallax depth float
        const scale = 0.96 + (Math.sin(scrollPercent * Math.PI) * 0.08); // Subtle depth pulse

        mascotImg.style.transform = `translate3d(0, ${translateY}px, 0) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
      }
    }, { passive: true });
  }
});
