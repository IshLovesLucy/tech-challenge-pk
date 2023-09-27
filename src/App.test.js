import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("App rendered, login button present", () => {
  render(<App />);
  const loginButton = screen.getByRole("button", { name: /LOGIN/i });
  expect(loginButton).toBeInTheDocument();
});
