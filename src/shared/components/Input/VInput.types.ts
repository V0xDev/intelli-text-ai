import { ColorMode, SizeMode } from "@/shared/types";
import { InputHTMLAttributes } from "vue";

export type HTMLInputTypeAttribute =
  | "email"
  | "number"
  | "password"
  | "tel"
  | "text"
  | "url";

type PermittedInputAttributes = InputHTMLAttributes & {
  type?: HTMLInputTypeAttribute;
};

export interface VInput {
  size?: SizeMode;
  color?: ColorMode;
  inputParams?: Partial<PermittedInputAttributes>;
  isLoading?: boolean;
  isStretch?: boolean;
  isRounded?: boolean;
}
