$(document).ready(function() {

  !(function($) {
    "use strict";

    // Nav Menu
    $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname ==
        this.hostname) {
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
            $('.mobile-nav-toggle i').toggleClass('drag_indicator close');
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
          '#header': 'home.svg',
          '#about': 'about.svg',
          '#education': 'education.svg',
          '#certification': 'certifications.svg',
          '#research': 'research.svg',
          '#experience': 'experience.svg',
          '#portfolio': 'projects.svg',
          '#skills': 'skills.svg',
          '#blogs': 'blog.svg',
          '#contact': 'contact.svg'
        };

        var iconFile = Object.entries(iconMap).find(function(entry) {
          return href.includes(entry[0]);
        });
        
        if (iconFile) {
          var $icon = $('<img>').addClass('mobile-menu-icon')
            .attr('src', 'assets/img/navbar icon/' + iconFile[1])
            .attr('alt', iconFile[0].replace('#', ''))
            .css({
              'width': '20px',
              'height': '20px',
              'margin-right': '6px',
              'vertical-align': 'middle'
            });

          $this.prepend($icon);
        }
      });
      $mobile_nav.find('ul').append(
        '<li><a href="assets/resume/cv.pdf" download="Labib_Bin_Shahed_Resume.pdf" class="mobile-nav-resume"><img src="assets/img/navbar icon/resume.svg" alt="resume" class="mobile-menu-icon" style="width: 20px; height: 20px; margin-right: 6px; vertical-align: middle;"> Resume</a></li>'
        );
      $('body').append($mobile_nav);
      $('body').prepend(
        '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="material-icons" style="font-size: 30px; color: black;">drag_indicator</i></button>'
        );
      $('body').append('<div class="mobile-nav-overlay"></div>');

      $(document).on('click', '.mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('drag_indicator close');
        $('.mobile-nav-overlay').toggle();
      });

      $(document).on('click', '.mobile-nav-resume', function(e) {
        // Allow the download to proceed, then close the menu
        setTimeout(function() {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').removeClass('close').addClass('drag_indicator');
          $('.mobile-nav-overlay').fadeOut();
        }, 100);
      });

      $(document).click(function(e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('drag_indicator close');
            $('.mobile-nav-overlay').fadeOut();
          }
        }
      });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // Modified Venobox initialization with custom mobile close button
    $('.venobox').venobox({
      bgcolor: 'transparent',
      /* No background to avoid duplication */
      border: 'none',
      /* Remove border */
      framewidth: '100%',
      frameheight: '90vh',
      numeratio: true,
      infinigall: true,
      spinner: 'wave',
      spinColor: '#4284F4',
      overlayColor: 'rgba(0, 0, 0, 0.3)',
      /* Match CSS .vbox-overlay */
      closeBackground: 'transparent',
      closeColor: '#4284F4',
      css: {
        'background-color': 'rgba(255, 255, 255, 0.2)',
        /* Glassmorphic background */
        'backdrop-filter': 'blur(10px)',
        /* Glass effect */
        '-webkit-backdrop-filter': 'blur(10px)',
        /* Safari support */
        'box-shadow': 'none',
        /* No shadow */
        'border-radius': '0' /* No rounded corners */
      },

      onClose: function() {
        $('.custom-close-btn').remove();
      }
    });

    // Prevent image downloads by disabling right-click and drag, but DO NOT block taps/clicks
    $('img').on('contextmenu dragstart', function(e) {
      e.preventDefault();
    });
    $('a').on('dragstart', function(e) {
      e.preventDefault();
    });
    $('img').attr('draggable', false);
    $('a').attr('draggable', false);

    // Make entire portfolio tile tappable on mobile for both project and certification sections
    // Navigates to the first link inside .portfolio-links
    $(document).on('click', '.portfolio .portfolio-wrap, .services .portfolio .portfolio-wrap', function(e) {
      // If user actually tapped/clicked a real link/button inside, let it work naturally
      if ($(e.target).closest('a, button').length) return;

      var $link = $(this).find('.portfolio-links a[href]')
        .filter(function() {
          return this.href && this.href !== '#';
        })
        .first();
      if ($link.length) {
        var url = $link.attr('href');
        var target = $link.attr('target');
        if (target === '_blank') {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      }
    });

    // Additional mobile-specific handler for direct chain.png clicks
    $(document).on('click touchstart', '.portfolio-links a, .portfolio-links a img', function(e) {
      e.stopPropagation();
      var url = $(this).closest('a').attr('href');
      var target = $(this).closest('a').attr('target');
      if (url && url !== '#') {
        if (target === '_blank') {
          window.open(url, '_blank');
        } else {
          window.location.href = url;
        }
      }
    });

  })(jQuery);

});

// Toggle description function for project cards
function toggleDescription(element) {
  if (!element || !element.previousElementSibling) {
    return;
  }

  const description = element.previousElementSibling;
  const isExpanded = description.classList.contains('expanded');

  if (isExpanded) {
    description.classList.remove('expanded');
    element.textContent = 'see more';
  } else {
    description.classList.add('expanded');
    element.textContent = 'see less';
  }
}
