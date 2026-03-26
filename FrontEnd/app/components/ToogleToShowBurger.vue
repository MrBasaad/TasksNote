<script setup lang="ts">
// import NavBar from './NavBar.vue'
// import { ref } from 'vue'
const isToglle = ref<boolean>(false)
const btnData = ref<string>('=')
const toggleNav = () => {
  isToglle.value = !isToglle.value
  return btnData.value.match('=') ? (btnData.value = 'X') : (btnData.value = '=')
}
</script>
<template>
  <div>
    <nav class="navcs" id="navcs">
      <div class="tooglenavlistdv" @click="toggleNav">
        <button class="tooglenavlistbtn">{{ btnData }}</button>
      </div>
    </nav>
    <NavBar v-if="isToglle" />
  </div>
</template>
<style lang="scss" scoped>
div {
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 10vw;
  height: 12vh;
  margin: auto;
  margin-right: 0;
  right: 0;
  z-index: 2000;
  .navcs {
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    width: 10vw;
    height: 12vh;
    margin: auto;
    margin-right: 0;
    right: 0;
    z-index: 2000;
  }
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
</style>
