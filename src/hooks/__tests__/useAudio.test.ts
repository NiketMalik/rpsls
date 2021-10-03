import React from "react";
import { renderHook } from "@testing-library/react-hooks";

import type { StoreState } from "store/types";

import { useAudio } from "../useAudio";
import useSound from "use-sound";

jest.mock("use-sound");

describe("useAudio", () => {
  afterEach(() => {
    jest.spyOn(React, "useContext").mockRestore();
  });

  describe("for audio", () => {
    it("plays audio when enabled", () => {
      jest.spyOn(React, "useContext").mockReturnValue({
        state: {
          isAudioEnabled: true,
          isMusicEnabled: false,
        } as StoreState,
      });

      renderHook(() =>
        useAudio("test", {
          id: "test",
          isAudio: true,
        }),
      );

      expect(useSound).toBeCalledWith("test", {
        id: "test",
        soundEnabled: true,
        isAudio: true,
      });
    });

    it("plays audio when disabled", () => {
      renderHook(() =>
        useAudio("test", {
          id: "test",
          isAudio: true,
        }),
      );

      expect(useSound).toBeCalledWith("test", {
        id: "test",
        soundEnabled: false,
        isAudio: true,
      });
    });
  });

  describe("for music", () => {
    it("plays music when enabled", () => {
      jest.spyOn(React, "useContext").mockReturnValue({
        state: {
          isAudioEnabled: false,
          isMusicEnabled: true,
        } as StoreState,
      });

      renderHook(() =>
        useAudio("test", {
          id: "test",
        }),
      );

      expect(useSound).toBeCalledWith("test", {
        id: "test",
        soundEnabled: true,
      });
    });

    it("plays music when disabled", () => {
      renderHook(() =>
        useAudio("test", {
          id: "test",
        }),
      );

      expect(useSound).toBeCalledWith("test", {
        id: "test",
        soundEnabled: false,
      });
    });
  });
});
