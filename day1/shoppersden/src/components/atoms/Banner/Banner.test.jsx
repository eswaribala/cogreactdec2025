import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Banner from "./Banner";

vi.mock("../../../assets/shopperbanner.jpeg", () => ({
  default: "banner-mock.jpg",
}));

describe("Banner Component", () => {
  it("renders banner image", () => {
    render(<Banner />);
    expect(screen.getByAltText("Shoppers Banner")).toBeInTheDocument();
  });

  it("has correct image source", () => {
    render(<Banner />);
    expect(screen.getByAltText("Shoppers Banner")).toHaveAttribute(
      "src",
      "banner-mock.jpg"
    );
  });

  it("applies banner css class", () => {
    render(<Banner />);
    expect(screen.getByAltText("Shoppers Banner")).toHaveClass("banner");
  });
});
