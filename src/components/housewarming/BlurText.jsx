// Adapted from React Bits BlurText by David Haz. See REACT-BITS-LICENSE.md.
import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export default function BlurText({ text, className = "", delay = 65 }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  return (
    <span ref={ref} className={`hw-blur-text ${className}`}>
      <span className="hw-screen-reader-text">{text}</span>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          initial={reduced ? false : { filter: "blur(8px)", opacity: 0, y: 16 }}
          animate={
            visible ? { filter: "blur(0px)", opacity: 1, y: 0 } : undefined
          }
          transition={{
            duration: reduced ? 0 : 0.7,
            delay: reduced ? 0 : (index * delay) / 1000,
          }}
        >
          {word}
          {"\u00a0"}
        </motion.span>
      ))}
    </span>
  );
}
