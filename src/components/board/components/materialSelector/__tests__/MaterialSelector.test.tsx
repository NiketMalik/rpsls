import React from "react";

import { MATERIAL_TYPES } from "constants/material";
import { fireEvent, render, screen } from "test-utils";

import { MaterialSelector } from "../index";

describe("MaterialSelector", () => {
  it("renders without error", () => {
    const { container } = render(<MaterialSelector radius={100} />);
    expect(container).toMatchSnapshot();
  });

  describe("actions", () => {
    it("onSelect", () => {
      const mockOnSelect = jest.fn();
      render(<MaterialSelector radius={100} onSelect={mockOnSelect} />);

      fireEvent.click(screen.getAllByTestId("material")[0]);
      expect(mockOnSelect).toBeCalledWith(MATERIAL_TYPES.ROCK);
    });
  });
});
