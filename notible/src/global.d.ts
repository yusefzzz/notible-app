export {};

declare global {
  interface Window {
    electron: {
      storeTextLocally: (text: string) => void;
    };
  }
}
