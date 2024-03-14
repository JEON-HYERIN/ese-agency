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
/*
const loading = gsap.timeline({
  //delay: 1,
  paused: true,
  autoAlpha: 0,
  onStart: () => {
    $('body').addClass('.is-loading');
    console.log('start')
    count()
  },
  onComplete: () => {
    $('body').removeClass('.is-loading');
  }
})
.addLabel('a')
.to('.loading', {autoAlpha: 0}, 'a+=1')
*/
//loading.play()
function count() {
  const counter = ($counter, max) => {
    let now = max;
  
    const handle = setInterval(() => {
      $counter.innerHTML = Math.ceil(max - now);
    
      // 목표수치에 도달하면 정지
      if (now < 1) {
        clearInterval(handle);
      }
      
      // 증가되는 값이 계속하여 작아짐
      const step = now / 10;
      
      // 값을 적용시키면서 다음 차례에 영향을 끼침
      now -= step;
    }, 50);
  }
  
  window.onload = () => {
    // 카운트를 적용시킬 요소
    const $counter = document.querySelector(".loading__count");
    
    // 목표 수치
    const max = 100;
    
    setTimeout(() => counter($counter, max), 2000);
  }
}


gsap.registerPlugin(ScrollTrigger);

const number = $('.loading__count');
var startCount = {var: 0};

gsap.to(startCount, {
  var: 500,
  duration: 3,
  onUpdate: changeNumber,
  scrollTrigger: {
    trigger: '.loading',
    toggleActions: 'restart none reverse none'
    //play pause resume reset
  },
})
function changeNumber() {
  number.innerHTML = (startCount.var).toFixed();
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
    scrub: 0
  },
  xPercent: -20,
})

gsap.to('.section-visual .marquee__texts:nth-child(2) .char', {
  yPercent: -110,
  stagger: 0.1
  })


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
//     trigger: ".section-visual__canvas",
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
    $('.progressbar__column').eq(idx).find('.progressbar__fill').css({
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

  // cursor
  const cursor = document.querySelector('.cursor');
  const videoCursor = document.querySelectorAll('.common-video__play');
  // window.addEventListener('mousemove', function(e){
  //   mouseCursor.style.left = e.clientX + 'px';
  //   mouseCursor.style.top = e.clientY + 'px';
  //   mouseCursor.style.opacity = '1';
  // });

  cursorMotion(cursor);
  videoCursor.forEach(el => {
    cursorMotion(el);

  });
  $('a').mouseenter(function(){
    $('.cursor').addClass('is-hover');
  });

  $('a').mouseleave(function(){
    $('.cursor').removeClass('is-hover');
  });

  function cursorMotion(selector) {
    window.addEventListener('mousemove', function(e){
      selector.style.left = e.clientX + 'px';
      selector.style.top = e.clientY + 'px';
      selector.style.opacity = '1';
    });
  }

  $('.common-video__cursor').mouseenter(function(){
    $(this).addClass('is-hover');
  });
  $('.common-video__cursor').mouseleave(function(){
    $(this).removeClass('is-hover');
  });