export enum Color {
  "violet" = "#7d0097",
  "green" = "#009724",
  "red" = "#970000",
  "blue" = "#006897",
  "yellow" = "#978200",
  "azure" = "#009297",
  "orange" = "#bd7500",
  "neutral" = "#707070",
}

export enum Size {
  s1 = "12px",
  s2 = "14px",
  s3 = "16px",
  m1 = "20px",
  m2 = "24px",
  m3 = "28px",
  l1 = "32px",
  l2 = "40px",
  l3 = "48px",
  xl1 = "64px",
  xl2 = "80px",
  xl3 = "96px",
}

export enum BaseSize {
  s = "small",
  m = "medium",
  l = "large",
}

export const COLORS_OPTIONS = Object.keys(Color);
export const COLORS_VALUES = Object.values(Color);

export const BASE_SIZE_OPTIONS = Object.keys(BaseSize);

export const SIZE_OPTIONS = Object.keys(Size);
export const SIZE_VALUES = Object.values(Size);
