import React from "react";

import { Hero } from "components/hero";
import { Board } from "components/board";
import { Toolbar } from "components/toolbar";

import "static/css/styles.css";

export const App = () => {
  return (
    <div className="p-5 py-3 py-md-5" data-testid="app">
      <Hero />
      <Board />
      <Toolbar />
    </div>
  );
};
