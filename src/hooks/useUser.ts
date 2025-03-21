
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useUser() {
  const [userName, setUserName] = useState<string>('');
  const [isUserSet, setIsUserSet] = useState<boolean>(false);

  useEffect(() => {
    const userNameSalvo = localStorage.getItem('notafacil_username');
    if (userNameSalvo) {
      setUserName(userNameSalvo);
      setIsUserSet(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    setUserName(username);
    setIsUserSet(true);
    localStorage.setItem('notafacil_username', username);
  };

  const handleLogout = () => {
    setIsUserSet(false);
    localStorage.removeItem('notafacil_username');
    toast.info('Você saiu da sua conta');
  };

  return {
    userName,
    isUserSet,
    handleLogin,
    handleLogout
  };
}
