"use client";

import { useState } from 'react';
import { MagicCard } from './MagicCard';

const cards = [
  {
    id: 1,
    frontIcon: '✨',
    backText: 'You make my heart skip a beat every time I see you',
  },
  {
    id: 2,
    frontIcon: '🌟',
    backText: 'Your smile lights up my entire world',
  },
  {
    id: 3,
    frontIcon: '💫',
    backText: 'Every moment with you feels like magic',
  },
];

interface CardGridProps {
  onCardSelect: () => void;
  hasSelected: boolean;
}

export function CardGrid({ onCardSelect, hasSelected }: CardGridProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCardClick = (id: number) => {
    if (selectedId === null) {
      setSelectedId(id);
      onCardSelect();
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto px-4">
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
    </div>
  );
}