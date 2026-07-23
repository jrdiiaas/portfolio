/* ==========================================================================
   MEGA FRETE TRANSPORTES - JAVASCRIPT & SCROLL ANIMATION MASCOT
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

  // 3. Floating Animated 3D Mascot Scroll Tracker
  const floatingWidget = document.getElementById('floating-mascot-widget');
  const mascotImg = document.getElementById('floating-mascot-img');
  const mascotSpeech = document.getElementById('mascot-speech');

  let lastScrollY = window.scrollY;
  let bubbleTimeout;

  const messagesBySection = {
    'inicio': 'Olá! Sua entrega em boas mãos! 🚚',
    'atendimento': 'Fale direto no WhatsApp do setor desejado! 💬',
    'missao-visao': '15 anos de agilidade, segurança e qualidade! 🏆',
    'frota': 'Frota própria com rastreamento 24h! 🚛',
    'contato': 'Visite nossa sede no Parque Albano, Caucaia! 📍'
  };

  function updateMascotOnScroll() {
    const currentScrollY = window.scrollY;
    const scrollDelta = currentScrollY - lastScrollY;

    // Slight tilt rotation based on scroll direction
    if (mascotImg) {
      const tilt = Math.max(-12, Math.min(12, scrollDelta * 0.8));
      mascotImg.style.transform = `translateY(-4px) rotate(${tilt}deg)`;
      
      clearTimeout(mascotImg.tiltTimeout);
      mascotImg.tiltTimeout = setTimeout(() => {
        mascotImg.style.transform = 'translateY(0) rotate(0deg)';
      }, 200);
    }

    // Determine current section message
    let activeMessage = 'Sua entrega é a nossa missão! 📦';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom >= window.innerHeight * 0.2) {
        const id = section.getAttribute('id');
        if (messagesBySection[id]) {
          activeMessage = messagesBySection[id];
        }
      }
    });

    if (mascotSpeech) {
      mascotSpeech.textContent = activeMessage;
      mascotSpeech.classList.add('show');

      clearTimeout(bubbleTimeout);
      bubbleTimeout = setTimeout(() => {
        mascotSpeech.classList.remove('show');
      }, 3000);
    }

    lastScrollY = currentScrollY;
  }

  window.addEventListener('scroll', updateMascotOnScroll, { passive: true });

  // Initial trigger for mascot
  setTimeout(() => {
    if (mascotSpeech) {
      mascotSpeech.classList.add('show');
      setTimeout(() => mascotSpeech.classList.remove('show'), 3500);
    }
  }, 1000);
});
