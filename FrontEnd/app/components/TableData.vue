<script lang="ts" setup>
interface Ticket {
  ticketnumber: number;
  [key: string]: any;
}
const userStore = useUserStore();
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
    allData.value.sort(
      (a: Ticket, b: Ticket) => b.ticketnumber - a.ticketnumber,
    );
    isEmpth.value = allData.value.length === 0;
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
//-------------------
</script>
<template>
  <table class="tableDatadiv" v-if="isEmpth == false">
    <thead class="theadDiv">
      <tr class="trowforheaad">
        <th>رقم الصف</th>
        <th class="dateth">تاريخ التذكرة</th>
        <th>رقم التذكرة</th>
        <th>زمن التذكرة</th>
        <th>حالة التذكرة</th>
      </tr>
    </thead>
    <tbody class="mask" id="tbodycs">
      <tr
        :id="data.ticketnumber.toString()"
        class="tbodycs"
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
.tableDatadiv {
  width: 85vw;
  border-collapse: collapse;
  table-layout: fixed;
  border-radius: 0.8vw;
  overflow: hidden;
  min-height: 100vh;
  margin: auto;
  margin-top: 2vh;
  margin-bottom: 2vh;
}

.theadDiv {
  background: #414242;
  color: #fff;
}

.trowforheaad {
  height: 6vh;
  font-size: 1vw;
  font-weight: 800;
  margin: auto;
  font-size: 0.9rem;
  font-weight: 900;
  text-align: center;
  padding: 0.8vh 0.5vw;
}

.tableDatadiv td {
  padding: 0.8vh 0.5vw;
  text-align: center;
  margin: auto;
  font-size: 1rem;
  font-weight: 900;
  height: 6vh;
}

.tbodycs:hover {
  transform: translateY(-0.2vw);
  transition: 1.2s;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.151);
  cursor: pointer;
}

@media (max-width: 190px) {
  .dateth {
    display: none;
  }
  .date {
    display: none;
  }
}
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

@media (min-width: 768px) and (max-width: 991px) {
  .tableDatadiv {
    width: 92vw;
    font-size: 1rem;
    font-weight: bold;
  }
}

@media (min-width: 1600px) {
  .tableDatadiv {
    width: 70vw;
    font-size: 1rem;
    font-weight: bold;
  }
}
</style>
