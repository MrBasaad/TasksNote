<script setup lang="ts">
// import { ref } from 'vue'
import { useRoute } from "vue-router";
// import axios from 'axios'
// import { useRouter } from "vue-router";
// import { useUserStore } from '@/stores/userStore.ts'
const userStore = useUserStore();
const router = useRouter();
const redir = ref("/");
const isActivePage = (routePath: string): boolean => {
  const route = useRoute();
  return route.path === routePath;
};
const singouts = async () => {
  const response = await $fetch("/Endpoint/logout", {
    method: "POST",
    credentials: "include",
  });
  await userStore.resetUser();
  redir.value = await response.redirectPath;
};
const addTiketNum = async () => {
  try {
    const response = await $fetch("/Endpoint/tecketnum", {
      method: "POST",
      credentials: "include",
    });
    await router.push("/insertdata");
  } catch (error) {
    console.error(`Error Message:${error}`);
  }
};
</script>
<template>
  <aside class="burgerListhiiden burgerList" id="burgerList" dir="rtl">
    <nav class="navcs" id="navcs">
      <NuxtLink
        to="/tickets"
        :class="[isActivePage('/tickets') ? 'activeLink' : 'showTickets']"
      >
        <span> عرض التذاكر </span>
      </NuxtLink>
      <NuxtLink
        @click="addTiketNum"
        to="/insertdata"
        :class="[isActivePage('/insertdata') ? 'activeLink' : 'createTickets']"
      >
        <span> إنشاء تذكرة </span>
      </NuxtLink>
      <NuxtLink
        to="/userdata"
        :class="[isActivePage('/userdata') ? 'activeLink' : 'userData']"
      >
        <span> إدارة المستخدم </span>
      </NuxtLink>
      <NuxtLink :to="redir" @click.prevent="singouts" class="singout"
        >تسجيل الخروج</NuxtLink
      >
    </nav>
  </aside>
</template>
<style lang="scss" scoped>
.activeLink {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: yellow; */
  width: 15vw;
  height: 15vh;
  margin: auto;
  color: black;
  /* border-radius: 10vw 5vw 0vw 0vw; */
  cursor: pointer;
  font-size: 1.098em;
  margin-top: 15vh;
  background: rgba(128, 128, 128, 0.486);
  border-radius: 10vw 5vw 0vw 0vw;
  transition: 1s;
}
.burgerList {
  display: flex;
  width: 20vw;
  height: 100vh;
  position: fixed;
  background-color: rgba(245, 222, 179, 0.432);
  margin-right: 0vw;
  right: 0vw;
  z-index: 1000;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(10px);
  transition: 1s;
  flex-direction: column;
}
.navcs {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 100vh;
  margin: auto;
  flex-direction: column;
}

.showTickets,
.createTickets,
.userData {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: yellow; */
  width: 15vw;
  height: 15vh;
  margin: auto;
  color: white;
  /* border-radius: 10vw 5vw 0vw 0vw; */
  cursor: pointer;
  font-size: 1.098em;
  margin-top: 15vh;
}

.showTickets:hover,
.createTickets:hover,
.userData:hover {
  background: grey;
  border-radius: 10vw 5vw 0vw 0vw;
  transition: 1s;
}

.singout {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: yellow; */
  width: 15vw;
  height: 15vh;
  margin: auto;
  color: white;
  /* border-radius: 10vw 5vw 0vw 0vw; */
  cursor: pointer;
  font-size: 1.098em;
  margin-top: 15vh;
  background-color: rgba(139, 0, 0, 0.342);
  margin-top: 2vh;
}

.singout:hover {
  border-radius: 10vw 5vw 0vw 0vw;
  transition: 1s;
  background-color: rgba(255, 10, 10, 0.8);
}
</style>
