import { ResultQuestion } from "@/composables/fetchAIResponse.types";
import { injectAreaStore } from "@/store/AreaStore.provide";
import { injectSettingsStore } from "@/store/Settings.provide";

export function fetchAIResponse() {
  const { systemPrompt, apiModelKey, settingsModel } = injectSettingsStore();

  const { isLoading, isError, personText, aiText, prompt } = injectAreaStore();

  let controller: AbortController;

  const handleError = (error: unknown): string | null => {
    isError.value = true;
    isLoading.value = false;

    if (error instanceof Error && error.name === "AbortError") {
      return "Отмена запроса принята! Может, вы просто испугались, что AI расскажет что-то слишком умное?";
    }

    return "Произошла ошибка запроса, попробуйте сгенерировать еще раз...";
  };

  const getAnswer = async (prompt: string): Promise<string | null> => {
    controller = new AbortController();

    isLoading.value = true;
    isError.value = false;

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiModelKey.current}`,
    });

    try {
      const response = await fetch(settingsModel.value.url, {
        signal: controller.signal,
        method: "POST",
        headers,
        body: JSON.stringify({
          model: settingsModel.value.name,
          messages: [{ role: "user", content: prompt }],
        }),
      });

      if (!response.ok) {
        return "Ошибка! AI только что предложил рецепт пиццы вместо ответа... Может, он хочет перекусить? Попробуем снова?";
      }

      const data: ResultQuestion = await response.json();

      if (!data?.choices?.[0]?.message?.content) {
        return "Ой-ё... Кажется, искусственный интеллект застрял в бесконечном цикле мемов про кошек. Попробуем ещё раз?";
      }

      return data.choices[0].message.content;
    } catch (error) {
      return handleError(error);
    } finally {
      isLoading.value = false;
    }
  };

  const sendMessage = async () => {
    aiText.value = "";

    const formatPrompt = [
      prompt.value,
      "\n\n\nДополнительные инструкции от пользователя: ",
      systemPrompt.current,
      "\n\n\nВот текст которым ты должен заняться: ",
      personText.value,
    ].join(" ");

    const resultQuestion = await getAnswer(formatPrompt);

    aiText.value = resultQuestion;
  };

  const abortRequest = () => controller.abort();

  return { sendMessage, getAnswer, abortRequest };
}
