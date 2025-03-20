
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Registrar o service worker para funcionalidades offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registrado com sucesso:', registration);
      })
      .catch(error => {
        console.error('Erro ao registrar Service Worker:', error);
      });
  });
}

// Inicializar a aplicação
createRoot(document.getElementById("root")!).render(<App />);
