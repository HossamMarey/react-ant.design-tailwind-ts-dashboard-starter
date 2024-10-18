export type Sizes = {
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  xxl: boolean;
};
export interface WindowSize {
  width: number;
  height: number | undefined;
}

export interface Language {
  key: string;
  title: string;
  short_title: string;
  lang: string;
}