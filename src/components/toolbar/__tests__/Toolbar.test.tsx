import React from "react";
import { render, screen } from "test-utils";

import { Toolbar } from "../";

jest.mock("../components/rules", () => ({ Rules: () => null }));
jest.mock("../components/volume", () => ({ Volume: () => null }));

describe("Toolbar", () => {
  it("renders without error", () => {
    const { container } = render(<Toolbar />);
    const toolbarEle = screen.getByTestId("toolbar");
    expect(toolbarEle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
