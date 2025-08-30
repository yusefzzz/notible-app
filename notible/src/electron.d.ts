export {};

declare global {
  interface Window {
    electronAPI: {
      storeTextLocally: (text: string) => void;
    };
  }
}
