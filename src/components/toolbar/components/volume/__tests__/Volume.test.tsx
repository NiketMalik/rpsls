import React from "react";
import ReactDOM from "react-dom";
import { fireEvent, render, screen, waitFor, act } from "test-utils";

import { Volume } from "../index";

const mockAudioPlay = jest.fn();
const mockAudioStop = jest.fn();

jest.mock("hooks/useAudio", () => ({
  useAudio: () => [mockAudioPlay, { stop: mockAudioStop }],
}));

describe("Volume", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without error", () => {
    const container = document.createElement("div");
    act(() => {
      ReactDOM.render(<Volume />, container);
    });

    expect(container).toMatchSnapshot();
  });

  describe("tooltip actions", () => {
    it("should show tooltip for audio", async () => {
      render(<Volume />);

      const audioTriggerEle = screen.getByTestId("audio-trigger");
      expect(audioTriggerEle).toBeInTheDocument();

      fireEvent.mouseOver(audioTriggerEle);

      await waitFor(() => {
        const triggerTooltipEle = screen.getByTestId("audio-tooltip");
        expect(triggerTooltipEle).toBeInTheDocument();
        expect(triggerTooltipEle).toMatchSnapshot();
      });
    });

    it("should show tooltip for music", async () => {
      render(<Volume />);

      const musicTriggerEle = screen.getByTestId("music-trigger");
      expect(musicTriggerEle).toBeInTheDocument();

      fireEvent.mouseOver(musicTriggerEle);

      await waitFor(() => {
        const triggerTooltipEle = screen.getByTestId("music-tooltip");
        expect(triggerTooltipEle).toBeInTheDocument();
        expect(triggerTooltipEle).toMatchSnapshot();
      });
    });
  });

  describe("button actions", () => {
    it("should enable audio", async () => {
      render(<Volume />);

      const audioTriggerEle = screen.getByTestId("audio-trigger");
      expect(audioTriggerEle).toBeInTheDocument();

      fireEvent.click(audioTriggerEle);
      fireEvent.mouseOver(audioTriggerEle);

      await waitFor(() => {
        const triggerTooltipEle = screen.getByTestId("audio-tooltip");
        expect(triggerTooltipEle).toBeInTheDocument();
      });

      await waitFor(() => expect(mockAudioPlay).toBeCalled());
    });

    it("should disable audio", async () => {
      render(<Volume />);

      const audioTriggerEle = screen.getByTestId("audio-trigger");
      expect(audioTriggerEle).toBeInTheDocument();

      fireEvent.mouseOver(audioTriggerEle);
      await waitFor(() => {
        const triggerTooltipEle = screen.getByTestId("audio-tooltip");
        expect(triggerTooltipEle).toBeInTheDocument();
        expect(triggerTooltipEle).toMatchSnapshot();
      });

      fireEvent.click(audioTriggerEle);
      await waitFor(() => expect(mockAudioPlay).toBeCalledTimes(1));

      fireEvent.mouseOver(audioTriggerEle);
      await waitFor(() => {
        const triggerTooltipEle = screen.getByTestId("audio-tooltip");
        expect(triggerTooltipEle).toBeInTheDocument();
        expect(triggerTooltipEle).toMatchSnapshot();
      });
    });

    it("should enable music", async () => {
      render(<Volume />);

      const musicTriggerEle = screen.getByTestId("music-trigger");
      expect(musicTriggerEle).toBeInTheDocument();

      fireEvent.click(musicTriggerEle);
      fireEvent.mouseOver(musicTriggerEle);

      await waitFor(() => {
        const triggerTooltipEle = screen.getByTestId("music-tooltip");
        expect(triggerTooltipEle).toBeInTheDocument();
      });

      await waitFor(() => expect(mockAudioPlay).not.toBeCalled());
    });
  });
});
