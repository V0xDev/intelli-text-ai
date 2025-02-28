import { initializeModals, InitializeModalsOptions } from "@/utils/Modal";
import { App } from "vue";

const ModalPlugin = {
  install(_app: App, options?: Partial<InitializeModalsOptions>) {
    initializeModals(options);
  },
};

export default ModalPlugin;
