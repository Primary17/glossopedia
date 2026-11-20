
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    server: {
        host: '0.0.0.0'
    },

    preview: {
        host: '0.0.0.0'
    },

    build: {
        rollupOptions: {
            input: {
                index: resolve(root, 'index.html'),
                main: resolve(root, 'main.html'),
                feedback: resolve(root, 'feedback.html'),
                interglossa: resolve(root, 'interglossa.html'),
                ogham: resolve(root, 'ogham.html')
            }
        }
    }
});
