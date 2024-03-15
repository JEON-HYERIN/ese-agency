$(function () {
  // a태그 기본동작 방지
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
    } else {
      tl.to('.global-nav__panel', {height: '0', delay: .1})
      tl.fromTo('.global-nav__item', {opacity: 1}, {opacity: 0, ease: 'none', stagger: .1})
  
      $('.global-nav__menu').attr('aria-label', 'navigation menu');
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
 console.log($(window).width()); 
  if($(window).width() >= 992) {
    $('body').removeClass('.is-local-nav-open is-nav-open');
    $('*').removeAttr('style');
  }
})

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
  delay: 1,
})
introMotion.addLabel('tl')
.fromTo('.header__logo a', {yPercent: 100}, {yPercent: 0,}, 'tl')
.fromTo('.global-nav__link', {yPercent: 100}, {yPercent: 0, stagger: .2}, 'tl+=0.2')


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
    introMotion.play();
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

// from 과거 to 미래
// work
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

// expertise
const stickySlide = new Swiper('.section-expertise .swiper', {
  direction: 'vertical',
  parallax:true,
  speed: 1000,
  touchRatio: 0,
});
ScrollTrigger.create({
  trigger: '.section-expertise__inner',
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

// common-video
$('.common-video__control--audio').click(function (e) {
  $(this).toggleClass('is-active');
});

testimonial
const testimonialSwiper = new Swiper('.section-testimonial .swiper', {
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

// video play button
$('.section-interview .common-video__play').on('click', function() {
  const video = $('.section-interview__embedded').find('video');
  video.get(0).play();
})
$('.section-testimonial .common-video__play').on('click', function() {
  const video = $('.section-testimonial__embedded').find('video');
  video.get(0).play();
})

// footer
$('.footer-nav__header').on('click', function() {
  let index = $(this).parent().index();
  console.log(index);
  $(`.footer-nav__column:eq(${index})`).addClass('is-active').siblings().removeClass('is-active');
})