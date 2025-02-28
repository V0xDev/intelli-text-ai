import { ColorMode, SizeMode } from "@/shared/types";

type VTextAreaResize = "resize-none" | "both" | "vertical" | "horizontal";

export interface TextareaAttr {
  placeholder: string;
  readonly: boolean;
  disabled: boolean;
  spellcheck: boolean;
  autofocus: boolean;
}

export interface VTextarea extends Partial<TextareaAttr> {
  size?: SizeMode;
  color?: ColorMode;
  resize?: VTextAreaResize;
  maxLength?: number;
  minHeight?: number;
  minWidth?: number;
  isRounded?: boolean;
  isStretch?: boolean;
  isLoading?: boolean;
}
