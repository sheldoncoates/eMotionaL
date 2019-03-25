// This stuff is all for making the bars look like voice waves
var bars = document.querySelectorAll('.bar');
var wave = document.querySelectorAll('#wave');

function animateBar(myClass) {

  var tl = new TimelineMax();

  var animationTime = Math.floor(Math.random() * 2) + 1;

  tl.add(
    TweenLite.to(
      myClass,
      animationTime,
      {
        height: Math.floor(Math.random() * 60 + 20),
        ease: Linear.easeNone
      }));

  tl.add(
    TweenLite.to(
      myClass,
      animationTime,
      {
        height: Math.floor(Math.random() * 20 + 3),
        ease: Linear.easeNone,
        onComplete: animateBar,
        onCompleteParams: [myClass]
      }));

}

bars.forEach(function (c) { return animateBar('.' + c.classList[1]); });

//side nav stuff 
/* Set the width of the side navigation to 250px */
function openNav() {
  document.getElementById("mySidenav").style.width = "275px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

//cool background stuff

/* ---- particles.js config ---- */

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 100,
      "density": {
        "enable": true,
        "value_area": 1000
      }
    },
    "color": {
      "value": ["#aa73ff", "#f8c210", "#83d238", "#33b1f8"]
    },

    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#ccc"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.7,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 2,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 120,
      "color": "#ccc",
      "opacity": 0.2,
      "width": 1
    },
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});
//SMOOTH SCROLLING
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
      &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - 30
        }, 1000, function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          //$target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
            //$target.focus(); // Set focus again
          };
        });
      }
    }
  });

//adding shadow on scroll and stuff
$(window).scroll(function () {
  showImages('#picone');
  showImages('#pictwo');
  showImages('#picthree');


  var scroll = $(window).scrollTop();
  if (scroll > 0) {
    $("#menuContainer").addClass("active");
    $("#menuTitle").addClass("active");
    $("#title").addClass("active");

  }
  else {
    $("#menuContainer").removeClass("active");
    $("#menuTitle").removeClass("active");
    $("#title").removeClass("active");

  }
});

$('.video-overlay, .video-overlay-close').on('click', function (e) {
  e.preventDefault();
  close_video();
});

$(document).keyup(function (e) {
  if (e.keyCode === 27) { close_video(); }
});

function close_video() {
  $('.video-overlay.open').removeClass('open').find('iframe').remove();
};

function showImages(el) {
  var windowHeight = jQuery( window ).height();
  $(el).each(function(){
      var thisPos = $(this).offset().top;

      var topOfWindow = $(window).scrollTop();
      if (topOfWindow + windowHeight - 200 > thisPos ) {
          $(this).addClass("fadeIn");
      }
  });
}