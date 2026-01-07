import {render, screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import Title from "./Title";    

describe("Title Component", () => {
  it("renders the title text", () => {
    render(<Title text="Shopper's Den" />);
    expect(screen.getByText("Shopper's Den")).toBeInTheDocument();
  });
    it("applies the correct CSS class", () => { 
    render(<Title text="Shopper's Den" />);
    expect(screen.getByText("Shopper's Den")).toHaveClass("title");
  });
}); 