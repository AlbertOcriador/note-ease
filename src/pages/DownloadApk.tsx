
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import ModernTitle from '@/components/ModernTitle';
import AppLogo from '@/components/AppLogo';

const DownloadApk = () => {
  useEffect(() => {
    // Iniciar o download automático após 1 segundo
    const timer = setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/download/notafacil.apk';
      link.download = 'notafacil.apk';
      link.setAttribute('type', 'application/vnd.android.package-archive');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const manualDownload = () => {
    const link = document.createElement('a');
    link.href = '/download/notafacil.apk';
    link.download = 'notafacil.apk';
    link.setAttribute('type', 'application/vnd.android.package-archive');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-8">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <AppLogo size="lg" animated={true} />
        </div>
        
        <ModernTitle size="md" colorful={true} />
        
        <div className="mt-8 space-y-6 bg-card p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Download do Aplicativo</h2>
          
          <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-md text-left">
            <p className="text-sm mb-2">Seu download deve começar automaticamente em alguns segundos.</p>
            <p className="text-sm">Se o download não começar, clique no botão abaixo:</p>
          </div>
          
          <Button 
            onClick={manualDownload} 
            className="w-full bg-primary hover:bg-primary/90 text-white"
          >
            <Download className="mr-2 h-5 w-5" />
            Baixar APK para Android
          </Button>
          
          <div className="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-md text-left mt-4">
            <p className="text-sm font-medium mb-1">Instruções de instalação:</p>
            <ol className="text-sm list-decimal pl-5 space-y-1">
              <li>Após o download, abra o arquivo APK</li>
              <li>Pode ser necessário permitir a instalação de fontes desconhecidas</li>
              <li>Siga as instruções na tela para completar a instalação</li>
            </ol>
          </div>
          
          <Link to="/">
            <Button variant="ghost" className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para o NotaFácil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DownloadApk;
