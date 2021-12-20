console.log('index.js');

// 遅延用の関数
function delay(n) {
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

function pageTransition() {
  let tl = gsap.timeline();
  tl.to('.transition', {
    duration: 1,
    scaleY: 1,
    transformOrigin: 'bottom',
  })
}

function contentAnimation() {
  let tl = gsap.timeline();
  tl.from('.left', { duration: 1, yPercent: 50, opacity: 0 });
  tl.to('img', { clipPath: 'polygon(0 0,100% 0,100% 100%,0 100%)' });
}

barba.init({
  sync: true,
  transitions: [
    {
      async leave(data) {
        const done = this.async();
        pageTransition();
        await delay(1500);
        done();
				return gsap.from(data.current.container,{
					opacity:0
				})
      },

      async enter(data) {
        contentAnimation();
				return gsap.from(data.current.container,{
					opacity:0
				})
      },
      async once(data) {
				// ロード時にだけ実行
        contentAnimation();
				return gsap.from(data.current.container,{
					opacity:0
				})
      },
    },
  ],
});
