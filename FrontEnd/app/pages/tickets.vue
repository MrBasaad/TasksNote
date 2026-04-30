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
onMounted(() => {
  document.addEventListener("click", async () => {});
});
</script>
<template>
  <div class="mains">
    <header class="headercs">
      <nav class="navcs">
        <div class="createtikectdv" @click="addTiketNum">
          <p class="createtikectbtn">إنشاء تذكرة</p>
        </div>
        <select
          data-placeholder="فلترة"
          :class="[isEmpthy ? 'nulls' : 'filterdv']"
          name="tg"
        >
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
.nulls {
  display: none;
}
.mains {
  display: flex;
  flex-direction: column;
  background: darkcyan;
  text-wrap: nowrap;

  .headercs {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    .navcs {
      display: flex;
      flex-direction: row;
      position: absolute;
      justify-content: space-between;
      align-items: center;
    }
    .createtikectdv {
      display: flex;
      position: absolute;
      background: #414242;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .createtikectbtn {
      cursor: pointer;
      color: white;
      text-decoration: none;
    }
    .filterdv {
      direction: rtl;
      display: flex;
      position: absolute;
      background: #414242;
      justify-content: center;
      align-items: center;
      text-align: center;
      outline: none;
      border: none;
      color: white;
    }
    .ops {
      display: flex;
      position: relative;
      background: #414242;
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
    align-items: center;
    margin: auto;
    direction: rtl;
  }
}

@media (max-width: 480px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headercs {
    width: 100vw;
    height: 12vh;
    z-index: 1000;
    .navcs {
      width: 100vw;
      height: 12vh;
    }
    .createtikectdv {
      width: fit-content;
      padding: 0 2vw;
      height: 4vh;
      left: 3vw;
      border-radius: 1vw;
      z-index: 2000;
    }
    .createtikectbtn {
      font-size: 0.5rem;
      font-weight: 900;
    }
    .filterdv {
      width: 8vw;
      height: 4vh;
      left: 45vw;
      border-radius: 1vw;
    }
    .ops {
      width: 6vw;
      height: 10vh;
      z-index: 100;
    }
  }
  .maincs {
    width: 100vw;
    margin-top: 1vw;
  }
}

@media (min-width: 481px) and (max-width: 767px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headercs {
    width: 100vw;
    height: 12vh;
    z-index: 1000;
    .navcs {
      width: 100vw;
      height: 12vh;
    }
    .createtikectdv {
      width: fit-content;
      padding: 0 2vw;
      height: 4vh;
      left: 3vw;
      border-radius: 1vw;
      z-index: 2000;
    }
    .createtikectbtn {
      font-size: 0.5rem;
      font-weight: 900;
    }
    .filterdv {
      width: 8vw;
      height: 4vh;
      left: 45vw;
      border-radius: 1vw;
    }
    .ops {
      width: 6vw;
      height: 10vh;
      z-index: 100;
    }
  }
  .maincs {
    width: 100vw;
    margin-top: 1vw;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headercs {
    width: 100vw;
    height: 12vh;
    z-index: 1000;
    .navcs {
      width: 100vw;
      height: 12vh;
    }
    .createtikectdv {
      width: fit-content;
      padding: 0 2vw;
      height: 4vh;
      left: 3vw;
      border-radius: 1vw;
      z-index: 2000;
    }
    .createtikectbtn {
      font-size: 0.5rem;
      font-weight: 900;
    }
    .filterdv {
      width: 8vw;
      height: 4vh;
      left: 45vw;
      border-radius: 1vw;
    }
    .ops {
      width: 6vw;
      height: 10vh;
      z-index: 100;
    }
  }
  .maincs {
    width: 100vw;
    margin-top: 1vw;
  }
}
@media (min-width: 992px) and (max-width: 1199px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headercs {
    width: 100vw;
    height: 12vh;
    z-index: 1000;
    .navcs {
      width: 100vw;
      height: 12vh;
    }
    .createtikectdv {
      width: fit-content;
      padding: 0 2vw;
      height: 4vh;
      left: 3vw;
      border-radius: 1vw;
      z-index: 2000;
    }
    .createtikectbtn {
      font-size: 0.85vw;
      font-weight: 900;
    }
    .filterdv {
      width: 8vw;
      height: 4vh;
      left: 45vw;
      border-radius: 1vw;
    }
    .ops {
      width: 6vw;
      height: 10vh;
      z-index: 100;
    }
  }
  .maincs {
    width: 100vw;
    margin-top: 1vw;
  }
}
@media (min-width: 1200px) and (max-width: 1919px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headercs {
    width: 100vw;
    height: 12vh;
    z-index: 1000;
    .navcs {
      width: 100vw;
      height: 12vh;
    }
    .createtikectdv {
      width: fit-content;
      padding: 0 2vw;
      height: 4vh;
      left: 3vw;
      border-radius: 1vw;
      z-index: 2000;
    }
    .createtikectbtn {
      font-size: 0.9rem;
      font-weight: 900;
    }
    .filterdv {
      width: 8vw;
      height: 4vh;
      left: 45vw;
      border-radius: 1vw;
    }
    .ops {
      width: 6vw;
      height: 10vh;
      z-index: 100;
    }
  }
  .maincs {
    width: 100vw;
    margin-top: 1vw;
  }
}
@media (min-width: 1920px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headercs {
    width: 100vw;
    height: 12vh;
    z-index: 1000;
    .navcs {
      width: 100vw;
      height: 12vh;
    }
    .createtikectdv {
      width: fit-content;
      padding: 0 2vw;
      height: 4vh;
      left: 3vw;
      border-radius: 1vw;
      z-index: 2000;
    }
    .createtikectbtn {
      font-size: 0.5rem;
      font-weight: 900;
    }
    .filterdv {
      width: 8vw;
      height: 4vh;
      left: 45vw;
      border-radius: 1vw;
    }
    .ops {
      width: 6vw;
      height: 10vh;
      z-index: 100;
    }
  }
  .maincs {
    width: 100vw;
    margin-top: 1vw;
  }
}
</style>
<style lang="css">
:root {
  overflow-x: hidden;
}
</style>
