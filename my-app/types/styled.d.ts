import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    desktopBreakpoint: string;
    tableBreakpoint: string;
    MobileBreakpoint: string;
    smallMobileBreakpoint: string;
  }
}
