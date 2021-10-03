import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "test-utils";

import { Rules } from "../";

describe("Rules", () => {
  it("renders without error", () => {
    const { container } = render(<Rules />);
    const modalTriggerEle = screen.getByTestId("rules-modal-trigger");
    expect(modalTriggerEle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  describe("tooltip actions", () => {
    it("should show tooltip", async () => {
      render(<Rules />);

      const modalTriggerEle = screen.getByTestId("rules-modal-trigger", {});
      expect(modalTriggerEle).toBeInTheDocument();

      fireEvent.mouseOver(modalTriggerEle);

      await waitFor(() => {
        const triggerTooltipEle = screen.getByTestId(
          "rules-modal-trigger-tooltip",
        );
        expect(triggerTooltipEle).toBeInTheDocument();
        expect(triggerTooltipEle).toMatchSnapshot();
      });
    });
  });

  describe("modal actions", () => {
    it("should open modal on trigger open", async () => {
      render(<Rules />);

      const modalTriggerEle = screen.getByTestId("rules-modal-trigger", {});
      expect(modalTriggerEle).toBeInTheDocument();

      fireEvent.click(modalTriggerEle);

      await waitFor(() => {
        const modalEle = screen.getByTestId("rules-modal");
        expect(modalEle).toBeInTheDocument();
        expect(modalEle).toMatchSnapshot();

        const modalContentEle = screen.getByTestId("rules-modal-content");
        expect(modalContentEle).toBeInTheDocument();
        expect(modalContentEle).toMatchSnapshot();
      });
    });

    it("should close modal on click outside", async () => {
      const { container } = render(<Rules />);

      const modalTriggerEle = screen.getByTestId("rules-modal-trigger", {});
      expect(modalTriggerEle).toBeInTheDocument();

      fireEvent.click(modalTriggerEle);

      await waitFor(() => {
        const modalEle = screen.getByTestId("rules-modal");
        expect(modalEle).toBeInTheDocument();
      });

      fireEvent.keyDown(container, {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        charCode: 27,
      });

      await waitForElementToBeRemoved(() => screen.getByTestId("rules-modal"));
      expect(container).toMatchSnapshot();
    });
  });
});
