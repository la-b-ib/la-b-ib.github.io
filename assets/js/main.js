
$(document).ready(function() {


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
          'color': '#4285F4',
          'margin-right': '6px'
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
      $mobile_nav.find('ul').append('<li><a href="#" class="mobile-nav-close"><i class="material-icons mobile-menu-icon">cancel</i> Close</a></li>');
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="material-icons" style="font-size: 30px; color: black;">drag_indicator</i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');
  
      $(document).on('click', '.mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').toggle();
      });
  
      $(document).on('click', '.mobile-nav-close', function(e) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').removeClass('icofont-close').addClass('icofont-navigation-menu');
        $('.mobile-nav-overly').fadeOut();
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
  

  
    // Prevent image downloads by disabling right-click, drag, and touch interactions on all devices
    $(function(){
      try {
        if (typeof $.fn.venobox === 'function' && $('.venobox').length) {
          // Initialization skipped as Venobox library is not included by default
        }
      } catch (e) {
        // safely ignore
      }
    
    $('img').on('contextmenu dragstart touchstart', function(e) {
        e.preventDefault();
    });
    $('a').on('dragstart', function(e) {
        e.preventDefault();
    });
    $('img').attr('draggable', false);
    $('a').attr('draggable', false);
    });
  
  })(jQuery);

});
