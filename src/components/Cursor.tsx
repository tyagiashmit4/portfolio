import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Cursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary pointer-events-none z-[9999] mix-blend-difference"
        animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none z-[9998]"
        animate={{ x: mousePos.x - 192, y: mousePos.y - 192 }}
        transition={{ type: 'spring', damping: 30, stiffness: 150, mass: 0.8 }}
      />
    </>
  );
};
