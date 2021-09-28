import { THEME } from "constants/theme";

declare module "@emotion/react" {
  type DefaultTheme = typeof THEME;

  export interface Theme extends DefaultTheme {}
}
