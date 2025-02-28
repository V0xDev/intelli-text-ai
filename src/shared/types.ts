import { BaseSize, Color, Size } from "@/shared/constants";

export type FontSizeMode = keyof typeof Size;

export type Maybe<T> = T | null;
export type SizeMode = keyof typeof BaseSize;
export type ColorMode = keyof typeof Color;
