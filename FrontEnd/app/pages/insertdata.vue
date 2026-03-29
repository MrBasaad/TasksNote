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
// .mains {
//   background: darkcyan;
// }
// .headersdiv {
//   display: flex;
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
// }
// .navcs {
//   display: flex;
//   position: absolute;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
// }
// .invoNumberDiv {
//   display: flex;
//   position: absolute;
//   justify-content: center;
//   align-items: center;
//   background: #414242;
//   color: #fff;
// }
// .editOrSaveVtnDiv {
//   display: flex;
//   position: absolute;
//   justify-content: center;
//   align-items: center;
// }
// .editbtn {
//   display: flex;
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   background-color: transparent;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   background: #414242;
//   color: #fff;
// }
// .savebtn {
//   display: flex;
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   background-color: transparent;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   background: #414242;
//   color: #fff;
// }
// .maintablediv {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: auto;
//   direction: rtl;
// }
// .tableDatadiv {
//   border-collapse: collapse;
//   table-layout: fixed;
// }
// .theadDiv {
//   background-color: #414242;
//   color: white;
//   border-radius: 1vw 1vw 0vw 0vw;
// }
// .tableDatadiv th,
// .tableDatadiv td {
//   text-align: center;
// }
// .trowforheaad {
//   border-collapse: collapse;
//   table-layout: fixed;
//   text-align: center;
// }
// .texthead {
//   margin: auto;
//   justify-content: center;
//   align-items: center;
// }
// .tikettimehd {
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
// }
// .sendBTN {
//   display: flex;
//   position: fixed;
//   margin: auto;
//   justify-content: center;
//   align-items: center;
//   z-index: 1000;
//   cursor: pointer;
//   outline: none;
//   border: none;
//   background: #414242;
//   color: #fff;
// }
// @media (max-width: 480px) {
//   .mains {
//     width: 100vw;
//     min-height: 100vh;
//   }
//   .headersdiv {
//     width: 100vw;
//     height: 12vh;
//   }
//   .navcs {
//     width: 100vw;
//     height: 12vh;
//   }
//   .invoNumberDiv {
//     width: 20vw;
//     height: 6vh;
//     border-radius: 1vw;
//     left: 3vw;
//   }
//   .maintablediv {
//     width: 100vw;
//     margin-top: 1vw;
//   }
//   .tableDatadiv {
//     width: 80vw;
//     margin-top: 2vh;
//   }
//   .tableDatadiv th,
//   .tableDatadiv td {
//     padding: 0.5vh 0.5vw;
//   }
//   .trowforheaad {
//     height: 5.5vh;
//     font-size: 0.95em;
//     font-weight: 800;
//   }
//   .datehd {
//     width: fit-content;
//     padding: 0vh 1vw;
//   }
//   .texthead {
//     width: 50vw;
//   }
//   .tikettimehd {
//     width: fit-content;
//     padding: 0vh 1vw;
//   }
//   .sendBTN {
//     margin-bottom: 6vh;
//     bottom: 0vh;
//     left: 0vw;
//     margin-left: 1vw;
//     width: 10vw;
//     height: 5vh;
//     z-index: 1000;
//     border-radius: 1vw;
//   }
// }

// @media (min-width: 481px) and (max-width: 767px) {
// }
// @media (min-width: 768px) and (max-width: 991px) {
//   .mains {
//     width: 100vw;
//     min-height: 100vh;
//   }
//   .headersdiv {
//     width: 100vw;
//     height: 12vh;
//   }
//   .navcs {
//     width: 100vw;
//     height: 12vh;
//   }
//   .invoNumberDiv {
//     width: 20vw;
//     height: 6vh;
//     border-radius: 1vw;
//     left: 3vw;
//   }
//   .editOrSaveVtnDiv {
//     width: 20vw;
//     height: 6vh;
//   }
//   .editbtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .savebtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .maintablediv {
//     width: 100vw;
//     margin-top: 1vw;
//   }
//   .tableDatadiv {
//     width: 80vw;
//     margin-top: 2vh;
//   }
//   .tableDatadiv th,
//   .tableDatadiv td {
//     padding: 0.5vh 0.5vw;
//   }
//   .trowforheaad {
//     height: 5.5vh;
//     font-size: 0.95em;
//     font-weight: 800;
//   }
//   .datehd {
//     width: 7.5vw;
//   }
//   .texthead {
//     width: 50vw;
//   }
//   .tikettimehd {
//     width: 7.5vw;
//   }
//   .sendBTN {
//     margin-bottom: 6vh;
//     bottom: 0vh;
//     left: 0vw;
//     margin-left: 1vw;
//     width: 10vw;
//     height: 5vh;
//     z-index: 1000;
//     border-radius: 1vw;
//   }
// }
// @media (min-width: 992px) and (max-width: 1199px) {
//   .mains {
//     width: 100vw;
//     min-height: 100vh;
//   }
//   .headersdiv {
//     width: 100vw;
//     height: 12vh;
//   }
//   .navcs {
//     width: 100vw;
//     height: 12vh;
//   }
//   .invoNumberDiv {
//     width: 20vw;
//     height: 6vh;
//     border-radius: 1vw;
//     left: 3vw;
//   }
//   .editOrSaveVtnDiv {
//     width: 20vw;
//     height: 6vh;
//   }
//   .editbtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .savebtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .maintablediv {
//     width: 100vw;
//     margin-top: 1vw;
//   }
//   .tableDatadiv {
//     width: 80vw;
//     margin-top: 2vh;
//   }
//   .tableDatadiv th,
//   .tableDatadiv td {
//     padding: 0.5vh 0.5vw;
//   }
//   .trowforheaad {
//     height: 5.5vh;
//     font-size: 0.95em;
//     font-weight: 800;
//   }
//   .datehd {
//     width: 7.5vw;
//   }
//   .texthead {
//     width: 50vw;
//   }
//   .tikettimehd {
//     width: 7.5vw;
//   }
//   .sendBTN {
//     margin-bottom: 6vh;
//     bottom: 0vh;
//     left: 0vw;
//     margin-left: 1vw;
//     width: 10vw;
//     height: 5vh;
//     z-index: 1000;
//     border-radius: 1vw;
//   }
// }
// @media (min-width: 1200px) and (max-width: 1919px) {
//   .mains {
//     width: 100vw;
//     min-height: 100vh;
//   }
//   .headersdiv {
//     width: 100vw;
//     height: 12vh;
//   }
//   .navcs {
//     width: 100vw;
//     height: 12vh;
//   }
//   .invoNumberDiv {
//     width: 20vw;
//     height: 6vh;
//     border-radius: 1vw;
//     left: 3vw;
//   }
//   .editOrSaveVtnDiv {
//     width: 20vw;
//     height: 6vh;
//   }
//   .editbtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .savebtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .maintablediv {
//     width: 100vw;
//     margin-top: 1vw;
//   }
//   .tableDatadiv {
//     width: 80vw;
//     margin-top: 2vh;
//   }
//   .tableDatadiv th,
//   .tableDatadiv td {
//     padding: 0.5vh 0.5vw;
//   }
//   .trowforheaad {
//     height: 5.5vh;
//     font-size: 0.95em;
//     font-weight: 800;
//   }
//   .datehd {
//     width: 7.5vw;
//   }
//   .texthead {
//     width: 50vw;
//   }
//   .tikettimehd {
//     width: 7.5vw;
//   }
//   .sendBTN {
//     margin-bottom: 6vh;
//     bottom: 0vh;
//     left: 0vw;
//     margin-left: 1vw;
//     width: 10vw;
//     height: 5vh;
//     z-index: 1000;
//     border-radius: 1vw;
//   }
// }
// @media (min-width: 1920px) {
//   .mains {
//     width: 100vw;
//     min-height: 100vh;
//   }
//   .headersdiv {
//     width: 100vw;
//     height: 12vh;
//   }
//   .navcs {
//     width: 100vw;
//     height: 12vh;
//   }
//   .invoNumberDiv {
//     width: 20vw;
//     height: 6vh;
//     border-radius: 1vw;
//     left: 3vw;
//   }
//   .editOrSaveVtnDiv {
//     width: 20vw;
//     height: 6vh;
//   }
//   .editbtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .savebtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .maintablediv {
//     width: 100vw;
//     margin-top: 1vw;
//   }
//   .tableDatadiv {
//     width: 80vw;
//     margin-top: 2vh;
//   }
//   .tableDatadiv th,
//   .tableDatadiv td {
//     padding: 0.5vh 0.5vw;
//   }
//   .trowforheaad {
//     height: 5.5vh;
//     font-size: 0.95em;
//     font-weight: 800;
//   }
//   .datehd {
//     width: 7.5vw;
//   }
//   .texthead {
//     width: 50vw;
//   }
//   .tikettimehd {
//     width: 7.5vw;
//   }
//   .sendBTN {
//     margin-bottom: 6vh;
//     bottom: 0vh;
//     left: 0vw;
//     margin-left: 1vw;
//     width: 10vw;
//     height: 5vh;
//     z-index: 1000;
//     border-radius: 1vw;
//   }
// }

.mains {
  width: 100vw;
  min-height: 100vh;
  background: darkcyan;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* ================= HEADER ================= */

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

/* invoice */

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

/* buttons */

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

/* ================= TABLE ================= */

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

/* header */

.theadDiv {
  background: #414242;
  color: #fff;
}

.trowforheaad {
  height: 6vh;
  font-size: 1vw;
  font-weight: 800;
}

/* cells */

.tableDatadiv th,
.tableDatadiv td {
  padding: 0.8vh 0.5vw;
  text-align: center;
}

/* hover */

.tbodycs:hover {
  background: #f2f2f2;
}

/* column widths */

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

/* ================= INPUTS ================= */

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

/* radios */

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
  width: 10vw;
  height: 5vh;
  z-index: 1000;
  border-radius: 1vw;
}
/* ================= MOBILE ================= */

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
}

/* ================= TABLET ================= */

@media (min-width: 768px) and (max-width: 991px) {
  .tableDatadiv {
    width: 92vw;
  }

  .inputtaske {
    font-size: 1.8vw;
  }
}

/* ================= LARGE SCREENS ================= */

@media (min-width: 1600px) {
  .tableDatadiv {
    width: 70vw;
  }

  .inputtaske {
    font-size: 0.9vw;
  }
}
</style>
