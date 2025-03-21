
import React from 'react';
import { motion } from 'framer-motion';
import AppLogo from './AppLogo';
import ModernTitle from './ModernTitle';
import ThemeSelector from './ThemeSelector';
import UserProfile from './UserProfile';
import InstallButtons from './InstallButtons';

interface AppHeaderProps {
  userName: string;
  onLogout: () => void;
}

const AppHeader = ({ userName, onLogout }: AppHeaderProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div 
      className="text-center mb-6 relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="absolute right-0 top-0 flex items-center space-x-2"
        variants={itemVariants}
      >
        <UserProfile userName={userName} onLogout={onLogout} />
        <ThemeSelector />
      </motion.div>
      
      <motion.div 
        className="inline-flex items-center justify-center mb-3"
        variants={itemVariants}
      >
        <AppLogo size="md" animated={true} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <ModernTitle size="md" colorful={true} />
      </motion.div>
      
      <motion.p 
        className="text-muted-foreground mt-2"
        variants={itemVariants}
      >
        Suas anotações organizadas em um só lugar.
      </motion.p>
      
      <motion.div variants={itemVariants}>
        <InstallButtons />
      </motion.div>
    </motion.div>
  );
};

export default AppHeader;
