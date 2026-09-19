import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
export default function Reveal({ children, className = "", delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
