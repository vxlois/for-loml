
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
  rotation: number;
}

const FloatingHearts: React.FC = () => {
  const heartColors = ['#ff4d6d', '#ff758f', '#ff8fa3', '#c9184a', '#ffb3c1', '#fae1dd'];
  
  const hearts = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 25 + 10,
      delay: Math.random() * 20,
      duration: Math.random() * 10 + 20,
      color: heartColors[Math.floor(Math.random() * heartColors.length)],
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', opacity: 0, rotate: heart.rotation }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.4, 0.4, 0],
            rotate: heart.rotation + 45,
            x: [
              `${heart.x}%`,
              `${heart.x + (Math.random() * 15 - 7.5)}%`,
              `${heart.x}%`
            ]
          }}
          transition={{
            y: { duration: heart.duration, repeat: Infinity, delay: heart.delay, ease: "linear" },
            opacity: { duration: heart.duration, repeat: Infinity, delay: heart.delay, ease: "linear" },
            rotate: { duration: 10, repeat: Infinity, ease: "easeInOut" },
            x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            position: 'absolute',
            left: `${heart.x}%`,
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill={heart.color}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.05))' }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
