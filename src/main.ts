import { createApp } from "vue";
import "./style.css";
import router from "./plugins/vue-router";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "remixicon/fonts/remixicon.css";
import pinia from "./plugins/pinia/index";
import i18n from "./plugins/vue-i18n/index";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);
app
  .use(vue3GoogleLogin, {
    clientId:
      "299578111137-rvjb7u8ihh8atejo3kjmcteekqt2eb90.apps.googleusercontent.com",
  })
  .use(ElementPlus)
  .use(router)
  .use(pinia)
  .use(i18n)
  .mount("#app");
