// PAGE TRANSITION ANIMATION
function transitionAnimation() {
  gsap.to('.loader-overlay.one', {
    duration: 1,
    scaleX: 1,
    transformOrigin: 'left',
    ease: 'power1.inOut',
  });
  gsap.to('.loader-overlay.one', {
    duration: 1,
    scaleX: 0,
    transformOrigin: 'right',
    ease: 'power1.inOut',
    delay: 2,
  });

  gsap.to('.loader-overlay.two', {
    duration: 1.4,
    scaleX: 1,
    transformOrigin: 'left',
    ease: 'power1.inOut',
  });
  gsap.to('.loader-overlay.two', {
    duration: 1.4,
    scaleX: 0,
    transformOrigin: 'right',
    ease: 'power1.inOut',
    delay: 1.6,
  });
}

// FADE IN ANIMATION
function contentInAnimation() {
  gsap.from('.logo', {
    duration: 1,
    y: -100,
    delay: 1.2,
  });
  gsap.from('ul li', {
    duration: 1,
    y: -100,
    delay: 1.4,
    stagger: 0.2,
  });
  gsap.from('.cart', {
    duration: 1,
    y: -100,
    delay: 2.2,
  });
  gsap.from('header', {
    duration: 2,
    y: -100,
    delay: 1,
  });
  gsap.from('.text-inner', {
    duration: 1,
    opacity: 0,
    delay: 1,
  });
  gsap.from('.img-inner', {
    duration: 1,
    opacity: 0,
    delay: 1.1,
  });
}

// FADE OUT ANIMATION
function contentOutAnimation() {
  gsap.to('.logo', {
    duration: 1,
    y: -100,
  });
  gsap.to('ul li', {
    duration: 1,
    y: -100,
    stagger: 0.2,
  });
  gsap.to('.cart', {
    duration: 1,
    y: -100,
    delay: 1,
  });
  gsap.to('header', {
    duration: 2,
    y: -100,
    delay: 1.2,
  });
  gsap.to('.text-inner', {
    duration: 1,
    opacity: 0,
    delay: 1.2,
  });
  gsap.to('.img-inner', {
    duration: 1,
    opacity: 0,
    delay: 1.4,
  });
}

// PAGE DELAY - PROMISE FUNCTION

function delay(n) {
  n = n || 4000; //4000 is default time set
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

$(function () {
  // BARBA SETUP
  barba.init({
    sync: true,

    transitions: [
      {
        async leave(data) {
          // create your stunning leave animation here
          const done = this.async();

          contentOutAnimation();

          setTimeout(function () {
            transitionAnimation();
          }, 2000);

          await delay(3000); // 3000 = 3 sec
          done();
        },
        async enter(data) {
          // create your amazing enter animation here
          contentInAnimation();
        },
      },
    ],
  });
});
