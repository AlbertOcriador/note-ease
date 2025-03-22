
import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const InstallButtons = () => {
  const [isPwaInstallable, setIsPwaInstallable] = useState<boolean>(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsPwaInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPwa = () => {
    if (!deferredPrompt) return;
    
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    });
  };

  const handleDownloadApk = () => {
    navigate('/download');
  };

  // If device is iOS or desktop, don't show Android download button
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (!isPwaInstallable && !isAndroid) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {isPwaInstallable && (
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 text-xs" 
          onClick={handleInstallPwa}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
            <line x1="16" y1="5" x2="22" y2="5"></line>
            <line x1="19" y1="2" x2="19" y2="8"></line>
            <circle cx="9" cy="9" r="2"></circle>
            <path d="m21 15-3.4-3.4a2 2 0 0 0-2.8 0l-7.4 7.4"></path>
          </svg>
          Instalar App
        </Button>
      )}
      {isAndroid && (
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1 text-xs" 
          onClick={handleDownloadApk}
        >
          <Download size={14} />
          Baixar para Android
        </Button>
      )}
    </div>
  );
};

export default InstallButtons;
