import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // 1. TRACK MOUSE MOVEMENT
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // 2. CHECK WHAT WE ARE HOVERING OVER
      // We look for specific tags (BUTTON, INPUT) or CSS classes (villager-list-item)
      const target = e.target;
      const isHoverable = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'A' ||
        target.classList.contains('villager-list-item') ||
        target.classList.contains('tag');

      setIsHovering(isHoverable);
    };

    // 3. TRACK CLICKS
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        // Use transform for high-performance movement
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`, 
        pointerEvents: 'none', // CRITICAL: Lets clicks pass through to the buttons below
        zIndex: 9999, // Stays on top of everything
      }}
    >
      <img 
        src='/normal.png'
        // FOR NOW: Let's use CSS filters to fake the "Hand" look if you don't have the image yet
        style={{
          width: '32px', // Stardew cursors are chunky
          imageRendering: 'pixelated',
          // ANIMATION LOGIC:
          transform: isClicking ? 'scale(0.8)' : 'scale(1)',
          transition: 'transform 0.1s ease-out',
        }}
        alt="cursor"
      />
    </div>
  );
};

export default CustomCursor;