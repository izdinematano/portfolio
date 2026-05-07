import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

export default function Cursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    cursorX.set(x - (isHovering ? 24 : 7));
    cursorY.set(y - (isHovering ? 24 : 7));
  }, [x, y, cursorX, cursorY, isHovering]);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .project-card')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, [role="button"], .project-card')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        width: isHovering ? 48 : 14,
        height: isHovering ? 48 : 14,
        backgroundColor: '#E8FF00',
      }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
    />
  );
}
