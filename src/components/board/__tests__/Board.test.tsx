import React from "react";
import { act, fireEvent, render, screen, waitFor } from "test-utils";
import { Context as ResponsiveContext } from "react-responsive";

import { Board } from "../index";

describe("Board", () => {
  describe("renders without error", () => {
    it("on desktop", () => {
      const { container } = render(<Board />);
      const boardEle = screen.getByTestId("board");
      expect(boardEle).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it("on mobile", () => {
      const { container } = render(
        <ResponsiveContext.Provider value={{ width: 300 }}>
          <Board />
        </ResponsiveContext.Provider>,
      );

      const boardEle = screen.getByTestId("board");
      expect(boardEle).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  describe("game actions", () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.spyOn(global.Math, "random").mockRestore();
    });

    describe("outcomes", () => {
      it("draw", () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.0);
        const { container } = render(<Board />);

        const materials = screen.getAllByTestId("material");
        fireEvent.click(materials[0]);

        expect(
          screen.getByTestId("current-player-selection"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();

        act(() => {
          jest.runAllTimers();
        });

        expect(
          screen.getByTestId("opponent-player-selection"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });

      it("win", () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.12);
        const { container } = render(<Board />);

        const materials = screen.getAllByTestId("material");
        fireEvent.click(materials[0]);

        expect(
          screen.getByTestId("current-player-selection"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();

        act(() => {
          jest.runAllTimers();
        });

        expect(
          screen.getByTestId("opponent-player-selection"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });

      it("lose", () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.11);
        const { container } = render(<Board />);

        const materials = screen.getAllByTestId("material");
        fireEvent.click(materials[0]);

        expect(
          screen.getByTestId("current-player-selection"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();

        act(() => {
          jest.runAllTimers();
        });

        expect(
          screen.getByTestId("opponent-player-selection"),
        ).toBeInTheDocument();
        expect(container).toMatchSnapshot();
      });
    });

    describe("post game", () => {
      it("rematch", async () => {
        jest.spyOn(global.Math, "random").mockReturnValue(0.0);
        const { container } = render(<Board />);

        const materials = screen.getAllByTestId("material");
        fireEvent.click(materials[0]);

        expect(
          screen.getByTestId("current-player-selection"),
        ).toBeInTheDocument();

        act(() => {
          jest.runAllTimers();
        });

        expect(
          screen.getByTestId("opponent-player-selection"),
        ).toBeInTheDocument();

        await waitFor(() => {
          expect(screen.queryByText("Rematch?")).toBeInTheDocument();
          expect(screen.queryByText("Your turn")).not.toBeInTheDocument();
        });
        fireEvent.click(screen.getByTestId("rematch"));
        await waitFor(() => {
          expect(screen.queryByText("Rematch?")).not.toBeInTheDocument();
          expect(screen.queryByText("Your turn")).toBeInTheDocument();
        });
        expect(container).toMatchSnapshot();
      });
    });
  });
});
