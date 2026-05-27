import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        events: resolve(__dirname, 'events.html'),
        faq: resolve(__dirname, 'faq.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        menus: resolve(__dirname, 'menus.html'),
        pricing: resolve(__dirname, 'pricing.html')
      }
    }
  }
});