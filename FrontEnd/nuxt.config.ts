// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devServer: {
    port: 9999,
    host: 'localhost',
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'chart.js',
        'workbox-window',
      ]
    }
  },
routeRules:{
  '/Endpoint/**': { 
      proxy: 'http://localhost:9009/**' 
    },
},
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint','@vite-pwa/nuxt', '@pinia/nuxt'],
  css:[
    '@/assets/sass/main.scss'
  ],
  pwa: {
    strategy: 'generateSW',
    registerType: 'autoUpdate', // تحديث التطبيق تلقائياً عند توفر نسخة جديدة
    manifest: {
      name: 'TaskNotes App',
      short_name: 'TaskNotes',
      description: 'وصف للتطبيق',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-192x192.png', // تأكد من وضع هذه الصور في مجلد public
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/', // للتعامل مع الـ Routing عند فقدان الاتصال
cleanupOutdatedCaches: true,
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'], // الملفات التي سيتم تخزينها مؤقتاً
    },
    client: {
      installPrompt: true, // إظهار مطالبة التثبيت للمستخدم
    },
    devOptions: {
      enabled: true, // لتجربة الـ PWA أثناء التطوير (Development mode)
      type: 'classic',
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
    },
  },
})