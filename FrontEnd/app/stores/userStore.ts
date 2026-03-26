import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // استخدام useCookie مباشرة من Nuxt - هذا يعمل 100% في Nuxt 4
  const userCookie = useCookie('auth_user', {
    default: () => ({ name: '', id: '' }),
    watch: true // سيقوم بتحديث الكوكيز تلقائياً عند تغيير القيم
  })

  // نربط القيم بالكوكيز
  const name = ref(userCookie.value.name)
  const id = ref(userCookie.value.id)

  async function fetchUser() {
    try {
      const response: any = await $fetch('/Endpoint/me')
      
      // تحديث الحالة
      name.value = response.userName
      id.value = response.userId
      
      // تحديث الكوكيز يدوياً لضمان الحفظ
      userCookie.value = { name: response.userName, id: response.userId }
      
    } catch (error) {
      console.error("Error fetching user", error)
      resetUser()
    }
  }

  function resetUser() {
    name.value = ""
    id.value = ""
    userCookie.value = { name: '', id: '' }
  }

  return { name, id, fetchUser, resetUser }
})