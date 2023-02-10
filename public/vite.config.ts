import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],  
      },
      manifest: {
        name: 'Firebase + PWA NAGP Demo',
        short_name: 'Firebase + PWA NAGP Demo',
        description: 'Firebase + PWA NAGP Demo',
        theme_color: '#ffffff',
        icons: [
          {
            src: '/img/icons/android-chrome-maskable-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/img/icons/android-chrome-maskable-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        shortcuts: [
          {
            name: "Say Hello",
            short_name: 'Say Hello',
            url: "/hello",
            description: 'send a hello message',
            icons: []
          }
        ]
      }
  })
  ]
})
