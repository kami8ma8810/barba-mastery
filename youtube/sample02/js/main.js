

const loadingScreen = document.querySelector('.loading-screen');
const mainNavigation = document.querySelector('.main-navigation');

// 遅延用の関数
function delay(n) {
  n = n || 2000
  // Keep official documentation wording, done -> resolve
  // and make it more concise
  return new Promise(resolve => {
    setTimeout(resolve, n)
  })
}

// ページが表示されるときのアニメーション
function pageTransitionIn() {
  console.log('transiton In');
 // GSAPを順次処理で開始させる
  return (
    gsap
      .timeline()
      .to(loadingScreen, {
        duration: 0.5,
        scaleY: 1,
        transformOrigin: 'bottom left',
      })
  );
}
// ページから離れるときのアニメーション
function pageTransitionOut(container) {
	console.log('transiton Out');
// GSAPを順次処理で開始させる
  return gsap
    .timeline({ delay: 1 })
    .add('start') // addはタイムライン上で順番を指定するためのもの（数字 or 文字列）
    .to(
      loadingScreen,
      {
        duration: 0.5,
        scaleY: 0,
        skewX: 0,
        transformOrigin: 'top left',
        ease: 'power1.out',
      },
      'start'
    )
    .call(alertFn, null, null, null)
    .call(contentAnimation, [container], 'start');//add('start')のタイミングで実行される
  //callメソッドはスコープ外などから処理を呼び出したいときに使用
  //call （関数 , 渡したいパラメータ（配列で指定） , 渡した関数のスコープ , 何秒後に実行するか）
}
function alertFn() {
  console.log('callされました');
}

// コンテンツのアニメーション
function contentAnimation(container) {
	console.log('contentAnimation DONE!');

  $(container.querySelector('.green-heading-bg')).addClass('show');
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline()
    .from(container.querySelector('.is-animated'), {
      duration: 0.5,
      translateY: 10,
      opacity: 0,
      stagger: 0.4,
    })
    .from(mainNavigation, { duration: 0.5, translateY: -10, opacity: 0 });
}

$(function () {
  barba.init({
    // We don't want "synced transition"
    // because both content are not visible at the same time
    // and we don't need next content is available to start the page transition
    // sync: true,
    transitions: [
      {
        // NB: `data` was not used.
        // But usually, it's safer (and more efficient)
        // to pass the right container as a paramater to the function
        // and get DOM elements directly from it
        async leave(data) {
          // Not needed with async/await or promises
          // const done = this.async();

          await pageTransitionIn();
          // No more needed as we "await" for pageTransition
          // And i we change the transition duration, no need to update the delay…
          // await delay(1000)

          // Not needed with async/await or promises
          // done()

          // Loading screen is hiding everything, time to remove old content!
          data.current.container.remove();
        },

        async enter(data) {
          await pageTransitionOut(data.next.container);
        },
        // Variations for didactical purpose…
        // Better browser support than async/await
        // enter({ next }) {
        //   return pageTransitionOut(next.container);
        // },
        // More concise way
        // enter: ({ next }) => pageTransitionOut(next.container),

        async once(data) {
          await contentAnimation(data.next.container);
        },
      },
    ],
  });
});
