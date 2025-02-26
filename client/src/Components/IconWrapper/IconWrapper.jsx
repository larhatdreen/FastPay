import React, { useState } from 'react';
import './IconWrapper.css';

const IconWrapper = ({ children, height = '24px' }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setTimeout(() => setIsClicked(false), 50);

  return (
    <div
      className={`iconWrapper ${isClicked ? 'clicked' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      style={{height: `${height}`}}
    >
      {children}
    </div>
  );
};

export default IconWrapper;