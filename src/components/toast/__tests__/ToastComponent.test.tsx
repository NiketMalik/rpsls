import React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "test-utils";

import { Toast } from "../index";

describe("Toast", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  it("renders without error", () => {
    const { container } = render(<Toast />);
    const toastWrapperEle = screen.getByTestId("toast-wrapper");
    expect(toastWrapperEle).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it("renders basic toast", async () => {
    const { container } = render(<Toast />);
    const toastWrapperEle = screen.getByTestId("toast-wrapper");
    expect(toastWrapperEle).toBeInTheDocument();

    act(() => {
      window.showToast({
        body: "test",
      });
    });

    await waitFor(() =>
      expect(screen.getByTestId("toast")).toBeInTheDocument(),
    );
    expect(container).toMatchSnapshot();
  });

  it("renders toast with header", async () => {
    const { container } = render(<Toast />);
    const toastWrapperEle = screen.getByTestId("toast-wrapper");
    expect(toastWrapperEle).toBeInTheDocument();

    act(() => {
      window.showToast({
        body: "test",
        header: "test-header",
      });
    });

    await waitFor(() =>
      expect(screen.getByTestId("toast")).toBeInTheDocument(),
    );
    expect(container).toMatchSnapshot();
  });

  it("renders accent danger toast", async () => {
    const { container } = render(<Toast />);
    const toastEle = screen.getByTestId("toast-wrapper");
    expect(toastEle).toBeInTheDocument();

    act(() => {
      window.showToast({
        header: "test",
        body: "test",
        accent: "danger",
      });
    });

    await waitFor(() =>
      expect(screen.getByTestId("toast")).toBeInTheDocument(),
    );
    expect(container).toMatchSnapshot();
  });

  it("auto hides toast", async () => {
    const { container } = render(<Toast />);
    const toastWrapperEle = screen.getByTestId("toast-wrapper");
    expect(toastWrapperEle).toBeInTheDocument();

    act(() => {
      window.showToast({
        header: "test",
        body: "test",
      });
    });

    await waitFor(() =>
      expect(screen.getByTestId("toast")).toBeInTheDocument(),
    );

    const toastEle = screen.getByTestId("toast");
    act(() => {
      jest.runAllTimers();
    });

    expect(toastWrapperEle).not.toContainElement(toastEle);
    expect(container).toMatchSnapshot();
  });

  it("does not auto hides toast", async () => {
    const { container } = render(<Toast />);
    const toastWrapperEle = screen.getByTestId("toast-wrapper");
    expect(toastWrapperEle).toBeInTheDocument();

    act(() => {
      window.showToast({
        header: "test",
        body: "test",
        autohide: false,
      });
    });

    await waitFor(() =>
      expect(screen.getByTestId("toast")).toBeInTheDocument(),
    );

    const toastEle = screen.getByTestId("toast");
    act(() => {
      jest.runAllTimers();
    });

    expect(toastWrapperEle).toContainElement(toastEle);
    expect(container).toMatchSnapshot();
  });

  it("should hide toast on click header close click", async () => {
    render(<Toast />);
    const toastWrapperEle = screen.getByTestId("toast-wrapper");
    expect(toastWrapperEle).toBeInTheDocument();

    act(() => {
      window.showToast({
        header: "test",
        body: "test",
        autohide: false,
      });
    });

    await waitFor(() =>
      expect(screen.getByTestId("toast")).toBeInTheDocument(),
    );

    const toastEle = screen.getByTestId("toast");
    fireEvent.click(screen.getByTestId("toast-close-action"));

    expect(toastWrapperEle).toBeInTheDocument();
    expect(toastWrapperEle).not.toContainElement(toastEle);
  });
});
