<script setup lang="ts">
const props = defineProps({
  message: String,
  doublebtn: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="bigbg">
    <div v-if="props.doublebtn" class="bg">
      <p class="messagepa">{{ props.message }}</p>
      <NuxtLink to="tickets" class="btn">الرجوع للرئيسية</NuxtLink>
    </div>
    <div v-else class="bg">
      <p class="messagepa">{{ props.message }}</p>
      <div class="btns">
        <button class="btnout">الخروج من الجلسة</button>
        <button class="btncom">تمديد</button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.bigbg {
  display: flex;
  position: fixed;
  background-color: rgba(245, 222, 179, 0.432);
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  top: 0px;
  z-index: 1000;
  backdrop-filter: blur(10px);
  transition: 1s;
}
.bg {
  display: flex;
  background: teal;
  margin: auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.bg:hover {
  transition: 0.8s;
  box-shadow: 0px 0px 0px rgba(117, 100, 68, 0.432);
}
.messagepa {
  color: white;
  width: fit-content;
  text-align: center;
  text-wrap: wrap;
}
.btns {
  display: flex;
  position: relative;
  flex-direction: row;
  // background: green;
  justify-content: space-evenly;
  margin: auto;
}
.btn {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: fit-content;
  font-weight: bold;
  background: darkolivegreen;
  color: white;
  cursor: pointer;
}
.btnout {
  font-weight: bold;
  background: darkred;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
}
.btncom {
  font-weight: bold;
  background: darkolivegreen;
  border: none;
  outline: none;
  color: white;
  cursor: pointer;
}
@media (max-width: 340px) {
  .bg {
    width: 90vw;
    height: 30vh;
    border-radius: 1vw;
    transition: 0.8s;
    box-shadow: 10px 10px 10px rgba(117, 100, 68, 0.432);
  }
  .messagepa {
    font-size: 1.5rem;
    height: 10vh;
    padding: 1.5vh 0.5vw;
  }
  .btns {
    // background: #000;
    width: 100%;
    height: 15vh;
    bottom: 1vh;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: auto;
  }
  .btn {
    height: 5vh;
    padding: 0vh 1vw;
    font-size: 1rem;
    border-radius: 0.5vw;
    bottom: -4vh;
  }
  .btnout {
    width: fit-content;
    padding: 1vh 4vw;
    font-size: 1rem;
    border-radius: 0.5vw;
  }
  .btncom {
    width: fit-content;
    padding: 1vh 10vw;
    font-size: 1rem;
    border-radius: 0.5vw;
  }
}
@media (min-width: 341px) and (max-width: 767px) {
  .bg {
    width: 60vw;
    height: 20vh;
    border-radius: 1vw;
    transition: 0.8s;
    box-shadow: 10px 10px 10px rgba(117, 100, 68, 0.432);
  }
  .messagepa {
    font-size: 1.5rem;
    height: 10vh;
    padding: 1.5vh 0.5vw;
  }
  .btns {
    width: 100%;
    height: 5vh;
    bottom: 1vh;
  }
  .btn {
    height: 5vh;
    padding: 0vh 1vw;
    font-size: 1rem;
    border-radius: 0.5vw;
    bottom: 1vh;
  }
  .btnout {
    width: fit-content;
    padding: 0vh 1.5vw;
    font-size: 1rem;
    border-radius: 0.5vw;
  }
  .btncom {
    width: fit-content;
    padding: 0vh 5vw;
    font-size: 1rem;
    border-radius: 0.5vw;
  }
}
@media (min-width: 768px) {
  .bg {
    width: 30vw;
    height: 16vh;
    border-radius: 1vw;
    transition: 0.8s;
    box-shadow: 10px 10px 10px rgba(117, 100, 68, 0.432);
  }
  .messagepa {
    font-size: 1.5rem;
    height: 10vh;
    padding: 1.5vh 0.5vw;
  }
  .btns {
    width: 100%;
    height: 5vh;
    bottom: 1vh;
  }
  .btn {
    height: 5vh;
    padding: 0vh 1vw;
    font-size: 1rem;
    border-radius: 0.5vw;
    bottom: 1vh;
  }
  .btnout {
    width: fit-content;
    padding: 0vh 2vw;
    font-size: 1rem;
    border-radius: 0.5vw;
  }
  .btncom {
    width: fit-content;
    padding: 0vh 3vw;
    font-size: 1rem;
    border-radius: 0.5vw;
  }
}
</style>
