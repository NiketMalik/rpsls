import { renderHook, act } from "@testing-library/react-hooks";
import { WIN_OUTCOME_TYPES } from "constants/game";

import { MATERIAL_TYPES } from "constants/material";

import { MockPlayerDefault } from "../__mocks__/player.mock";

import { useBoardActions } from "../useBoardActions";

const mockAudioPlay = jest.fn();
const mockAudioStop = jest.fn();

jest.mock("hooks/useAudio", () => ({
  useAudio: () => [mockAudioPlay, { stop: mockAudioStop }],
}));

jest.mock("services/player/computer", () => ({ Computer: MockPlayerDefault }));

describe("useBoardActions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  describe("actions on current player material select", () => {
    it("selects material", () => {
      const { result } = renderHook(() => useBoardActions());

      act(() => {
        result.current.onCurrentPlayerMaterialSelect(MATERIAL_TYPES.PAPER);
      });

      expect(mockAudioPlay).toBeCalled();
      expect(result.current.currentPlayerMaterial).toBe(MATERIAL_TYPES.PAPER);

      expect(result.current.opponentPlayerMaterial).toBeDefined();
      expect(result.current.currentRoundResult).toBeDefined();
    });

    it("actions on current player win", () => {
      const { result } = renderHook(() => useBoardActions());

      act(() => {
        result.current.onCurrentPlayerMaterialSelect(MATERIAL_TYPES.PAPER);
      });

      expect(mockAudioPlay).toBeCalled();
      expect(result.current.currentPlayerMaterial).toBe(MATERIAL_TYPES.PAPER);

      expect(result.current.currentRoundResult).toBe(WIN_OUTCOME_TYPES.CURRENT);
      expect(result.current.isCurrentPlayerHighlited).toBe(true);
      expect(result.current.isOpponentPlayerHighlited).toBe(false);
    });

    it("actions on current player lose", () => {
      const { result } = renderHook(() => useBoardActions());

      act(() => {
        result.current.onCurrentPlayerMaterialSelect(MATERIAL_TYPES.SCISSOR);
      });

      expect(mockAudioPlay).toBeCalled();
      expect(result.current.currentPlayerMaterial).toBe(MATERIAL_TYPES.SCISSOR);

      expect(result.current.currentRoundResult).toBe(
        WIN_OUTCOME_TYPES.OPPONENT,
      );
      expect(result.current.isCurrentPlayerHighlited).toBe(false);
      expect(result.current.isOpponentPlayerHighlited).toBe(true);
    });

    it("actions on current player draw", () => {
      const { result } = renderHook(() => useBoardActions());

      act(() => {
        result.current.onCurrentPlayerMaterialSelect(MATERIAL_TYPES.ROCK);
      });

      expect(mockAudioPlay).toBeCalled();
      expect(result.current.currentPlayerMaterial).toBe(MATERIAL_TYPES.ROCK);

      expect(result.current.currentRoundResult).toBe(WIN_OUTCOME_TYPES.DRAW);
      expect(result.current.isCurrentPlayerHighlited).toBe(true);
      expect(result.current.isOpponentPlayerHighlited).toBe(true);
    });
  });

  describe("rematch", () => {
    it("accept", async () => {
      const { result } = renderHook(() => useBoardActions());

      act(() => {
        result.current.onCurrentPlayerMaterialSelect(MATERIAL_TYPES.ROCK);
      });

      expect(result.current.currentRoundResult).toBeDefined();

      await act(async () => {
        await result.current.requestRematch();
      });

      expect(result.current.currentPlayerMaterial).toBeUndefined();
      expect(result.current.opponentPlayerMaterial).toBeUndefined();
      expect(result.current.currentRoundResult).toBeUndefined();
      expect(result.current.isCurrentPlayerHighlited).toBe(false);
      expect(result.current.isOpponentPlayerHighlited).toBe(false);
    });

    it("reject", async () => {
      const requestRematch = jest.spyOn(
        MockPlayerDefault.prototype,
        "requestRematch",
      );
      requestRematch.mockImplementationOnce(() => Promise.resolve(false));

      const { result } = renderHook(() => useBoardActions());

      act(() => {
        result.current.onCurrentPlayerMaterialSelect(MATERIAL_TYPES.ROCK);
      });

      expect(result.current.currentRoundResult).toBeDefined();

      await act(async () => {
        await result.current.requestRematch();
      });

      // Does nothing for now
    });
  });
});
