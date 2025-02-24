$(document).ready(function () {
  const lenis = new Lenis();
  gsap.ticker.add((time) => {
    lenis.raf(time * 500); 
  });
  gsap.ticker.lagSmoothing(0);
  var OurWorkOdd = new Swiper('.maquee_wpr_slider', {
    loop: true,
    slidesPerView: "auto",
    spaceBetween: 0,
    centeredSlides: true,
    speed: 3000,
    allowTouchMove: false,
    autoplay: {
      delay: 0.5,
      disableOnInteraction: true,
    }
  });

  // HEADER MENU 
  $("body").on('click', '.header_menu', function () {
    if ($(this).hasClass('is-open')) {
        $(this).removeClass('is-open');
        $(this).parents(".header").find(".header_menu_main").removeClass("is-open");
        $(this).parents(".header").find(".menu-overlay").removeClass("is-open");
        $("html").removeClass("menu_open")
      } else {
        $(this).addClass('is-open');
        $(this).parents(".header").find(".header_menu_main").addClass("is-open");
        $(this).parents(".header").find(".menu-overlay").addClass("is-open");
        $("html").addClass("menu_open");
      }
    });
    $("body").on('click', '.menu-overlay', function () {
      $(this).removeClass('is-open');
      $(this).parents(".header").find(".header_menu_main, .header_menu").removeClass("is-open");
      $("html").removeClass("menu_open")
  });

  // HEADER BG
  $(window).scroll(function() {
      var scrollPos = $(this).scrollTop();
      if (scrollPos >= 100) {
          $(".header").addClass("bg-add");
      } else {
          $(".header").removeClass("bg-add");
      }
      if (scrollPos >= 880) {
        $(".header").addClass("logo_remove");
      } else {
          $(".header").removeClass("logo_remove");
      }
  });

    // hover tab
    gsap.set(".restaurants_menu_img", {autoAlpha: 1, xPercent:-100})
    var $page = $('.restaurants_menu_img'),
        $button = $('.restaurants_center .header_menu_block');
    $button.on('mouseenter', function(e) {
      var $thisPage = $(this).attr('id');
      gsap.to($thisPage, 0.3, {xPercent:0, ease: Sine.easeInOut, rotation:10});
    });
    $button.on('mouseleave', function(e) {
      gsap.to($page, 0.1, {xPercent:-100, ease: Power2.easeIn, rotation:0});
    });

   // HORIZONTAL SCROLL
   let sections = gsap.utils.toArray(".slide");
   let totalSections = sections.length;
   let FullslideWidth = $('.horizontal-sliders').innerWidth();
   
   gsap.to(sections, {
     xPercent: -100 * (totalSections - 1), 
     ease: "none",
     scrollTrigger: {
       trigger: ".horizontal-sliders",
       pin: ".savoureuse_slider_main",
       pinSpacing: true,
       scrub: 1,
       end: () => "+=" + FullslideWidth,
       markers: false,
       onUpdate: self => {
         const progress = self.progress * 100;
         gsap.to(".progress-bar", { width: progress + "%", ease: "none" });
       }
     }
   });

    // hover images show
    const elementsWorks = document.querySelectorAll(".item-work");
    const slidePicWorks = document.querySelector("#gallery-work");
    const slidePicsWorks = document.querySelector("#work-images");

    gsap.set(slidePicWorks, { autoAlpha: 0 });

    elementsWorks.forEach((element, index) => {
      element.addEventListener("mouseenter", function () {
        gsap.to(slidePicsWorks, {
          marginTop: `-${35 * index}rem`,
          duration: 0.2,
          ease: "power1",
        });
      });
    });
    
    window.addEventListener("mousemove", function (e) {
      gsap.to(slidePicWorks, {
        top: `${e.clientY}px`,
        left: `${e.clientX}px`,
        xPercent: -50,
        yPercent: -50,
        duration: 0.5,
        ease: "power1",
      });
    });

    document
      .querySelector(".items-works")
      .addEventListener("mouseenter", function () {
        gsap.to(slidePicWorks, {
          autoAlpha: 1,
          duration: 0.2,
          ease: "power1",
        });
      });

    document
      .querySelector(".items-works")
      .addEventListener("mouseleave", function () {
        gsap.to(slidePicWorks, {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power1",
        });
      });

    // TEXT ANIMATION
    let typeSplit = new SplitType('.hero_info h1', {
      types: 'lines, words, chars',
      tagName: 'span'
    })
    
    gsap.from('.hero_info h1 .word', {
      y: '600%',
      opacity: 1,
      duration: 1,
      ease: 'power3.inOut',
      stagger: 0.15,
    })
      
    $(window).on('load', function() { 
      $('.loader').addClass('loaded');
    });

    // lottie svg animation
    gsap.registerPlugin(ScrollTrigger);
    var animation = bodymovin.loadAnimation({
      container: document.getElementById('loti-animation'),
      path: './assets/images/girl-cycling-in-autumn.json',
      renderer: 'svg',
      loop: true, 
      autoplay: false, 
      name: 'scroll-animation'
    });
    
    ScrollTrigger.create({
      trigger: "#loti-animation",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        let progress = self.progress;
        animation.goToAndStop(progress * animation.totalFrames, true);
      }
    });
});



