import gsap from 'gsap';

// ページから離脱する時のアニメーション
const animationLeave = (container) => {
	// console.log('leave with animationLeave()');
  const activeLink = container.querySelector('a.is-active span');
  const images = container.querySelectorAll('.image');
  const img = container.querySelectorAll('img');

  const tl = gsap.timeline({
    defaults: {
      duration: 0.4,
      ease: 'power1.in',
    },
  });

  tl.to(activeLink, { xPercent: 101 }, 0);
  tl.to(images, { xPercent: 101, stagger: 0.05 }, 0);
  tl.to(img, { xPercent: -101, stagger: 0.05 }, 0);
  // tl.timeScale(0.5) // 全体をスローダウン
  return tl;
};

export default animationLeave;
