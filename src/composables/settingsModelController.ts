import SystemSettings from "@/components/SettingsContainer/Modal/SystemSettings.vue";
import {
  API_MODEL_KEY,
  SELECT_MODEL_KEY,
  SYSTEM_PROMPT_KEY,
} from "@/shared/modalSettings.constants";
import { injectSettingsStore } from "@/store/Settings.provide";
import { cookieController } from "@/utils/Cookie";
import { getModalById } from "@/utils/Modal";
import { shallowRef, type Component } from "vue";

export const SETTINGS_MODAL_KEY = "$settings-modal-key";

export function settingsModelController() {
  const { systemPrompt, selectModel, apiModelKey } = injectSettingsStore();

  const { setCookie } = cookieController();

  const settingsModal = getModalById(SETTINGS_MODAL_KEY);

  const bodyModel = shallowRef<Component>(SystemSettings);

  const openModal = () => settingsModal.setState(true);
  const closeModal = () => settingsModal.setState(false);

  const setBodyModal = (body: Component) => {
    bodyModel.value = body;
  };

  const saveSystemSettings = () => {
    systemPrompt.current = systemPrompt.temp;
    localStorage.setItem(SYSTEM_PROMPT_KEY, systemPrompt.current);
  };

  const saveModelSettings = () => {
    selectModel.current = selectModel.temp;
    apiModelKey.current = apiModelKey.temp;

    localStorage.setItem(SELECT_MODEL_KEY, String(selectModel.current.key));
    setCookie(API_MODEL_KEY, apiModelKey.current, {
      secure: true,
      sameSite: "Lax",
    });
  };

  const updateData = () => {
    const updates = [
      [systemPrompt, systemPrompt],
      [selectModel, selectModel],
      [apiModelKey, apiModelKey],
    ];

    updates.forEach(([ref]) => {
      if (ref.current !== ref.temp) {
        ref.temp = ref.current;
      }
    });
  };

  return {
    bodyModel,
    openModal,
    closeModal,
    setBodyModal,
    saveSystemSettings,
    saveModelSettings,
    updateData,
  };
}
