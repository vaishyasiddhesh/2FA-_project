gsap.registerPlugin(ScrollTrigger);
const t1=gsap.timeline();
t1.to(".wrapper",5,{x:-window.innerWidth})