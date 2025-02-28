import { inject, provide, ref, shallowRef } from "vue";

const STORE_KEY = "$provide-text-area-container-key";

type TextAreaContainerProvided = ReturnType<typeof provideTextAreaContainer>;

export function provideTextAreaContainer() {
  const container = ref<HTMLDivElement>();
  const leftWrapper = ref<HTMLDivElement>();

  const leftWidth = shallowRef(0); // Начальная ширина будет установлена CSS
  const isDragging = shallowRef(false); // Флаг перетаскивания
  let startX = 0; // Начальная позиция мыши
  let startWidth = 0; // Начальная ширина

  const onMouseDown = (event: MouseEvent) => {
    isDragging.value = true;
    startX = event.clientX; // Запоминаем начальную позицию мыши

    if (leftWrapper.value) {
      startWidth = leftWrapper.value.getBoundingClientRect().width; // Запоминаем текущую ширину
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (!isDragging.value || !container.value) return;

    const containerRect = container.value.getBoundingClientRect();
    const delta = event.clientX - startX; // Разница в положении мыши
    const newWidth = startWidth + delta; // Новая ширина

    // Ограничения определяются размерами контейнера
    const minWidth = 50; // Минимальная ширина (можно настроить через CSS)
    const maxWidth = containerRect.width - 50; // Максимальная ширина (учитываем ползунок и минимальную ширину правого textarea)

    leftWidth.value = Math.max(minWidth, Math.min(maxWidth, newWidth));
  };

  const onMouseUp = () => {
    isDragging.value = false; // Завершаем перетаскивание
  };

  const toProvide = {
    container,
    leftWrapper,
    leftWidth, // Реактивная ширина левого textarea
    onMouseDown, // Начало перетаскивания
    onMouseMove, // Движение мыши
    onMouseUp, // Завершение перетаскивания
  };

  provide(STORE_KEY, toProvide);

  return toProvide;
}

export function injectTextAreaContainer() {
  const store = inject<TextAreaContainerProvided | undefined>(STORE_KEY);

  if (!store) {
    console.log("[provide/inject] provideTextAreaContainer not provided!!");
    return;
  }

  return store;
}
