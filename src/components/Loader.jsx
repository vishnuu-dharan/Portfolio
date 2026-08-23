import React, { useState, useEffect, memo } from 'react';

const Loader = memo(function Loader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let removeTimer;
    const timer = setTimeout(() => {
      setFading(true);
      removeTimer = setTimeout(() => {
        setVisible(false);
      }, 600);
    }, 1000);

    return () => {
      clearTimeout(timer);
      if (removeTimer) clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="loader" className={fading ? 'hidden' : ''} role="status" aria-label="Initializing portfolio">
      <div className="loader-logo">VD</div>
      <div className="loader-bar-wrap">
        <div className="loader-bar"></div>
      </div>
      <p className="loader-text">INITIALIZING INTELLIGENCE // SYSTEMS ONLINE</p>
    </div>
  );
});

export default Loader;
