import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import { OPPONENT_TYPES } from "constants/game";
import { MATERIAL_TYPES } from "constants/material";

import { useOpponent } from "../useOpponent";
import { act } from "test-utils";

describe("useOpponent", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  describe("computer player", () => {
    it("calls onPlay on opponent played", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.0);
      const mockOnPlay = jest.fn();

      renderHook(() =>
        useOpponent({
          opponentType: OPPONENT_TYPES.COMPUTER,
          hasCurrentPlayerPlayed: true,
          onPlay: mockOnPlay,
        }),
      );

      jest.runAllTimers();

      expect(mockOnPlay).toBeCalledWith(MATERIAL_TYPES.ROCK);
    });

    it("accepts on rematch", () => {
      const { result } = renderHook(() =>
        useOpponent({
          opponentType: OPPONENT_TYPES.COMPUTER,
          hasCurrentPlayerPlayed: true,
          onPlay: jest.fn(),
        }),
      );

      act(() => {
        expect(result.current.requestRematch()).resolves.toBe(true);
      });
    });
  });
});
