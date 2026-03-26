<script setup lang="ts">
// import basaadlogo from "@/assets/photos/Basaad_logo.svg";
import { notNullFeild } from "~/composables/notNullableFields";
// import { useUserStore } from "@/stores/userStore.ts";

// //-----------
// const router = useRouter();
const userName = ref<string>("");
const passwd = ref<string>("");
const userStore = useUserStore();

// //------------

// //-----------
const singin = async () => {
  try {
    if (notNullFeild(userName.value, passwd.value) === true) {
      console.log("you must enter any data in name and password fields");
      return;
    }
    console.log(userName.value, "  ", passwd.value);
    const response = await $fetch("http://localhost:9009/singin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user: userName.value,
        passwd: passwd.value,
      },
    });
    await userStore.fetchUser();
    await navigateTo(response.redirectPath);
  } catch (err: any) {
    console.error(`Error Message:${err.response?.data || err.message}`);
  }
};
</script>
<template>
  <main class="main">
    <div class="mainDiv">
      <div class="logoImgDiv">
        <img
          src="../assets/photos/Basaad_logo.svg"
          alt="BasaadLogo"
          class="logoImg"
        />
      </div>
      <form class="userDataForm">
        <div class="userNameDiv">
          <h4 class="userNameText">اسم المستخدم</h4>
          <input
            v-model="userName"
            type="text"
            class="userNameInpute"
            required
          />
        </div>
        <div class="userPasswdDiv">
          <h4 class="passwdUserNAmeText">الرمز السري</h4>
          <input
            v-model="passwd"
            type="password"
            class="passwdUserInput"
            required
          />
        </div>
        <div class="btnLoging">
          <button type="button" class="btnLoginBTN" @click="singin">
            تسجيل الدخول
          </button>
        </div>
      </form>
      <div class="noAccountDiv">
        <NuxtLink class="noAccountLink" to="/regester"
          >ليس لديك حساب ؟</NuxtLink
        >
      </div>
      <div class="forgetPasswdDiv">
        <NuxtLink class="forgetPasswdLink" to="/forgetpasswd"
          >نسيت كلمة المرور</NuxtLink
        >
      </div>
    </div>
  </main>
</template>
<style lang="scss" scoped>
.main {
  display: flex;
  position: relative;
  background: rgba(255, 235, 205, 0.801) !important;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  .mainDiv {
    display: flex;
    position: absolute;
    background-color: #414242;
    width: 35vw;
    height: 80vh;
    border-radius: 1vw;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .logoImgDiv {
      /* display: none; */
      display: flex;
      position: relative;
      background: #9eadac;
      width: 25vw;
      height: 30vh;
      align-items: center;
      justify-content: center;
      /* margin: auto; */
      border-radius: 1vw;
      margin: 4vh;

      .logoImg {
        display: flex;
        position: relative;
        /* background-color: aqua; */
        width: 25vw;
        height: 15vh;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }

    .userDataForm {
      display: flex;
      position: relative;
      /* background: yellowgreen; */
      width: 30vw;
      height: 50vh;
      align-items: center;
      justify-content: center;
      margin: 2vh;
      flex-direction: column;
      /* overflow: hidden; */
      /* z-index: 1000; */

      .userNameDiv {
        display: flex;
        position: relative;
        /* background: red; */
        width: 30vw;
        height: 10vh;
        justify-content: center;
        align-items: center;
        margin: 1vh;
        top: 0vh;
        /* top: -6vh; */
        flex-direction: column;

        .userNameText {
          display: flex;
          position: relative;
          /* background: yellow; */
          width: 30vw;
          height: 3vh;
          direction: rtl;
          font-size: 1.3vw;
          margin-bottom: 1.2vw;
          color: white;
        }

        .userNameInpute {
          display: flex;
          position: relative;
          background: #9eadac;
          width: 30vw;
          height: 5vh;
          border: none;
          border-radius: 0.3vw;
          text-align: start;
          direction: ltr;
          padding: 1vw;
          font-size: 1vw;
        }

        .userNameInpute:focus {
          border: none;
          outline-style: none;
          padding: 1vw;
          color: white;
          font-size: 1vw;
          font-weight: 900;
        }
      }

      .userPasswdDiv {
        display: flex;
        position: relative;
        /* background: red; */
        width: 30vw;
        height: 10vh;
        justify-content: center;
        align-items: center;
        margin: 1vh;
        top: 0vh;
        flex-direction: column;

        .passwdUserNAmeText {
          display: flex;
          position: relative;
          /* background: yellow; */
          width: 30vw;
          height: 3vh;
          direction: rtl;
          font-size: 1.3vw;
          margin-bottom: 1.2vw;
          color: white;
        }

        .passwdUserInput {
          display: flex;
          position: relative;
          background: #9eadac;
          width: 30vw;
          height: 5vh;
          border: none;
          border-radius: 0.3vw;
          text-align: start;
          direction: ltr;
          padding: 1vw;
          font-size: 1vw;
        }

        .passwdUserInput:focus {
          border: none;
          outline-style: none;
          padding: 1vw;
          color: white;
          font-size: 1vw;
          font-weight: 900;
        }
      }

      .btnLoging {
        display: flex;
        position: relative;
        /* background: red; */
        width: 30vw;
        height: 8vh;
        justify-content: center;
        align-items: center;
        margin: 1vh;
        flex-direction: column;

        .btnLoginBTN {
          display: flex;
          position: relative;
          background: #9eadac;
          border: none;
          padding: 1vw;
          cursor: pointer;
          border-radius: 0.5vw 0.5vw 0.5vw 0.5vw;
          width: 15vw;
          height: 7vh;
          justify-content: center;
          align-items: center;
          font-size: 1.5vw;
          font-weight: 900;
          color: white;
          margin-top: 0.3vh;
        }
      }

      .btnLoginBTN:hover,
      .passwdUserInput:hover,
      .passwdUserInput:focus,
      .userNameInpute:hover,
      .userNameInpute:focus {
        background: #2d2da0;
      }
    }

    .noAccountDiv {
      display: flex;
      position: relative;
      /* background: red; */
      width: 30vw;
      height: 8vh;
      justify-content: center;
      align-items: center;
      /* margin: 1vh; */
      top: -1vw;

      .noAccountLink {
        display: flex;
        text-decoration: none;
        color: white;
        font-size: 1vw;
        font-weight: 900;
        cursor: pointer;
      }
    }
    .forgetPasswdDiv {
      display: flex;
      position: relative;
      /* background: red; */
      width: 30vw;
      height: 8vh;
      justify-content: center;
      align-items: center;
      /* margin: 1vh; */
      top: -2vh;

      .forgetPasswdLink {
        display: flex;
        text-decoration: none;
        color: white;
        font-size: 1vw;
        font-weight: 900;
        cursor: pointer;
      }
    }

    .noAccountLink:hover,
    .forgetPasswdLink:hover {
      color: blue;
    }
  }
}
</style>
