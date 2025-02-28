import {
  computed,
  ComputedRef,
  reactive,
  ShallowRef,
  shallowRef,
  UnwrapNestedRefs,
} from "vue";

export type Modal = {
  id: string;
  zIndex: ShallowRef<number>;
  state: ShallowRef<boolean>;
  store: UnwrapNestedRefs<Record<string, unknown>>;
  setState: (value: boolean) => void;
  setIndex: (value: number) => void;
  setStoreValue(key: string, value: unknown): void;
  getStoreValue<T = null>(key: string, defaultValue?: T): ComputedRef<T>;
  getIndexOverlay: ComputedRef<number>;
  getIndexContent: ComputedRef<number>;
};

export interface InitializeModalsOptions {
  containerName: string;
  modalsDefaultIndex: number;
}

const modals = new Map<string, Modal>();

const modalsRootName = shallowRef<string>("");
const modalZIndex = shallowRef<number>(0);

export function initializeModals({
  containerName = "modals",
  modalsDefaultIndex = 100,
}: Partial<InitializeModalsOptions> = {}) {
  let modalsContainer = document.getElementById(containerName);

  if (!modalsContainer) {
    modalsContainer = document.createElement("div");
    modalsContainer.id = containerName;
    document.body.appendChild(modalsContainer);
  }

  modalZIndex.value = modalsDefaultIndex;
  modalsRootName.value = `#${containerName}`;
}

export function createModal(id: string) {
  const state = shallowRef(false);
  const store: UnwrapNestedRefs<Record<string, unknown>> = reactive({});
  const zIndex = shallowRef((modalZIndex.value += 5));

  const setState = (_state: boolean) => {
    state.value = _state;
  };

  const setStoreValue = (key: string, val: unknown) => {
    Reflect.set(store, key, val);
  };

  const getStoreValue = <T = null>(key: string, defaultValue?: T) => {
    return computed(() => store[key] ?? defaultValue) as ComputedRef<T>;
  };

  const setIndex = (_state: number) => {
    zIndex.value = _state;
  };

  const getIndexOverlay = computed(() => zIndex.value);

  const getIndexContent = computed(() => {
    const result = zIndex.value + 1;
    return result;
  });

  const modal: Modal = {
    id,
    zIndex,
    store,
    state,
    setState,
    setStoreValue,
    getStoreValue,
    setIndex,
    getIndexOverlay,
    getIndexContent,
  };

  modals.set(id, modal);

  return modal;
}

export function getModalById(id: string): never | Modal {
  const modal = modals.get(id);
  if (!modal) {
    throw new Error(`[provide/inject] no moda with id: ${id}`);
  }
  return modal;
}

export function useModals() {
  const getContainerName = computed(() => modalsRootName.value);
  const getNextModalIndex = computed(() => (modalZIndex.value += 5));

  return { getContainerName, getNextModalIndex };
}
