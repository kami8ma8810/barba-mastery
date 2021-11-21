import barba from '@barba/core';
import barbaPrefetch from '@barba/prefetch';
// import barbaRouter from '@barba/router';
import gsap from 'gsap';
import {
  animationEnter,
  animationLeave,
  leaveToProject,
  leaveFromProject,
  revealProject,
} from './animations';

document.addEventListener('DOMContentLoaded',()=>{

console.log('document addeventlistener!');})

// barba router
// const myRouter = [
// 	{name:'home',path:'/index.html'},
// 	{name:'architecture',path:'/architecture.html'},
// 	{name:'detail',path:'/detail-page.html'},
// 	{name:'detail2',path:'/detail-page2.html'},
// ]
// barba.use(barbaRouter,{
// 	routes:myRouter
// });
// barba router END


// prefetchはinitより前で実行
barba.use(barbaPrefetch);

// ヘッダーの下線を左から表示
const resetActiveLink = () =>
  gsap.set('a.is-active span', {
    xPercent: -100,
    transformOrigin: 'left',
  });


// グローバルフック（すべてのenterで発火）https://barba.js.org/docs/advanced/hooks/
barba.hooks.enter((data) => {
	console.log({data});
  // console.log('enter with global hooks');

  // ページ遷移時にページの最上部に移動する
  window.scrollTo(0, 0);
});

barba.init({
  // viewsは特定のページに適用させたいときに使う
  views: [
    {
      // 遷移先がarchitectureページのときに適用
      namespace: 'architecture',
      // beforeEnter(data){
      // 	console.log(data,'before enter only architecture');
      // }
    },
  ],
  transitions: [
    // home と architecture間の遷移
    {
      name: 'general-transition',
      // 読み込み時のみ実行させる
      once({ next }) {
        resetActiveLink();
        gsap.from('header a', {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: 'power1.out',
          onComplete: () => animationEnter(next.container),
        });
      },

      leave: ({ current }) => animationLeave(current.container),

      enter({ next }) {
        animationEnter(next.container);
      },
    },
    // home/architectureからdetailへの遷移
    {
      name: 'detail',
      // toを指定しないとonceは上書きされてしまう
      to: {
        namespace: ['detail'],
      },
      // 読み込み時のみ実行させる
      once({ next }) {
        revealProject(next.container);
      },
      leave: ({ current }) => leaveToProject(current.container),
      enter({ next }) {
        revealProject(next.container);
      },
    },
    // detailから戻るときの遷移
    {
      name: 'from-detail',
      from: {
        namespace: ['detail'],

				// routerを使用する場合の書き方
        // route: ['detail'],
      },
      leave: ({ current }) => leaveFromProject(current.container),
      enter({ next }) {
        gsap.from('header a', {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: 'power1.out',
          // onComplete: () => animationEnter(next.container),//完了後（ヘッダーが表示されてから）画像のアニメーションを行うと体感遅く感じるので、animationEnterは完了を待たずに実行させる↓
        });
        animationEnter(next.container);
      },
    },
  ],
});
