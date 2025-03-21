
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { toast } from 'sonner'

// Registrar o service worker para funcionalidades offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
        
        // Verificar por atualizações
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                toast.info('Nova versão disponível! Recarregue a página para atualizar.', {
                  action: {
                    label: 'Atualizar',
                    onClick: () => window.location.reload()
                  },
                  duration: 10000
                });
              }
            });
          }
        });
      })
      .catch(error => {
        console.error('Erro ao registrar Service Worker:', error);
      });
  });
}

// Mostrar mensagem quando estiver offline/online
window.addEventListener('online', () => {
  toast.success('Você está online novamente!');
  
  // Trigger sync quando voltar online - verifica se a API de sincronização está disponível
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(registration => {
      // Verifica se o objeto sync existe na registration antes de usá-lo
      if (registration.sync) {
        registration.sync.register('sync-notas').catch(err => {
          console.error('Erro ao registrar sincronização em segundo plano:', err);
        });
      } else {
        console.log('Background Sync API não está disponível neste navegador');
      }
    });
  }
});

window.addEventListener('offline', () => {
  toast.error('Você está offline. Algumas funcionalidades podem não estar disponíveis.');
});

// Detectar se o aplicativo pode ser instalado como PWA
let deferredPrompt: any;
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevenir a exibição automática do prompt
  e.preventDefault();
  // Armazenar o evento para uso posterior
  deferredPrompt = e;
  // Notificar o usuário que o app pode ser instalado
  toast.info('Instale o NotaFácil para usar offline!', {
    action: {
      label: 'Instalar',
      onClick: () => {
        if (deferredPrompt) {
          deferredPrompt.prompt();
          deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('Usuário aceitou a instalação do PWA');
              toast.success('Obrigado por instalar o NotaFácil!');
            } else {
              console.log('Usuário recusou a instalação do PWA');
            }
            deferredPrompt = null;
          });
        }
      }
    },
    duration: 15000
  });
});

// Detectar se o app já está instalado
window.addEventListener('appinstalled', () => {
  console.log('PWA instalado com sucesso');
  toast.success('NotaFácil foi instalado com sucesso!');
  deferredPrompt = null;
});

// Inicializar a aplicação
createRoot(document.getElementById("root")!).render(<App />);
