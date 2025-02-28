import { ColorMode, SizeMode } from "@/shared/types";

export type SelectOption<T> = {
  key: number | string;
  display: string;
  raw: T;
};

export type VSelectBaseVariants = "basic" | "system";

export interface VSelectBase<T> {
  options: SelectOption<T>[];
  variant?: VSelectBaseVariants;
  placeholder?: string;
  label?: string;
  color?: ColorMode;
  size?: SizeMode;
  isButtonClear?: boolean;
  isRounded?: boolean;
  isStretch?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
}
