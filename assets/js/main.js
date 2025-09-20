
$(document).ready(function() {
!(function($) {
    "use strict";
    /* Navigation Menu Handler */
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
    /* Section Activation Handler */
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
    /* Optimized Mobile Navigation Setup */
    if ($('.nav-menu').length) {
      var $mobile_nav = $('.nav-menu').clone().prop({class: 'mobile-nav d-lg-none'});
      /* Add Material Icons to mobile menu items with fallback emojis */
      var iconMap = {'#header': ['home', '🏠'], '#about': ['person', '👤'], '#education': ['school', '🏫'], '#certification': ['verified', '✅'], '#research': ['science', '🔬'], '#experience': ['work_history', '💼'], '#portfolio': ['api', '💻'], '#skills': ['schema', '🛠️'], '#blogs': ['auto_stories', '📰'], '#contact': ['contact_mail', '✉️']};
      $mobile_nav.find('a').each(function() {
        var href = $(this).attr('href') || '';
        var icon = Object.entries(iconMap).find(([key]) => href.includes(key));
        if (icon) {
          var $icon = $('<i>').addClass('material-icons mobile-menu-icon').text(icon[1][0]).css({'font-family': 'Material Icons', 'font-size': '20px', 'color': '#4285F4', 'margin-right': '6px'});
          $(this).prepend($icon);
          setTimeout(() => {if ($icon.width() === 0) $icon.replaceWith(icon[1][1]);}, 1000);
        }
      });
      $mobile_nav.find('ul').append('<li><a href="#" class="mobile-nav-close"><i class="material-icons mobile-menu-icon">cancel</i> Close</a></li>');
      $('body').append($mobile_nav).prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="material-icons" style="font-size: 30px; color: black;">drag_indicator</i></button>').append('<div class="mobile-nav-overly"></div>');
      
      /* Mobile navigation event handlers */
      $(document).on('click', '.mobile-nav-toggle', function() {$('body').toggleClass('mobile-nav-active'); $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close'); $('.mobile-nav-overly').toggle();});
      $(document).on('click', '.mobile-nav-close', function() {$('body').removeClass('mobile-nav-active'); $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu'); $('.mobile-nav-overly').fadeOut();});
      $(document).click(function(e) {var container = $(".mobile-nav, .mobile-nav-toggle"); if (!container.is(e.target) && container.has(e.target).length === 0 && $('body').hasClass('mobile-nav-active')) {$('body').removeClass('mobile-nav-active'); $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close'); $('.mobile-nav-overly').fadeOut();}});
    }
  
  /* Removed unused CounterUp, Skills progress bars, and Testimonials carousel - not implemented in current design */
  
    /* Optimized Venobox Lightbox with Glassmorphic Effect */
    $('.venobox').venobox({bgcolor: 'transparent', border: 'none', framewidth: '100%', frameheight: '90vh', numeratio: true, infinigall: true, spinner: 'wave', spinColor: '#4284F4', overlayColor: 'rgba(0, 0, 0, 0.3)', closeBackground: 'transparent', closeColor: '#4284F4', css: {'background-color': 'rgba(255, 255, 255, 0.2)', 'backdrop-filter': 'blur(10px)', '-webkit-backdrop-filter': 'blur(10px)', 'box-shadow': 'none', 'border-radius': '0'}, onClose: function() {$('.custom-close-btn').remove();}});
    
    /* Content Protection - Prevent image downloads and copying */
    $('img, a').on('contextmenu dragstart touchstart', e => e.preventDefault()).attr('draggable', false);
  
  })(jQuery);

});
