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
    if ($('.nav-menu').length) {
      var $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
  
      // Add icons to each mobile menu item
  $mobile_nav.find('a').each(function() {
    var $this = $(this);
    var href = $this.attr('href') || '';
    
    var iconMap = {
      '#header': {main: 'home', fallback: '🏠'},
      '#about': {main: 'person', fallback: '👤'},
      '#education': {main: 'school', fallback: '🏫'}, 
      '#certification': {main: 'verified', fallback: '✅'},
      '#research': {main: 'science', fallback: '🔬'},
      '#experience': {main: 'work_history', fallback: '💼'},
      '#portfolio': {main: 'api', fallback: '💻'},  // Note: using #portfolio to match your HTML
      '#skills': {main: 'schema', fallback: '🛠️'},
      '#blogs': {main: 'auto_stories', fallback: '📰'},
      '#contact': {main: 'contact_mail', fallback: '✉️'}
    };
  
    var iconData = Object.entries(iconMap).find(([key]) => href.includes(key))?.[1] || {};
    
    if (iconData.main) {
      var $icon = $('<i>').addClass('material-icons mobile-menu-icon')
        .text(iconData.main)
        .css({
          'font-family': 'Material Icons',
          'font-size': '20px',
          'color': '#0dcd3c',
          'margin-right': '10px'
        });
      
      $this.prepend($icon);
      
      // Fallback if Material Icons don't load
      setTimeout(() => {
        if ($icon.width() === 0) {
          $icon.replaceWith(iconData.fallback);
        }
      }, 1000);
    }
  });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="material-icons">menu</i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');
  
      $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('material-icons menu close');
    $('.mobile-nav-overly').toggle();
    if ($('body').hasClass('mobile-nav-active')) {
        // Add custom close button
        var closeBtn = $('<button type="button" class="mobile-nav-close"><i class="material-icons">close</i></button>');
        $('.mobile-nav').prepend(closeBtn);
    } else {
        // Remove custom close button
        $('.mobile-nav-close').remove();
    }
});

$(document).on('click', '.mobile-nav-close', function(e) {
    $('body').removeClass('mobile-nav-active');
    $('.mobile-nav-toggle i').removeClass('close').addClass('menu');
    $('.mobile-nav-overly').fadeOut();
    $('.mobile-nav-close').remove();
});

$(document).on('click', function(e) {
    var container = $('.mobile-nav, .mobile-nav-toggle, .mobile-nav-close');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').removeClass('close').addClass('menu');
            $('.mobile-nav-overly').fadeOut();
            $('.mobile-nav-close').remove();
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
