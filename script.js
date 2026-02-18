// ========== script.js ==========
document.addEventListener('DOMContentLoaded', function() {
  // Sticky navbar
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Floating labels
  const inputGroups = document.querySelectorAll('.input-group');
  inputGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    if (input) {
      input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
          group.classList.add('filled');
        } else {
          group.classList.remove('filled');
        }
      });
      // Check on load in case of browser autofill
      if (input.value.trim() !== '') group.classList.add('filled');
    }
  });

  // Typing animation for subtitle on index page
  const typingElement = document.getElementById('typing-subtitle');
  if (typingElement) {
    const phrases = [
      'Luxury Custom Pools in Houston',
      'Designed. Engineered. Perfected.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentPhrase = phrases[phraseIndex];
      if (!isDeleting && charIndex <= currentPhrase.length) {
        typingElement.textContent = currentPhrase.substring(0, charIndex);
        charIndex++;
        setTimeout(typeEffect, 80);
      } else if (isDeleting && charIndex >= 0) {
        typingElement.textContent = currentPhrase.substring(0, charIndex);
        charIndex--;
        setTimeout(typeEffect, 40);
      } else {
        if (!isDeleting && charIndex > currentPhrase.length) {
          // pause
          isDeleting = true;
          setTimeout(typeEffect, 1500);
        } else if (isDeleting && charIndex < 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          charIndex = 0;
          setTimeout(typeEffect, 400);
        } else {
          setTimeout(typeEffect, 60);
        }
      }
    }
    typeEffect();
  }

  // Scroll reveal (fade-up)
  const fadeElements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
  fadeElements.forEach(el => observer.observe(el));

  // Gallery filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (filterBtns.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.getAttribute('data-filter');
        galleryItems.forEach(item => {
          if (filter === 'all' || item.classList.contains(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Simple form submission prevention (just for demo)
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for your interest. A design consultant will contact you within 24 hours.');
      form.reset();
      inputGroups.forEach(g => g.classList.remove('filled'));
    });
  });

  // Mobile menu toggle (simple expand/collapse for demo)
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navCta = document.querySelector('.nav-cta');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
        navCta.style.display = 'none';
      } else {
        navLinks.style.display = 'flex';
        navCta.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navCta.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '60px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(255,255,255,0.95)';
        navLinks.style.padding = '1rem';
        navCta.style.position = 'absolute';
        navCta.style.top = '200px';
        navCta.style.left = '0';
        navCta.style.width = '100%';
        navCta.style.padding = '1rem';
        navCta.style.background = 'rgba(255,255,255,0.95)';
      }
    });
  }
});
