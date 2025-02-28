import { ButtonAction } from "@/components/ButtonsContainer/ContainerButtons.types";
import { computed, inject, provide, shallowRef } from "vue";

const AREA_STORE_KEY = "$content-store-key";

type AreaStoreProvided = ReturnType<typeof provideAreaStore>;

export function provideAreaStore() {
  let isLoading = shallowRef(false);
  let isError = shallowRef(false);

  const buttonActive = shallowRef<ButtonAction>();

  const aiText = shallowRef("");
  const personText = shallowRef("");

  const prompt = computed(() => buttonActive.value.prompt);

  const toProvide = {
    buttonActive,
    prompt,
    aiText,
    personText,
    isLoading,
    isError,
  };

  provide(AREA_STORE_KEY, toProvide);
  return toProvide;
}

export function injectAreaStore() {
  const store = inject<AreaStoreProvided | undefined>(AREA_STORE_KEY);

  if (!store) {
    console.log("[provide/inject] provideAreaStore not provided!!");
    return;
  }

  return store;
}
