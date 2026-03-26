<script setup lang="ts">
// import { ref } from 'vue'
import basaadlogo from "@/assets/photos/Basaad_logo.svg";
// import axios from 'axios'
// import { useUserStore } from '../stores/userStore'

const userName = ref<string>();
const email = ref<string>();
const passwd = ref<number>();

const postData = async () => {
  try {
    const response = await $fetch("/Endpoint/users", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        user: userName.value,
        passwd: passwd.value,
        email: email.value,
      },
    });
    console.log(response);
  } catch (err) {
    console.error(`error messag ${err}`);
  }
};
</script>
<template>
  <main class="main">
    <div class="mainDiv">
      <div class="logoImgDiv">
        <img :src="basaadlogo" alt="BasaadLogo" class="logoImg" />
      </div>
      <form class="userDataForm">
        <div class="userNameDiv">
          <h4 class="userNameText">اسم المستخدم</h4>
          <input
            type="text"
            class="userNameInpute"
            required
            v-model="userName"
          />
        </div>
        <div class="userPasswdDiv">
          <h4 class="passwdUserNAmeText">البريد الإلكتروني</h4>
          <input
            type="email"
            class="passwdUserInput"
            required
            v-model="email"
          />
        </div>
        <div class="userPasswdDiv">
          <h4 class="passwdUserNAmeText">الرمز السري</h4>
          <input
            type="password"
            class="passwdUserInput"
            required
            v-model="passwd"
          />
        </div>
        <div class="btnLoging">
          <button type="submit" class="btnLoginBTN" @click="postData">
            تسجيل
          </button>
        </div>
      </form>
      <div class="noAccountDiv">
        <NuxtLink class="noAccountLink" to="/">
          العودة الى تسجيل الدخول</NuxtLink
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
  background: rgba(255, 235, 205, 0.801);
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
      .userNameInpute:focus,
      .emailInputefornoAccount:hover,
      .emailInputefornoAccount:focus,
      .buttonSenderfornoAccount:hover,
      .buttonSenderfornoAccount:focus,
      .emailInputeforForgitPasswd:hover,
      .emailInputeforForgitPasswd:focus,
      .buttonSenderforForgitPasswd:hover,
      .buttonSenderforForgitPasswd:focus {
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

    // .wrongdiv {
    //   position: relative;
    //   display: flex;
    //   margin: auto;
    //   justify-content: center;
    //   align-items: center;
    //   /* background-color: #2d2da0; */
    //   /* border: red 0.1vw solid; */
    //   width: 25vw;
    //   height: 5vh;
    //   z-index: 1000;
    //   margin-top: -1vw;
    // }

    // .wrongtext {
    //   padding: 0.01px 0.01px 0.01px 0.01px;
    //   font-size: 1.2vw;
    //   font-weight: 900;
    //   position: relative;
    //   display: flex;
    //   margin: auto;
    //   justify-content: center;
    //   align-items: center;
    //   width: 25vw;
    //   height: 2vh;
    //   z-index: 1000;
    // }
    // .emailDivfornoAccount {
    //   display: flex;
    //   position: relative;
    //   /* background: red; */
    //   width: 30vw;
    //   height: 10vh;
    //   justify-content: center;
    //   align-items: center;
    //   /* margin-top: 1vh; */
    //   /* top:10vh; */
    //   /* top: -6vh; */
    //   flex-direction: column;
    //   margin-bottom: 1vh;
    // }

    // .emailTextfornoAccount {
    //   display: flex;
    //   position: relative;
    //   /* background: yellow; */
    //   width: 30vw;
    //   height: 3vh;
    //   direction: rtl;
    //   font-size: 1.3vw;
    //   margin-bottom: 1.2vw;
    //   color: white;
    //   top: 0vh;
    // }

    // .emailInputefornoAccount {
    //   display: flex;
    //   position: relative;
    //   background: #9eadac;
    //   width: 30vw;
    //   height: 5vh;
    //   border: none;
    //   border-radius: 0.3vw;
    //   text-align: start;
    //   direction: rtl;
    //   padding-right: 1vw;
    //   font-size: 1vw;
    // }

    // .buttonSenderfornoAccount {
    //   display: flex;
    //   position: relative;
    //   background: #9eadac;
    //   border: none;
    //   padding: 1vw;
    //   cursor: pointer;
    //   border-radius: 0.5vw 0.5vw 0.5vw 0.5vw;
    //   width: 15vw;
    //   height: 7vh;
    //   justify-content: center;
    //   align-items: center;
    //   font-size: 1.5vw;
    //   font-weight: 900;
    //   color: white;
    // }

    // /*    --*/

    // .emailDivforForgitPasswd {
    //   display: flex;
    //   position: relative;
    //   /* background: red; */
    //   width: 30vw;
    //   height: 25vh;
    //   justify-content: center;
    //   align-items: center;
    //   top: 0vh;
    //   /* top: -6vh; */
    //   flex-direction: column;
    // }

    // .emailTextforForgitPasswd {
    //   display: flex;
    //   position: relative;
    //   /* background: yellow; */
    //   width: 30vw;
    //   height: 5vh;
    //   direction: rtl;
    //   font-size: 1.3vw;
    //   top: 0vh;
    //   color: white;
    // }

    // .emailInputeforForgitPasswd {
    //   display: flex;
    //   position: relative;
    //   background: #9eadac;
    //   width: 30vw;
    //   height: 5vh;
    //   border: none;
    //   border-radius: 0.3vw;
    //   text-align: start;
    //   direction: rtl;
    //   padding-right: 1vw;
    //   font-size: 1vw;
    //   /* top: 5vh; */
    //   margin: 1vh;
    // }

    // .buttonSenderforForgitPasswd {
    //   display: flex;
    //   position: relative;
    //   background: #9eadac;
    //   border: none;
    //   padding: 1vw;
    //   cursor: pointer;
    //   border-radius: 0.5vw 0.5vw 0.5vw 0.5vw;
    //   width: 10vw;
    //   height: 5vh;
    //   justify-content: center;
    //   align-items: center;
    //   font-size: 1.5vw;
    //   font-weight: 900;
    //   color: white;
    //   margin-top: 1vh;
    //   /* top: 15vh; */
    // }

    // .emailInputeforForgitPasswd:focus,
    // .emailInputefornoAccount:focus {
    //   border: none;
    //   outline-style: none;
    //   direction: rtl;
    //   padding-right: 1vw;
    //   color: white;
    //   font-size: 1vw;
    //   font-weight: 900;
    // }
  }
}
</style>
