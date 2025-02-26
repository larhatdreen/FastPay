import React, { useState, useEffect } from 'react';
import './Notification.css'

const Notification = ({ children, onClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="notification">
      {children}
    </div>
  );
};

export default Notification;