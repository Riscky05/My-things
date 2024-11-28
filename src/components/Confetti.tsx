import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

export function Confetti() {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        setIsActive(false);
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#da70d6', '#ee82ee', '#dda0dd', '#d8bfd8'],
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#da70d6', '#ee82ee', '#dda0dd', '#d8bfd8'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, [isActive]);

  return null;
}