import { useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function useHeroMotion(ref) {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current) return;
    const context = gsap.context(() => {
      gsap.to(".hero-photo", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
      gsap.fromTo(
        ".floating-invite",
        { rotateX: 12, rotation: 6 },
        {
          rotateX: 0,
          rotation: -3,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom center",
            scrub: 0.8,
          },
        },
      );
      const glow = ref.current.querySelector(".hero-cursor-glow");
      if (glow && window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(glow, "x", { duration: 0.7 });
        const yTo = gsap.quickTo(glow, "y", { duration: 0.7 });
        const move = (event) => {
          const bounds = ref.current.getBoundingClientRect();
          xTo(event.clientX - bounds.left);
          yTo(event.clientY - bounds.top);
        };
        ref.current.addEventListener("pointermove", move);
        return () => ref.current?.removeEventListener("pointermove", move);
      }
    }, ref);
    return () => context.revert();
  }, [reduced, ref]);
}
