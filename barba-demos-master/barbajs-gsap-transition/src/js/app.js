import barba from "@barba/core";
// import Home from "./pages/home";
// import About from "./pages/detail-page";
import gsap from "gsap";
import {
  revealProject,
  leaveToProject,
  leaveFromProject,
  animationEnterMask,
  animationLeaveMask,
} from "./animations";

const resetActiveLink = () =>
  gsap.set("a.is-active span", {
    xPercent: -100,
    transformOrigin: "left",
  });

barba.hooks.enter(() => {
  window.scrollTo(0, 0);
});

barba.init({
  // debug: true,//検証用
  // views: [Home, About],//検証用
  transitions: [
    {
      name: "general-transition",
      once: ({ next }) => {
        resetActiveLink();
        gsap.from("header a", {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: "power1.out",
          onComplete: () => animationEnterMask(next.container),
        });
      },
      leave: ({ current }) => animationLeaveMask(current.container),
      enter: ({ next }) => {
        animationEnterMask(next.container);
      },
    },
    {
      name: "detail",
      to: {
        namespace: ["detail"],
      },
      // 直リンク用
      // once: ({ next }) => {
      //   revealProject(next.container);
      // },
      // 遷移先がdetailのときに現在のページのleaveで発火
      leave: ({ current }) => leaveToProject(current.container),
      // 遷移先がdetailのときに現在のページのleaveで発火
      enter: ({ next }) => {
        console.log('to reveal ENTER detailページ！');
        revealProject(next.container);
      },
    },
    {
      name: "from-detail",
      from: {
        namespace: ["detail"],
      },
      to: {
        namespace: ["home", "architecture"],
      },
      leave: ({ current }) => leaveFromProject(current.container),
      enter: ({ next }) => {
        resetActiveLink();
        gsap.from("header a", {
          duration: 0.6,
          yPercent: 100,
          stagger: 0.2,
          ease: "power1.out",
        });
        animationEnterMask(next.container);
      },
    },
  ],
});
