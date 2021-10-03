import React from "react";
import { render, screen } from "test-utils";

import { App } from "../";

jest.mock("components/hero", () => ({ Hero: () => null }));
jest.mock("components/board", () => ({ Board: () => null }));
jest.mock("components/toolbar", () => ({ Toolbar: () => null }));

describe("App", () => {
  it("renders without error", () => {
    const { container } = render(<App />);
    const appEle = screen.getByTestId("app");
    expect(appEle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
