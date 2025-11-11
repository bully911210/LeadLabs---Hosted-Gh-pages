// LeadLabs - Main JavaScript

(function() {
  'use strict';

  // Defer execution after DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    // Native lazy is set via attributes; this IO handles data-src fallbacks
    const lazyImgs = document.querySelectorAll('img.lazy[data-src]');

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.remove('lazy');
          obs.unobserve(img);
        });
      }, { rootMargin: '200px 0px', threshold: 0.01 });

      lazyImgs.forEach(img => io.observe(img));
    } else {
      // Fallback: eager set after load
      lazyImgs.forEach(img => { 
        img.src = img.dataset.src; 
        img.classList.remove('lazy'); 
      });
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
  });

})();
