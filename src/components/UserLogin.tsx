
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import AppLogo from '@/components/AppLogo';
import ModernTitle from '@/components/ModernTitle';

interface UserLoginProps {
  onLogin: (name: string) => void;
}

const UserLogin = ({ onLogin }: UserLoginProps) => {
  const [userName, setUserName] = useState<string>('');
  
  const handleSetUserName = () => {
    if (userName.trim()) {
      localStorage.setItem('notafacil_username', userName.trim());
      onLogin(userName);
      toast.success(`Bem-vindo, ${userName}!`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 sm:px-6">
      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm">
        <CardContent className="pt-6 pb-8 px-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center mb-4">
              <AppLogo size="lg" animated={true} />
            </div>
            <ModernTitle size="md" colorful={true} />
            <p className="text-muted-foreground mt-2">
              Por favor, digite seu nome para começar
            </p>
          </div>
          
          <div className="space-y-4">
            <Input
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSetUserName()}
              placeholder="Seu nome"
              className="text-base py-6"
            />
            
            <Button 
              onClick={handleSetUserName}
              className="w-full button-shimmer py-6 bg-primary hover:bg-primary/90 text-white"
              disabled={!userName.trim()}
            >
              Continuar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserLogin;
