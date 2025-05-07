!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;
      }
    }
  });

  // Activate/show sections
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  // Mobile Navigation
if ($('.nav-menu').length) {
  var $mobile_nav = $('.nav-menu').clone().prop({
    class: 'mobile-nav d-lg-none'
  });

  $mobile_nav.find('a').each(function() {
    var $this = $(this);
    var href = $this.attr('href') || '';

    // Ultra-reliable icon mapping with multiple fallbacks
    var iconMap = {
      '#header': { main: 'home', fallback: '🏠' },
      '#about': { main: 'person', fallback: '👤' },
      '#education': { main: 'school', fallback: '🏫' },
      '#certification': { main: 'verified', fallback: '✅' },
      '#research': { main: 'science', fallback: '🔬' },
      '#experience': { main: 'work_history', fallback: '💼' },
      '#portfolio': { type: 'image', src: 'https://raw.githubusercontent.com/la-b-ib/la-b-ib.github.io/main/assets/img/sidemenu-mobileview/skull.png', fallback: '💻' }, // Use image for Projects
      '#skills': { main: 'build', fallback: '🛠️' },
      '#blogs': { main: 'article', fallback: '📰' },
      '#contacts': { main: 'email', fallback: '✉️' } // Updated to #contacts to match HTML
    };

    // Find matching icon
    var iconData = Object.entries(iconMap).find(([key]) => href.includes(key))?.[1] || {};

    if (iconData.main || iconData.type === 'image') {
      // Create icon container
      var $iconContainer = $('<span>').addClass('mobile-menu-icon-container').css({
        'display': 'inline-flex',
        'align-items': 'center',
        'justify-content': 'center',
        'width': '25px',
        'height': '25px',
        'margin-right': '15px'
      });

      if (iconData.type === 'image') {
        // Image-based icon for Projects
        var $imageIcon = $('<img>').addClass('mobile-menu-icon mobile-menu-image-icon').attr({
          src: iconData.src,
          alt: 'Projects Icon'
        }).css({
          'width': '25px',
          'height': '25px',
          'object-fit': 'contain',
          'display': 'inline-flex',
          'position': 'absolute'
        });

        // Fallback text
        var $textFallback = $('<span>').addClass('icon-fallback-text').text(iconData.fallback).css({
          'font-size': '20px',
          'color': '#0dcd3c',
          'display': 'none',
          'position': 'absolute'
        });

        $iconContainer.append($imageIcon, $textFallback);

        // Verify image loaded after 1 second
        setTimeout(() => {
          var img = new Image();
          img.src = iconData.src;
          img.onload = () => {
            // Image loaded successfully
            $imageIcon.show();
          };
          img.onerror = () => {
            // Image failed to load
            $imageIcon.hide();
            $textFallback.show();
          };
        }, 1000);
      } else {
        // Material Icon for other items
        var $materialIcon = $('<i>').addClass('material-icons mobile-menu-icon').text(iconData.main).css({
          'font-family': 'Material Icons',
          'font-size': '25px',
          'color': '#0dcd3c',
          'display': 'inline-flex',
          'position': 'absolute'
        });

        var $textFallback = $('<span>').addClass('icon-fallback-text').text(iconData.fallback).css({
          'font-size': '20px',
          'color': '#0dcd3c',
          'display': 'none',
          'position': 'absolute'
        });

        $iconContainer.append($materialIcon, $textFallback);

        // Verify icon rendering after 1 second
        setTimeout(() => {
          var materialIconWidth = $materialIcon.width();
          if (materialIconWidth === 0 || materialIconWidth === undefined) {
            $materialIcon.hide();
            $textFallback.show();
          }
        }, 1000);
      }

      // iOS-specific fixes
      if (navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) {
        if (iconData.type !== 'image') {
          $materialIcon.css({
            '-webkit-text-stroke': '0.45px transparent',
            'text-shadow': '0 0 0 #0dcd3c'
          });
        }
      }

      $this.prepend($iconContainer);
    }
  });

  $('body').append($mobile_nav);
  $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
  $('body').append('<div class="mobile-nav-overly"></div>');

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
    $('.mobile-nav-overly').toggle();
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav, .mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').fadeOut();
      }
    }
  });
} else if ($(".mobile-nav, .mobile-nav-toggle").length) {
  $(".mobile-nav, .mobile-nav-toggle").hide();
}
    // Append mobile navigation to body
  
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // CounterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      900: { items: 3 }
    }
  });

  // Portfolio isotope
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');
      portfolioIsotope.isotope({ filter: $(this).data('filter') });
    });
  });

   // Modified Venobox initialization with custom mobile close button
  $(document).ready(function() {
    $('.venobox').venobox({
      bgcolor: '#010e1b',
      border: 'none',
      framewidth: '90%', 
      frameheight: '90vh',
      numeratio: true,
      infinigall: true,
      spinner: 'wave',
      spinColor: '#12d640',
      overlayColor: 'rgba(1, 14, 27, 0.95)',
      closeBackground: 'transparent',
      closeColor: '#12d640',
      css: {
        'background-color': '#010e1b',
        'box-shadow': 'none'
      },
      onOpen: function() {
        // Remove default close button
        $('.vbox-close').remove();
        
        // Create custom close button with gamepad icon
        var closeBtn = $('<button class="custom-close-btn"><i class="material-icons">gamepad</i></button>');
        
        // Position differently for mobile/desktop
        if ($(window).width() <= 768) {
          closeBtn.css({
            'position': 'fixed',
            'top': '15px',
            'right': '15px',
            'color': 'red',
            'background': 'transparent',
            'border': 'none',
            'font-size': '32px',
            'cursor': 'pointer',
            'z-index': '999999',
            'padding': '5px',
            'border-radius': '50%'
          });
        } else {
          closeBtn.css({
            'position': 'fixed',
            'top': '20px',
            'right': '20px',
            'color': '#12d640',
            'background': 'transparent',
            'border': 'none',
            'font-size': '28px',
            'cursor': 'pointer',
            'z-index': '999999'
          });
        }
        
        // Add to DOM
        $('body').append(closeBtn);
        
        // Click handler
        closeBtn.on('click', function() {
          $('.venobox').venobox('close');
          $(this).remove();
        });
      },
      onClose: function() {
        $('.custom-close-btn').remove();
      }
    });
  });

})(jQuery);
