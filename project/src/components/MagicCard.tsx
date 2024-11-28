import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagicCardProps {
  frontIcon: string;
  backText: string;
  isFlipped: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export function MagicCard({ 
  frontIcon, 
  backText, 
  isFlipped, 
  isDisabled,
  onClick 
}: MagicCardProps) {
  return (
    <motion.div
      className={cn(
        "relative w-full aspect-[3/4] cursor-pointer perspective-1000",
        isDisabled && "opacity-50 cursor-not-allowed"
      )}
      whileHover={!isDisabled && !isFlipped ? { scale: 1.05 } : {}}
      onClick={() => !isDisabled && onClick()}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-transform duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <div className="absolute w-full h-full backface-hidden">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-1">
            <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center">
              <span className="text-7xl animate-sparkle">{frontIcon}</span>
            </div>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180">
          <div className="w-full h-full rounded-2xl bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-1">
            <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center p-6">
              <p className="text-xl text-center font-medium text-gray-800 dark:text-gray-200">
                {backText}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}