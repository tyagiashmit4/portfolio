import { useCallback, useEffect, useState } from "react";

const GLYPHS = "!@#$%^&*()_+{}:<>?[]|\\,./;'-=`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function useTextScramble(targetText: string, speed = 30, delay = 0) {
  const [text, setText] = useState(targetText);

  const scramble = useCallback(() => {
    let frame = 0;
    let intervalId: any;

    const run = () => {
      let isComplete = true;
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          
          // Determine if this letter is solved based on current frame vs its index
          const solveProgress = (frame - index * 1.5) / 8;
          if (solveProgress >= 1) {
            return char;
          }
          
          isComplete = false;
          
          // Either return a random glyph, or keep the existing scrambled character
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setText(scrambled);
      frame++;

      if (isComplete) {
        clearInterval(intervalId);
        setText(targetText);
      }
    };

    const timeoutId = setTimeout(() => {
      intervalId = setInterval(run, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [targetText, speed, delay]);

  useEffect(() => {
    const cleanUp = scramble();
    return cleanUp;
  }, [scramble]);

  return { text, scramble };
}
