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
  margin: auto;
  color: black;
  cursor: pointer;
  background: rgba(128, 128, 128, 0.486);
}
.burgerList {
  display: flex;
  position: fixed;
  background-color: rgba(245, 222, 179, 0.432);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.navcs {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  margin: auto;
  flex-direction: column;
}
.showTickets,
.createTickets,
.userData {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  color: white;
  cursor: pointer;
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
  margin: auto;
  color: white;
  cursor: pointer;
  background-color: rgba(139, 0, 0, 0.342);
}

.singout:hover {
  border-radius: 10vw 5vw 0vw 0vw;
  transition: 1s;
  background-color: rgba(255, 10, 10, 0.8);
}
@media (max-width: 480px) {
  .activeLink {
    width: fit-content;
    height: 15vh;
    padding: 0 2vw;
    font-size: 1rem;
    font-weight: bold;
    margin-top: 15vh;
    border-radius: 4vw;
    transition: 1s;
    color: darkblue;
    text-decoration: underline !important;
  }
  .burgerList {
    width: 100vw;
    height: 100vh;
    margin-right: 0vw;
    right: 0vw;
    z-index: 1000;
    backdrop-filter: blur(10px);
    transition: 1s;
    text-wrap: nowrap;
  }
  .navcs {
    width: 50vw;
    height: 100vh;
  }
  .showTickets,
  .createTickets,
  .userData {
    width: fit-content;
    height: 15vh;
    padding: 0 2vw;
    font-size: 1rem;
    margin-top: 15vh;
    border-radius: 4vw;
  }
  .singout {
    width: fit-content;
    height: 15vh;
    padding: 0 2vw;
    font-size: 1rem;
    margin-top: 15vh;
    margin-bottom: 5vh;
    border-radius: 4vw;
  }
}

@media (min-width: 481px) {
  .activeLink {
    width: fit-content;
    height: 15vh;
    padding: 0 2vw;
    font-size: 1.2rem;
    font-weight: bold;
    text-decoration: underline;
    color: darkblue;
    margin-top: 15vh;
    border-radius: 4vw;
    transition: 1s;
  }
  .burgerList {
    width: 35vw;
    height: 100vh;
    margin-right: 0vw;
    right: 0vw;
    z-index: 1000;
    backdrop-filter: blur(10px);
    transition: 1s;
    text-wrap: nowrap;
  }
  .navcs {
    width: fit-content;
    height: 100vh;
  }
  .showTickets,
  .createTickets,
  .userData {
    width: fit-content;
    height: 15vh;
    padding: 0 2vw;
    font-size: 1.2rem;
    margin-top: 15vh;
    border-radius: 4vw;
  }

  .singout {
    width: fit-content;
    height: 15vh;
    font-size: 1.2rem;
    margin-top: 15vh;
    margin-bottom: 2vh;
    border-radius: 4vw;
    padding: 0 2vw;
  }
}
</style>
