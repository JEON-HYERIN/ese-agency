// lenis
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0);

// 새로고침 시 사용자 스크롤 위치 저장하지 않음
if (history.scrollRestoration) {
  history.scrollRestoration = "manual";
}

// 새로고침 시 스크롤 맨 상단으로 이동
window.onload = function() {
  setTimeout (function () {
  scrollTo(0,0);
  },100);
}

// a태그 기본동작 방지
$(function () {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
})

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

// intro
var startCount = {var: 0};
const introMotion = gsap.timeline({
  paused: true,
  onComplete: function() {
    introMotion2.play();
  }
})
introMotion.addLabel('tl')
.to('.loading', {autoAlpha: 0, delay: .3})

const introMotion2 = gsap.timeline({
  paused: true,
  onComplete: function() {
    $('body').removeAttr('style');
    lenis.start();
    visualMotion();
  }
})
introMotion2
.fromTo('.header__logo a', {yPercent: 100}, {yPercent: 0, onComplete: function() {introWomen();}}, "+=0.2")
.fromTo('.global-nav__link', {yPercent: 100}, {yPercent: 0, stagger: .1}, "+=0")
.fromTo('.section-visual .marquee__text span', { yPercent: 150, scaleY: 1.2}, {yPercent: 0, scaleY: 1, stagger: 0.2}, "-=2")
.fromTo('.slogan__title span', {yPercent: 100}, {yPercent: 0, stagger: 0.2}, "-=1")

function introWomen() {
  imgEl = $('.section-visual__sticky img');
  total = imgEl.length - 1;
  for (let i = 0; i <= total; i++) {
    setTimeout(()=> {
      curr = imgEl.eq(i);
      if($('.section-visual__sticky img.is-visible')) {
        imgEl.removeClass('is-visible');
      }
      if(curr) {
        curr.addClass('is-visible');
      }
    }, i * 60)
  }
 }

const counting = gsap.to(startCount, {
  var: 100,
  duration: 2,
  ease:"none",
  onStart: function() {
    lenis.stop();
    $('body').addClass('is-load');
    window.scrollTo(0,0);
    $('body').css('overflow-x', 'hidden');
  },
  onUpdate: changeNumber,
  scrollTrigger: {
    trigger: ".loading__count",
  },
  onComplete: function() {
    $('body').removeClass('is-load');
    moveCursor();
    introMotion.play();
  }
})

function changeNumber() {
  const count = document.querySelector('.loading__count');
  count.innerHTML = (startCount.var).toFixed();
}

// visual
function visualMotion() {
  ScrollTrigger.create({
    trigger: '.section-visual',
    start: '0% 0%',
    end: '90% 60%',
    // markers: true,
    onLeaveBack: function() {
      imgEl = $('.section-visual__sticky img');
      total = imgEl.length;
    },
    onUpdate: function(self) {
      imgEl = $('.section-visual__sticky img');
      total = imgEl.length - 1;
      currImg = Math.round(total-(self.progress * total));
      curr = imgEl.eq(currImg);
  
      if($('.section-visual__sticky img.is-visible')) {
        imgEl.removeClass('is-visible');
      }
      if(curr) {
        curr.addClass('is-visible');
      }
    }
  })
  
  gsap.to('.section-visual .marquee__content', {
    scrollTrigger: {
      trigger: '.section-visual',
      start: '0% 55%',
      end: '85% 60%',
      // markers: true,
      scrub: 0,
    },
    xPercent: -20,
  })
}

// header & nav
$('.global-nav__menu').on('click', function () {
  if($(window).width() <= 991) {
    let tl = gsap.timeline({defaults: {duration: .2}});
    $('body').toggleClass('is-nav-open');
    if($('body').hasClass('is-nav-open')) {
      tl.to('.global-nav__panel', {height: '100%', delay: .1})
      tl.fromTo('.global-nav__item', {opacity: 0}, {opacity: 1, ease: 'none', stagger: .1});
  
      $('.global-nav__menu').attr('aria-label', 'close navigation menu');
      lenis.stop();
    } else {
      tl.to('.global-nav__panel', {height: '0', delay: .1})
      tl.fromTo('.global-nav__item', {opacity: 1}, {opacity: 0, ease: 'none', stagger: .1})
  
      $('.global-nav__menu').attr('aria-label', 'navigation menu');
      lenis.start();
    }
  } else {
    return;
  }
});
$('.global-nav__item--expertise .global-nav__link').on('click', function() {
  if($(window).width() <= 991) {
    const className = 'is-local-nav-open';
    $('body').toggleClass(className);
    if($('body').hasClass(className)) {
      gsap.to('.local-nav__inner', {
        height: 'auto',
        duration: .3,
      })
    } else {
      gsap.to('.local-nav__inner',{height: 0, duration: .3});
    }
  }
})
$('.global-nav__item--expertise .global-nav__link').on('mouseenter', function() {
  if($(window).width() >= 992) {
    const className = 'is-local-nav-open';
    $('body').addClass(className);
  }
})
$('.local-nav__inner').on('mouseleave', function() {
  if($(window).width() >= 992) {
    const className = 'is-local-nav-open';
    $('body').removeClass(className);
  }
})
$('.local-nav__link').mouseenter(function () {
  if($(window).width() >= 992) {
    const index = $(this).parent().index();
  
    $(`.local-nav-thumbnail__item:eq(${index})`)
    .addClass("is-visible")
    .siblings()
    .removeClass("is-visible");
  }
});
$(window).on('resize', function() {
  if($(window).width() >= 992) {
    $('body').removeClass('.is-local-nav-open is-nav-open');
    $('.header *').removeAttr('style');
  }
})


// gsap.from('.footer-nav__link .letter-wrapper span', {
//   yPercent: 100,
//   stagger: '.2',
//   scrollTrigger: {
//     trigger: '.footer',
//     start: '-50% top',
//     end: 'bottom center',
//     toggleActions: 'play none none reset',
//     markers: true
//   },
// })
 


gsap.to('.main', {
  scale: 0.9,
  borderRadius: 40,
  ease: 'none',
  scrollTrigger: {
    trigger: '.footer',
    start: 'top bottom',
    bottom:'90% top',
    scrub: 0,
    // markers: true,
    // toggleActions: 'play none none reset'
  }
})
gsap.from('.footer', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.main',
    start: 'bottom bottom',
    bottom:'bottom top',
    scrub: 0,
    // markers: true,
  }
})
// gsap.from('#about', {
//   y: 100,
//   opacity: 0,
//   scrollTrigger: {
//     trigger: '#about',
//     top: 'top top',
//     // end: 'bottom center',
//     scrub: 0,
//     // toggleActions: 'play none none reset',
//     markers: true,
//   }
// })

// gsap.to('.section-visual .marquee__texts:nth-child(2) .char', {
//   yPercent: -110,
//   stagger: 0.1,
//   delay: 1.2,
//   })

// from 과거 to 미래
// work
$('.section-work__item').each(function(i,el) {
  gsap.from($(this).find('.section-work__link'),{
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

gsap.from($('.section-work__more-view .more-view'), {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: '.section-work',
    start: '80% 60%',
    // end: 'bottom center',
    // markers: true,
    // scrub: 0,
    toggleActions: 'play none none reset'
  }
});

// interview
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

gsap.from('.section-interview__embedded', {
  yPercent: -20,
  scale: 1.2,
  scrollTrigger: {
    trigger: '.section-interview',
    start: 'top center',
    end: 'bottom center',
    scrub: 0,
    // markers: true,
  }
})

// expertise
const stickySlide = new Swiper('.section-expertise .swiper', {
  direction: 'vertical',
  parallax:true,
  speed: 1000,
  touchRatio: 0
});

bar = gsap.timeline({
  scrollTrigger:{
    trigger: '.section-expertise__inner',
    start: '0% 0%',
    end: '100% 100%',
    scrub:0,
    onUpdate: function(self) {
      gsap.to($('.section-expertise__item.swiper-slide-active .marquee__content'), {
        xPercent: -(Math.round(self.progress * 320))
      })
    }
  }
})

document.querySelectorAll('.progress__column').forEach((element,index) => {
  bar.to($('.progress__column').eq(index).find('.progress__fill'),{width:'100%',ease:"none",
    onComplete:function(){
      stickySlide.slideTo(index+1);
    },
    onReverseComplete:function(){
      stickySlide.slideTo(index-1);
    }
  })
});

// video
$('.common-video__control--audio').click(function() {
  $(this).toggleClass('is-active');
});
$('.section-interview .common-video__control--replay').click(function() {
  replayVideo('.section-interview__embedded video');
})
$('.section-testimonial .common-video__control--replay').click(function() {
  replayVideo('.section-testimonial__embedded video');
})
$('.section-interview .common-video__play').on('click', function() {
  playVideo('.section-interview__embedded video');
})
$('.section-testimonial .common-video__play').on('click', function() {
  playVideo('.section-testimonial__embedded video');
})

function replayVideo(selector) {
  const video = document.querySelector(selector);
  
  video.pause();
  video.currentTime = 0;
  video.load();
  video.play();
}

function playVideo(selector) {
  const video = document.querySelector(selector);
  
  video.play();
}


// testimonial
const testimonialSwiper = new Swiper('.section-testimonial .swiper', {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  loop: true,
  touchRatio: 0,
  effect: 'fade',
  fadeEffect: {
    crossFade: true
  },
  pagination: {
    el: '.section-testimonial__indicator .indicator',
    clickable: true,
    renderBullet: function (index, className) {
      const imageSrc = ['arno-del-curto', 'philipp-untersander', 'remy-tina', 'jerome-humm'];
      const nameArr = ['Arno Del Curto', 'Philipp Untersander', 'Rémy & Tina Vils', 'Jerome Humm'];
      const infoArr = ['Hockey Legend', 'CEO & Owner Swifiss AG', 'ALVICO Vils AG', 'Entrepreneur & Actor'];
      return `
      <a href="#" role="button" class="indicator__button ${className}">
      <div class="indicator__thumbnail">
        <img src="./assets/images/section-testimonial-indicator-${imageSrc[index]}.jpg" alt="" />
        <div class="indicator__progress">
          <svg width="62" height="62">
            <circle r="30" cx="31" cy="31" class="indicator__circle indicator__circle--bar"></circle>
            <circle r="30" cx="31" cy="31" class="indicator__circle indicator__circle--fill"></circle>
          </svg>
        </div>
      </div>
      <div class="indicator__text">
        <strong class="indicator__name">${nameArr[index]}</strong>
        <p class="indicator__information">${infoArr[index]}</p>
      </div>
    </a>`
    }
  }
});

// testimonialSwiper.on('slideChange', function() {
//     const showLetter = gsap.timeline({
//       paused: true
//     });
//     showLetter.from('.section-testimonial__headline .letter-wrapper span',{yPercent: 100, stagger: 0.2}, "+=0")
//     showLetter.from('.section-testimonial__name .letter-wrapper span',{yPercent: 100, stagger: 0.2}, "+=0.2")

//     gsap.to(testimonialSwiper.slides[testimonialSwiper.activeIndex], {
//       // animation: showLetter
//       onStart: function() {
//         showLetter.play()
//       }
//     })
//   }
// )





// const showLetter = gsap.timeline({
//   // paused: true
//   scrollTrigger: {
//     trigger: '.section-testimonial',
//     start: 'center center',
//     end: 'bottom center',
//     scrub: 0,
//     markers: true,
//   }
// });
// showLetter.from('.section-testimonial__headline .letter-wrapper span',{yPercent: 100, stagger: 0.2})
// showLetter.from('.section-testimonial__name .letter-wrapper span',{yPercent: 100, stagger: 0.2})
// $('.indicator__button').on('click', function(e) {

//   // showLetter.play();
// });


// from 과거 to 미래
// testimonial
$('.section-partner__item').each(function(i,el) {
  gsap.from($(this).find('.section-partner__link'),{
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

// footer
$('.footer-nav__header').on('click', function() {
  let index = $(this).parent().index();
  console.log(index);
  $(`.footer-nav__column:eq(${index})`).addClass('is-active').siblings().removeClass('is-active');
})