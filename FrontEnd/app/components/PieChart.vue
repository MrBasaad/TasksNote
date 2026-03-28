<script setup lang="ts">
// import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  Chart,
  type ChartItem,
  PieController,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
//-------------------------
// تسجيل العناصر المطلوبة

const userStore = useUserStore();
const pieChart = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart<"pie", number[], string> | null = null;
const datatrue = ref<number>(0);
const datafalse = ref<number>(0);

//----------------------

//-------------------------
const getdatacountDone = async () => {
  try {
    const response = await $fetch("/Endpoint/counttrue", {
      method: "POST",
      credentials: "include",
    });
    datatrue.value = await parseInt(response.donedata[0].count);
    datafalse.value = await parseInt(response.notdonedata[0].count);
  } catch (e) {
    console.error(e);
  }
};

//--------
onMounted(async () => {
  await getdatacountDone();
  Chart.register(PieController, ArcElement, Tooltip, Legend);
  if (pieChart.value) {
    chartInstance = new Chart(pieChart.value as ChartItem, {
      type: "pie",
      data: {
        labels: ["فارغ", "لم يتم", "تم"],
        datasets: [
          {
            label: "احصائية المهام",
            data: [
              datafalse.value == 0 && datatrue.value == 0 ? 100 : 0,
              datatrue.value ?? 0,
              datafalse.value ?? 0,
            ],
            backgroundColor: [
              "rgb(0, 0, 0)",
              "rgb(255, 0, 0)",
              "rgb(0, 255, 0)",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "white",
              font: {
                size: 16,
                family: "Times New Roman, Times, serif",
                weight: "bolder",
              },
            },
          },
        },
      },
      //---
    });
  }
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>
<template>
  <div class="maindiv">
    <canvas ref="pieChart"></canvas>
  </div>
</template>
<style lang="scss" scoped>
.maindiv {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100vw;
  height: 35vh;
  margin-bottom: 0.5vh;
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
