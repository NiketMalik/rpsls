import React from "react";
import ReactDOM from "react-dom";

import { THEME } from "constants/theme";

import { StoreProvider } from "context/storeContext";
import { ThemeProvider } from "@emotion/react";
import { domAnimation, LazyMotion } from "framer-motion";

import { App } from "./components/app";

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider theme={THEME}>
        <LazyMotion features={domAnimation} strict>
          <App />
        </LazyMotion>
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
