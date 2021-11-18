import barba from '@barba/core';
import barbaCss from '@barba/css';

// tell Barba to use the css plugin
barba.use(barbaCss);

const body = document.body;

// 遷移時に白背景になるのを改善
// before時にdataにbackground-colorをセット
barba.hooks.before(function (data) {
  const background = data.current.container.dataset.background;
  body.style.setProperty('--page-background', background);
});

// init Barba
barba.init({
  transitions: [
    // {
    //   name: 'home',
    //   beforeOnce() {
    //     console.log('beforeOnce');
    //   },
    //   once() {
    //     //with css plugin only.so this will not run.
    //     console.log('once');
    //   },
    //   afterOnce() {
    //     console.log('afterOnce');
    //   },
    // },
    {
      name: 'home',
      to: {
        namespace: ['home'],
      },
      sync: true,
      once() {},
      leave() {
        console.log('leave');
      },
      enter() {
        console.log('enter');
      },
    },
    {
      //アニメーションで利用するname（cssの●●-leave）の部分
      name: 'fade',
      to: {
        //ここで設定したページに飛ぶときに実行される(htmlのdata-barba-namespace="●●"の部分)
        namespace: ['fade'],
      },
      leave() {
        console.log('leave');
      },
      enter() {
        console.log('enter');
      },
    },
    {
      name: 'clip',
      sync: true, //leaveとenterを同時に実行する
      to: {
        namespace: ['clip'],
      },
      leave() {
        console.log('leave');
      },
      enter() {
        console.log('enter');
      },
    },
    {
      name: 'with-cover',
      to: {
        namespace: ['with-cover'],
      },
      leave() {
        console.log('leave');
      },
      enter() {
        console.log('enter');
      },
    },
  ],
});
