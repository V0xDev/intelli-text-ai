import {
  API_MODEL_KEY,
  SELECT_MODEL_KEY,
  SYSTEM_PROMPT_KEY,
} from "@/shared/modalSettings.constants";
import { Models } from "@/shared/models.settings";
import { cookieController } from "@/utils/Cookie";
import { computed, reactive } from "vue";

export function createStoryRef<T>(initialValue?: T) {
  return reactive<{
    current: T | undefined;
    temp: T | undefined;
  }>({
    current: initialValue,
    temp: initialValue,
  });
}

export function settingsStoreUtils() {
  const { getCookie } = cookieController();

  const getSelectModel = computed(() => {
    const ModalId = Number(localStorage.getItem(SELECT_MODEL_KEY));

    if (ModalId !== null || ModalId !== undefined) {
      return Models[ModalId];
    }

    return undefined;
  });

  const getApiModelKey = computed(() => getCookie(API_MODEL_KEY) || "");

  const getSystemPrompt = computed(
    () => localStorage.getItem(SYSTEM_PROMPT_KEY) || ""
  );

  return { getSelectModel, getApiModelKey, getSystemPrompt };
}
