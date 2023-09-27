import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { loginUser } from "../../api/auth";

jest.mock("../../api/auth");

describe("LoginForm Component", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it("passes valid login message", async () => {
    loginUser.mockResolvedValueOnce({
      token: "token",
    });

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "eve.holt@reqres.in" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "cityslicka" },
    });
    fireEvent.click(screen.getByText("LOGIN"));

    await waitFor(() =>
      expect(screen.getByText("Login successful!")).toBeInTheDocument()
    );
  });

  it("returns invalid login", async () => {
    loginUser.mockRejectedValueOnce(new Error("Invalid login credentials."));

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "ish@ish.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "ishpw" },
    });
    fireEvent.click(screen.getByText("LOGIN"));

    await waitFor(() =>
      expect(screen.getByText("Invalid login credentials.")).toBeInTheDocument()
    );
  });
});
