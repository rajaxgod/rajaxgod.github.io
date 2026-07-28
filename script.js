/* =============================================
   AYUSH — PROFILE PLATE — script.js
   Dynamic copyright year only.
   All motion is handled declaratively in CSS.
============================================= */
(function () {
  'use strict';

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
