<script setup lang="ts">
// import { ref, onMounted } from 'vue'
// const toogleToTopDiv = ref<HTMLElement | null>(null)
onMounted(() => {
  const scrollFucn = () => {
    const toogleToTopDiv = document.getElementById("toogleToTopDiv");
    if (!toogleToTopDiv) return;

    if (window.scrollY <= 10) {
      toogleToTopDiv.style.display = "none";
    } else {
      toogleToTopDiv.style.display = "flex";
    }
  };

  window.addEventListener("scroll", scrollFucn);
  scrollFucn();
});
const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
</script>
<template>
  <div class="toogleToTopDiv" id="toogleToTopDiv" @click="scrollToTop">
    <img src="" alt="" class="imgForToogle" />
  </div>
</template>
<style lang="scss" scoped>
.toogleToTopDiv {
  z-index: 1 !important;
  background-color: #5078b2;
  display: flex;
  position: fixed;
  bottom: 5vh;
  right: 3vw;
  cursor: pointer;
}

@media (max-width: 767px) {
  .toogleToTopDiv {
    width: 7vw;
    height: 7vh;
    border-radius: 2vw;
  }
}
@media (min-width: 768px) {
  .toogleToTopDiv {
    width: 3.5vw;
    height: 7vh;
    border-radius: 1vw;
  }
}
</style>
