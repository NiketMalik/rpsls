import { WIN_OUTCOME_TYPES } from "constants/game";
import { MATERIAL_TYPES } from "constants/material";

import { getResult, getResultText } from "../game";

describe("game utils", () => {
  describe("getResult", () => {
    it("returns current player won", () => {
      expect(getResult(MATERIAL_TYPES.ROCK, MATERIAL_TYPES.SCISSOR)).toBe(
        WIN_OUTCOME_TYPES.CURRENT,
      );
    });

    it("returns opponent player won", () => {
      expect(getResult(MATERIAL_TYPES.SCISSOR, MATERIAL_TYPES.ROCK)).toBe(
        WIN_OUTCOME_TYPES.OPPONENT,
      );
    });

    it("returns draw", () => {
      expect(getResult(MATERIAL_TYPES.ROCK, MATERIAL_TYPES.ROCK)).toBe(
        WIN_OUTCOME_TYPES.DRAW,
      );
    });
  });

  describe("getResultText", () => {
    it("outcome won", () => {
      expect(getResultText(WIN_OUTCOME_TYPES.CURRENT)).toBe("You won!");
    });

    it("outcome lost", () => {
      expect(getResultText(WIN_OUTCOME_TYPES.OPPONENT)).toBe("You lost...");
    });

    it("outcome draw", () => {
      expect(getResultText(WIN_OUTCOME_TYPES.DRAW)).toBe("It's a draw!");
    });

    it("should throw on invalid outcome", () => {
      // @ts-ignore
      const t = () => getResultText();

      expect(t).toThrow("GameUtils: Invalid result outcome.");
    });
  });
});
