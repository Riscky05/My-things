"use client";

import styles from './Card.module.css';

interface CardProps {
  frontIcon: string;
  backText: string;
  isFlipped: boolean;
  isDisabled: boolean;
  hasWon: boolean;
  onClick: () => void;
}

export function Card({ 
  frontIcon, 
  backText, 
  isFlipped, 
  isDisabled,
  hasWon,
  onClick 
}: CardProps) {
  return (
    <div 
      className={`${styles.card} ${isDisabled ? styles.disabled : ''} ${hasWon ? styles.winner : ''}`}
      onClick={() => !isDisabled && onClick()}
    >
      <div className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}>
        <div className={styles.cardFront}>
          <span className={styles.icon}>{frontIcon}</span>
        </div>
        <div className={styles.cardBack}>
          <p>{backText}</p>
        </div>
      </div>
    </div>
  );
}