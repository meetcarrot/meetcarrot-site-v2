/** Minimal surface of the Intercom Messenger global we actually call. */
declare global {
  interface Window {
    /**
     * `showNewMessage` takes a plain prefill string rather than a settings
     * object, hence the union — passing an object there opens an empty composer.
     */
    Intercom?: (command: string, settings?: Record<string, unknown> | string) => void;
    intercomSettings?: Record<string, unknown>;
  }
}

export {};
