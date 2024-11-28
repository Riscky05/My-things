import { useState } from 'react';
import { MagicCard } from './MagicCard';
import { motion } from 'framer-motion';

const cards = [
  {
    id: 1,
    frontIcon: '✨',
    backText: "You choose, and I'll offer it—let's share a special moment together.",
  },
  {
    id: 2,
    frontIcon: '🌟',
    backText: "Let's spend a day together, enjoying activities we both love and making new memories.",
  },
  {
    id: 3,
    frontIcon: '💫',
    backText: "A cozy dinner for just the two of us, where we can relax and enjoy each other's company.",
  },
];

interface CardGridProps {
  onCardSelect: () => void;
}

export function CardGrid({ onCardSelect }: CardGridProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    if (selectedId === null) {
      setSelectedId(id);
      onCardSelect();
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
    >
      {cards.map((card) => (
        <MagicCard
          key={card.id}
          frontIcon={card.frontIcon}
          backText={card.backText}
          isFlipped={selectedId === card.id}
          isDisabled={selectedId !== null && selectedId !== card.id}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </motion.div>
  );
}