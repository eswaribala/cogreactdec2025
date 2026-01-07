import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Timer from "./Timer";

describe("Timer Component", () => {

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-01-01T09:35:54"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders current time", () => {
    render(<Timer />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("updates time every second", () => {
    render(<Timer />);

    const firstTime = screen.getByRole("heading").textContent;

    act(() => {
      vi.advanceTimersByTime(1000); // ⏱ move time forward
    });

    const updatedTime = screen.getByRole("heading").textContent;

    expect(updatedTime).not.toEqual(firstTime);
  });

  it("cleans up interval on unmount", () => {
    const clearIntervalSpy = vi.spyOn(global, "clearInterval");

    const { unmount } = render(<Timer />);
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });

});
