
/// <reference types="vite/client" />

interface Navigator {
  standalone?: boolean;
}

interface Window {
  navigator: Navigator;
}
