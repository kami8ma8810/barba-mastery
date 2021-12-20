function init() {
  const loader = document.querySelector('.loader');

  // reset position of the loading screen
  gsap.set(loader, {
    scaleX: 0,
    rotation: 10,
    xPercent: -5,
    yPercent: -50,
    transformOrigin: 'left center',
    autoAlpha: 1,
  });
  function changeBg() {
    gsap.set(loader, {
      backgroundImage: 'url(../img/background-01.jpg)',
    });
  }
  function resetBg() {
    gsap.set(loader, {
      backgroundImage: 'none',
    });
  }

  function loaderIn() {
    // GSAP tween to stretch the loading screen across the whole screen
    return gsap.fromTo(
      loader,
      {
        rotation: 10,
        scaleX: 0,
        xPercent: -5,
        backgroundColor: 'red',
      },
      {
        duration: 1.8,
        xPercent: 0,
        scaleX: 1,
        rotation: 0,
        ease: 'Power4.inOut',
        transformOrigin: 'left center',
        backgroundColor: 'blue',
      }
    );
  }

  function loaderAway() {
    // GSAP tween to hide the loading screen
    return gsap.to(loader, {
      duration: 1.8,
      scaleX: 0,
      xPercent: 5,
      rotation: -10,
      transformOrigin: 'right center',
      ease: 'Power4.inOut',
    });
  }

  // do something before the transition starts
  barba.hooks.before(() => {
    document.querySelector('html').classList.add('is-transitioning');
    barba.wrapper.classList.add('is-animating');
  });

  // do something after the transition finishes
  barba.hooks.after(() => {
    document.querySelector('html').classList.remove('is-transitioning');
    barba.wrapper.classList.remove('is-animating');
  });

  // scroll to the top of the page
  barba.hooks.enter(() => {
    window.scrollTo(0, 0);
  });

  // // 遅延用 引数の分だけ処理を遅らせる
  // function delay(n) {
  //   n = n || 2000;
  //   return new Promise((done) => {
  //     setTimeout(() => {
  //       done();
  //     }, n);
  //   });
  // }
  // function addClass() {
  //   loader.classList.remove('is-page2');
  // }

  barba.init({
    transitions: [
      {
        // async leave(data) {
        //   const done = this.async();
        //   leaveAnimation();
        //   pageTransition();
        //   await delay(1000);
        //   done();
        // },
        // async enter(data) {
        //   await delay(600);
        //   enterAnimation();
        // },
        async leave() {
          await loaderIn();
        },
        enter() {
          loaderAway();
        },
      },
    ],
    // views: [
    //   {
    //     namespace: 'page2',
    //     beforeEnter() {
    //       // loader.classList.add('is-page2');
    //     },
    //     afterEnter() {
    //       // loader.classList.add('is-page2');
    //     },
    //     async beforeLeave() {
    //       await addClass();
    //     },
    //     afterLeave() {
    //       // loader.classList.remove('is-page2');
    //     },
    //   },
    // ],
  });
}

window.addEventListener('load', function () {
  init();
});
