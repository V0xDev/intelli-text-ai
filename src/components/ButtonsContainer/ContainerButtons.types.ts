import { ColorMode } from "@/shared/types";
import type { Component } from "vue";

export interface ButtonAction {
  icon: Component;
  color: ColorMode;
  label: string;
  prompt: string;
}
