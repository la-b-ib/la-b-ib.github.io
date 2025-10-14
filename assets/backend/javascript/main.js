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

/*--------------------------------------------------------------
# Live Code Playground with Monaco Editor
--------------------------------------------------------------*/

// Initialize Monaco Editor when DOM is loaded
let htmlEditor, cssEditor, jsEditor;

// Load Monaco Editor
require.config({ paths: { 'vs': 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' }});

window.MonacoEnvironment = {
  getWorkerUrl: function(workerId, label) {
    return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
      self.MonacoEnvironment = {
        baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/'
      };
      importScripts('https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs/base/worker/workerMain.js');
    `)}`;
  }
};

require(['vs/editor/editor.main'], function() {
  // Define custom transparent theme
  monaco.editor.defineTheme('transparentTheme', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#00000000',
      'editor.lineHighlightBackground': '#00000008',
      'editorLineNumber.foreground': '#237893',
      'editorLineNumber.activeForeground': '#0B216F'
    }
  });
  
  // VS Code editor options
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 13,
    lineNumbers: 'on',
    lineNumbersMinChars: 1,
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 0,
    renderLineHighlight: 'all',
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    fontFamily: "'Consolas', 'Courier New', monospace",
    lineHeight: 19,
    letterSpacing: 0,
    padding: { top: 0, bottom: 0 },
    scrollbar: {
      vertical: 'hidden',
      horizontal: 'hidden',
      verticalScrollbarSize: 0,
      horizontalScrollbarSize: 0,
      alwaysConsumeMouseWheel: false
    },
    overviewRulerLanes: 0,
    hideCursorInOverviewRuler: true,
    overviewRulerBorder: false
  };
  
  // Initialize HTML Editor
  htmlEditor = monaco.editor.create(document.getElementById('htmlEditor'), {
    value: `<div class="card">
  <h2>Hello World! 👋</h2>
  <p>Edit the code and click "Run Code" to see changes!</p>
  <button id="myBtn">Click Me</button>
</div>`,
    language: 'html',
    theme: 'transparentTheme',
    ...editorOptions
  });

  // Initialize CSS Editor
  cssEditor = monaco.editor.create(document.getElementById('cssEditor'), {
    value: `.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  text-align: center;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
}

button {
  background: white;
  color: #667eea;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.1);
  box-shadow: 0 5px 15px rgba(255,255,255,0.3);
}`,
    language: 'css',
    theme: 'transparentTheme',
    ...editorOptions
  });

  // Initialize JavaScript Editor
  jsEditor = monaco.editor.create(document.getElementById('javascriptEditor'), {
    value: `// Add interactivity here!
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('myBtn');
  
  if (btn) {
    btn.addEventListener('click', function() {
      alert('🎉 You clicked the button!');
      this.textContent = 'Clicked!';
      this.style.background = '#34A853';
      this.style.color = 'white';
    });
  }
});`,
    language: 'javascript',
    theme: 'transparentTheme',
    ...editorOptions
  });

  // Force minimal line number margin width with aggressive CSS override
  const style = document.createElement('style');
  style.textContent = `
    .monaco-editor .margin,
    .monaco-editor .margin-view-overlays {
      width: 20px !important;
      min-width: 20px !important;
      max-width: 20px !important;
    }
    .monaco-editor .line-numbers {
      padding: 0 !important;
      padding-left: 0px !important;
      padding-right: 4px !important;
      margin: 0 !important;
      margin-left: 0px !important;
      left: 0px !important;
      text-align: left !important;
    }
    .monaco-editor .glyph-margin {
      display: none !important;
      width: 0 !important;
    }
  `;
  document.head.appendChild(style);

  // Force layout update on all editors
  setTimeout(() => {
    [htmlEditor, cssEditor, jsEditor].forEach(editor => {
      if (editor) {
        editor.layout();
        // Force zero padding on line numbers using DOM manipulation
        const editorElement = editor.getDomNode();
        if (editorElement) {
          const lineNumbers = editorElement.querySelectorAll('.line-numbers');
          lineNumbers.forEach(ln => {
            ln.style.paddingLeft = '0px';
            ln.style.marginLeft = '0px';
            ln.style.left = '0px';
          });
          const margins = editorElement.querySelectorAll('.margin');
          margins.forEach(m => {
            m.style.width = '20px';
            m.style.paddingLeft = '0px';
            m.style.marginLeft = '0px';
          });
        }
      }
    });
  }, 100);

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (this.classList.contains('active') || this.id === 'runCode') return;
      
      const editor = this.dataset.editor;
      
      // Update active tab
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      // Update active editor panel
      document.querySelectorAll('.editor-panel').forEach(p => p.classList.remove('active'));
      document.getElementById(`${editor}EditorPanel`).classList.add('active');
    });
  });

  // Run code button
  document.getElementById('runCode').addEventListener('click', runCode);

  // Copy code buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const editor = this.dataset.editor;
      let code = '';
      
      if (editor === 'html') code = htmlEditor.getValue();
      else if (editor === 'css') code = cssEditor.getValue();
      else if (editor === 'javascript') code = jsEditor.getValue();
      
      navigator.clipboard.writeText(code).then(() => {
        const icon = this.querySelector('i');
        icon.className = 'ri-check-line';
        setTimeout(() => {
          icon.className = 'ri-file-copy-line';
        }, 2000);
      });
    });
  });

  // Clear output button
  document.getElementById('clearOutput').addEventListener('click', function() {
    const iframe = document.getElementById('outputFrame');
    iframe.srcdoc = '';
  });

  // Template buttons
  const templates = {
    card: {
      html: `<div class="interactive-card">
  <div class="card-header">
    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar">
  </div>
  <div class="card-body">
    <h3>Interactive Card</h3>
    <p>Hover to see 3D effect!</p>
    <button class="card-btn">Learn More</button>
  </div>
</div>`,
      css: `.interactive-card {
  width: 100%;
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.15);
  transition: transform 0.3s ease;
  margin: 0;
}

.card-header {
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 40px 0;
  text-align: center;
}

.card-header img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid white;
}

.card-body {
  padding: 40px 0;
  text-align: center;
}

.card-body h3 {
  font-size: 20px;
  margin-bottom: 10px;
}

.card-body p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
}

.card-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 0;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .interactive-card {
    width: 100%;
    margin: 0;
  }
}`,
      js: `document.querySelector('.card-btn')?.addEventListener('click', function() {
  alert('Button clicked! ✨');
  this.textContent = '✓ Clicked';
});`
    },
    form: {
      html: `<div class="modern-form">
  <h2>Modern Form</h2>
  <form>
    <div class="form-group">
      <input type="text" placeholder="Name" required>
    </div>
    <div class="form-group">
      <input type="email" placeholder="Email" required>
    </div>
    <button type="submit">Submit</button>
  </form>
</div>`,
      css: `.modern-form {
  width: 100%;
  margin: 0;
  padding: 0 30px 30px 30px;
  background: white;
  border-radius: 0;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

.modern-form h2 {
  color: #667eea;
  margin-bottom: 25px;
  text-align: center;
  font-size: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 0;
  font-size: 16px;
  transition: all 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 10px rgba(102, 126, 234, 0.2);
}

button[type="submit"] {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 0;
  font-size: 16px;
  padding: 12px;
  border-radius: 0;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .modern-form {
    width: 100%;
    margin: 0;
  }
}`,
      js: `document.querySelector('form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Form submitted! ✅');
  this.reset();
});`
    },
    counter: {
      html: `<div class="counter-container">
  <h2>Counter App</h2>
  <div class="counter-display" id="count">0</div>
  <div class="button-group">
    <button class="counter-btn decrease" id="decrease">−</button>
    <button class="counter-btn reset" id="reset">Reset</button>
    <button class="counter-btn increase" id="increase">+</button>
  </div>
</div>`,
      css: `.counter-container {
  width: 100%;
  margin: 0;
  text-align: center;
  background: white;
  padding: 0 40px 40px 40px;
  border-radius: 0;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 20px;
}

.counter-display {
  font-size: 48px;
  font-weight: bold;
  color: #667eea;
  margin: 0;
  transition: all 0.3s ease;
}

.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.counter-btn {
  padding: 12px 24px;
  font-size: 14.4px;
  font-weight: bold;
  border: none;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

.increase {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.decrease {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

.reset {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
}

.counter-btn:active {
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .counter-container {
    width: 100%;
    margin: 0;
  }
}`,
      js: `let count = 0;
const display = document.getElementById('count');

document.getElementById('increase').addEventListener('click', () => {
  count++;
  updateDisplay();
});

document.getElementById('decrease').addEventListener('click', () => {
  count--;
  updateDisplay();
});

document.getElementById('reset').addEventListener('click', () => {
  count = 0;
  updateDisplay();
});

function updateDisplay() {
  display.textContent = count;
  display.style.transform = 'scale(1.2)';
  setTimeout(() => {
    display.style.transform = 'scale(1)';
  }, 200);
}`
    },
    toggle: {
      html: `<div class="toggle-container">
  <div class="content">
    <h1>🌙 Dark Mode Toggle</h1>
    <p>Click the toggle to switch between light and dark mode</p>
    <label class="switch">
      <input type="checkbox" id="darkModeToggle">
      <span class="slider"></span>
    </label>
  </div>
</div>`,
      css: `.toggle-container {
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.4s ease, color 0.4s ease;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  margin: 0 auto;
  padding: 0;
}

.toggle-container.dark {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
}

.content {
  text-align: center;
  padding: 0 40px 40px 40px;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border-radius: 0;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}

h1 {
  font-size: 28px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.switch {
  position: relative;
  display: inline-block;
  width: 80px;
  height: 40px;
  border-radius: 0;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 0;
}

.slider:before {
  position: absolute;
  content: "";
  height: 32px;
  width: 32px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 0;
}

input:checked + .slider {
  background-color: #ffd700;
}

input:checked + .slider:before {
  transform: translateX(40px);
}

@media (max-width: 768px) {
  .toggle-container {
    width: 100%;
    margin: 0;
  }
}`,
      js: `const toggle = document.getElementById('darkModeToggle');
const container = document.querySelector('.toggle-container');

toggle.addEventListener('change', () => {
  container.classList.toggle('dark');
});`
    },
    progress: {
      html: `<div class="progress-container">
  <h2>Progress Bar Demo</h2>
  <div class="progress-wrapper">
    <div class="progress-bar" id="progressBar">
      <span id="progressText">0%</span>
    </div>
  </div>
  <div class="button-group">
    <button id="startBtn">Start</button>
    <button id="resetBtn">Reset</button>
  </div>
  <p id="status">Click Start to begin</p>
</div>`,
      css: `.progress-container {
  width: 100%;
  margin: 0;
  text-align: center;
  background: white;
  padding: 0 40px 40px 40px;
  border-radius: 0;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
}

h2 {
  color: #333;
  margin-bottom: 30px;
  font-size: 20px;
}

.progress-wrapper {
  width: 100%;
  height: 30px;
  background: #f0f0f0;
  border-radius: 0;
  overflow: hidden;
  margin: 0;
  box-shadow: inset 0 2px 5px rgba(0,0,0,0.1);
}

.progress-bar {
  height: 100%;
  width: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 0;
  transition: width 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 12px;
}

.button-group {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
}

.button-group button {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
}

#startBtn {
  background: linear-gradient(135deg, #667eea, #764ba2);
}

#resetBtn {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

color: white;
}

@media (max-width: 768px) {
  .progress-container {
    width: 100%;
    margin: 0;
  }
}

#status {
  margin-top: 20px;
  color: #666;
  font-size: 16px;
}`,
      js: `let progress = 0;
let interval = null;

const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const status = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

startBtn.addEventListener('click', () => {
  if (interval) return;
  
  status.textContent = 'Loading...';
  interval = setInterval(() => {
    progress += 1;
    progressBar.style.width = progress + '%';
    progressText.textContent = progress + '%';
    
    if (progress >= 100) {
      clearInterval(interval);
      interval = null;
      status.textContent = 'Complete! ✅';
    }
  }, 30);
});

resetBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;
  progress = 0;
  progressBar.style.width = '0%';
  progressText.textContent = '0%';
  status.textContent = 'Click Start to begin';
});`
    }
  };

  document.querySelectorAll('.template-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const template = templates[this.dataset.template];
      if (template) {
        htmlEditor.setValue(template.html);
        cssEditor.setValue(template.css);
        jsEditor.setValue(template.js);
        runCode();
      }
    });
  });

  // Load interactive card template by default
  const cardTemplate = templates['card'];
  htmlEditor.setValue(cardTemplate.html);
  cssEditor.setValue(cardTemplate.css);
  jsEditor.setValue(cardTemplate.js);
  
  // Initial run
  runCode();
});

function runCode() {
  const html = htmlEditor.getValue();
  const css = cssEditor.getValue();
  const js = jsEditor.getValue();
  
  const output = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Bungee&display=swap" rel="stylesheet">
      <style>
        * {
          box-sizing: border-box;
          font-family: "Bungee", sans-serif !important;
        }
        *::-webkit-scrollbar {
          display: none;
        }
        * {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: auto;
          font-size: 17px;
          display: flex;
          align-items: flex-start;
          overflow-x: hidden;
          overflow-y: auto;
        }
        body {
          margin: 0;
          padding: 0 20px;
          width: 100%;
          min-height: auto;
          font-family: "Bungee", sans-serif;
          font-size: 17px;
          line-height: 1.6;
          color: #000000;
          background: transparent;
          overflow-x: hidden;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        p {
          font-size: 16px;
        }
        @media (max-width: 768px) {
          body {
            padding: 0;
          }
        }
        ${css}
      </style>
    </head>
    <body>
      ${html}
      <script>
        try {
          ${js}
        } catch(e) {
          console.error('JavaScript Error:', e);
          document.body.innerHTML += '<div style="background: #ff4444; color: white; padding: 15px; border-radius: 8px; margin-top: 20px;"><strong>Error:</strong> ' + e.message + '</div>';
        }
      <\/script>
    </body>
    </html>
  `;
  
  const iframe = document.getElementById('outputFrame');
  iframe.srcdoc = output;
}
