import { getLinearGradient } from "../styles";

describe("styles utils", () => {
  describe("getLinearGradient", () => {
    it("returns linear gradient", () => {
      expect(getLinearGradient({ start: "a", end: "b" }).styles).toBe(
        "background-image:linear-gradient(to bottom right, a, b);",
      );
    });
  });
});
