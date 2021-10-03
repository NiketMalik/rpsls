import React from "react";
import { render, screen } from "test-utils";

import { Hero } from "../index";

describe("Hero", () => {
  it("renders without error", () => {
    const { container } = render(<Hero />);
    const heroEle = screen.getByTestId("hero");
    expect(heroEle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
