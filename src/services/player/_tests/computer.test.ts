import { MATERIAL_TYPES } from "constants/material";

import { Computer } from "../computer";

let ComputerInstance = new Computer();

describe("player service computer", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  describe("computer", () => {
    it("returns move on getMove", () => {
      jest.spyOn(global.Math, "random").mockReturnValue(0.0);

      const mockCallback = jest.fn();
      ComputerInstance.onPlay(mockCallback);

      ComputerInstance.getMove();
      jest.runAllTimers();

      expect(mockCallback).toBeCalledWith(MATERIAL_TYPES.ROCK);
    });

    it("accepts rematch", () => {
      expect(ComputerInstance.requestRematch()).resolves.toBe(true);
    });
  });
});
