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
  background: darkcyan;
}
.headersdiv {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.navcs {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.invoNumberDiv {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background: #414242;
  color: #fff;
}
.editOrSaveVtnDiv {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
}
.editbtn {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  background: #414242;
  color: #fff;
}
.savebtn {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  background: #414242;
  color: #fff;
}
.maintablediv {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  direction: rtl;
}
.tableDatadiv {
  border-collapse: collapse;
  table-layout: fixed;
}
.theadDiv {
  background-color: #414242;
  color: white;
}
.tableDatadiv th,
.tableDatadiv td {
  text-align: center;
}
.trowforheaad {
  border-collapse: collapse;
  table-layout: fixed;
  text-align: center;
}
.texthead {
  margin: auto;
  justify-content: center;
  align-items: center;
}
.tikettimehd {
  position: relative;
  justify-content: center;
  align-items: center;
  margin: auto;
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
@media (max-width: 480px) {
}

@media (min-width: 481px) and (max-width: 767px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headersdiv {
    width: 100vw;
    height: 12vh;
  }
  .navcs {
    width: 100vw;
    height: 12vh;
  }
  .invoNumberDiv {
    width: 20vw;
    height: 6vh;
    border-radius: 1vw;
    left: 3vw;
  }
  .editOrSaveVtnDiv {
    width: 20vw;
    height: 6vh;
  }
  .editbtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .savebtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .maintablediv {
    width: 100vw;
    margin-top: 1vw;
  }
  .tableDatadiv {
    width: 80vw;
    margin-top: 2vh;
  }
  .tableDatadiv th,
  .tableDatadiv td {
    padding: 0.5vh 0.5vw;
  }
  .trowforheaad {
    height: 5.5vh;
    font-size: 0.95em;
    font-weight: 800;
  }
  .datehd {
    width: 7.5vw;
  }
  .texthead {
    width: 50vw;
  }
  .tikettimehd {
    width: 7.5vw;
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
}
@media (min-width: 768px) and (max-width: 991px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headersdiv {
    width: 100vw;
    height: 12vh;
  }
  .navcs {
    width: 100vw;
    height: 12vh;
  }
  .invoNumberDiv {
    width: 20vw;
    height: 6vh;
    border-radius: 1vw;
    left: 3vw;
  }
  .editOrSaveVtnDiv {
    width: 20vw;
    height: 6vh;
  }
  .editbtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .savebtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .maintablediv {
    width: 100vw;
    margin-top: 1vw;
  }
  .tableDatadiv {
    width: 80vw;
    margin-top: 2vh;
  }
  .tableDatadiv th,
  .tableDatadiv td {
    padding: 0.5vh 0.5vw;
  }
  .trowforheaad {
    height: 5.5vh;
    font-size: 0.95em;
    font-weight: 800;
  }
  .datehd {
    width: 7.5vw;
  }
  .texthead {
    width: 50vw;
  }
  .tikettimehd {
    width: 7.5vw;
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
}
@media (min-width: 992px) and (max-width: 1199px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headersdiv {
    width: 100vw;
    height: 12vh;
  }
  .navcs {
    width: 100vw;
    height: 12vh;
  }
  .invoNumberDiv {
    width: 20vw;
    height: 6vh;
    border-radius: 1vw;
    left: 3vw;
  }
  .editOrSaveVtnDiv {
    width: 20vw;
    height: 6vh;
  }
  .editbtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .savebtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .maintablediv {
    width: 100vw;
    margin-top: 1vw;
  }
  .tableDatadiv {
    width: 80vw;
    margin-top: 2vh;
  }
  .tableDatadiv th,
  .tableDatadiv td {
    padding: 0.5vh 0.5vw;
  }
  .trowforheaad {
    height: 5.5vh;
    font-size: 0.95em;
    font-weight: 800;
  }
  .datehd {
    width: 7.5vw;
  }
  .texthead {
    width: 50vw;
  }
  .tikettimehd {
    width: 7.5vw;
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
}
@media (min-width: 1200px) and (max-width: 1919px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headersdiv {
    width: 100vw;
    height: 12vh;
  }
  .navcs {
    width: 100vw;
    height: 12vh;
  }
  .invoNumberDiv {
    width: 20vw;
    height: 6vh;
    border-radius: 1vw;
    left: 3vw;
  }
  .editOrSaveVtnDiv {
    width: 20vw;
    height: 6vh;
  }
  .editbtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .savebtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .maintablediv {
    width: 100vw;
    margin-top: 1vw;
  }
  .tableDatadiv {
    width: 80vw;
    margin-top: 2vh;
  }
  .tableDatadiv th,
  .tableDatadiv td {
    padding: 0.5vh 0.5vw;
  }
  .trowforheaad {
    height: 5.5vh;
    font-size: 0.95em;
    font-weight: 800;
  }
  .datehd {
    width: 7.5vw;
  }
  .texthead {
    width: 50vw;
  }
  .tikettimehd {
    width: 7.5vw;
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
}
@media (min-width: 1920px) {
  .mains {
    width: 100vw;
    min-height: 100vh;
  }
  .headersdiv {
    width: 100vw;
    height: 12vh;
  }
  .navcs {
    width: 100vw;
    height: 12vh;
  }
  .invoNumberDiv {
    width: 20vw;
    height: 6vh;
    border-radius: 1vw;
    left: 3vw;
  }
  .editOrSaveVtnDiv {
    width: 20vw;
    height: 6vh;
  }
  .editbtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .savebtn {
    width: 8vw;
    height: 6vh;
    margin: 0vh 0.5vw;
    border-radius: 1vw;
  }
  .maintablediv {
    width: 100vw;
    margin-top: 1vw;
  }
  .tableDatadiv {
    width: 80vw;
    margin-top: 2vh;
  }
  .tableDatadiv th,
  .tableDatadiv td {
    padding: 0.5vh 0.5vw;
  }
  .trowforheaad {
    height: 5.5vh;
    font-size: 0.95em;
    font-weight: 800;
  }
  .datehd {
    width: 7.5vw;
  }
  .texthead {
    width: 50vw;
  }
  .tikettimehd {
    width: 7.5vw;
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
}
</style>
<!-- <style lang="scss" scoped>

.mains{
  background:darkcyan;
  width:100%;
  min-height:100vh;
}

/* ---------- HEADER ---------- */

.headersdiv{
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:90px;
}

.navcs{
  width:95%;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.invoNumberDiv{
  display:flex;
  justify-content:center;
  align-items:center;

  width:60px;
  height:60px;

  border-radius:50%;

  background:#414242;
  color:#fff;

  font-size:1.2rem;
  font-weight:bold;
}

/* ---------- BUTTONS ---------- */

.editOrSaveVtnDiv{
  display:flex;
  gap:10px;
}

.editbtn,
.savebtn{
  padding:8px 16px;
  border:none;
  border-radius:6px;
  cursor:pointer;

  background:#414242;
  color:#fff;
}

/* ---------- TABLE ---------- */

.maintablediv{
  display:flex;
  flex-direction:column;
  align-items:center;
  direction:rtl;
  width:100%;
}

.tableDatadiv{

  width:95%;
  max-width:1300px;

  border-collapse:collapse;
  table-layout:fixed;

  background:white;
}

/* رأس الجدول */

.theadDiv{
  background:#414242;
  color:white;
}

.trowforheaad{
  font-weight:bold;
}

/* الخلايا */

.tableDatadiv th,
.tableDatadiv td{

  padding:10px;
  text-align:center;

  border:1px solid #ddd;

  font-size:0.95rem;

  word-break:break-word;
}

/* توزيع الأعمدة */

.rownumhd{
  width:7%;
}

.datehd{
  width:13%;
}

.texthead{
  width:50%;
  text-align:right;
}

.tikettimehd{
  width:15%;
}

.tableDatadiv th:last-child{
  width:15%;
}

/* ---------- RADIO BUTTONS ---------- */

.radioContainer{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:6px;

  flex-wrap:wrap;
}

.radioContainer label{
  display:flex;
  align-items:center;
  gap:4px;
}

/* تقليل حجم الراديو قليلاً */

input[type="radio"]{
  transform:scale(0.9);
}

/* ---------- SEND BUTTON ---------- */

.sendBTN{

  position:fixed;

  bottom:20px;
  left:20px;

  padding:10px 22px;

  background:#414242;
  color:#fff;

  border:none;
  border-radius:8px;

  cursor:pointer;

  z-index:1000;
}

/* ---------- TABLET ---------- */

@media (max-width:992px){

.tableDatadiv{
  width:97%;
}

.texthead{
  width:48%;
}

}

/* ---------- MOBILE ---------- */

@media (max-width:768px){

.headersdiv{
  height:70px;
}

.invoNumberDiv{
  width:50px;
  height:50px;
  font-size:1rem;
}

/* توزيع الأعمدة للموبايل */

.rownumhd{
  width:8%;
}

.datehd{
  width:12%;
}

.texthead{
  width:55%;
}

.tikettimehd{
  width:12%;
}

.tableDatadiv th:last-child{
  width:13%;
}

/* النصوص */

.tableDatadiv th,
.tableDatadiv td{
  font-size:0.8rem;
  padding:6px;
}

/* جعل الراديو عمودي */

.radioContainer{
  flex-direction:column;
}

/* زر الارسال */

.sendBTN{
  bottom:15px;
  left:15px;
  padding:8px 16px;
  font-size:0.8rem;
}

}

</style> -->