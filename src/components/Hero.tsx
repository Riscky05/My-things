import { motion } from 'framer-motion';

export function Hero() {
  return (
    <div className="text-center mb-16">
      <motion.h1 
        className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-600 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Moments of Magic: Our Next Adventure Awaits
      </motion.h1>
      <motion.p 
        className="text-xl md:text-2xl text-gray-600 dark:text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Choose a card, and let love lead the way
      </motion.p>
    </div>
  );
}