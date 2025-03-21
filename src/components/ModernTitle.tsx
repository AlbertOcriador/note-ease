
import React from 'react';
import { motion } from 'framer-motion';

interface ModernTitleProps {
  size?: 'sm' | 'md' | 'lg';
  colorful?: boolean;
}

const ModernTitle = ({ size = 'md', colorful = true }: ModernTitleProps) => {
  const sizeClasses = {
    sm: 'text-2xl sm:text-3xl',
    md: 'text-3xl sm:text-4xl',
    lg: 'text-4xl sm:text-5xl',
  };

  const letterVariants = {
    initial: { y: -20, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  const title = "NotaFácil";
  
  return (
    <div className="font-extrabold tracking-tight">
      <div className={`${sizeClasses[size]} flex items-center justify-center`}>
        {Array.from(title).map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants}
            initial="initial"
            animate="animate"
            className={
              colorful
                ? `
                  ${index === 0 ? 'text-blue-600 dark:text-blue-400' : ''}
                  ${index === 1 ? 'text-blue-500 dark:text-blue-300' : ''}
                  ${index === 2 ? 'text-primary' : ''}
                  ${index === 3 ? 'text-primary' : ''}
                  ${index === 4 ? 'text-purple-600 dark:text-purple-400' : ''}
                  ${index === 5 ? 'text-purple-600 dark:text-purple-400' : ''}
                  ${index === 6 ? 'text-fuchsia-500 dark:text-fuchsia-400' : ''}
                  ${index === 7 ? 'text-fuchsia-500 dark:text-fuchsia-400' : ''}
                  ${index === 8 ? 'text-pink-500 dark:text-pink-400' : ''}
                  inline-block hover:scale-125 transition-transform duration-200
                `
                : 'text-foreground'
            }
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

export default ModernTitle;
