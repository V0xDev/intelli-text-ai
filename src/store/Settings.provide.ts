import { SettingsBotAPI } from "@/composables/fetchAIResponse.types";
import { SelectOption } from "@/shared/components/Select/VSelect.types";
import { createStoryRef, settingsStoreUtils } from "@/utils/SettingsStore";
import { computed, inject, provide, reactive } from "vue";

const SETTINGS_STORE_KEY = "$ai-settings-store-key";

type SettingsStoreProvided = ReturnType<typeof provideSettingsStore>;

export function provideSettingsStore() {
  const { getApiModelKey, getSelectModel, getSystemPrompt } =
    settingsStoreUtils();

  const selectModel = createStoryRef<SelectOption<SettingsBotAPI>>(
    getSelectModel.value
  );
  const apiModelKey = createStoryRef<string>(getApiModelKey.value);
  const systemPrompt = createStoryRef(getSystemPrompt.value);

  const settingsModel = computed(() => selectModel.current.raw);

  const toProvide = {
    apiModelKey,
    selectModel,
    systemPrompt,
    settingsModel,
  };

  provide(SETTINGS_STORE_KEY, toProvide);
  return toProvide;
}

export function injectSettingsStore() {
  const store = inject<SettingsStoreProvided | undefined>(SETTINGS_STORE_KEY);

  if (!store) {
    console.log("[provide/inject] provideSettingsStore not provided!!");
    return;
  }

  return store;
}
