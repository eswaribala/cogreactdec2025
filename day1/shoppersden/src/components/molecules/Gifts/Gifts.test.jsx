import React from "react";
import { render, screen, waitFor,within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import Gifts from "./Gifts";

const mockApiData = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Gift ${i + 1}`,
  description: `Desc ${i + 1}`,
  price: (i + 1) * 10,
  image: `img${i + 1}.jpg`,
}));

describe("Gifts - API + Response (Vitest)", () => {
  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue({ data: mockApiData }),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("calls API, validates response size, renders 5 items on page 1", async () => {
    render(<Gifts apiUrl={import.meta.env.VITE_GIFT_ENDPOINT} />);

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    expect(fetch).toHaveBeenCalledWith(import.meta.env.VITE_GIFT_ENDPOINT);

    // response size
    expect(mockApiData).toHaveLength(6);

    // page 1 renders 5 cards (itemsPerPage=5)
    const headings = await screen.findAllByRole("heading", { level: 6 });
    expect(headings).toHaveLength(5);

    // Gift 6 not visible on page 1
    expect(screen.queryByText("Gift 6")).not.toBeInTheDocument();
  });

  test("pagination: next page shows Gift 6", async () => {
  render(<Gifts apiUrl={import.meta.env.VITE_GIFT_ENDPOINT} />);

  // wait first page
  expect(await screen.findByText("Gift 1")).toBeInTheDocument();
  expect(screen.queryByText("Gift 6")).not.toBeInTheDocument();

  // ✅ click NEXT button (stable across MUI versions)
  const nav = screen.getByRole("navigation");
  const nextBtn =
    within(nav).queryByLabelText(/go to next page/i) ||
    within(nav).queryByLabelText(/next page/i);

  expect(nextBtn).toBeTruthy(); // ensures pagination exists
  await userEvent.click(nextBtn);

  // Gift 6 appears on page 2
  expect(await screen.findByText("Gift 6")).toBeInTheDocument();
});


 test("handles fetch error", async () => {
  const spy = vi.spyOn(console, "error").mockImplementation(() => {});

  fetch.mockRejectedValueOnce(new Error("Network down"));

  render(<Gifts apiUrl={import.meta.env.VITE_GIFT_ENDPOINT} />);

  expect(await screen.findByText(/Error loading gifts/i)).toBeInTheDocument();
  expect(screen.getByText(/Network down/i)).toBeInTheDocument();

  spy.mockRestore();
});
});
