import React from "react";

import { Volume } from "./components/volume";
import { Rules } from "./components/rules";

import { ToolbarContainer } from "./styles";

export const Toolbar = () => {
  return (
    <ToolbarContainer className="d-flex align-items-center justify-content-center justify-content-md-end">
      <Rules />
      <Volume />
    </ToolbarContainer>
  );
};
