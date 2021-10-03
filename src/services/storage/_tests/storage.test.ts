import { storage } from "../index";

describe("storage service", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("get", () => {
    it("returns value", async () => {
      await storage.set("test", "test-value");

      expect(storage.get("test")).resolves.toBe("test-value");
    });

    it("returns object value", async () => {
      await storage.set("test", { foo: 1 });

      expect(storage.get("test")).resolves.toStrictEqual({ foo: 1 });
    });

    it("returns null if not present", () => {
      expect(storage.get("test")).resolves.toBeNull();
    });

    it("throws error for invalid value", () => {
      localStorage.setItem("test", '"test-value');

      expect(storage.get("test")).rejects.toThrowError(
        "StorageService: Failed to load test",
      );
    });
  });

  describe("set", () => {
    it("sets value for the key", async () => {
      await storage.set("test", "test-value");

      expect(storage.get("test")).resolves.toBe("test-value");
    });
  });

  describe("remove", () => {
    it("removes value for the key", async () => {
      await storage.set("test", "test-value");

      expect(storage.get("test")).resolves.toBe("test-value");

      await storage.remove("test");

      expect(storage.get("test")).resolves.toBeNull();
    });
  });
});
