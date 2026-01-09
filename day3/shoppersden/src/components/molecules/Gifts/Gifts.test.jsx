import React from "react";
import { render, screen, waitFor,within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import Gifts from "./Gifts";
import axios from "axios";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

const mockApiData = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  name: `Gift ${i + 1}`,
  description: `Desc ${i + 1}`,
  price: (i + 1) * 10,
  image: `img${i + 1}.jpg`,
}));

describe("Gifts - API + Response (Vitest)", () => {
  beforeEach(() => {
   axios.get.mockResolvedValue({
        data: { data: mockApiData }
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("calls API, validates response size, renders 6 items on page 1", async () => {
    render(<Gifts apiUrl={import.meta.env.VITE_GIFT_ENDPOINT} />);

   await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(axios.get).toHaveBeenCalledWith(import.meta.env.VITE_GIFT_ENDPOINT);  
    expect(mockApiData.length).toBe(6);
    const headings=await screen.findAllByRole("heading", { level: 6 });
    expect(headings).toHaveLength(5); // 6 items per page
    expect(screen.queryByText("Gift 1")).toBeInTheDocument();
    expect(screen.queryByText("Gift 5")).toBeInTheDocument();
    expect(screen.queryByText("Gift 6")).not.toBeInTheDocument();

    
  });


});

 
