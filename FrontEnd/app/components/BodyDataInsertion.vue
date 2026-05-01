<script setup lang="ts">
// import { ref } from 'vue'
// import { useUserStore } from '../stores/userStore'
//--------------------------
const userStore = useUserStore();
const props = defineProps({
  lastnewTicketNumber: {},
});

const rowCounter = ref(1);
const isRunning = ref(true);
const date = ref();
const tikNum = ref();
date.value = new Date(Date.now()).toISOString().split("T")[0];
tikNum.value = props.lastnewTicketNumber;
const newLine = ref([
  {
    userid: userStore.id,
    ticketid: tikNum.value,
    rowid: rowCounter.value,
    rowdate: date.value,
    rowdata: undefined,
    timeformession: undefined,
    isDone: false,
  },
]);
//----------------------

//-----------------------

const vFocus = {
  mounted: (el: HTMLElement) => {
    el.focus();
  },
};
//----
defineExpose({
  lines: newLine.value,
});

const addNewRow = () => {
  while (isRunning) {
    rowCounter.value++;
    newLine.value.push({
      userid: userStore.id,
      ticketid: tikNum.value,
      rowid: rowCounter.value,
      rowdate: date.value,
      rowdata: undefined,
      timeformession: undefined,
      isDone: false,
    });
    break;
  }
};
//--------------
//---------
</script>
<template>
  <tbody>
    <tr class="tbodycs" v-for="(row, index) in newLine" :key="index">
      <td class="rownumtd" :v-model="row.ticketid = props.lastnewTicketNumber">
        {{ row.rowid }}
      </td>
      <!-- <input hidden  /> -->
      <td class="datetd">
        <input
          type="text"
          name="dateput"
          class="dateput"
          placeholder="YYYY-MM-DD"
          v-model="row.rowdate"
        />
      </td>
      <td class="inputediv">
        <input
          name="taskText"
          class="inputtaske"
          wrap="soft"
          required
          v-focus
          v-model.trim="row.rowdata"
        />
      </td>
      <td class="radios">
        <div class="bigdiv">
          <div>
            <label :for="'Day-' + row.rowid"> D</label>
            <input
              type="radio"
              :name="'Time-' + row.rowid"
              value="Day"
              class="Day"
              :id="'Day-' + row.rowid"
              required
              v-model="row.timeformession"
            />
          </div>
          <div>
            <label :for="'Mounth-' + row.rowid"> M</label>
            <input
              type="radio"
              :name="'Time-' + row.rowid"
              value="Mounth"
              class="Mounth"
              :id="'Mounth-' + row.rowid"
              required
              v-model="row.timeformession"
            />
          </div>
          <div>
            <label :for="'Year-' + row.rowid">Y</label>
            <input
              type="radio"
              :name="'Time-' + row.rowid"
              value="Year"
              class="Year"
              :id="'Year-' + row.rowid"
              required
              v-model="row.timeformession"
            />
          </div>
        </div>
      </td>
      <td class="donediv">
        <input
          type="checkbox"
          name="donept"
          class="donept"
          v-model="row.isDone"
          @blur="addNewRow"
        />
      </td>
      <!-- </div> -->
    </tr>
  </tbody>
</template>
<style scoped lang="scss">
// .tbodycs {
//   border-collapse: collapse;
//   table-layout: fixed;
//   display: table-row;
//   margin: auto;

//   // margin-top: 1.5vh;
// }
// .tbodycs:hover {
//   background: #414242;
//   border-radius: 1vw;
// }

// .rownumtd {
//   display: table-cell;
//   text-align: center;
//   border-collapse: collapse;
// }
// .datetd * {
//   width: 7.5vw;
//   display: table-cell;
//   text-align: center;
//   border-collapse: collapse;
// }

// .dateput {
//   border: none;
//   background-color: transparent;
//   font-weight: bold;
//   outline: none;
//   text-align: center;
// }
// .inputediv {
//   /* background: aqua; */
//   width: 50vw;
//   position: relative;
//   margin: auto;
//   height: 6vh;
//   justify-content: center;
//   align-items: center;
// }

// .inputtaske {
//   display: flex;
//   position: relative;
//   margin: auto;
//   width: 50vw;
//   height: 6vh;
//   background-color: transparent;
//   border: none;
//   outline: none;
//   overflow: hidden;
//   resize: none;
//   font-size: 1vw;
//   font-weight: 900;
//   justify-content: center;
//   align-items: center;
//   padding: 1vw;
//   color: white;
// }

// .radios {
//   width: 7.5vw;
//   display: table-cell;
//   text-align: center;
//   border-collapse: collapse;
// }
// .bigdiv {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   /* background: #000; */
//   /* max-width: 7.5vw; */
//   width: 7.5vw;
// }

// .bigdiv div {
//   display: flex;
//   flex-direction: column;
//   margin: 0vh 1vw;
// }

// tr,
// td {
//   width: 7.5vw;
// }
// .donediv {
//   display: table-cell;
//   text-align: center;
//   border-collapse: collapse;
// }
// .donept {
//   display: table-cell;
//   text-align: center;
//   border-collapse: collapse;
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

/* ================= TABLE ================= */

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

.rownumhd,
.rownumtd {
  width: 5vw;
}

.datehd,
.datetd * {
  width: 8vw;
}

.texthead,
.inputediv {
  width: 50vw;
}

.tikettimehd,
.radios {
  width: 10vw;
}

.donediv {
  width: 5vw;
}

/* ================= INPUTS ================= */

.dateput {
  width: 100%;
  border: none;
  background: transparent;
  text-align: center;
  font-weight: bold;
  outline: none;
}

.inputtaske {
  width: 100%;
  height: 6vh;

  border: none;
  outline: none;
  resize: none;

  background: transparent;

  font-size: 1vw;
  font-weight: 600;

  padding: 0.5vw;
  line-height: 1.4;
}

/* radios */

.bigdiv {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
}

.bigdiv div {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sendBTN {
  display: flex;
  position: fixed;
  margin: auto;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  cursor: pointer;
  outline: none;
  border: none;
  background: #414242;
  color: #fff;
}
.sendBTN {
  margin-bottom: 6vh;
  bottom: 0vh;
  left: 0vw;
  margin-left: 1vw;
  width: 10vw;
  height: 5vh;
  z-index: 1000;
  border-radius: 1vw;
}
/* ================= MOBILE ================= */

@media (max-width: 767px) {
  .invoNumberDiv {
    width: fit-content;
    font-size: 0.75rem;
    padding: 0vh 2.5vw;
  }

  .tableDatadiv {
    width: 96vw;
  }

  .trowforheaad {
    font-size: 2.8vw;
  }
  .inputtaske {
    font-size: 1rem;
  }
  .datetd {
    display: none;
  }
}

/* ================= TABLET ================= */

@media (min-width: 768px) and (max-width: 991px) {
  .tableDatadiv {
    width: 92vw;
  }

  .inputtaske {
    font-size: 1.8vw;
  }
}

/* ================= LARGE SCREENS ================= */

@media (min-width: 1600px) {
  .tableDatadiv {
    width: 70vw;
  }

  .inputtaske {
    font-size: 0.9vw;
  }
}
</style>
