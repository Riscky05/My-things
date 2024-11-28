"use client";

import { useState } from 'react';
import { Hero } from './Hero';
import { CardGrid } from './CardGrid';
import { Confetti } from './Confetti';

export function CardGame() {
  const [hasSelected, setHasSelected] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12">
      {hasSelected && <Confetti />}
      <Hero />
      <CardGrid onCardSelect={() => setHasSelected(true)} hasSelected={hasSelected} />
    </div>
  );
}