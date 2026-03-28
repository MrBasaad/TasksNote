<script setup lang="ts">
// import ToogleToShowBurger from "@./la/ToogleToShowBurger.vue";
// import ToogleToTop from "~/layouts/ToogleToTop.vue";
// import { useUserStore } from "@/stores/userStore";
// import PieChart from "../components/PieChart.vue";
const userStore = useUserStore();

definePageMeta({
  requiresAuth: true,
});
</script>
<template>
  <div class="mains">
    <ToogleToShowBurger />
    <main class="main">
      <div class="userControoler" dir="rtl">
        <div class="photohead">
          <h1 class="textDataForHead">بيانات المستخدم</h1>
        </div>
        <label for="userName" class="lableForUserName"
          >اسم المستخدم :
          <input
            name="userName"
            class="userName"
            :value="userStore.name"
            readonly
          />
        </label>
        <label for="userPasswd" class="lableForUserPasswd">
          الرمز السري :
          <input
            type="password"
            name="userPasswd"
            class="userPasswd"
            readonly
          />
        </label>
        <label for="userEmail" class="lableForUserEmail"
          >البريد الإلكتروني :
          <input name="userEmail" class="userEmail" readonly />
        </label>
        <label for="userId" class="lableForUserId"
          >معرف المستخدم :
          <input name="userId" class="userId" :value="userStore.id" readonly />
        </label>
        <div class="resetDataDiv">
          <span class="changeUserName">تغيير اسم المستخدم </span>
          <span class="changeUserPasswd">تغيير الرمز السري </span>
          <span class="changeUserEmail">تغيير البريد الإلكتروني </span>
        </div>
      </div>
    </main>
    <section class="stataicUserData">
      <div class="photohead">
        <h1 class="textDataForHead">احصائية المهام</h1>
      </div>
      <PieChart />
    </section>
    <ToogleToTop />
  </div>
</template>
<style lang="scss" scoped>
.mains {
  position: relative;
  justify-content: center;
  align-items: center;
  background: darkcyan;
  overflow-x: hidden;
}

.tooglenavlistdv {
  display: flex;
  position: absolute;
  background: #5078b2;
  width: 3.5vw;
  height: 7vh;
  right: 3vw;
  justify-content: center;
  align-items: center;
  border-radius: 1vw;
  z-index: 1000;
}

.tooglenavlistbtn {
  background: none;
  outline: none;
  border: none;
  width: 3vw;
  height: 10vh;
  cursor: pointer;
  color: white;
  font-size: 0.85vw;
  font-weight: 900;
}

.userControoler {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80vw;
  height: 50vh;
  background-color: rgba(245, 222, 179, 0.432);
  margin: auto;
  margin-top: 10vh;
}

.photohead {
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 255, 0.37);
  width: 80vw;
  height: 7vh;
  margin-top: 0vh;
  top: 0vh;
  border-radius: 0vw 0vw 4vw 0vw;
}

.lableForUserName {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: auto;
  /* background-color: brown; */
  width: 40vw;
  height: 6vh;
  margin-right: 1vw;
  margin-top: 6vw;
  color: white;
}

label input {
  display: flex;
  margin: auto;
  margin-right: 2vw;
  width: 25vw;
  background: transparent;
  outline: none;
  justify-content: center;
  align-items: center;
  border: none;
}

.lableForUserPasswd {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: auto;
  /* background-color: brown; */
  width: 40vw;
  height: 6vh;
  margin-right: 1vw;
  margin-top: 1vh;
  color: white;
}

.lableForUserEmail {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: auto;
  /* background-color: brown; */
  width: 40vw;
  height: 6vh;
  margin-right: 1vw;
  margin-top: 1vh;
  color: white;
}

.lableForUserId {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: auto;
  /* background-color: brown; */
  width: 40vw;
  height: 6vh;
  margin-right: 1vw;
  margin-top: 1vh;
  color: white;
}

.resetDataDiv {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 35vw;
  height: 40vh;
  /* background-color: rgba(245, 222, 179, 0.432); */
  margin: auto;
  margin-top: 10vh;
  margin-left: 0vw;
  left: 0vw;
}

.resetDataDiv span {
  margin: auto;
  color: darkblue;
  font-size: 1.094em;
  cursor: pointer;
}

.stataicUserData {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 45vh;
  background-color: rgba(245, 222, 179, 0.432);
  margin: auto;
  margin-top: 10vh;
  margin-bottom: 5vh;
}

.myChart {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  top: 4vh;
  width: 15vw;
  height: 8vh;
  margin: auto;
}

.toogleToTopDiv {
  background-color: #5078b2;
  display: flex;
  position: fixed;
  bottom: 5vh;
  width: 3.5vw;
  height: 7vh;
  right: 3vw;
  cursor: pointer;
  border-radius: 1vw;
}

@media (max-width: 480px) {
}

@media (min-width: 481px) and (max-width: 767px) {
}
@media (min-width: 992px) and (max-width: 1199px) {
}
@media (min-width: 768px) and (max-width: 991px) {
}
@media (min-width: 1200px) and (max-width: 1919px) {
}
@media (min-width: 1920px) {
}
</style>
