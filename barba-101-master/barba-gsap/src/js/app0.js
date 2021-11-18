// +++++++++++++++++++++++++++++++++++++++++++++
// 単一JSファイルで書く場合
// +++++++++++++++++++++++++++++++++++++++++++++


import barba from '@barba/core';
import gsap from 'gsap';

// ---------------------------------------------
// ページ遷移前
// ---------------------------------------------
// パターン１
// const animationLeave = (container, done) => {
//   return gsap.to(container, {
//     autoAlpha: 0,
//     duration: 1,
//     clearProps: 'all',
//     ease: 'none',
//     // leaveが完了したらdone()を実行
//     onComplete: () => done(),
//   });
// };

// パターン２
const animationLeave = (container) => {
  return gsap.to(container, {
    autoAlpha: 0,
    duration: 1,
		xPercent:100,
    clearProps: 'all',
    ease: 'none',
  });
};

// ---------------------------------------------
// ページ遷移後
// ---------------------------------------------
const animationEnter = (container) => {
  return gsap.from(container, {
    autoAlpha: 0,
    duration: 1,
		xPercent:-100,
    clearProps: 'all',
    ease: 'none',
  });
};

barba.init({
  transitions: [
    {
      // 読み込み時のみ実行させる
      once({ next }) {
        console.log('once');
        animationEnter(next.container);
      },
      // パターン１
      // leave:({ current }) =>{
      //   console.log('leave');
      //   // enterが始まる前にleaveを完了させる
      //   // const done = this.async();

      // 	// GSAPにdoneを引数として渡す
      //   animationLeave(current.container, done);
      // },

      // パターン２
      leave: ({ current }) => animationLeave(current.container),
      enter({ next }) {
        console.log('enter');
        animationEnter(next.container);
      },
    },
  ],
});
