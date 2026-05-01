<script setup lang="ts">
const isEmpthy = ref(false);

const addTiketNum = async () => {
  try {
    const response = await $fetch("/Endpoint/tecketnum", {
      method: "POST",
      credentials: "include",
    });
    await navigateTo("/insertdata");
  } catch (error) {
    console.error(`Error Message:${error}`);
  }
};
</script>
<template>
  <header class="headercs">
    <nav class="navcs">
      <div class="createtikectdv" @click="addTiketNum">
        <p class="createtikectbtn">إنشاء تذكرة</p>
      </div>
      <select
        data-placeholder="فلترة"
        :class="[isEmpthy ? 'nulls' : 'filterdv']"
        name="tg"
      >
        <optgroup class="ops" label="حسب رقم التذكرة">
          <option value="newTikect" selected>الاحدث</option>
          <option value="oldTikect">الاقدم</option>
        </optgroup>
        <optgroup class="ops" label="حسب التاريخ">
          <option value="oldDate">الاقدم</option>
          <option value="newDate">الاحدث</option>
        </optgroup>
        <optgroup class="ops" label="حسب حالة التذكرة">
          <option value="done" class="done">تم</option>
          <option value="notDone" class="notDone">لم يتم</option>
        </optgroup>
      </select>
      <ToogleToShowBurger />
    </nav>
  </header>
</template>
<style scoped lang="scss">
.nulls {
  display: none;
}
.headercs {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 12vh;
  z-index: 1000;
  .navcs {
    display: flex;
    flex-direction: row;
    position: absolute;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 12vh;
  }
  .createtikectdv {
    display: flex;
    position: absolute;
    background: #414242;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: fit-content;
    padding: 0 2vw;
    height: 4vh;
    left: 3vw;
    border-radius: 1vw;
    z-index: 2000;
  }
  .createtikectbtn {
    cursor: pointer;
    color: white;
    text-decoration: none;
    font-weight: 900;
  }
  .filterdv {
    direction: rtl;
    display: flex;
    position: absolute;
    background: #414242;
    justify-content: center;
    align-items: center;
    text-align: center;
    outline: none;
    border: none;
    color: white;
    width: 8vw;
    height: 4vh;
    left: 45vw;
    border-radius: 1vw;
    cursor: pointer;
  }
  .ops {
    display: flex;
    position: relative;
    background: #414242;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
    direction: rtl;
    width: 6vw;
    height: 10vh;
    z-index: 100;
  }
}
@media (max-width: 991px) {
  .createtikectbtn {
    font-size: 0.5rem;
  }
}
@media (min-width: 992px) and (max-width: 1919px) {
  .createtikectbtn {
    font-size: 0.9rem;
  }
}
@media (min-width: 1920px) {
  .createtikectbtn {
    font-size: 0.5rem;
  }
}
</style>
