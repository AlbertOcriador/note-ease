
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Notebook, Check, CheckCircle2 } from 'lucide-react';

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

const AppLogo = ({ size = 'md', animated = true }: AppLogoProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  const containerClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };

  const handleClick = () => {
    if (!animated) return;
    
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000);
  };

  useEffect(() => {
    if (isClicked) {
      const timer = setTimeout(() => setIsClicked(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isClicked]);

  return (
    <motion.div
      className={`inline-flex items-center justify-center rounded-full bg-primary/10 transition-all duration-300 cursor-pointer ${containerClasses[size]}`}
      onMouseEnter={() => animated && setIsHovered(true)}
      onMouseLeave={() => animated && setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        initial={false}
        animate={{ 
          rotate: isClicked ? 360 : 0,
          scale: isClicked ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 0.5 }}
      >
        {isClicked ? (
          <CheckCircle2 className={`text-primary ${sizeClasses[size]}`} />
        ) : isHovered ? (
          <Check className={`text-primary ${sizeClasses[size]}`} />
        ) : (
          <Notebook className={`text-primary ${sizeClasses[size]}`} />
        )}
      </motion.div>
    </motion.div>
  );
};

export default AppLogo;
