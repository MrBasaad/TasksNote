<script lang="ts" setup>
const props = defineProps({
  message: String,
  color: {
    type: String,
    default: "red",
  },
  bg: {
    type: String,
    default: "darkred",
  },
});
</script>
<template>
  <div class="poupDiv">
    <p class="text">{{ props.message }}</p>
  </div>
</template>
<style scoped lang="scss">
.poupDiv {
  display: flex;
  position: absolute;
  width: 25vw;
  height: 10vh;
  right: 1vw;
  top: 5vh;
  color: v-bind(color);
  background-color: #414242bb;
  z-index: 1000;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1vh 1vw;
  border-radius: 1vw;
  font-size: 1.2rem;
  font-weight: bold;
}
.poupDiv::after {
  content: "";
  position: absolute;
  background-color: v-bind(bg);
  width: 95%;
  height: 1vh;
  bottom: 0.1vh;
  border-radius: 5vw;
  animation: move 5s ease-in;
}
@keyframes move {
  0% {
    transform: translate(0vw);
  }
  100% {
    transform: translate(-1vw);
    width: 0vw;
  }
}
</style>
