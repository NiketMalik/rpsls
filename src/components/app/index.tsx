import React from "react";

import { Hero } from "components/hero";
import { Board } from "components/board";
import { Toolbar } from "components/toolbar";

import { AppContainer } from "./styles";

import "static/css/styles.css";

export const App = () => {
  return (
    <>
      <AppContainer className="p-5 py-3 py-md-5" data-testid="app">
        <Hero />
        <Board />
      </AppContainer>
      <Toolbar />
    </>
  );
};
