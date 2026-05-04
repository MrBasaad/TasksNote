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
  display: flex;
  flex-direction: column;
  align-items: center;
}


.headersdiv {
  width: 100vw;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navcs {
  width: 95vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}



.invoNumberDiv {
  position: absolute;
  left: 1vw;
  width: 18vw;
  height: 6vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #414242;
  color: #fff;

  border-radius: 0.8vw;
  font-size: 1.1vw;
  font-weight: bold;
}



.editOrSaveVtnDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
}

.editbtn,
.savebtn {
  width: 8vw;
  height: 6vh;

  border: none;
  outline: none;
  cursor: pointer;

  border-radius: 0.8vw;

  background: #414242;
  color: #fff;

  font-size: 1vw;
  font-weight: bold;

  transition: 0.2s;
}

.editbtn:hover,
.savebtn:hover {
  background: #2b2c2c;
}



.maintablediv {
  width: 100vw;
  display: flex;
  justify-content: center;
  direction: rtl;
  margin-top: 2vh;
}

.tableDatadiv {
  width: 85vw;
  border-collapse: collapse;
  table-layout: fixed;
  // background: #ffffff;
  border-radius: 0.8vw;
  overflow: hidden;
}



.theadDiv {
  background: #414242;
  color: #fff;
}

.trowforheaad {
  height: 6vh;
  font-size: 1vw;
  font-weight: 800;
}



.tableDatadiv th,
.tableDatadiv td {
  padding: 0.8vh 0.5vw;
  text-align: center;
}



.tbodycs:hover {
  background: #f2f2f2;
}



.rownumhd,
.rownumtd {
  width: 5vw;
}

.datehd,
.datetd * {
  width: 8vw;
}

.texthead,
.inputediv {
  width: 50vw;
}

.tikettimehd,
.radios {
  width: 10vw;
}

.donediv {
  width: 5vw;
}



.dateput {
  width: 100%;
  border: none;
  background: transparent;
  text-align: center;
  font-weight: bold;
  outline: none;
}

.inputtaske {
  width: 100%;
  height: 6vh;

  border: none;
  outline: none;
  resize: none;

  background: transparent;

  font-size: 1vw;
  font-weight: 600;

  padding: 0.5vw;
  line-height: 1.4;
}



.bigdiv {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
}

.bigdiv div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sendBTN {
  display: flex;
  position: fixed;
  margin: auto;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  outline: none;
  border: none;
  background: #414242;
  color: #fff;
}
.sendBTN {
  margin-bottom: 6vh;
  bottom: 0vh;
  left: 0vw;
  margin-left: 1vw;
  width: fit-content;
  height: 5vh;
  z-index: 1000;
  border-radius: 1vw;
  padding: 1vh 1.5vw;
}

@media (max-width: 767px) {
  .invoNumberDiv {
    width: fit-content;
    font-size: 0.75rem;
    padding: 0vh 2.5vw;
  }

  .tableDatadiv {
    width: 96vw;
  }

  .trowforheaad {
    font-size: 2.8vw;
  }
  .inputtaske {
    font-size: 2rem;
  }
  .datehd {
    display: none;
  }
}

@media (min-width: 768px) {
  .tableDatadiv {
    width: 92vw;
  }
  .inputtaske {
    font-size: 1.8vw;
  }
}
</style>
