
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
  return (
    <div className="text-center mb-6 relative">
      <div className="absolute right-0 top-0 flex items-center space-x-2">
        <UserProfile userName={userName} onLogout={onLogout} />
        <ThemeSelector />
      </div>
      <div className="inline-flex items-center justify-center mb-3">
        <AppLogo size="md" animated={true} />
      </div>
      <ModernTitle size="md" colorful={true} />
      <p className="text-muted-foreground mt-2">
        Suas anotações organizadas em um só lugar.
      </p>
      
      <InstallButtons />
    </div>
  );
};

export default AppHeader;
