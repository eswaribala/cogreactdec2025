import {render, screen} from '@testing-library/react';
import React from "react";
import { render, screen } from "@testing-library/react";
import Registration from "./Registration";

describe("Registration Component", () => {
  it("renders the registration form", () => {
    render(<Registration newUserState={() => {}} />);

    expect(screen.getByText(/Registration/i)).toBeInTheDocument();

    expect(screen.getByLabelText("FirstName")).toBeInTheDocument();
    expect(screen.getByLabelText("LastName")).toBeInTheDocument();
    expect(screen.getByLabelText("UserName")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    // your button text is "Submit", not "Register"
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("has the correct form structure", () => {
    render(<Registration newUserState={() => {}} />);

    // safest: query the actual <form> element (not by role)
    const form = document.querySelector("form");
    expect(form).toBeTruthy();

    expect(form).toContainElement(screen.getByLabelText("UserName"));
    expect(form).toContainElement(screen.getByLabelText("Email"));
    expect(form).toContainElement(screen.getByRole("button", { name: /submit/i }));
  });
});
