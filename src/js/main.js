
document.addEventListener('DOMContentLoaded', () => {
      "use strict";
      /**
       * Initiate glightbox
       */
      const glightbox = GLightbox({
        selector: '.glightbox'
      });
    
      /**
       * Porfolio isotope and filter
       */
      let portfolionIsotope = document.querySelector('.portfolio-isotope');
    
      if (portfolionIsotope) {
    
        let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
        let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
        let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';
    
        window.addEventListener('load', () => {
          let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
            itemSelector: '.portfolio-item',
            layoutMode: portfolioLayout,
            filter: portfolioFilter,
            sortBy: portfolioSort
          });
    
          let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
          menuFilters.forEach(function(el) {
            el.addEventListener('click', function() {
              document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
              this.classList.add('filter-active');
              portfolioIsotope.arrange({
                filter: this.getAttribute('data-filter')
              });
              if (typeof aos_init === 'function') {
                aos_init();
              }
            }, false);
          });
    
        });
    
      }
    
      /**
       * Init swiper slider with 1 slide at once in desktop view
       */
      new Swiper('.slides-1', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      });
    
      /**
       * Init swiper slider with 2 slides at once in desktop view
       */
      new Swiper('.slides-2', {
        speed: 600,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
            spaceBetween: 20
          },
    
          1200: {
            slidesPerView: 2,
            spaceBetween: 20
          }
        }
      });
    
      /**
       * Animation on scroll function and init
       */
      function aos_init() {
        AOS.init({
          duration: 800,
          easing: 'slide',
          once: true,
          mirror: false
        });
      }
      window.addEventListener('load', () => {
        aos_init();
      });
    
    });
    
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
    
    const obj = document.getElementById("value");
    animateValue(obj, 0, 200, 4000);



    var TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
  };

  TxtType.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i];

      if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      var that = this;
      var delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
      }

      setTimeout(function() {
      that.tick();
      }, delta);
  };

  window.onload = function() {
      var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-type');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
          }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);
  };