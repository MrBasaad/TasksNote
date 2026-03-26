<script setup lang="ts">
// import ToogleToTop from "~/layouts/ToogleToTop.vue";
// import ToogleToShowBurger from "@/components/ToogleToShowBurger.vue";
// import { RouterLink } from "vue-router";
// import TableData from "../components/TableData.vue";
// import { useUserStore } from "../stores/userStore";
// import axios from "axios";
// import { useRouter } from "vue-router";
// import { ref, onMounted } from "vue";
//--------------------------------------
definePageMeta({
  requiresAuth: true,
});
const userStore = useUserStore();
// const router = useRouter();
const allData = ref(null);
const childRef = ref(null);
const isEmpthy = ref(false);

//--------------------------------------
const addTiketNum = async () => {
  try {
    const response = await $fetch("/Endpoint/tecketnum", {
      method: "POST",
      credentials: "include",
    });
    await navigateTo("/insertdata");
  } catch (error) {
    console.error(`Error Message:${error}`);
  }
};
</script>
<template>
  <div class="mains">
    <header class="headercs">
      <nav class="navcs">
        <div class="createtikectdv" @click="addTiketNum">
          <p class="createtikectbtn">إنشاء تذكرة</p>
        </div>
        <select data-placeholder="فلترة" class="filterdv" name="tg">
          <optgroup class="ops" label="حسب رقم التذكرة">
            <option value="newTikect" selected>الاحدث</option>
            <option value="oldTikect">الاقدم</option>
          </optgroup>
          <optgroup class="ops" label="حسب التاريخ">
            <option value="oldDate">الاقدم</option>
            <option value="newDate">الاحدث</option>
          </optgroup>
          <optgroup class="ops" label="حسب حالة التذكرة">
            <option value="done" class="done">تم</option>
            <option value="notDone" class="notDone">لم يتم</option>
          </optgroup>
        </select>
        <ToogleToShowBurger />
      </nav>
    </header>
    <main class="maincs">
      <TableData />
    </main>
    <ToogleToTop />
  </div>
</template>
<style lang="scss" scoped>
.mains {
  display: flex;
  width: 100vw;
  min-height: 100vh;
  flex-direction: column;
  background: darkcyan;
}
.headercs {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 12vh;
  z-index: 1000;

  .navcs {
    display: flex;
    flex-direction: row;
    /* background: saddlebrown; */
    width: 100vw;
    height: 12vh;
    position: absolute;
    justify-content: space-between;
    align-items: center;
  }

  .createtikectdv {
    display: flex;
    position: absolute;
    background: #414242;
    width: 8vw;
    height: 4vh;
    left: 3vw;
    justify-content: center;
    align-items: center;
    border-radius: 1vw;
    cursor: pointer;
    z-index: 2000;
  }

  .createtikectbtn {
    cursor: pointer;
    color: white;
    font-size: 0.85vw;
    font-weight: 900;
    text-decoration: none;
  }

  .filterdv {
    direction: rtl;
    display: flex;
    position: absolute;
    background: #414242;
    width: 8vw;
    height: 4vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    left: 45vw;
    border-radius: 1vw;
    outline: none;
    border: none;
    color: white;
  }

  .ops {
    display: flex;
    position: relative;
    background: #414242;
    width: 6vw;
    height: 10vh;
    z-index: 100;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    direction: rtl;
  }
}
.maincs {
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100vw;
  // height: 100vh;
  align-items: center;
  margin: auto;
  margin-top: 1vw;
  direction: rtl;
  // margin-top: 15vh;
}
</style>
<style lang="css">
:root {
  overflow-x: hidden;
}
</style>
