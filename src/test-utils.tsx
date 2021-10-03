import { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { THEME } from "constants/theme";

import { StoreProvider } from "context/storeContext";
import { ThemeProvider } from "@emotion/react";

const WithGlobalProviders: FC = ({ children }) => {
  return (
    <StoreProvider>
      <ThemeProvider theme={THEME}>{children}</ThemeProvider>
    </StoreProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: WithGlobalProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
