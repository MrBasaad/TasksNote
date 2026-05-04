// middleware/auth.global.ts
export default defineNuxtRouteMiddleware(async (to, from) => {
  // 1. تخطي التنفيذ على السيرفر إذا كان الكود يحتاج للمتصفح فقط
  if (import.meta.server) return 
  const userStore = useUserStore()
  // 2. التحقق من الصلاحيات
  if (to.meta.requiresAuth && !userStore.name) {
    return navigateTo('/')
  }
  // 3. جلب البيانات ومنع التكرار اللانهائي
  if (userStore.name === '') {
    try {
      await userStore.fetchUser()
      
      // لا توجه لـ /tickets إذا كان المستخدم يحاول أصلاً الدخول لصفحة محمية أخرى
      if (to.path === '/') {
        return navigateTo('/tickets')
      }
    } catch (error) {
      console.error("Failed to fetch user:", error)
      return navigateTo('/')
    }
  }
});
  