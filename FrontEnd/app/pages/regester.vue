<script setup lang="ts">
// import { ref } from 'vue'
import basaadlogo from "@/assets/photos/Basaad_logo.svg";
// import axios from 'axios'
// import { useUserStore } from '../stores/userStore'

const userName = ref<string>();
const email = ref<string>();
const passwd = ref<number>();
const { isNullable } = notNullFeild(userName, passwd, email);

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
  justify-content: center;
  align-items: center;
  .mainDiv {
    display: flex;
    position: absolute;
    background-color: #414242;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .logoImgDiv {
      display: flex;
      position: relative;
      background: #9eadac;
      align-items: center;
      justify-content: center;
      .logoImg {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
    .userDataForm {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      .userNameDiv {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .userNameText {
          display: flex;
          position: relative;
          direction: rtl;
          color: white;
        }
        .userNameInpute {
          display: flex;
          position: relative;
          background: #9eadac;
          border: none;
          text-align: start;
          direction: ltr;
        }
        .userNameInpute:focus {
          border: none;
          outline-style: none;
          color: white;
        }
      }
      .userPasswdDiv {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .passwdUserNAmeText {
          display: flex;
          position: relative;
          direction: rtl;
          color: white;
        }
        .passwdUserInput {
          display: flex;
          position: relative;
          background: #9eadac;
          border: none;
          text-align: start;
          direction: ltr;
        }
        .passwdUserInput:focus {
          border: none;
          outline-style: none;
          color: white;
        }
      }
      .btnLoging {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        .btnLoginBTN {
          display: flex;
          position: relative;
          background: #9eadac;
          border: none;
          cursor: pointer;
          justify-content: center;
          align-items: center;
          color: white;
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
      justify-content: center;
      align-items: center;
      .noAccountLink {
        display: flex;
        text-decoration: none;
        color: white;
        cursor: pointer;
      }
    }
    .forgetPasswdDiv {
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      .forgetPasswdLink {
        display: flex;
        text-decoration: none;
        color: white;
        cursor: pointer;
      }
    }
    .noAccountLink:hover,
    .forgetPasswdLink:hover {
      color: blue;
    }
  }
}

@media (max-width: 767px) {
  .main {
    width: 100vw;
    height: 100vh;
    .mainDiv {
      width: 70vw;
      height: 90vh;
      border-radius: 1.5vw;
      .logoImgDiv {
        width: 60vw;
        height: 35vh;
        border-radius: 1vw;
        margin: 4vh;
        .logoImg {
          width: 60vw;
          height: 16vh;
        }
      }
      .userDataForm {
        width: 60vw;
        height: 50vh;
        margin: 2vh;
        .userNameDiv {
          width: 60vw;
          height: 10vh;
          margin: 1vh;
          top: 0vh;
          .userNameText {
            width: 60vw;
            height: 3vh;
            font-size: 0.75rem;
            margin-bottom: 1.2vw;
          }
          .userNameInpute {
            width: 60vw;
            height: 5vh;
            border-radius: 0.3vw;
            padding: 1vw;
            font-size: 0.75rem;
          }
          .userNameInpute:focus {
            padding: 1vw;
            font-size: 1vw;
            font-weight: 900;
          }
        }
        .userPasswdDiv {
          width: 60vw;
          height: 10vh;
          margin: 1vh;
          top: 0vh;
          .passwdUserNAmeText {
            width: 60vw;
            height: 3vh;
            font-size: 0.75rem;
            margin-bottom: 1.2vw;
          }
          .passwdUserInput {
            width: 60vw;
            height: 5vh;
            border-radius: 0.3vw;
            padding: 1vw;
            font-size: 0.75rem;
          }
          .passwdUserInput:focus {
            padding: 1vw;
            font-size: 0.75rem;
            font-weight: 900;
          }
        }
        .btnLoging {
          width: 60vw;
          height: 8vh;
          margin: 1vh;
          .btnLoginBTN {
            padding: 1vw;
            border-radius: 1vw;
            width: 25vw;
            height: 6vh;
            font-size: 0.75rem;
            font-weight: 900;
            margin-top: 0.3vh;
          }
        }
      }
      .noAccountDiv {
        width: 60vw;
        height: 8vh;
        top: -1vw;
        .noAccountLink {
          font-size: 0.55rem;
          font-weight: 900;
        }
      }
      .forgetPasswdDiv {
        width: 60vw;
        height: 8vh;
        top: -2vh;
        .forgetPasswdLink {
          font-size: 0.45rem;
          font-weight: 900;
        }
      }
    }
  }
}
@media (min-width: 768px) {
  .main {
    width: 100vw;
    height: 100vh;
    .mainDiv {
      width: 35vw;
      height: 90vh;
      border-radius: 1vw;
      .logoImgDiv {
        width: 25vw;
        height: 30vh;
        border-radius: 1vw;
        margin: 4vh;
        .logoImg {
          width: 25vw;
          height: 15vh;
        }
      }
      .userDataForm {
        width: 30vw;
        height: 50vh;
        margin: 2vh;
        .userNameDiv {
          width: 30vw;
          height: 10vh;
          margin: 1vh;
          top: 0vh;
          .userNameText {
            width: 30vw;
            height: 3vh;
            font-size: 1.3vw;
            margin-bottom: 1.2vw;
          }
          .userNameInpute {
            width: 30vw;
            height: 5vh;
            border-radius: 0.3vw;
            padding: 1vw;
            font-size: 1vw;
          }
          .userNameInpute:focus {
            padding: 1vw;
            font-size: 1vw;
            font-weight: 900;
          }
        }
        .userPasswdDiv {
          width: 30vw;
          height: 10vh;
          margin: 1vh;
          top: 0vh;
          .passwdUserNAmeText {
            width: 30vw;
            height: 3vh;
            font-size: 1.3vw;
            margin-bottom: 1.2vw;
          }
          .passwdUserInput {
            width: 30vw;
            height: 5vh;
            border-radius: 0.3vw;
            padding: 1vw;
            font-size: 1vw;
          }
          .passwdUserInput:focus {
            padding: 1vw;
            font-size: 1vw;
            font-weight: 900;
          }
        }
        .btnLoging {
          width: 30vw;
          height: 8vh;
          margin: 1vh;
          .btnLoginBTN {
            padding: 1vw;
            border-radius: 0.5vw;
            width: 15vw;
            height: 7vh;
            font-size: 1.5vw;
            font-weight: 900;
            margin-top: 0.3vh;
          }
        }
      }
      .noAccountDiv {
        width: 30vw;
        height: 8vh;
        top: -1vw;
        .noAccountLink {
          font-size: 1vw;
          font-weight: 900;
        }
      }
      .forgetPasswdDiv {
        width: 30vw;
        height: 8vh;
        top: -2vh;
        .forgetPasswdLink {
          font-size: 1vw;
          font-weight: 900;
        }
      }
    }
  }
}
</style>
