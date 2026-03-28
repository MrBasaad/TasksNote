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
      .userNameInpute:focus {
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
@media (max-width: 480px) {
  .main {
    width: 100vw;
    height: 100vh;
    .mainDiv {
      width: 70vw;
      height: 80vh;
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
@media (min-width: 481px) and (max-width: 767px) {
  .main {
    width: 100vw;
    height: 100vh;
    .mainDiv {
      width: 70vw;
      height: 80vh;
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
@media (min-width: 768px) and (max-width: 991px) {
  .main {
    width: 100vw;
    height: 100vh;
  }
  .mainDiv {
    width: 35vw;
    height: 80vh;
    border-radius: 1vw;
    .logoImgDiv {
      top: 4vh;
      // margin-top: 4vh;
      width: 25vw;
      height: 30vh;
      border-radius: 1vw;
      .logoImg {
        width: 25vw;
        height: 15vh;
      }
    }
    .userDataForm {
      width: 30vw;
      height: 50vh;
      .userNameDiv {
        width: 30vw;
        height: 10vh;
        top: 3vh;
        .userNameText {
          width: 30vw;
          height: 3vh;
          font-size: 1.3vw;
          margin-bottom: 0.5vw;
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
        margin-top: 1vh;
        width: 30vw;
        height: 10vh;
        top: 3vh;
        .passwdUserNAmeText {
          width: 30vw;
          height: 3vh;
          font-size: 1.3vw;
          margin-bottom: 0.5vw;
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
        top: 5vh;
        .btnLoginBTN {
          padding: 1vw;
          border-radius: 0.5vw 0.5vw 0.5vw 0.5vw;
          width: 15vw;
          height: 7vh;
          font-size: 1.5vw;
          font-weight: 900;
          color: white;
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
@media (min-width: 992px) and (max-width: 1199px) {
  .main {
    width: 100vw;
    height: 100vh;
  }
  .mainDiv {
    width: 35vw;
    height: 80vh;
    border-radius: 1vw;
    .logoImgDiv {
      top: 4vh;
      // margin-top: 4vh;
      width: 25vw;
      height: 30vh;
      border-radius: 1vw;
      .logoImg {
        width: 25vw;
        height: 15vh;
      }
    }
    .userDataForm {
      width: 30vw;
      height: 50vh;
      .userNameDiv {
        width: 30vw;
        height: 10vh;
        top: 3vh;
        .userNameText {
          width: 30vw;
          height: 3vh;
          font-size: 1.3vw;
          margin-bottom: 0.5vw;
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
        margin-top: 1vh;
        width: 30vw;
        height: 10vh;
        top: 3vh;
        .passwdUserNAmeText {
          width: 30vw;
          height: 3vh;
          font-size: 1.3vw;
          margin-bottom: 0.5vw;
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
        top: 5vh;
        .btnLoginBTN {
          padding: 1vw;
          border-radius: 0.5vw 0.5vw 0.5vw 0.5vw;
          width: 15vw;
          height: 7vh;
          font-size: 1.5vw;
          font-weight: 900;
          color: white;
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
@media (min-width: 1200px) and (max-width: 1919px) {
  .main {
    width: 100vw;
    height: 100vh;
  }
  .mainDiv {
    width: 35vw;
    height: 80vh;
    border-radius: 1vw;
    .logoImgDiv {
      top: 4vh;
      width: 25vw;
      height: 30vh;
      border-radius: 1vw;
      .logoImg {
        width: 25vw;
        height: 15vh;
      }
    }
    .userDataForm {
      width: 30vw;
      height: 50vh;
      .userNameDiv {
        width: 30vw;
        height: 10vh;
        top: 3vh;
        .userNameText {
          width: 30vw;
          height: 3vh;
          font-size: 1.3vw;
          margin-bottom: 0.5vw;
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
        margin-top: 1vh;
        width: 30vw;
        height: 10vh;
        top: 3vh;
        .passwdUserNAmeText {
          width: 30vw;
          height: 3vh;
          font-size: 1.3vw;
          margin-bottom: 0.5vw;
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
        top: 5vh;
        .btnLoginBTN {
          padding: 1vw;
          border-radius: 0.5vw 0.5vw 0.5vw 0.5vw;
          width: 15vw;
          height: 7vh;
          font-size: 1.5vw;
          font-weight: 900;
          color: white;
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
@media (min-width: 1920px) {
  .main {
    width: 100vw;
    height: 100vh;
  }
  .mainDiv {
    width: 35vw;
    height: 80vh;
    border-radius: 1vw;
    .logoImgDiv {
      top: 4vh;
      // margin-top: 4vh;
      width: 25vw;
      height: 30vh;
      border-radius: 1vw;
      .logoImg {
        width: 25vw;
        height: 15vh;
      }
    }
    .userDataForm {
      width: 30vw;
      height: 50vh;
      .userNameDiv {
        width: 30vw;
        height: 10vh;
        top: 3vh;
        .userNameText {
          width: 30vw;
          height: 3vh;
          font-size: 1.3vw;
          margin-bottom: 0.5vw;
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
        margin-top: 1vh;
        width: 30vw;
        height: 10vh;
        top: 3vh;
        .passwdUserNAmeText {
          width: 30vw;
          height: 3vh;
          font-size: 1.3vw;
          margin-bottom: 0.5vw;
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
        top: 5vh;
        .btnLoginBTN {
          padding: 1vw;
          border-radius: 0.5vw 0.5vw 0.5vw 0.5vw;
          width: 15vw;
          height: 7vh;
          font-size: 1.5vw;
          font-weight: 900;
          color: white;
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
</style>
