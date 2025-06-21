import { motion, useAnimationControls } from "framer-motion";
import { useEffect } from "react";

/**
 * useJumpLoop
 * ─────────────────────────────────────────────
 * holders      – array of word ids in order across the line
 * setHighlight – callback to color the active word
 * start        – boolean: start looping only when true (typing finished)
 * xs           – optional array of X-offsets (in %) matching holders length
 */
export const useJumpLoop = (
  holders: string[],
  setHighlight: (id: string) => void,
  start: boolean,
  xs: number[] = [0, 115, 275] // default offsets; tweak for your design
) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (!start) return;                         // wait until typing done
    let i = 0;

    (async function loop() {
      for (;;) {
        await controls.start({
          x: [`${xs[i]}%`, `${xs[i]}%`],        // stay horizontal during jump
          y: [0, -45, 0],                       // jump arc
          transition: { duration: 1, ease: "easeInOut" }
        });
        setHighlight(holders[i]);               // color current word
        i = (i + 1) % holders.length;           // next word index
      }
    })();
  }, [start]); // eslint-disable-line react-hooks/exhaustive-deps

  return controls;
};

/* simple yellow ball sprite */
export const JumpingBall = ({ controls }: { controls: any }) => (
  <motion.span
    className="absolute -top-4 left-0 w-4 h-4 bg-yellow-400 rounded-full"
    animate={controls}
  />
);
