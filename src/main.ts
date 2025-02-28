import { createApp } from "vue";
import "@/assets/basic/index.scss";
import App from "./App.vue";
import ModalPlugin from "@/plugins/Modal";

createApp(App).use(ModalPlugin).mount("#app");
