document.addEventListener('DOMContentLoaded', function() {
  // === BURGER MENU ===
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('.main-nav');
  const body = document.body;
  
  if (burger && nav) {
  const navCloseBtn = document.querySelector('.mobile-nav-close');
    // Переключение бургер-меню
    burger.addEventListener('click', function(e) {
      e.stopPropagation();
      burger.classList.toggle('active');
      nav.classList.toggle('active');
      body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
      if(navCloseBtn){navCloseBtn.style.display='block';}
    });
    
    // Закрытие меню при клике вне его
    if(navCloseBtn){
      navCloseBtn.addEventListener('click', function(){
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow='';
      });
    }
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
      }
    });
    
    // Закрытие меню при клике на ссылки
    nav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function(e) {
        // Если это не Products меню, закрываем навигацию
        if (!this.closest('.products-menu')) {
          burger.classList.remove('active');
          nav.classList.remove('active');
          body.style.overflow = '';
        }
      });
    });
    
    // Обработка мобильной кнопки Request Demo
    const mobileDemoBtn = document.querySelector('.request-demo-mobile');
    if (mobileDemoBtn) {
      mobileDemoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Здесь можно добавить логику для открытия формы или перехода
        console.log('Mobile Request Demo clicked');
        // Закрываем меню после клика
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
      });
    }
    
    // Обработка мобильного подменю Products
    const productsMenu = document.querySelector('.products-menu');
    if (productsMenu) {
      const productsLink = productsMenu.querySelector('.nav-link');
      
      productsLink.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          productsMenu.classList.toggle('active');
        }
      });
    }
    
    // Улучшенная обработка подменю Products для десктопа
    const productsSubmenu = document.querySelector('.products-submenu');
    if (productsSubmenu) {
      let submenuTimeout;
      
      // При наведении на кнопку Products
      productsMenu.addEventListener('mouseenter', function() {
        clearTimeout(submenuTimeout);
        productsSubmenu.style.display = 'block';
        setTimeout(() => {
          productsSubmenu.style.opacity = '1';
          productsSubmenu.style.pointerEvents = 'auto';
          productsSubmenu.style.transform = 'translateY(0)';
        }, 10);
      });
      
      // При уходе с кнопки Products
      productsMenu.addEventListener('mouseleave', function(e) {
        // Проверяем, не перешел ли курсор на подменю
        const relatedTarget = e.relatedTarget;
        if (!productsSubmenu.contains(relatedTarget)) {
          submenuTimeout = setTimeout(() => {
            productsSubmenu.style.opacity = '0';
            productsSubmenu.style.pointerEvents = 'none';
            productsSubmenu.style.transform = 'translateY(20px)';
            setTimeout(() => {
              if (productsSubmenu.style.opacity === '0') {
                productsSubmenu.style.display = 'none';
              }
            }, 250);
          }, 100);
        }
      });
      
      // При наведении на подменю
      productsSubmenu.addEventListener('mouseenter', function() {
        clearTimeout(submenuTimeout);
      });
      
      // При уходе с подменю
      productsSubmenu.addEventListener('mouseleave', function() {
        submenuTimeout = setTimeout(() => {
          productsSubmenu.style.opacity = '0';
          productsSubmenu.style.pointerEvents = 'none';
          productsSubmenu.style.transform = 'translateY(20px)';
          setTimeout(() => {
            if (productsSubmenu.style.opacity === '0') {
              productsSubmenu.style.display = 'none';
            }
          }, 250);
        }, 100);
      });
    }
    
    // Закрытие меню при изменении размера экрана
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        body.style.overflow = '';
        // Сбрасываем состояние мобильного подменю
        const productsMenu = document.querySelector('.products-menu');
        if (productsMenu) {
          productsMenu.classList.remove('active');
        }
      }
    });
  }
  // === OPEN POPUP ON "Get Free AI" BUTTON ===
  var promoBtn = document.querySelector('.aiagent-promo-btn-primary');
  if (promoBtn && typeof openPopup === 'function') {
    promoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      openPopup();
    });
  }

    // Loader logic
    const loaderScreen = document.getElementById('loader-screen');
    const loaderText = document.getElementById('loader-text');
    if (loaderScreen && loaderText) {
      setTimeout(() => {
        loaderText.textContent = 'Loading content';
      }, 2000);
      setTimeout(() => {
        loaderText.textContent = 'Ready';
      }, 4000);
      setTimeout(() => {
        loaderScreen.classList.add('loader-hide');
        setTimeout(() => {
          loaderScreen.style.display = 'none';
        }, 900); // match transition duration
      }, 5000);
    }
    // FAQ accordion
    document.querySelectorAll('.faq-toggle').forEach(function(btn) {
      btn.addEventListener('click', function() {
        const item = btn.closest('.faq-item');
        const answer = item.querySelector('.faq-answer');
        const icon = btn.querySelector('.faq-toggle-icon');
        const isOpen = item.classList.toggle('open');
        if (isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.textContent = '–';
          btn.setAttribute('aria-label', 'Collapse FAQ');
        } else {
          answer.style.maxHeight = '0';
          icon.textContent = '+';
          btn.setAttribute('aria-label', 'Expand FAQ');
        }
      });
    });
  
    // Позволяет открывать/закрывать FAQ по клику на текст вопроса
    document.querySelectorAll('.faq-question').forEach(question => {
      question.addEventListener('click', function() {
        const item = question.closest('.faq-item');
        const btn = item.querySelector('.faq-toggle');
        const answer = item.querySelector('.faq-answer');
        const icon = btn.querySelector('.faq-toggle-icon');
        const isOpen = item.classList.toggle('open');
        if (isOpen) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          icon.textContent = '–';
          btn.setAttribute('aria-label', 'Collapse FAQ');
        } else {
          answer.style.maxHeight = '0';
          icon.textContent = '+';
          btn.setAttribute('aria-label', 'Expand FAQ');
        }
      });
    });
  
    // Typing effect
    const typingWordElement = document.getElementById('typing-word');
    if (typingWordElement) {
      const words = ["Finance", "Marketing", "Sales", "Support", "HR", "Legal"];
      let wordIndex = 0;
      let charIndex = 0;
  
      function type() {
        if (charIndex < words[wordIndex].length) {
          typingWordElement.textContent += words[wordIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, 150);
        } else {
          setTimeout(erase, 2000);
        }
      }
  
      function erase() {
        if (charIndex > 0) {
          typingWordElement.textContent = words[wordIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, 100);
        } else {
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(type, 500);
        }
      }
      setTimeout(type, 1500);
    }
  
    // Video play button
    const playButton = document.querySelector('.play-button');
    if (playButton) {
      playButton.addEventListener('click', function() {
        const videoPlaceholder = this.closest('.video-placeholder');
        if (videoPlaceholder) {
          videoPlaceholder.classList.add('active');
          const iframe = videoPlaceholder.querySelector('.youtube-video');
          if (iframe) {
            // Add autoplay and remove rel=0 for better mobile compatibility
            iframe.src = iframe.src.replace('autoplay=0', 'autoplay=1').replace('rel=0', '');
          }
        }
      });
    }
  
  
    // Центрирование скролла шаблонов (если нужно)
    const scrollContainer = document.querySelector('.templates-scroll');
    if (scrollContainer) {
      const scrollWidth = scrollContainer.scrollWidth;
      const containerWidth = scrollContainer.clientWidth;
      scrollContainer.scrollLeft = (scrollWidth - containerWidth) / 2;
    }

    // === FOOTER NEWSLETTER SUBSCRIBE ===
    const footerForm = document.querySelector('.footer-newsletter-form');
    if (footerForm) {
      const input = footerForm.querySelector('input[type="email"]');
      const btn = footerForm.querySelector('button[type="submit"]');
      let msg = footerForm.nextElementSibling;
      if (!msg || !msg.classList.contains('footer-subscribe-msg')) {
        msg = document.createElement('div');
        msg.className = 'footer-subscribe-msg';
        msg.style.marginTop = '10px';
        footerForm.parentNode.insertBefore(msg, footerForm.nextSibling);
      }
      footerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        msg.textContent = '';
        btn.disabled = true;
        fetch('http://localhost:5000/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: input.value })
        })
        .then(res => res.json().then(data => ({ ok: res.ok, ...data })))
        .then(data => {
          if (data.ok && data.success) {
            msg.style.color = '#22c55e';
            msg.textContent = data.message;
            footerForm.reset();
          } else {
            msg.style.color = '#ef4444';
            msg.textContent = data.message || 'Wrong email';
          }
        })
        .catch(() => {
          msg.style.color = '#ef4444';
          msg.textContent = 'Network error. Try again later.';
        })
        .finally(() => {
          btn.disabled = false;
        });
      });
    }
  });
  
  // === ГЛОБАЛЬНОЕ ПОДМЕНЮ PRODUCTS ===
  const productsMenu = document.querySelector('.products-menu');
  const productsSubmenuGlobal = document.querySelector('.products-submenu--global');
  let submenuTimeout;
  if (productsMenu && productsSubmenuGlobal) {
    productsMenu.addEventListener('mouseenter', function() {
      clearTimeout(submenuTimeout);
      productsSubmenuGlobal.classList.add('submenu-open');
    });
    productsMenu.addEventListener('mouseleave', function(e) {
      submenuTimeout = setTimeout(() => {
        productsSubmenuGlobal.classList.remove('submenu-open');
      }, 120);
    });
    productsSubmenuGlobal.addEventListener('mouseenter', function() {
      clearTimeout(submenuTimeout);
      productsSubmenuGlobal.classList.add('submenu-open');
    });
    productsSubmenuGlobal.addEventListener('mouseleave', function() {
      submenuTimeout = setTimeout(() => {
        productsSubmenuGlobal.classList.remove('submenu-open');
      }, 120);
    });
  }
  
  // Drag to scroll for .templates-scroll
  (function() {
    const scroll = document.querySelector('.templates-scroll');
    if (!scroll) return;
    let isDown = false;
    let startX, scrollLeft;
  
    scroll.addEventListener('mousedown', (e) => {
      isDown = true;
      scroll.classList.add('dragging');
      startX = e.pageX - scroll.offsetLeft;
      scrollLeft = scroll.scrollLeft;
      e.preventDefault();
    });
    scroll.addEventListener('mouseleave', () => {
      isDown = false;
      scroll.classList.remove('dragging');
    });
    scroll.addEventListener('mouseup', () => {
      isDown = false;
      scroll.classList.remove('dragging');
    });
    scroll.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      const x = e.pageX - scroll.offsetLeft;
      const walk = (x - startX) * 1.2;
      scroll.scrollLeft = scrollLeft - walk;
    });
  })();
  