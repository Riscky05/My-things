import { useState } from 'react';
import { Hero } from '@/components/Hero';
import { CardGrid } from '@/components/CardGrid';
import { Confetti } from '@/components/Confetti';

function App() {
  const [hasSelected, setHasSelected] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950">
      {hasSelected && <Confetti />}
      <div className="container mx-auto px-4 py-12">
        <Hero />
        <CardGrid onCardSelect={() => setHasSelected(true)} />
      </div>
    </div>
  );
}

export default App;