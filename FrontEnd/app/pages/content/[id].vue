<script setup lang="ts">
import { useRoute } from "vue-router";
//--------------------------
interface Row {
  [key: string]: any;
}
const userStore = useUserStore();
const route = useRoute();
const datas = ref<Row[]>([]);
const isReadOnly = ref(true);
//--------------------------
const fetchingUpdatedData = async () => {
  const response = await $fetch("/Endpoint/getrowdata", {
    method: "POST",
    credentials: "include",
    body: {
      idtecketrfr: route.params.id,
    },
  });
  return (datas.value = response);
};
const editAble = async () => {
  isReadOnly.value = !isReadOnly.value;
  if (isReadOnly.value) {
    const formattedRows = datas.value.map((row: Row) => {
      return {
        userid: row.iduserfr,
        ticketid: row.ticketnumber,
        rowid: row.rownum,
        rowdate: row.rowdate,
        rowdata: row.rowtexttacket,
        timeformession: row.timefortecket,
        isDone: Boolean(row.doneornot),
      };
    });
    const response = await $fetch("/Endpoint/tecketrow", {
      method: "PUT",
      credentials: "include",
      body: {
        rows: formattedRows,
      },
    });
    await fetchingUpdatedData();
  }
};
const deleteTicket = async () => {
  const response = await $fetch("/Endpoint/tecketrow", {
    method: "DELETE",
    credentials: "include",
    body: { teckitnum: route.params.id },
  });
  const data = await response;
  if (data) {
    navigateTo(data.path);
  } else {
    console.error(data.message);
  }
};
//--------------------------
onMounted(async () => {
  const response = await $fetch("/Endpoint/getrowdata", {
    method: "POST",
    credentials: "include",
    body: {
      idtecketrfr: route.params.id,
    },
  });
  datas.value = response;
  //-----------------------
});
//------------------------------
</script>
<template>
  <div class="main">
    <header class="headersdiv">
      <nav class="navcs">
        <div class="invoNumberDiv">
          <p class="invonumberdata">{{ route.params.id }}</p>
        </div>
        <div class="editOrSaveVtnDiv">
          <button type="button" class="editbtn" @click="editAble">
            {{ isReadOnly ? "تعديل" : "حفظ" }}
          </button>
          <button class="savebtn" @click="deleteTicket">حذف</button>
        </div>
        <ToogleToShowBurger />
      </nav>
    </header>
    <main class="maintablediv">
      <table class="tableDatadiv">
        <thead class="theadDiv">
          <tr class="trowforheaad">
            <th class="rownumhd">رقم الصف</th>
            <th class="datehd">التاريخ</th>
            <th class="texthead" id="texthead">نص المهمة</th>
            <th class="tikettimehd">زمن التذكرة</th>
            <th>تم / لم يتم</th>
          </tr>
        </thead>
        <tbody class="mask">
          <tr class="tbodycs ks" v-for="(data, index) in datas" :key="index">
            <td class="rownumtd">{{ index + 1 }}</td>
            <td class="datetd">
              <input
                type="text"
                name="dateput"
                class="dateput"
                placeholder="YYYY-MM-DD"
                :value="new Date(data.rowdate).toLocaleDateString()"
                readonly
              />
            </td>
            <td class="inputediv">
              <textarea
                name="taskText"
                class="inputtaske"
                wrap="soft"
                required
                :readonly="isReadOnly"
                v-model="data.rowtexttacket"
              ></textarea>
            </td>
            <td class="radios">
              <div class="bigdiv">
                <div>
                  <label :for="'Day-' + (index + 1)"> D</label>
                  <input
                    type="radio"
                    v-model="data.timefortecket"
                    value="Day"
                    :id="'Day-' + (index + 1)"
                    :disabled="isReadOnly"
                  />
                </div>
                <div>
                  <label :for="'Mounth-' + (index + 1)"> M</label>
                  <input
                    type="radio"
                    v-model="data.timefortecket"
                    value="Mounth"
                    :id="'Mounth-' + (index + 1)"
                    :disabled="isReadOnly"
                  />
                </div>
                <div>
                  <label :for="'Year-' + (index + 1)">Y</label>
                  <input
                    type="radio"
                    v-model="data.timefortecket"
                    value="Year"
                    :id="'Year-' + (index + 1)"
                    :disabled="isReadOnly"
                  />
                </div>
              </div>
            </td>
            <td class="donediv">
              <input
                type="checkbox"
                v-model="data.doneornot"
                :disabled="isReadOnly"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </main>
    <ToogleToTop />
  </div>
</template>

<style lang="scss" scoped>
// .main {
//   background: darkcyan;
// }
// .headersdiv {
//   display: flex;
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
// }
// .navcs {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
// }
// .invoNumberDiv {
//   display: flex;
//   position: absolute;
//   justify-content: center;
//   align-items: center;
//   background: #414242;
//   color: #fff;
// }
// // .invonumberdata {
// // }
// .editOrSaveVtnDiv {
//   display: flex;
//   position: absolute;
//   justify-content: center;
//   align-items: center;
// }
// .editbtn {
//   display: flex;
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   background-color: transparent;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   background: #414242;
//   border-radius: 1vw;
//   color: #fff;
// }
// .savebtn {
//   display: flex;
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   background-color: transparent;
//   outline: none;
//   border: none;
//   cursor: pointer;
//   background: #414242;
//   color: #fff;
// }
// .maintablediv {
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin: auto;
//   direction: rtl;
// }
// .tableDatadiv {
//   border-collapse: collapse;
//   table-layout: fixed;
// }
// .theadDiv {
//   background-color: #414242;
//   color: white;
// }
// .tableDatadiv th,
// .tableDatadiv td {
//   text-align: center;
// }
// .trowforheaad {
//   border-collapse: collapse;
//   table-layout: fixed;
//   text-align: center;
// }
// // .rownumhd {
// // }
// // .datehd {
// //   width: 7.5vw;
// // }
// .texthead {
//   margin: auto;
//   justify-content: center;
//   align-items: center;
// }
// .tikettimehd {
//   position: relative;
//   justify-content: center;
//   align-items: center;
//   margin: auto;
// }
// .tbodycs {
//   border-collapse: collapse;
//   table-layout: fixed;
//   display: table-row;
//   margin: auto;
// }
// .tbodycs:hover {
//   background: #414242;
// }
// .rownumtd {
//   display: table-cell;
//   text-align: center;
//   border-collapse: collapse;
// }
// .datetd * {
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
//   position: relative;
//   margin: auto;
//   justify-content: center;
//   align-items: center;
// }
// .inputtaske {
//   display: flex;
//   position: relative;
//   margin: auto;
//   background-color: transparent;
//   border: none;
//   outline: none;
//   overflow: hidden;
//   resize: none;
//   justify-content: center;
//   align-items: center;
// }
// .radios {
//   display: table-cell;
//   text-align: center;
//   border-collapse: collapse;
// }
// .bigdiv {
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }
// .bigdiv div {
//   display: flex;
//   flex-direction: column;
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
//   .main {
//     width: 100vw;
//     min-height: 100vh;
//   }
//   .headersdiv {
//     width: 100vw;
//     height: 12vh;
//   }
//   .navcs {
//     width: 100vw;
//     height: 12vh;
//   }
//   .invoNumberDiv {
//     width: 20vw;
//     height: 6vh;
//     border-radius: 1vw;
//     left: 3vw;
//   }
//   // .invonumberdata {
//   // }
//   .editOrSaveVtnDiv {
//     width: 20vw;
//     height: 6vh;
//   }
//   .editbtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .savebtn {
//     width: 8vw;
//     height: 6vh;
//     margin: 0vh 0.5vw;
//     border-radius: 1vw;
//   }
//   .maintablediv {
//     width: 100vw;
//     margin-top: 1vw;
//   }
//   .tableDatadiv {
//     width: 80vw;
//     margin-top: 2vh;
//   }
//   .tableDatadiv th,
//   .tableDatadiv td {
//     padding: 0.5vh 0.5vw;
//   }
//   .trowforheaad {
//     height: 5.5vh;
//     font-size: 0.95em;
//     font-weight: 800;
//   }
//   // .rownumhd {
//   // }
//   .datehd {
//     width: 7.5vw;
//   }
//   .texthead {
//     width: 50vw;
//   }
//   .tikettimehd {
//     width: 7.5vw;
//   }
//   .tbodycs:hover {
//     border-radius: 1vw;
//   }
//   .datetd * {
//     width: 7.5vw;
//   }
//   .inputediv {
//     width: 50vw;
//     height: 6vh;
//   }
//   .inputtaske {
//     width: 50vw;
//     height: 6vh;
//     font-size: 1vw;
//     font-weight: 900;
//     padding: 1vw;
//   }
//   .radios {
//     width: 7.5vw;
//   }
//   .bigdiv {
//     width: 7.5vw;
//   }
//   .bigdiv div {
//     margin: 0vh 1vw;
//   }
//   tr,
//   td {
//     width: 7.5vw;
//   }
// }
// @media (min-width: 1920px) {
// }

//--------------------------------------------------
.main {
  width: 100vw;
  min-height: 100vh;
  background: darkcyan;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ================= HEADER ================= */

.headersdiv {
  width: 100vw;
  height: 12vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navcs {
  width: 95vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* invoice */

.invoNumberDiv {
  position: absolute;
  left: 1vw;
  width: 18vw;
  height: 6vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #414242;
  color: #fff;

  border-radius: 0.8vw;
  font-size: 1.1vw;
  font-weight: bold;
}

/* buttons */

.editOrSaveVtnDiv {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;
}

.editbtn,
.savebtn {
  width: 8vw;
  height: 6vh;

  border: none;
  outline: none;
  cursor: pointer;

  border-radius: 0.8vw;

  background: #414242;
  color: #fff;

  font-size: 1vw;
  font-weight: bold;

  transition: 0.2s;
}

.editbtn:hover,
.savebtn:hover {
  background: #2b2c2c;
}

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

/* ================= MOBILE ================= */

@media (max-width: 767px) {
  .invoNumberDiv {
    width: fit-content;
    font-size: 3vw;
    padding: 0vh 2.5vw;
  }

  .editbtn,
  .savebtn {
    width: 22vw;
    height: 6vh;
    font-size: 3vw;
  }

  .tableDatadiv {
    width: 96vw;
  }

  .trowforheaad {
    font-size: 2.8vw;
  }

  .inputtaske {
    font-size: 3vw;
  }
  .datehd {
    display: none;
  }
  .datetd {
    display: none;
  }
  .dateput {
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
