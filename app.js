/* ============================================================================
   Applies the CONFIG block from index.html to the page.
   DO NOT edit per client — change the values in index.html instead.
   ============================================================================ */
(function () {
  "use strict";

  // Wire an <a> to a config URL. If the URL is empty, hide the button entirely
  // (so a client without, say, a website simply doesn't show that row).
  function wireLink(id, url) {
    const el = document.getElementById(id);
    if (!el) return;
    if (url) {
      el.href = url;
      el.hidden = false;
    } else {
      el.hidden = true;
    }
  }

  // --- Text content ---
  document.title = CONFIG.BUSINESS_NAME + " — Atsiliepimai";
  const footer = document.getElementById("footer-text");
  if (footer) footer.textContent = "Ačiū, kad apsilankėte " + CONFIG.BUSINESS_NAME;

  // --- Links (review always shown; socials/site hidden when blank) ---
  wireLink("review-link", CONFIG.GOOGLE_REVIEW_LINK);
  wireLink("instagram-link", CONFIG.INSTAGRAM_LINK);
  wireLink("facebook-link", CONFIG.FACEBOOK_LINK);
  wireLink("website-link", CONFIG.WEBSITE_LINK);
})();
