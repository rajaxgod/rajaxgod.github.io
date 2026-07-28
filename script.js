/* =============================================
   PREMIUM PROFILE LANDING — script.js
   Parallax blobs, dynamic footer year,
   performance-optimized mouse tracking
============================================= */

(function() {
  'use strict';

  // 1. Dynamic copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Subtle mouse-parallax on background blobs
  // Uses requestAnimationFrame for 60fps performance
  const blobs = document.querySelectorAll('.blob');
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;
  let isMoving = false;
  let tick = 0;

  // Only run on non-touch devices for performance
  if (window.matchMedia('(hover: hover)').matches && blobs.length > 0) {
    document.addEventListener('mousemove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Normalize to -1..1
      mouseX = (e.clientX - centerX) / centerX;
      mouseY = (e.clientY - centerY) / centerY;
      isMoving = true;
    }, { passive: true });

    // Slow out for smooth tracking
    function animate() {
      tick++;
      // Only recalculate every 2 frames for smoother feel
      if (tick % 2 === 0) {
        targetX += (mouseX - targetX) * 0.08;
        targetY += (mouseY - targetY) * 0.08;

        blobs.forEach((blob, i) => {
          const factor = (i + 1) * 12; // deeper layers move less
          const x = targetX * factor;
          const y = targetY * factor;
          // Apply via CSS custom properties for zero reflow cost
          blob.style.transform = `translate(${x}px, ${y}px)`;
        });
      }

      if (isMoving || Math.abs(mouseX - targetX) > 0.001) {
        requestAnimationFrame(animate);
        isMoving = Math.abs(mouseX - targetX) > 0.001;
      }
    }

    // Start loop on load
    requestAnimationFrame(animate);
  }
})();
