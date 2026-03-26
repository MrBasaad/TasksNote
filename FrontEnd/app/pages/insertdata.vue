<script setup lang="ts">
// import { useRouter } from "vue-router";
// import ToogleToShowBurger from "@/components/ToogleToShowBurger.vue";
// import ToogleToTop from "~/layouts/ToogleToTop.vue";
// import BodyDataInsertion from "@/components/BodyDataInsertion.vue";
// import { useUserStore } from "../stores/userStore";
// import { ref, onMounted } from "vue";
// import axios from "axios";

//---------------------------
definePageMeta({
  requiresAuth: true,
});
interface ChildComponent {
  lines: any[];
}

const userStore = useUserStore();
// const router = useRouter();
const childRef = ref<ChildComponent | null>(null);
const lineData = ref();
const lastnewTicketNumber = ref(null);
//-------------------

//------------
const submitData = async () => {
  if (childRef.value) {
    lineData.value = await childRef.value.lines;
  }
  const response = await $fetch("/Endpoint/tecketrow", {
    method: "POST",
    credentials: "include",
    body: {
      rows: lineData.value,
    },
  });
  if (response) {
    navigateTo(response.path);
  } else {
    console.error(response);
  }
};

const getTicketNum = async () => {
  const response = await $fetch("/Endpoint/tecketnum", {
    method: "GET",
    credentials: "include",
  });
  return response.ticketnumber;
};
onMounted(async () => {
  lastnewTicketNumber.value = await getTicketNum();
});

//--------
</script>
<template>
  <div class="mains" @keyup.enter="submitData">
    <header class="headersdiv">
      <nav class="navcs">
        <div class="invoNumberDiv">
          <p class="invonumberdata">{{ lastnewTicketNumber }}</p>
        </div>
        <ToogleToShowBurger />
      </nav>
    </header>
    <main class="maintablediv">
      <table class="tableDatadiv">
        <thead class="theadDiv">
          <tr class="trowforheaad">
            <th class="rownumhd">رقم الصف</th>
            <th class="datehd">التاريخ</th>
            <th class="texthead" id="texthead">نص المهمة</th>
            <th class="tikettimehd">زمن التذكرة</th>
            <th>تم / لم يتم</th>
          </tr>
        </thead>
        <BodyDataInsertion
          ref="childRef"
          :lastnewTicketNumber="lastnewTicketNumber"
        />
      </table>
      <button class="sendBTN" @click="submitData">ارسال</button>
    </main>
    <ToogleToTop />
  </div>
</template>
<style lang="scss" scoped>
.mains {
  width: 100vw;
  min-height: 100vh;
  background: darkcyan;
}
.headersdiv {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 12vh;
  /* background: rebeccapurple; */
  margin: auto;
}

.navcs {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 12vh;
  /* background: red; */
  margin: auto;
  /* top: 5vh; */
}

.invoNumberDiv {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 6vh;
  background: #414242;
  border-radius: 1vw;
  left: 3vw;
  color: #fff;
  /* left: 2vw; */
  /* margin: 1vw; */
}

.editOrSaveVtnDiv {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 6vh;
  /* background: darkgoldenrod; */
}

.editbtn {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 8vw;
  height: 6vh;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0vh 0.5vw;
  background: #414242;
  border-radius: 1vw;
  color: #fff;
}

.savebtn {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 8vw;
  height: 6vh;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0vh 0.5vw;
  background: #414242;
  border-radius: 1vw;
  color: #fff;
}
.maintablediv {
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  margin: auto;
  margin-top: 1vw;
  direction: rtl;
}

.tableDatadiv {
  border-collapse: collapse;
  table-layout: fixed;
  width: 80vw;
  margin-top: 2vh;
}

.theadDiv {
  background-color: #414242;
  color: white;
}
.tableDatadiv th,
.tableDatadiv td {
  text-align: center;
  padding: 0.5vh 0.5vw;
}

.trowforheaad {
  border-collapse: collapse;
  table-layout: fixed;
  height: 5.5vh;
  font-size: 0.95em;
  font-weight: 800;
  text-align: center;
}
.rownumhd {
}
.datehd {
  width: 7.5vw;
}
.texthead {
  /* background-color: aliceblue; */
  width: 50vw;
  margin: auto;
  justify-content: center;
  align-items: center;
}
.tikettimehd {
  /* background: indigo; */
  /* display: flex; */
  position: relative;
  width: 7.5vw;
  justify-content: center;
  align-items: center;
  margin: auto;
  /* background: #000; */
}

.sendBTN {
  display: flex;
  position: fixed;
  margin: auto;
  margin-bottom: 6vh;
  bottom: 0vh;
  left: 0vw;
  margin-left: 1vw;
  width: 10vw;
  height: 5vh;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  outline: none;
  border: none;
  background: #414242;
  border-radius: 1vw;
  color: #fff;
}
</style>
