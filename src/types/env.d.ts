/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMAILJS_PUBLIC_KEY: string;
  readonly VITE_EMAILJS_SERVICE_ID: string;
  readonly VITE_EMAILJS_TEMPLATE_ID: string;
  readonly VITE_EMAILJS_TEST_TEMPLATE_ID?: string;
  readonly VITE_APP_ENV?: 'test' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@emailjs/browser' {
  export function init(publicKey: string): void;
  export function send(
    serviceId: string,
    templateId: string,
    templateParams: Record<string, any>
  ): Promise<{
    status: number;
    text: string;
  }>;
} 