
import React from 'react';
import { motion } from 'framer-motion';
import ModernTitle from './ModernTitle';

const SplashScreen = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-background z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div 
          className="inline-flex items-center justify-center mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: 0, ease: "easeInOut" }}
            >
              <div className="p-4 rounded-full bg-primary/10">
                <div className="h-16 w-16 text-primary">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-primary"
              animate={{ 
                scale: [1, 3, 1],
                opacity: [1, 0.8, 1]
              }}
              transition={{ duration: 1.5, repeat: 0, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
        <ModernTitle size="lg" colorful={true} />
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
