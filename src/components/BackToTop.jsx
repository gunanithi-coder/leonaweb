import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled  = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(scrolled > 400);
      setScrollPct(maxScroll > 0 ? (scrolled / maxScroll) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* SVG circle progress values */
  const radius      = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDash  = circumference - (scrollPct / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          className="back-to-top"
          onClick={handleClick}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.6, y: 20  }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.1 }}
          whileTap={{  scale: 0.95 }}
        >
          {/* Progress ring */}
          <svg className="btt-ring" viewBox="0 0 50 50">
            {/* Track */}
            <circle
              cx="25" cy="25" r={radius}
              fill="none"
              stroke="rgba(13,110,110,0.15)"
              strokeWidth="2.5"
            />
            {/* Progress */}
            <circle
              cx="25" cy="25" r={radius}
              fill="none"
              stroke="#0D6E6E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDash}
              transform="rotate(-90 25 25)"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>

          {/* Arrow icon */}
          <svg className="btt-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="19" x2="12" y2="5"/>
            <polyline points="5 12 12 5 19 12"/>
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;