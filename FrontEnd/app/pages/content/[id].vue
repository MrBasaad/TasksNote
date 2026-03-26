<script setup lang="ts">
// import ToogleToShowBurger from "../../components/ToogleToShowBurger.vue";
// import ToogleToTop from "../../components/ToogleToTop.vue";
// import { ref, onMounted } from "vue";
// import { useUserStore } from "../../stores/userStore";
// import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
// import axios from "axios";
//--------------------------
interface Row {
  [key: string]: any;
}

const userStore = useUserStore();
// const router = useRouter();
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
.main {
  width: 100vw;
  min-height: 100vh;
  background: darkcyan;
}
.headersdiv {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 12vh;
  margin: auto;
}

.navcs {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 12vh;
  margin: auto;
}

.invoNumberDiv {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 6vh;
  background: #414242;
  border-radius: 1vw;
  left: 3vw;
  color: #fff;
}
.invonumberdata {
}

.editOrSaveVtnDiv {
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 6vh;
}

.editbtn {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 8vw;
  height: 6vh;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0vh 0.5vw;
  background: #414242;
  border-radius: 1vw;
  color: #fff;
}

.savebtn {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 8vw;
  height: 6vh;
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  margin: 0vh 0.5vw;
  background: #414242;
  border-radius: 1vw;
  color: #fff;
}

.maintablediv {
  display: flex;
  flex-direction: column;
  width: 100vw;
  align-items: center;
  margin: auto;
  margin-top: 1vw;
  direction: rtl;
}

.tableDatadiv {
  border-collapse: collapse;
  table-layout: fixed;
  width: 80vw;
  margin-top: 2vh;
}

.theadDiv {
  background-color: #414242;
  color: white;
}
.tableDatadiv th,
.tableDatadiv td {
  text-align: center;
  padding: 0.5vh 0.5vw;
}

.trowforheaad {
  border-collapse: collapse;
  table-layout: fixed;
  height: 5.5vh;
  font-size: 0.95em;
  font-weight: 800;
  text-align: center;
}
.rownumhd {
}
.datehd {
  width: 7.5vw;
}
.texthead {
  /* background-color: aliceblue; */
  width: 50vw;
  margin: auto;
  justify-content: center;
  align-items: center;
}
.tikettimehd {
  /* background: indigo; */
  /* display: flex; */
  position: relative;
  width: 7.5vw;
  justify-content: center;
  align-items: center;
  margin: auto;
  /* background: #000; */
}

.tbodycs {
  border-collapse: collapse;
  table-layout: fixed;
  display: table-row;
  margin: auto;

  // margin-top: 1.5vh;
}
.tbodycs:hover {
  background: #414242;
  border-radius: 1vw;
}

.rownumtd {
  display: table-cell;
  text-align: center;
  border-collapse: collapse;
}
.datetd * {
  width: 7.5vw;
  display: table-cell;
  text-align: center;
  border-collapse: collapse;
}

.dateput {
  border: none;
  background-color: transparent;
  font-weight: bold;
  outline: none;
  text-align: center;
}
.inputediv {
  /* background: aqua; */
  width: 50vw;
  position: relative;
  margin: auto;
  height: 6vh;
  justify-content: center;
  align-items: center;
}

.inputtaske {
  display: flex;
  position: relative;
  margin: auto;
  width: 50vw;
  height: 6vh;
  background-color: transparent;
  border: none;
  outline: none;
  overflow: hidden;
  resize: none;
  font-size: 1vw;
  font-weight: 900;
  justify-content: center;
  align-items: center;
  padding: 1vw;
}

.radios {
  width: 7.5vw;
  display: table-cell;
  text-align: center;
  border-collapse: collapse;
}
.bigdiv {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background: #000; */
  /* max-width: 7.5vw; */
  width: 7.5vw;
}

.bigdiv div {
  display: flex;
  flex-direction: column;
  margin: 0vh 1vw;
}

tr,
td {
  width: 7.5vw;
}
.donediv {
  display: table-cell;
  text-align: center;
  border-collapse: collapse;
}
.donept {
  display: table-cell;
  text-align: center;
  border-collapse: collapse;
}
</style>
