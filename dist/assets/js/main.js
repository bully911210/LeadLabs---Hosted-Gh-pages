// LeadLabs - Main JavaScript

(function() {
  'use strict';

  // Carousel initialization and management
  function initCarousels() {
    // Client Logo Carousel
    const clientCarousel = document.querySelector('.client-carousel .carousel-track');
    if (clientCarousel) {
      const clientImages = Array.from(clientCarousel.querySelectorAll('img'));
      const gap = 48; // matches CSS gap
      let clientAnimationId = null;
      let clientOffset = 0;
      
      function animateClientCarousel() {
        const totalItems = clientImages.length / 2; // We have duplicates
        let totalWidth = 0;
        
        // Calculate total width of unique items plus gaps
        for (let i = 0; i < totalItems; i++) {
          totalWidth += clientImages[i].offsetWidth + gap;
        }
        
        // Smooth continuous animation
        clientOffset -= 0.5; // Speed of animation
        
        // Reset when we've scrolled half the track (where duplicates start)
        if (Math.abs(clientOffset) >= totalWidth) {
          clientOffset = 0;
        }
        
        clientCarousel.style.transform = `translateX(${clientOffset}px)`;
        clientAnimationId = requestAnimationFrame(animateClientCarousel);
      }
      
      // Pause on hover
      clientCarousel.addEventListener('mouseenter', () => {
        if (clientAnimationId) {
          cancelAnimationFrame(clientAnimationId);
          clientAnimationId = null;
        }
      });
      
      clientCarousel.addEventListener('mouseleave', () => {
        if (!clientAnimationId) {
          animateClientCarousel();
        }
      });
      
      // Start animation
      animateClientCarousel();
      
      // Recalculate on resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          clientOffset = 0;
          clientCarousel.style.transform = 'translateX(0)';
        }, 250);
      });
    }
    
    // Card Carousel (Our Approach)
    const cardCarousel = document.querySelector('.carousel .carousel-inner');
    if (cardCarousel) {
      const groups = Array.from(cardCarousel.querySelectorAll('.group'));
      const gap = 24; // matches CSS gap for cards
      let cardAnimationId = null;
      let cardOffset = 0;
      
      function animateCardCarousel() {
        const totalGroups = groups.length / 2; // We have duplicates
        let totalWidth = 0;
        
        // Calculate total width of unique groups
        for (let i = 0; i < totalGroups; i++) {
          totalWidth += groups[i].offsetWidth;
        }
        
        // Smooth continuous animation (slower for cards)
        cardOffset -= 0.3;
        
        // Reset when we've scrolled half the track
        if (Math.abs(cardOffset) >= totalWidth) {
          cardOffset = 0;
        }
        
        cardCarousel.style.transform = `translateX(${cardOffset}px)`;
        cardAnimationId = requestAnimationFrame(animateCardCarousel);
      }
      
      // Pause on hover
      const carouselContainer = document.querySelector('.carousel');
      if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
          if (cardAnimationId) {
            cancelAnimationFrame(cardAnimationId);
            cardAnimationId = null;
          }
        });
        
        carouselContainer.addEventListener('mouseleave', () => {
          if (!cardAnimationId) {
            animateCardCarousel();
          }
        });
      }
      
      // Start animation
      animateCardCarousel();
      
      // Recalculate on resize
      let resizeTimeout;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          cardOffset = 0;
          cardCarousel.style.transform = 'translateX(0)';
          // Restart animation after resize
          if (cardAnimationId) {
            cancelAnimationFrame(cardAnimationId);
          }
          animateCardCarousel();
        }, 250);
      });
    }
  }
  
  // Initialize carousels when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
  } else {
    initCarousels();
  }

  // Audit form submission handler
  const auditForm = document.getElementById('audit-form');
  if (auditForm) {
    auditForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData(auditForm);
      const data = Object.fromEntries(formData.entries());
      
      // Disable submit button
      const submitBtn = auditForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';
      
      try {
        // Send form data
        const response = await fetch('/api/audit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        
        // Show success state
        const formContainer = document.getElementById('form-container');
        const successState = document.getElementById('success-state');
        
        if (formContainer && successState) {
          formContainer.style.display = 'none';
          successState.style.display = 'block';
        }
      } catch (error) {
        // On error, show success state anyway (optimistic UI)
        const formContainer = document.getElementById('form-container');
        const successState = document.getElementById('success-state');
        
        if (formContainer && successState) {
          formContainer.style.display = 'none';
          successState.style.display = 'block';
        }
      }
    });
  }

})();
