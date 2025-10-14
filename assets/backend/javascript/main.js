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
              'width': '32px',
              'height': '32px',
              'margin-right': '10px',
              'vertical-align': 'middle'
            });

          $this.prepend($icon);
        }
      });
      
      // Add QR code item before Resume (at the end of the main menu)
      $mobile_nav.find('ul').append(
        '<li><a href="#" class="mobile-nav-qr"><img src="assets/img/navbar icon/qr.svg" alt="qr code" class="mobile-menu-icon" style="width: 32px; height: 32px; margin-right: 10px; vertical-align: middle;"> QR Code</a></li>'
      );
      
      // Add Resume at the end
      $mobile_nav.find('ul').append(
        '<li><a href="assets/resume/cv.pdf" download="Labib_Bin_Shahed_Resume.pdf" class="mobile-nav-resume"><img src="assets/img/navbar icon/resume.svg" alt="resume" class="mobile-menu-icon" style="width: 32px; height: 32px; margin-right: 10px; vertical-align: middle;"> Resume</a></li>'
        );
      $('body').append($mobile_nav);
      $('body').prepend(
        '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="material-icons" style="font-size: 30px; color: black;">drag_indicator</i></button>'
        );
      $('body').append('<div class="mobile-nav-overlay"></div>');
      
      // Add QR code modal overlay with generated QR code
      $('body').append(`
        <div class="qr-code-overlay" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: transparent; z-index: 9996; justify-content: center; align-items: center;">
          <div class="qr-code-container" style="background: white; padding: 30px; border-radius: 15px; text-align: center; max-width: 90%; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3); position: relative; z-index: 9996;">
            <h3 style="color: #4285F4; margin-bottom: 20px; font-family: 'Bungee', sans-serif;">Share My Portfolio</h3>
            <div id="qrcode" style="display: inline-block; padding: 15px; background: white; border: 5px solid #f6f8f9; border-radius: 10px;"></div>
            <p style="color: #000; margin-top: 15px; font-size: 14px; font-weight: bold;">https://la-b-ib.github.io/</p>
            <div style="margin-top: 20px; display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; align-items: center;">
              <button class="copy-link-btn icon-btn" title="Copy Link" style="width: 50px; height: 50px; background: #FBBC04; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <i class="material-icons" style="font-size: 28px; color: #000;">content_copy</i>
              </button>
              <button class="nfc-share-btn icon-btn" title="Share via NFC" style="width: 50px; height: 50px; background: #34A853; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <i class="material-icons" style="font-size: 28px; color: white;">nfc</i>
              </button>
              <button class="qr-close-btn icon-btn" title="Close" style="width: 50px; height: 50px; background: #EA4335; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
                <i class="material-icons" style="font-size: 28px; color: white;">close</i>
              </button>
            </div>
          </div>
        </div>
      `);
      
      // Generate QR Code only once when page loads
      if ($('#qrcode').length && $('#qrcode').is(':empty')) {
        new QRCode(document.getElementById("qrcode"), {
          text: "https://la-b-ib.github.io/",
          width: 256,
          height: 256,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.H
        });
      }
      
      // NFC Share functionality
      $(document).on('click', '.nfc-share-btn', async function(e) {
        e.preventDefault();
        const btn = $(this);
        const icon = btn.find('i');
        
        // Check if Web NFC API is available
        if (!('NDEFReader' in window)) {
          // Show error briefly by changing icon
          icon.text('error');
          setTimeout(() => {
            icon.text('nfc');
          }, 2000);
          return;
        }
        
        try {
          const ndef = new NDEFReader();
          await ndef.write({
            records: [
              { 
                recordType: "url", 
                data: "https://la-b-ib.github.io/" 
              }
            ]
          });
          // Show success
          icon.text('check');
          btn.css('background', '#34A853');
          setTimeout(() => {
            icon.text('nfc');
            btn.css('background', '#34A853');
          }, 2000);
        } catch (error) {
          // Show error
          icon.text('error');
          setTimeout(() => {
            icon.text('nfc');
          }, 2000);
          console.error('NFC Error:', error);
        }
      });
      
      // Copy Link functionality
      $(document).on('click', '.copy-link-btn', async function(e) {
        e.preventDefault();
        const url = 'https://la-b-ib.github.io/';
        const btn = $(this);
        const icon = btn.find('i');
        
        try {
          await navigator.clipboard.writeText(url);
          icon.text('check');
          btn.css('background', '#34A853');
          icon.css('color', 'white');
          
          // Reset button after 2 seconds
          setTimeout(() => {
            icon.text('content_copy');
            btn.css('background', '#FBBC04');
            icon.css('color', '#000');
          }, 2000);
        } catch (error) {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = url;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          
          try {
            document.execCommand('copy');
            icon.text('check');
            btn.css('background', '#34A853');
            icon.css('color', 'white');
            
            setTimeout(() => {
              icon.text('content_copy');
              btn.css('background', '#FBBC04');
              icon.css('color', '#000');
            }, 2000);
          } catch (err) {
            // Show error by changing icon briefly
            icon.text('error');
            setTimeout(() => {
              icon.text('content_copy');
            }, 2000);
          }
          
          document.body.removeChild(textArea);
        }
      });

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

      // QR Code click handler
      $(document).on('click', '.mobile-nav-qr', function(e) {
        e.preventDefault();
        $('.qr-code-overlay').css('display', 'flex');
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').removeClass('close').addClass('drag_indicator');
        $('.mobile-nav-overlay').fadeOut();
      });

      // Close QR code overlay
      $(document).on('click', '.qr-close-btn', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.qr-code-overlay').fadeOut();
      });
      
      // Close when clicking overlay background
      $(document).on('click', '.qr-code-overlay', function(e) {
        if ($(e.target).hasClass('qr-code-overlay')) {
          $('.qr-code-overlay').fadeOut();
        }
      });

      // Prevent closing when clicking inside QR container
      $(document).on('click', '.qr-code-container', function(e) {
        e.stopPropagation();
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
