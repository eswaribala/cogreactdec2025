import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Logo from "./Logo";

vi.mock("../../../assets/shoppesrlogo.png", () => ({
  default: "logo-mock.png",
}));

describe("Logo Component", () => {
  it("renders logo image", () => {
    render(<Logo />);
    expect(screen.getByAltText("Shoppers Logo")).toBeInTheDocument();
  });

  it("has correct image source", () => {
    render(<Logo />);
    expect(screen.getByAltText("Shoppers Logo")).toHaveAttribute(
      "src",
      "logo-mock.png"
    );
  });

  it("applies logo css class", () => {
    render(<Logo />);
    expect(screen.getByAltText("Shoppers Logo")).toHaveClass("Logo");
  });
});
