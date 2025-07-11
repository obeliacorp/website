// === Reusable Popup Modal Script ===
// Requires: .iframe-popup-overlay, .iframe-popup-modal, .iframe-popup-frame in HTML
// Usage: set trigger element with id="open-iframe-popup"

(function() {
    const popupOverlay = document.querySelector('.iframe-popup-overlay');
    const popupOpenBtn = document.getElementById('open-iframe-popup');
  
    function openPopup() {
      if (popupOverlay) popupOverlay.classList.add('active');
    }
    window.openPopup = openPopup;
    function closePopup() {
      if (popupOverlay) popupOverlay.classList.remove('active');
    }
    if (popupOpenBtn) {
      popupOpenBtn.addEventListener('click', function(e) {
        e.preventDefault();
        openPopup();
      });
    }
    if (popupOverlay) {
      popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) closePopup();
      });
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
          closePopup();
        }
      });
    }
  })();
  