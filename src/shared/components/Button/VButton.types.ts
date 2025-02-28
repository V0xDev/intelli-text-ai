import { ColorMode, SizeMode } from "@/shared/types";

export type ButtonVariant = "outline" | "solid" | "magic" | "system";

export interface VButton {
  variant?: ButtonVariant;
  color?: ColorMode;
  size?: SizeMode;
  isRounded?: boolean;
  isDisabled?: boolean;
  isStretch?: boolean;
  isSelected?: boolean;
}
