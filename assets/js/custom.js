// gnb
$(".global-nav__item--expertise").mouseenter(function () {
  $("body").addClass("expertise-open");
});
$(".local-nav").mouseleave(function () {
  $("body").removeClass("expertise-open");
});

$(".local-nav__link").mouseenter(function () {
  const index = $(this).parent().index();

  $(`.local-nav__thumbnail-item:eq(${index})`)
    .addClass("is-visible")
    .siblings()
    .removeClass("is-visible");
});

// canvas
const canvas = document.querySelector(".section-visual__canvas");
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
    trigger: ".section-visual__canvas-area",
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

$('.section-interview__video-control--audio').click(function (e) {
  $(this).toggleClass('is-active');
});
