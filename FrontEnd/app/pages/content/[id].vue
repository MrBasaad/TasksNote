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
const message = ref<string>("");
const trigerPoup = ref<boolean>(false);
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
    trigerPoup.value = true;
    return (message.value = "تم تحديث البيانات");
  }
};
const deleteTicket = async () => {
  const response = await $fetch("/Endpoint/tecketrow", {
    method: "DELETE",
    credentials: "include",
    body: { teckitnum: route.params.id },
  });
  const data = await response;
  trigerPoup.value = true;
  message.value = "تم الحذف";
  if (data) {
    setTimeout(() => {
      navigateTo(data.path);
    }, 2000);
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
watch(trigerPoup, (newValue) => {
  if (newValue === true) {
    setTimeout(() => {
      trigerPoup.value = false;
      message.value = "";
    }, 5000);
  }
});
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
    <div>
      <PoupUp v-if="trigerPoup" :message="message" color="#fff" bg="green" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100vw;
  min-height: 100vh;
  background: darkcyan;
  display: flex;
  flex-direction: column;
  align-items: center;
}

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

.theadDiv {
  background: #414242;
  color: #fff;
}

.trowforheaad {
  height: 6vh;
  font-size: 1vw;
  font-weight: 800;
}

.tableDatadiv th,
.tableDatadiv td {
  padding: 0.8vh 0.5vw;
  text-align: center;
}

.tbodycs:hover {
  background: #f2f2f2;
}

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

@media (min-width: 768px) and (max-width: 991px) {
  .tableDatadiv {
    width: 92vw;
  }

  .inputtaske {
    font-size: 1.8vw;
  }
}

@media (min-width: 1600px) {
  .tableDatadiv {
    width: 70vw;
  }

  .inputtaske {
    font-size: 0.9vw;
  }
}
</style>
