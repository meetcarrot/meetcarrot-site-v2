/** Minimal surface of the Intercom Messenger global we actually call. */
declare global {
  interface Window {
    Intercom?: (command: string, settings?: Record<string, unknown>) => void;
    intercomSettings?: Record<string, unknown>;
  }
}

export {};
