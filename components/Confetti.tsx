
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const Confetti: React.FC = () => {
  const [hearts, setHearts] = useState<{ id: number; left: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHearts((prev) => [
        ...prev.slice(-20), // Keep only last 20
        {
          id: Date.now(),
          left: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 3 + 2,
        },
      ]);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute text-pink-400 opacity-60"
          style={{
            left: `${h.left}%`,
            top: '-50px',
            animation: `fall ${h.duration}s linear forwards`,
          }}
        >
          <Heart size={h.size} fill="currentColor" />
        </div>
      ))}
      <style>{`
        @keyframes fall {
          to {
            transform: translateY(110vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
