import React from "react";
import { fireEvent, render, screen, waitFor } from "test-utils";
import { MATERIAL_TYPES } from "constants/material";
import { MATERIAL_ICONS_MAP } from "../constants";

import { Material } from "../Material";

describe("Material", () => {
  it("renders without error", () => {
    const { container } = render(<Material />);
    const materialEle = screen.getByTestId("material");
    expect(materialEle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders material types without error", async () => {
    const { container, rerender } = render(<Material />);

    await waitFor(
      async () =>
        await Promise.all(
          Object.values(MATERIAL_TYPES).map((materialType) => {
            rerender(<Material type={materialType} />);

            const srcEle = screen.getByTestId(
              "material-image",
            ) as HTMLImageElement;
            expect(srcEle).toBeInTheDocument();
            expect(srcEle.getAttribute("src")).toBe(
              MATERIAL_ICONS_MAP[materialType],
            );
            expect(container).toMatchSnapshot();
          }),
        ),
    );
  });

  it("renders with highlight", () => {
    const { container } = render(<Material isHighlited={true} />);
    const materialEle = screen.getByTestId("material");
    const highlightEle = screen.getByTestId("material-highlight");
    expect(materialEle).toBeInTheDocument();
    expect(highlightEle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders with given redius", () => {
    const { container } = render(<Material radius={500} />);
    const materialEle = screen.getByTestId("material");
    expect(materialEle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  describe("click action", () => {
    it("fires callback when not disabled", () => {
      const mockClick = jest.fn();
      render(
        <Material
          type={MATERIAL_TYPES.ROCK}
          onClick={mockClick}
          isDisabled={false}
        />,
      );
      const materialEle = screen.getByTestId("material");

      fireEvent.click(materialEle);
      const srcEle = screen.getByTestId("material-image");
      expect(srcEle).toBeInTheDocument();
      expect(mockClick).toBeCalledTimes(1);
    });

    it("does not fire callback when disabled", () => {
      const mockClick = jest.fn();
      render(
        <Material
          type={MATERIAL_TYPES.ROCK}
          onClick={mockClick}
          isDisabled={true}
        />,
      );
      const materialEle = screen.getByTestId("material");

      fireEvent.click(materialEle);
      const srcEle = screen.getByTestId("material-image");
      expect(srcEle).toBeInTheDocument();
      expect(mockClick).toBeCalledTimes(0);
    });
  });
});
