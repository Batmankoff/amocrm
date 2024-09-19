import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'https://sanyayakovlev95.amocrm.ru',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '/api/v4'),
                secure: false,
            },
            '/oauth2': {
                target: 'https://sanyayakovlev95.amocrm.ru',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/oauth2/, '/oauth2'),
                secure: false,
            },
        },
    },
})
