$(function () {
  // a태그 기본동작 방지
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
})

const body = document.querySelector('body');
const headerEl = document.querySelector('.header');
let windowWidth = 0;
let scrollPosition = 0;

// body fixed
function enable() {
  scrollPosition = window.pageYOffset;
  body.style.overflow = 'hidden';
  body.style.position = 'fixed';
  body.style.top = `-${scrollPosition}px`;
  body.style.width = '100%';
}

function disable() {
  body.style.removeProperty('overflow');
  body.style.removeProperty('position');
  body.style.removeProperty('top');
  body.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
}

headerEl.addEventListener('click', function(event) {
  if(event.target.classList.contains('global-nav__menu')) {
    globalNavMenuBtnToggle();
  }
});

window.addEventListener('resize', function() {
  windowWidth = window.innerWidth;

  if((windowWidth > 991) && (headerEl.classList.contains('is-open'))) {
    navigationClose();
  } else {
    return;
  }
});

function globalNavMenuBtnToggle() {
    if(headerEl.classList.contains('is-open')) {
      navigationClose();
    } else {
      navigationOpen();
    }
}

function navigationOpen() {
  const globalNavMenuBtn = document.querySelector('.global-nav__menu');

  headerEl.classList.add('is-open');
  enable();
  globalNavMenuBtn.setAttribute('aria-label', 'close navigation menu');
}

function navigationClose() {
  const globalNavMenuBtn = document.querySelector('.global-nav__menu');

  headerEl.classList.remove('is-open');
  disable();
  globalNavMenuBtn.setAttribute('aria-label', 'navigation menu');
}

// landing
var startCount = {var: 0};

const counting = gsap.to(startCount, {
  var: 100,
  duration: 2,
  ease:"none",
  onStart: function() {
    $('body').addClass('is-load');
  },
  onUpdate: changeNumber,
  scrollTrigger: {
    trigger: ".loading__count",
  },
  onComplete: function() {
    $('body').removeClass('is-load');
    $('.loading').addClass('is-invisible');
    window.scrollTo(0,0);
    moveCursor();
  }
})

function changeNumber() {
  const count = document.querySelector('.loading__count');
  count.innerHTML = (startCount.var).toFixed();
}

// cursor
function moveCursor() {
  const cursor = document.querySelector('.cursor');
  window.addEventListener('mousemove', function(e){
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.opacity = '1';
  });
  $('a').mouseenter(function(){
    $('.cursor').addClass('is-hover');
  });

  $('a').mouseleave(function(){
    $('.cursor').removeClass('is-hover');
  });
}

// gnb
$(".global-nav__item--expanded").mouseenter(function () {
  $("body").addClass("is-local-nav-open");
});
$(".local-nav").mouseleave(function () {
  $("body").removeClass("is-local-nav-open");
});

$(".local-nav__link").mouseenter(function () {
  const index = $(this).parent().index();

  $(`.local-nav-thumbnail__item:eq(${index})`)
    .addClass("is-visible")
    .siblings()
    .removeClass("is-visible");
});


ScrollTrigger.create({
  trigger: '.section-visual',
  start: '0% 0%',
  end: '100% 0',
  // markers: true,
  onLeaveBack: function() {
    imgEl = $('.section-visual img');
    total = imgEl.length;
    $('.section-visual img').eq(total).addClass('on');
  },
  onUpdate: function(self) {

    imgEl = $('.section-visual img');
    total = imgEl.length - 1;
    currImg = Math.round(total-(self.progress * total));
    curr = imgEl.eq(currImg);

    if($('.section-visual img.on')) {
      imgEl.removeClass('on');
    }

    if(curr) {
      curr.addClass('on');
    }
    // console.log(Math.round(self.progress * imgLength));
  }
})
const headTxt = new SplitType('.marquee__text span ', { types: 'words, chars', });

gsap.to('.section-visual .marquee__content', {
  scrollTrigger: {
    trigger: '.section-visual',
    start: '0% 0%',
    end: '100% 0',
    // markers: true,
    scrub: 0,
  },
  xPercent: -20,
})

gsap.to('.section-visual .marquee__texts:nth-child(2) .char', {
  yPercent: -110,
  stagger: 0.1,
  delay: 1.2,
  })

  const testimonialSwiper = new Swiper('.section-testimonials .swiper', {
    autoplay: {
      delay: 3000
    },
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    touchRatio: 0,
    on: {
      slideChange: function () {
        $('.indicator__button').removeClass('is-active');
        $('.indicator__button').eq(this.realIndex).addClass('is-active');
      }
    }
  });

  $('.indicator__button').on('click', function(e) {
    e.preventDefault();
    const idx = $(this).index();
    $('.indicator__button').removeClass('is-active');
    $(this).addClass('is-active');
    testimonialSwiper.slideToLoop(idx);
  });

// canvas
// const canvas = document.querySelector("#canvas");
// const ctx = canvas.getContext("2d");

// canvas.width = 2500;
// canvas.height = 1355;

// const frameCount = 49;

// const currentFrame = (idx) => {
//   return `https://d20b8mqh7zo0pc.cloudfront.net/hero-sequence/v2/webp/ese-hero-sequence${idx
//     .toString()
//     .padStart(2, "0")}.webp`;
// };

// const images = [];
// const card = {
//   frame: 0,
// };

// for (let i = frameCount; i > 0; i--) {
//   const img = new Image();
//   img.src = currentFrame(i);
//   images.push(img);
// }

// gsap.to(card, {
//   frame: frameCount - 1,
//   snap: "frame",
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".section-visual__sticky",
//     scrub: 1,
//     start: "top top",
//     end: "bottom center",
//     // pin: true,
//     // markers: true
//   },
//   onUpdate: render,
//   // duration: 4,
// });

// images[0].onload = render;

// function render() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   ctx.drawImage(images[card.frame], 0, 0);
// }

// from 과거 to 미래
$('.section-work__item').each(function(i,el) {
  gsap.from($(this).find('a'),{
    opacity:0,
    y: '100',
    delay: el.dataset.delay,
    scrollTrigger: {
      trigger: el,
      start:'0% 100%',
      end: 'bottom center',
      //markers: true,
      toggleActions: 'play none none reset'
      },
  })
})

$('.section-interview__video').mousemove(function(e) {
  offsetX = e.offsetX;
  offsetY = e.offsetY;

  w = $('.section-interview__video').outerWidth();
  h = $('.section-interview__video').outerHeight();

  gsap.to('.common-video__play', {
    x: (offsetX-(w/2)) / 10,
    y: (offsetY-(h/2)) / 10,
  })
})

const stickySlide = new Swiper('.section-detail .swiper', {
  direction: 'vertical',
  parallax:true,
  speed: 1000
});
ScrollTrigger.create({
  trigger: '.section-detail__inner',
  start: '0% 0%',
  end: '100% 100%',
  //markers: true,
  onUpdate: function(self) {
    idx = Math.round(self.progress*4);

    stickySlide.slideTo(idx);
    $('.progress__column').eq(idx).find('.progress__fill').css({
        width: '50%'
    })
  }
})

// gsap.fromTo('.section-work__item', {
//   opacity:0,
//   y: '100',
//   }, {
//   scrollTrigger: {
//   trigger:'.section-work__list',
//   start:'top center',
//   // markers: true
//   },
//   y: 0,
//   opacity:1,
//   stagger: .2,
// });

$('.common-video__control--audio').click(function (e) {
  $(this).toggleClass('is-active');
});


// $('.section-partner__item').each(function(index, element) {
//   const anim = gsap.fromTo(element, {
//     opacity:0,
//     y: '1rem',
//   }, {
//     y: 0,
//     opacity:1,
//     // delay: (index + 1) * .2,
//   });
//   ScrollTrigger.create({
//     trigger: element,
//     start:'top center',
//     animation: anim,
//     toggleActions: 'play none none none',
//     // play pause resume reset
//     once: true,
//   });
// });

