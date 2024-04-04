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
  const linkEl =  document.querySelector('a');
  const CLASSNAME = 'is-hover';

  window.addEventListener('mousemove', function(e){
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.opacity = '1';
  });
  linkEl.addEventListener('mouseenter', function() {
    cursor.classList.add(CLASSNAME);
  })
  linkEl.addEventListener('mouseleave', function() {
    cursor.classList.remove(CLASSNAME);
  })
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
  const imgEl = $('.section-visual__sticky img');
  const total = imgEl.length - 1;
  const CLASSNAME = 'is-visible';

  for (let i = 0; i <= total; i++) {
    setTimeout(()=> {
      const currentImg = imgEl.eq(i);

      if(imgEl.hasClass(CLASSNAME)) {
        imgEl.removeClass(CLASSNAME);
      }
      if(currentImg) {
        currentImg.addClass(CLASSNAME);
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
    onUpdate: function(self) {
      const imgEl = $('.section-visual__sticky img');
      const total = imgEl.length - 1;
      const currentIndex = total - Math.round((total * self.progress));
      const currentImg = imgEl.eq(currentIndex);
      const CLASSNAME = 'is-visible';
  
      if(imgEl.hasClass(CLASSNAME)) {
        imgEl.removeClass(CLASSNAME);
      }
      if(currentImg) {
        currentImg.addClass(CLASSNAME);
      }
    }
  })
  
  gsap.to('.section-visual .marquee__inner', {
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
 
gsap.to('.main', {
  scale: 0.9,
  borderRadius: 40,
  ease: 'none',
  scrollTrigger: {
    trigger: '.footer',
    start: 'top bottom',
    end:'90% top',
    scrub: 0,
    // markers: true,
    // toggleActions: 'play none none reset'
  }
})

gsap.from('.footer__inner', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.main',
    start: 'bottom bottom',
    end:'bottom top',
    scrub: 0,
    // markers: true,
  }
})

ScrollTrigger.create({
  trigger: '.section-work',
  start: '80% 60%',
  // markers: true,
  onEnter: function() {
    $('.section-work__more-view').addClass('is-visible');
  },
  onLeaveBack: function() {
    $('.section-work__more-view').removeClass('is-visible');
  }
})

// interview
$('.section-interview__video').mousemove(function(e) {
  const offsetX = e.offsetX;
  const offsetY = e.offsetY;

  const width = $('.section-interview__video').outerWidth();
  const height = $('.section-interview__video').outerHeight();

  gsap.to('.common-video__play', {
    x: (offsetX - (width / 2)) / 10,
    y: (offsetY - (height / 2)) / 10,
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

let mm = gsap.matchMedia();

// expertise
const stickySlide = new Swiper('.section-expertise .swiper', {
  direction: 'vertical',
  parallax:true,
  speed: 1000,
  touchRatio: 0
});
mm.add("(max-width: 767px)", () => {
  bar = gsap.timeline({
    scrollTrigger:{
      trigger: '.section-expertise__inner',
      start: '0% 0%',
      end: '100% 100%',
      scrub:0,
    },
  })
  document.querySelectorAll('.progress__column').forEach((element,index) => {
    bar.to($('.progress__column').eq(index).find('.progress__fill'),{width:'100%',ease:"none",
      onComplete:function() {
        stickySlide.slideTo(index + 1);
      },
      onReverseComplete:function() {
        stickySlide.slideTo(index - 1);
      }
    })
  });
})
mm.add("(min-width: 768px)", () => {
  bar = gsap.timeline({
    scrollTrigger:{
      trigger: '.section-expertise__inner',
      start: '0% 0%',
      end: '100% 100%',
      scrub:0,
      onUpdate: function(self) {
        gsap.to($('.section-expertise__item.swiper-slide-active .marquee__inner'), {
          xPercent: -(Math.round(self.progress * 320))
        })
      },
      onEnterBack: function() {
        $('.section-expertise .marquee__texts').removeAttr('style');
      },
    },
    onComplete: function() {
      $('.section-expertise .marquee__texts').css('animation-play-state', 'running');
    },
  })
  document.querySelectorAll('.progress__column').forEach((element,index) => {
    bar.to($('.progress__column').eq(index).find('.progress__fill'),{width:'100%',ease:"none",
      onComplete:function() {
        stickySlide.slideTo(index + 1);
      },
      onReverseComplete:function() {
        stickySlide.slideTo(index - 1);
      }
    })
  });
})

// work
mm.add("(max-width: 479px)", () => {
  const evenItems = document.querySelectorAll('.section-work__item:nth-child(2n)');
  const oddItems = document.querySelectorAll('.section-work__item:nth-child(2n+1)');
  
  evenItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  oddItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });

  $('.section-work__item').each(function(i,el) {
    gsap.from($(this).find('.section-work__link'),{
      opacity: 0,
      y: '150',
      delay: el.dataset.delay,
      duration: .5,
      scrollTrigger: {
        trigger: el,
        start:'0% 100%',
        end: 'bottom center',
        // markers: true,
        toggleActions: 'play none none reset'
        },
    })
  })
})
mm.add("(min-width: 480px) and (max-width: 991px)", () => {
  const firstItems = document.querySelectorAll('.section-work__item:nth-child(3n+1)');
  const secondItems = document.querySelectorAll('.section-work__item:nth-child(3n+2)');
  const thirdItems = document.querySelectorAll('.section-work__item:nth-child(3n)');
  
  firstItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });
  secondItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  thirdItems.forEach(function(item, index) {
    item.dataset.delay = 0.2;
  });

  $('.section-work__item').each(function(i,el) {
    gsap.from($(this).find('.section-work__link'),{
      opacity: 0,
      y: '150',
      delay: el.dataset.delay,
      duration: .5,
      scrollTrigger: {
        trigger: el,
        start:'0% 100%',
        end: 'bottom center',
        //markers: true,
        toggleActions: 'play none none reset'
        },
    })
  })
})
mm.add("(min-width: 992px)", () => {
  const firstItems = document.querySelectorAll('.section-work__item:nth-child(4n+1)');
  const secondItems = document.querySelectorAll('.section-work__item:nth-child(4n-2)');
  const thirdItems = document.querySelectorAll('.section-work__item:nth-child(4n-1)');
  const fourthItems = document.querySelectorAll('.section-work__item:nth-child(4n)');
  
  firstItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });
  secondItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  thirdItems.forEach(function(item, index) {
    item.dataset.delay = 0.2;
  });
  fourthItems.forEach(function(item, index) {
    item.dataset.delay = 0.3;
  });
  
  // from 과거 to 미래
  $('.section-work__item').each(function(i,el) {
    gsap.from($(this).find('.section-work__link'),{
      opacity: 0,
      y: '150',
      delay: el.dataset.delay,
      duration: .5,
      scrollTrigger: {
        trigger: el,
        start:'0% 100%',
        end: 'bottom center',
        //markers: true,
        toggleActions: 'play none none reset'
        },
    })
  })
})

// partner
mm.add("(max-width: 479px)", () => {
  const evenItems = document.querySelectorAll('.section-partner__item:nth-child(2n)');
  const oddItems = document.querySelectorAll('.section-partner__item:nth-child(2n+1)');
  
  evenItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  oddItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });

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
})
mm.add("(min-width: 480px) and (max-width: 949px)", () => {
  const firstItems = document.querySelectorAll('.section-partner__item:nth-child(3n+1)');
  const secondItems = document.querySelectorAll('.section-partner__item:nth-child(3n+2)');
  const thirdItems = document.querySelectorAll('.section-partner__item:nth-child(3n)');
  
  firstItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });
  secondItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  thirdItems.forEach(function(item, index) {
    item.dataset.delay = 0.2;
  });

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
})
mm.add("(min-width: 950px) and (max-width: 991px)", () => {
  const firstItems = document.querySelectorAll('.section-partner__item:nth-child(4n+1)');
  const secondItems = document.querySelectorAll('.section-partner__item:nth-child(4n-2)');
  const thirdItems = document.querySelectorAll('.section-partner__item:nth-child(4n-1)');
  const fourthItems = document.querySelectorAll('.section-partner__item:nth-child(4n)');
  
  firstItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });
  secondItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  thirdItems.forEach(function(item, index) {
    item.dataset.delay = 0.2;
  });
  fourthItems.forEach(function(item, index) {
    item.dataset.delay = 0.3;
  });

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
})
mm.add("(min-width: 992px) and (max-width: 1189px)", () => {
  const firstItems = document.querySelectorAll('.section-partner__item:nth-child(3n+1)');
  const secondItems = document.querySelectorAll('.section-partner__item:nth-child(3n+2)');
  const thirdItems = document.querySelectorAll('.section-partner__item:nth-child(3n)');
  
  firstItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });
  secondItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  thirdItems.forEach(function(item, index) {
    item.dataset.delay = 0.2;
  });

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
})
mm.add("(min-width: 1190px) and (max-width: 1459px)", () => {
  const firstItems = document.querySelectorAll('.section-partner__item:nth-child(4n+1)');
  const secondItems = document.querySelectorAll('.section-partner__item:nth-child(4n-2)');
  const thirdItems = document.querySelectorAll('.section-partner__item:nth-child(4n-1)');
  const fourthItems = document.querySelectorAll('.section-partner__item:nth-child(4n)');
  
  firstItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });
  secondItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  thirdItems.forEach(function(item, index) {
    item.dataset.delay = 0.2;
  });
  fourthItems.forEach(function(item, index) {
    item.dataset.delay = 0.3;
  });

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
})
mm.add("(min-width: 1460px) and (max-width: 1729px)", () => {
  const firstItems = document.querySelectorAll('.section-partner__item:nth-child(5n-4)');
  const secondItems = document.querySelectorAll('.section-partner__item:nth-child(5n-3)');
  const thirdItems = document.querySelectorAll('.section-partner__item:nth-child(5n-2)');
  const fourthItems = document.querySelectorAll('.section-partner__item:nth-child(5n-1)');
  const fifthItems = document.querySelectorAll('.section-partner__item:nth-child(5n)');
  
  firstItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });
  secondItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  thirdItems.forEach(function(item, index) {
    item.dataset.delay = 0.2;
  });
  fourthItems.forEach(function(item, index) {
    item.dataset.delay = 0.3;
  });
  fifthItems.forEach(function(item, index) {
    item.dataset.delay = 0.4;
  });

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
})
mm.add("(min-width: 1730px) and (max-width: 1999px)", () => {
  const firstItems = document.querySelectorAll('.section-partner__item:nth-child(6n-5)');
  const secondItems = document.querySelectorAll('.section-partner__item:nth-child(6n-4)');
  const thirdItems = document.querySelectorAll('.section-partner__item:nth-child(6n-3)');
  const fourthItems = document.querySelectorAll('.section-partner__item:nth-child(6n-2)');
  const fifthItems = document.querySelectorAll('.section-partner__item:nth-child(6n-1)');
  const sixthItems = document.querySelectorAll('.section-partner__item:nth-child(6n)');
  
  firstItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });
  secondItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  thirdItems.forEach(function(item, index) {
    item.dataset.delay = 0.2;
  });
  fourthItems.forEach(function(item, index) {
    item.dataset.delay = 0.3;
  });
  fifthItems.forEach(function(item, index) {
    item.dataset.delay = 0.4;
  });
  sixthItems.forEach(function(item, index) {
    item.dataset.delay = 0.5;
  });

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
})
mm.add("(min-width: 2000px)", () => {
  const firstItems = document.querySelectorAll('.section-partner__item:nth-child(7n-6)');
  const secondItems = document.querySelectorAll('.section-partner__item:nth-child(7n-5)');
  const thirdItems = document.querySelectorAll('.section-partner__item:nth-child(7n-4)');
  const fourthItems = document.querySelectorAll('.section-partner__item:nth-child(7n-3)');
  const fifthItems = document.querySelectorAll('.section-partner__item:nth-child(7n-2)');
  const sixthItems = document.querySelectorAll('.section-partner__item:nth-child(7n-1)');
  const sevenItems = document.querySelectorAll('.section-partner__item:nth-child(7n)');
  
  firstItems.forEach(function(item, index) {
    item.dataset.delay = 0;
  });
  secondItems.forEach(function(item, index) {
    item.dataset.delay = 0.1;
  });
  thirdItems.forEach(function(item, index) {
    item.dataset.delay = 0.2;
  });
  fourthItems.forEach(function(item, index) {
    item.dataset.delay = 0.3;
  });
  fifthItems.forEach(function(item, index) {
    item.dataset.delay = 0.4;
  });
  sixthItems.forEach(function(item, index) {
    item.dataset.delay = 0.5;
  });
  sevenItems.forEach(function(item, index) {
    item.dataset.delay = 0.6;
  });

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
})

// footer
const footerText1 = new SplitType('.footer-nav__title', {types: 'words', tagName: 'span'});
const footerText2 = new SplitType('.footer-nav__link', {types: 'words', tagName: 'span'});
const footerText3 = new SplitType('.footer .copyright span', {types: 'words', tagName: 'span'});
const footerText4 = new SplitType('.footer .corporation__link', {types: 'words', tagName: 'span'});

mm.add("(max-width: 767px)", () => {
  const footerTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-news',
      start: '60% top',
      onEnter: function() {
        $('.footer').addClass('is-visible');
      },
      // markers: true,
    }
  })
  const footerTl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.footer',
      start: 'top bottom',
      // markers: true,
      onEnter: function() {
        $('.footer').removeClass('is-visible');
      },
      onLeaveBack: function() {
        $('.footer').removeClass('is-visible');
      }
    }
  })
})
mm.add("(min-width: 768px)", () => {
  const footerTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 30%',
      // markers: true,
      onEnter: function() {
        $('.footer').addClass('is-visible');
      },
    }
  })
  const footerTl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.footer',
      start: 'top bottom',
      // markers: true,
      onEnter: function() {
        $('.footer').removeClass('is-visible');
      },
      onLeaveBack: function() {
        $('.footer').removeClass('is-visible');
      }
    }
  })
})

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

// footer
$('.footer-nav__header').on('click', footerToggle);
$(window).on('resize', function() {
  const windowWidth = $(window).width();

  if(windowWidth >= 768) {
    $('.footer-nav__column').removeClass('is-active');
    $('.footer-nav__list').removeAttr('style');
  }
});

function footerToggle () {
  const windowWidth = $(window).width();
  const index = $(this).parent().index();

  if(windowWidth <= 767) {
    if($(this).parent().hasClass('is-active')) {
      $('.footer-nav__list').stop().slideUp();
      $(this).parent().removeClass('is-active');
    } else {
      $('.footer-nav__list').stop().slideUp();
      $('.footer-nav__column').eq(index).find('.footer-nav__list').stop().slideDown();
      $(this).parent().addClass('is-active').siblings().removeClass('is-active');
    }
  }

  if(windowWidth >= 768) {
    $('.footer-nav__column').removeClass('is-active');
    $('.footer-nav__list').removeAttr('style');
  }
}

// 저작권 년도 동적으로 넣어주기(마크업으로 넣으면 매년 갱신해야함)
const thisYear = document.querySelector('.this-year');
thisYear.textContent = new Date().getFullYear();