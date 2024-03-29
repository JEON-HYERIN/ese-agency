// lenis
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

gsap.ticker.lagSmoothing(0)

// a태그 기본동작 방지
$(function () {
  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
})

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

// const headTxt = new SplitType('.marquee__text span ', { types: 'words, chars', });
// loading
// gsap.to('.loading', {
//   delay: 1,
//   onStart: , 
//   onComplete: function() {
//     introMotion.play();
//   }
// })
var startCount = {var: 0};
const introMotion = gsap.timeline({
  paused: true,
})
introMotion.addLabel('tl')
.to('.loading', {autoAlpha: 0, delay: .3})
.fromTo('.header__logo a', {yPercent: 100}, {yPercent: 0}, "-=0.5")
.fromTo('.global-nav__link', {yPercent: 100}, {yPercent: 0, stagger: .1}, "+=0")
.fromTo('.section-visual .marquee__text span', { yPercent: 150, scaleY: 1.2}, {yPercent: 0, scaleY: 1, stagger: 0.2}, "-=2")
.fromTo('.slogan__title span', {yPercent: 100}, {yPercent: 0, stagger: 0.2}, "-=1")
const counting = gsap.to(startCount, {
  var: 100,
  duration: 2,
  ease:"none",
  onStart: function() {
    $('body').addClass('is-load');
    lenis.stop();
  },
  onUpdate: changeNumber,
  scrollTrigger: {
    trigger: ".loading__count",
  },
  onComplete: function() {
    $('body').removeClass('is-load');
    window.scrollTo(0,0);
    moveCursor();
    introMotion.play();
    lenis.start();
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

// visual
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
// const headTxt = new SplitType('.marquee__text span ', { types: 'words, chars', });

// function introWomen() {
//   for (let index = 0; index < 10; index++) {
//     setTimeout(()=> {
//       console.log(1);
//     }, 100 * index)
//   }
//  }
//  introWomen();
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
    start: '35% top',
    // end: '80% top',
    // markers: true,
    // scrub: 1,
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

// gsap.from('.section-interview__embedded', {
//   yPercent: -20,
//   scale: 1.2,
//   scrollTrigger: {
//     trigger: '.section-interview__video',
//     start: 'top bottom',
//     end: 'bottom top',
//     scrub: 0,
//     // markers: true,
//     // toggleActions: 'play reverse reverse none',
//   }
// })
// gsap.from('.section-interview__video', {
//   y: -20,
//   scale: 1.3,
//   scrollTrigger: {
//     trigger: '.section-interview__video',
//     start: 'top bottom',
//     end: 'bottom top',
//     // scrub: 1,
//     markers: true,
//     toggleActions: 'play reverse reverse none',
//   }
// })
// scrollTrigger.create({
//   trigger: '.section-interview__embedded',
//   start: 'top bottom',
//   end: 'bottom top',

// });

// expertise
const stickySlide = new Swiper('.section-expertise .swiper', {
  direction: 'vertical',
  parallax:true,
  speed: 1000,
  touchRatio: 0,
});

bar = gsap.timeline({
  scrollTrigger:{
    trigger: '.section-expertise__inner',
    start: '0% 0%',
    end: '100% 100%',
    scrub:0,
  }
})
document.querySelectorAll('.progress__column').forEach((element,index) => {
  bar.to($('.progress__column').eq(index).find('.progress__fill'),{width:'100%',ease:"none",
  onComplete:function(){
    stickySlide.slideTo(index+1)
  },
  onReverseComplete:function(){
    stickySlide.slideTo(index-1)
  }
})
});

// common-video
$('.common-video__control--audio').click(function (e) {
  $(this).toggleClass('is-active');
});

// video play button
$('.section-interview .common-video__play').on('click', function() {
  const video = $('.section-interview__embedded').find('video');
  video.get(0).play();
})
$('.section-testimonial .common-video__play').on('click', function() {
  const video = $('.section-testimonial__embedded').find('video');
  video.get(0).play();
})


const showLetter = gsap.timeline({
  defaults: ({
    stagger: .1,
    delay: .3
  }),
  paused: true
});
showLetter.addLabel('t1')
.fromTo('.section-testimonial__headline .letter-wrapper span',{yPercent: 100}, {yPercent: 0, stagger: 0.2}, "+=0")
.fromTo('.section-testimonial__name .letter-wrapper span',{yPercent: 100}, {yPercent: 0, stagger: 0.2}, "+=0.2");


// testimonial
const progressCircle = document.querySelector(".indicator__button");
const testimonialSwiper = new Swiper('.section-testimonial .swiper', {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
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
      showLetter.play();
    },
    autoplayTimeLeft(s, time, progress) {
      // const parent = document.querySelector('.indicator__button.active');
      // const activeEl = parent.querySelector('svg path')
      // progressCircle.forEach(function(el, index) {
      //   el.children.style.removeProperty('style');
      //   // if(el.classList.contains('is-active')) {
      //   //   activeEl.style.setProperty("--progress", 1 - progress);
      //   // }
      //   console.log(el.children);
      // })


        // $('.indicator__button').find('svg path').removeAttr('style');
        // $('.indicator__button').eq(this.realIndex).find('svg path').css('stroke-dashoffset', 1 - progress)
  

  
      // progressCircle.style.setProperty("--progress", 1 - progress)
      // $(".section-testimonial .indicator__button svg").removeAttr('style');
      // $(".section-testimonial .indicator__button").eq(this.realIndex).find('svg').css('stroke-dashoffset', 1 - progress) 
  }
  }
});

$('.indicator__button').on('click', function(e) {
  e.preventDefault();
  const idx = $(this).index();
  $('.indicator__button').removeClass('is-active');
  $(this).addClass('is-active');
  testimonialSwiper.slideToLoop(idx);
  showLetter.play();
});


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