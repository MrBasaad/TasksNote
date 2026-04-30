<script lang="ts" setup>
// import axios from 'axios'
// import { ref, onMounted } from 'vue'
// import { useUserStore } from '../stores/userStore'
// import { useRouter } from "vue-router";
// import { RouterLink } from "vue-router";
//----------------------------
interface Ticket {
  ticketnumber: number;
  [key: string]: any;
}
const userStore = useUserStore();
// const router = useRouter();
const allData = ref<Ticket[]>([]);
const isEmpth = ref(true);
//---------------------------------
const fetchData = async () => {
  try {
    const response = await $fetch("/Endpoint/alldata", {
      method: "POST",
      credentials: "include",
      body: {
        user: userStore.name,
      },
    });
    allData.value = response;
  } catch (error) {
    console.error("خطأ في جلب البيانات:", error);
  } finally {
    // console.log(allData.value)
    allData.value.sort(
      (a: Ticket, b: Ticket) => b.ticketnumber - a.ticketnumber,
    );
    isEmpth.value = allData.value.length === 0; //allData.value.length) == 0 ? (isEmpth.value = true) : (isEmpth.value = false)
  }
};
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
//----------------------
onMounted(() => {
  document.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement | null;
    if (!target) return;

    const parent = target.parentElement;

    if (parent && parent.id && !isNaN(parseInt(parent.id))) {
      const dataParamId = parent.id;

      navigateTo({
        name: "content-id",
        params: { id: dataParamId },
      });
    }
  });
  fetchData();
});
// defineExpose({
//   lines: allData.value,
// })
//-------------------
</script>
<template>
  <table class="tableDatadiv" v-if="isEmpth == false">
    <thead class="theadDiv">
      <tr class="trowforheaad">
        <th>رقم الصف</th>
        <th>تاريخ التذكرة</th>
        <th>رقم التذكرة</th>
        <th>زمن التذكرة</th>
        <th>حالة التذكرة</th>
      </tr>
    </thead>
    <tbody class="mask" id="tbodycs">
      <tr
        :id="data.ticketnumber.toString()"
        class="tbodycs ks"
        v-for="(data, index) in allData"
        :key="index"
      >
        <td id="fnam" class="rownumtd">{{ index + 1 }}</td>
        <td class="date">
          {{ new Date(data.rowdate).toISOString().split("T")[0] }}
        </td>
        <td>{{ data.ticketnumber }}</td>
        <td>
          {{
            data.timefortecket === "Mounth"
              ? "شهري"
              : data.timefortecket === "Year"
                ? "سنوي"
                : data.timefortecket === "Day"
                  ? "يومي"
                  : "فارغ"
          }}
        </td>
        <td>{{ data.is_ticket_done ? "تم" : "لم يتم" }}</td>
      </tr>
    </tbody>
  </table>
  <div v-else>
    <p>اوهه قد لا يوجد مهام بعد</p>
    <NuxtLink to="/insertdata" @click="addTiketNum"
      >يرجى النقر هنا لتبدا مسيرة ناجحة تبدا بالتدوين</NuxtLink
    >
  </div>
</template>
<style lang="scss" scoped>
// .tablecs {
//   // position: absolute;
//   border-collapse: collapse;
//   table-layout: fixed;
//   // display: flex;
//   width: 80vw;
//   min-height: 100vh;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
//   margin-top: 2vh;
// }

// .theadcs {
//   border-collapse: collapse;
//   table-layout: fixed;
//   display: inline-table;
//   // position: absolute;
//   width: 80vw;
//   height: 4vh;
//   justify-content: center;
//   align-items: center;
//   background-color: #414242;
//   margin-top: 0vh;
//   top: 0vh;
// }
// .trowforheaad {
//   border-collapse: collapse;
//   table-layout: fixed;
//   display: table-header-group;
//   position: relative;
//   margin: auto;
//   width: 80vw;
//   height: 4vh;
//   justify-content: center;
//   align-items: center;
//   color: white;
//   font-size: 0.9rem;
//   font-weight: 900;
//   text-align: center;
// }
// .tbodycs {
//   border-collapse: collapse;
//   table-layout: fixed;
//   display: table;
//   // position: absolute;
//   margin: auto;
//   width: 80vw;
//   height: 6vh;
//   justify-content: center;
//   align-items: center;
//   top: 5vh;
// }
// .trowforbody {
//   border-collapse: collapse;
//   table-layout: fixed;
//   display: table-row-group;
//   position: relative;
//   margin: auto;
//   width: 80vw;
//   height: 6vh;
//   justify-content: center;
//   align-items: center;
//   text-align: center;
//   font-size: 0.75em;
//   font-weight: 900;
// }
// .trowforbody:hover {
//   transform: translateY(-0.2vw);
//   transition: 1.2s;
//   margin: 1vw 0vw;
//   padding: 1vw 0vw;
//   z-index: 1000;
//   font-size: 1.1em;
//   background: rgba(255, 255, 255, 0.151);
//   cursor: pointer;
// }
// tr,
// td {
//   width: 13vw;
// }

// @media (max-width: 480px) {
// }

// @media (min-width: 481px) and (max-width: 767px) {
// }
// @media (min-width: 992px) and (max-width: 1199px) {
// }
// @media (min-width: 768px) and (max-width: 991px) {
// }
// @media (min-width: 1200px) and (max-width: 1919px) {
// }
// @media (min-width: 1920px) {
// }

/*================= TABLE ================= */
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

/* ================= MOBILE ================= */

@media (max-width: 767px) {
  .tableDatadiv {
    width: 96vw;
  }

  .trowforheaad {
    font-size: 0.6rem;
  }
  .tableDatadiv td {
    font-size: 0.9rem;
    font-weight: bold;
    text-wrap-style: balance;
    text-wrap: wrap;
    word-wrap: break-word;
  }
}

/* ================= TABLET ================= */

@media (min-width: 768px) and (max-width: 991px) {
  .tableDatadiv {
    width: 92vw;
    font-size: 1rem;
    font-weight: bold;
  }
}

/* ================= LARGE SCREENS ================= */

@media (min-width: 1600px) {
  .tableDatadiv {
    width: 70vw;
    font-size: 1rem;
    font-weight: bold;
  }
}
</style>
