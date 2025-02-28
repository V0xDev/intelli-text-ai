import { getModalById } from "@/utils/Modal";
import { computed, watch } from "vue";

export function useModalsHooks(id: string) {
  const modal = getModalById(id);
  const modalState = computed(() => modal.state.value);

  let beforeMountedCallback: (() => void) | null = null;
  let mountedCallback: (() => void) | null = null;
  let beforeUnMountedCallback: (() => void) | null = null;
  let afterUnMountedCallback: (() => void) | null = null;
  let unmountedCallback: (() => void) | null = null;

  const stopWatcher = watch(modalState, (newVal, oldVal) => {
    if (oldVal === false && newVal === true) {
      beforeMountedCallback?.();
      mountedCallback?.();
    } else if (!newVal) {
      beforeUnMountedCallback?.();
      unmountedCallback?.();
      afterUnMountedCallback?.();
    }
  });

  const onModalBeforeMounted = (callback: () => void) => {
    beforeMountedCallback = callback;
  };

  const onModalMounted = (callback: () => void) => {
    mountedCallback = callback;
  };

  const onModalBeforeUnmounted = (callback: () => void) => {
    beforeUnMountedCallback = callback;
  };

  const onModalUnmounted = (callback: () => void) => {
    unmountedCallback = callback;
  };

  const onModalAfterUnmounted = (callback: () => void) => {
    afterUnMountedCallback = callback;
  };

  const disposeHooks = () => {
    stopWatcher();
  };

  return {
    onModalAfterUnmounted,
    onModalBeforeUnmounted,
    onModalBeforeMounted,
    onModalMounted,
    onModalUnmounted,
    disposeHooks,
  };
}
