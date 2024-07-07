import React, { useState, useEffect } from 'react';

const VerySubtleGreenGradientBackground = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const gradientStyle = {
    background: `radial-gradient(
      circle 300px at ${mousePosition.x}px ${mousePosition.y}px, 
      rgba(72, 187, 120, 0.05), 
      rgba(56, 161, 105, 0.02) 50%, 
      rgba(47, 133, 90, 0.00)
    )`,
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-green-950">
      <div
        className="absolute inset-0 transition-all duration-500 ease-out"
        style={gradientStyle}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default VerySubtleGreenGradientBackground;