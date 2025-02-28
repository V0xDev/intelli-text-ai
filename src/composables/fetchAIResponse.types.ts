export type ProviderApi = "openrouter" | "mistral";

export interface SettingsBotAPI {
  name: string;
  url: string;
  provider: ProviderApi;
}

export interface ResultQuestion {
  id: string;
  provider: string;
  model: string;
  object: string;
  created: number;
  choices: Choice[];
  usage: Usage;
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface Choice {
  logprobs: null;
  finish_reason: string;
  native_finish_reason: string;
  index: number;
  message: Message;
}

interface Message {
  role: string;
  content: string;
  refusal: null;
  reasoning: string;
}
