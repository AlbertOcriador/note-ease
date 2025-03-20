
/// <reference types="vite/client" />

interface Navigator {
  standalone?: boolean;
}

interface Window {
  navigator: Navigator;
}

// Add SyncManager interface for background sync
interface SyncManager {
  register(tag: string): Promise<void>;
}

// Extend the ServiceWorkerRegistration interface to include sync property
interface ServiceWorkerRegistration {
  sync?: SyncManager;
}
