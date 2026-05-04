<script setup lang="ts">
definePageMeta({
  requiresAuth: true,
});
</script>
<template>
  <div class="mains">
    <HeadersBar />
    <main class="maincs">
      <TableData />
    </main>
    <ToogleToTop />
    <!-- <div>
      <DialogBox message="الجلسة على وشك الانتهاء" :doublebtn="true" />
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.mains {
  display: flex;
  flex-direction: column;
  background: darkcyan;
  text-wrap: nowrap;
  width: 100vw;
  min-height: 100vh;

  .maincs {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    margin: auto;
    direction: rtl;
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
