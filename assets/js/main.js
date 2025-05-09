(function($) {
    "use strict";
  
    // Nav Menu
    $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var hash = this.hash;
            var target = $(hash);
            if (target.length) {
                e.preventDefault();
  
                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }
  
                if (hash === '#header') {
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
            }
        }
    });
  
    // Activate/show sections on page load with hash
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
                '#about': {main: 'group_add', fallback: '👤'},
                '#education': {main: 'school', fallback: '🏫'}, 
                '#certification': {main: 'verified', fallback: '✅'},
                '#research': {main: 'science', fallback: '🔬'},
                '#experience': {main: 'work_history', fallback: '💼'},
                '#portfolio': {main: 'api', fallback: '💻'},
                '#skills': {main: 'schema', fallback: '🛠️'},
                '#blogs': {main: 'auto_stories', fallback: '📰'},
                '#contact': {main: 'contact_mail', fallback: '✉️'}
            };
  
            // Find matching icon
            var matchedKey = Object.keys(iconMap).find(function(key) {
                return href.includes(key);
            });
            
            if (matchedKey) {
                var iconData = iconMap[matchedKey];
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
                setTimeout(function() {
                    if ($icon.width() === 0) {
                        $icon.replaceWith($('<span>').text(iconData.fallback));
                    }
                }, 1000);
            }
        });
        
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
        $('body').append('<div class="mobile-nav-overly"></div>');
  
        $(document).on('click', '.mobile-nav-toggle', function(e) {
            e.stopPropagation();
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').toggle();
        });
  
        $(document).on('click', function(e) {
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
  
    // CounterUp - only initialize if plugin exists
    if (typeof $.fn.counterUp === 'function') {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 1000
        });
    }
  
    // Skills - only initialize if Waypoints plugin exists
    if (typeof $.fn.waypoint === 'function') {
        $('.skills-content').waypoint(function() {
            $('.progress .progress-bar').each(function() {
                $(this).css("width", $(this).attr("aria-valuenow") + '%');
            });
        }, {
            offset: '80%'
        });
    }
  
    // Testimonials carousel - only initialize if Owl Carousel exists
    if (typeof $.fn.owlCarousel === 'function') {
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
    }
  
    // Portfolio isotope - only initialize if Isotope exists
    if (typeof $.fn.isotope === 'function') {
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
    }
  
    // Venobox initialization with proper checks
    if (typeof $.fn.venobox === 'function') {
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
                closeColor: '#FF0000',
                navColor: '#0CBA3A',
                css: {
                    'background-color': '#010e1b',
                    'box-shadow': 'none'
                },
                onOpen: function() {
                    // Create close button with gamepad icon
                    var $closeBtn = $('.vbox-close');
                    $closeBtn.html('<i class="material-icons">gamepad</i>');
                    $closeBtn.addClass('custom-gamepad-close');
                    
                    // Font fallback detection
                    setTimeout(function() {
                        var $icon = $closeBtn.find('i.material-icons');
                        // Create test element to check if font loaded
                        var testSpan = $('<span class="material-icons" style="visibility: hidden; position: absolute; font-size: 20px;">text_format</span>');
                        $('body').append(testSpan);
                        
                        setTimeout(function() {
                            if (testSpan.width() === 0 || $icon.css('font-family').indexOf('Material Icons') === -1) {
                                $icon.addClass('font-fallback')
                                    .html('🎮')
                                    .css({
                                        'font-family': 'sans-serif',
                                        'line-height': '24px'
                                    });
                            }
                            testSpan.remove();
                        }, 100);
                    }, 100);
                    
                    // Style navigation buttons
                    $('.vbox-prev, .vbox-next').addClass('vbox-nav');
                    $('.vbox-prev').html('<i class="material-icons">skip_previous</i>');
                    $('.vbox-next').html('<i class="material-icons">skip_next</i>');
                    
                    // Mobile-specific adjustments
                    if ($(window).width() <= 768) {
                        $closeBtn.css({
                            'top': '10px',
                            'right': '10px',
                            'font-size': '24px',
                            'width': '24px',
                            'height': '24px',
                            'color': '#FF0000'
                        });
                        
                        $('.vbox-prev, .vbox-next').css({
                            'width': '24px',
                            'height': '24px',
                            'bottom': '10px',
                            'top': 'auto'
                        });
                        
                        $('.vbox-prev').css('left', '10px');
                        $('.vbox-next').css('right', '10px');
                    }
                },
                onClose: function() {
                    // Clean up classes we added
                    $('.vbox-close').removeClass('custom-gamepad-close');
                    $('.vbox-prev, .vbox-next').removeClass('vbox-nav');
                }
            });
        });
    }
  
})(jQuery);
