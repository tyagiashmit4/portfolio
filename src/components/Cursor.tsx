import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const Cursor = () => {
  const [cursorType, setCursorType] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Dynamic position tracking using MotionValues for high-performance updates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Fast spring for inner dot
  const innerSpringX = useSpring(cursorX, { stiffness: 1000, damping: 50 });
  const innerSpringY = useSpring(cursorY, { stiffness: 1000, damping: 50 });

  // Elastic spring for outer ring
  const outerSpringX = useSpring(cursorX, { stiffness: 250, damping: 25, mass: 0.5 });
  const outerSpringY = useSpring(cursorY, { stiffness: 250, damping: 25, mass: 0.5 });

  // Smooth spring for background glow
  const glowSpringX = useSpring(cursorX, { stiffness: 150, damping: 30, mass: 0.8 });
  const glowSpringY = useSpring(cursorY, { stiffness: 150, damping: 30, mass: 0.8 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        setCursorType(type);
      } else {
        setCursorType(null);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, cursorX, cursorY]);

  if (!isVisible) return null;

  // Render text inside cursor for specific hover modes
  const showText = cursorType === 'view' || cursorType === 'copy';

  return (
    <>
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2"
        style={{ x: innerSpringX, y: innerSpringY }}
        animate={{
          scale: cursorType ? 0 : 1,
          opacity: cursorType ? 0 : 1
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden"
        style={{ x: outerSpringX, y: outerSpringY }}
        animate={{
          width: cursorType === 'view' || cursorType === 'copy' ? 80 : cursorType === 'link' ? 56 : 32,
          height: cursorType === 'view' || cursorType === 'copy' ? 80 : cursorType === 'link' ? 56 : 32,
          backgroundColor: cursorType === 'view' ? 'var(--theme-primary, #00E5FF)' : cursorType === 'copy' ? 'var(--theme-accent, #7B61FF)' : 'rgba(0, 0, 0, 0)',
          border: cursorType === 'view' || cursorType === 'copy' ? '0px solid transparent' : '2px solid var(--theme-primary, #00E5FF)',
          mixBlendMode: cursorType === 'view' || cursorType === 'copy' ? 'normal' : 'difference',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.2 }}
      >
        {showText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-background text-[10px] font-mono tracking-widest uppercase font-bold"
          >
            {cursorType}
          </motion.span>
        )}
      </motion.div>

      {/* Giant ambient glow */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-primary/15 rounded-full blur-[100px] pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
        style={{ x: glowSpringX, y: glowSpringY }}
        animate={{
          scale: cursorType ? 1.2 : 1,
        }}
      />
    </>
  );
};
