// umami.d.ts
export {};

declare global {
  interface Window {
    umami: {
      track: (event: string, data?: Record<string, unknown>) => void;
      // Add other methods if you're using more
    };
  }
}
