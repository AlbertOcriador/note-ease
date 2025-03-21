
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
    hover: {
      y: -5,
      scale: 1.1,
      transition: { type: 'spring', stiffness: 500 }
    }
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const title = "NotaFácil";
  
  return (
    <div className="font-extrabold tracking-tight">
      <motion.div 
        className={`${sizeClasses[size]} flex items-center justify-center`}
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {Array.from(title).map((letter, index) => (
          <motion.span
            key={index}
            custom={index}
            variants={letterVariants}
            whileHover="hover"
            className={
              colorful
                ? `
                  ${index === 0 ? 'text-blue-600 dark:text-blue-400' : ''}
                  ${index === 1 ? 'text-blue-500 dark:text-blue-300' : ''}
                  ${index === 2 ? 'text-indigo-600 dark:text-indigo-400' : ''}
                  ${index === 3 ? 'text-indigo-500 dark:text-indigo-300' : ''}
                  ${index === 4 ? 'text-purple-600 dark:text-purple-400' : ''}
                  ${index === 5 ? 'text-purple-500 dark:text-purple-300' : ''}
                  ${index === 6 ? 'text-fuchsia-600 dark:text-fuchsia-400' : ''}
                  ${index === 7 ? 'text-fuchsia-500 dark:text-fuchsia-300' : ''}
                  ${index === 8 ? 'text-pink-500 dark:text-pink-400' : ''}
                  inline-block transition-transform duration-200
                `
                : 'text-foreground'
            }
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default ModernTitle;
