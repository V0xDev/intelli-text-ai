import { SettingsBotAPI } from "@/composables/fetchAIResponse.types";
import { SelectOption } from "@/shared/components/Select/VSelect.types";

const basicSettingsBot: SettingsBotAPI = {
  name: "deepseek/deepseek-r1:free",
  url: "https://openrouter.ai/api/v1/chat/completions",
  provider: "openrouter",
};

export const Models: SelectOption<SettingsBotAPI>[] = [
  {
    key: 0,
    display: "phi-3-medium-128k-instruct:free",
    raw: {
      ...basicSettingsBot,
      name: "microsoft/phi-3-medium-128k-instruct:free",
    },
  },
  {
    key: 1,
    display: "mistral-7b-instruct:free",
    raw: { ...basicSettingsBot, name: "mistralai/mistral-7b-instruct:free" },
  },
  {
    key: 2,
    display: "deepseek-r1:free",
    raw: { ...basicSettingsBot, name: "deepseek/deepseek-r1:free" },
  },
  {
    key: 3,
    display: "mistral-small-24b-instruct-2501:free",
    raw: {
      ...basicSettingsBot,
      name: "mistralai/mistral-small-24b-instruct-2501:free",
    },
  },
  {
    key: 4,
    display: "mistral-free (pro)",
    raw: {
      name: "codestral-2501",
      url: "https://api.mistral.ai/v1/chat/completions",
      provider: "mistral",
    },
  },
];
