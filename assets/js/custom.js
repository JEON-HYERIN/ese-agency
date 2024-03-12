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
  if(event.target.classList.contains('globalnav__menu')) {
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
  const globalNavMenuBtn = document.querySelector('.globalnav__menu');

  headerEl.classList.add('is-open');
  enable();
  globalNavMenuBtn.setAttribute('aria-label', 'close navigation menu');
}

function navigationClose() {
  const globalNavMenuBtn = document.querySelector('.globalnav__menu');

  headerEl.classList.remove('is-open');
  disable();
  globalNavMenuBtn.setAttribute('aria-label', 'navigation menu');
}

// gnb
$(".globalnav__item--expanded").mouseenter(function () {
  $("body").addClass("is-localnav-open");
});
$(".localnav").mouseleave(function () {
  $("body").removeClass("is-localnav-open");
});

$(".localnav__link").mouseenter(function () {
  const index = $(this).parent().index();

  $(`.localnav-thumbnail__item:eq(${index})`)
    .addClass("is-visible")
    .siblings()
    .removeClass("is-visible");
});

// canvas
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = 2500;
canvas.height = 1355;

const frameCount = 49;

const currentFrame = (idx) => {
  return `https://d20b8mqh7zo0pc.cloudfront.net/hero-sequence/v2/webp/ese-hero-sequence${idx
    .toString()
    .padStart(2, "0")}.webp`;
};

const images = [];
const card = {
  frame: 0,
};

for (let i = frameCount; i > 0; i--) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.to(card, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: ".section-visual__canvas",
    scrub: 1,
    start: "top top",
    end: "bottom center",
    // pin: true,
    // markers: true
  },
  onUpdate: render,
  // duration: 4,
});

images[0].onload = render;

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(images[card.frame], 0, 0);
}

gsap.fromTo('.section-work__item', {
  opacity:0,
  y: '100',
  }, {
  scrollTrigger: {
  trigger:'.section-work__list',
  start:'top center',
  // markers: true
  },
  y: 0,
  opacity:1,
  stagger: .2,
});

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

  // cursor
  const mouseCursor = document.querySelector('.cursor');

  window.addEventListener('mousemove', function(e){
    mouseCursor.style.left = e.clientX + 'px';
    mouseCursor.style.top = e.clientY + 'px';
    mouseCursor.style.opacity = '1';
  });

  $('a').mouseenter(function(){
    $('.cursor').addClass('is-hover');
  });

  $('a').mouseleave(function(){
    $('.cursor').removeClass('is-hover');
  });