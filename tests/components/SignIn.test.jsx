import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import SignIn from "../../src/pages/SignIn";

vi.mock("../../src/hooks/useSignIn", () => {
  return {
    default: () => ({
      signIn: vi.fn((data, rememberMe, cb) => cb(false)),
      loading: false,
      error: null,
    }),
  };
});

vi.mock("../../src/components/CustomTextField", () => ({
  default: (props) => (
    <div>
      <input
        data-testid={`input-${props.name}`}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        type={props.type || "text"}
      />
      {props.name === "password" && (
        <button
          data-testid="toggle-password"
          type="button"
          onClick={props.InputProps?.endAdornment?.props?.children?.props?.onClick}
        >
          toggle
        </button>
      )}
      {props.error && props.helperText && <span>{props.helperText}</span>}
    </div>
  ),
}));

vi.mock("../../src/components/CustomButton", () => ({
  default: (props) => (
    <button type={props.type} disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  ),
}));

describe("SignIn", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SignIn />
      </BrowserRouter>
    );
  });

  it("renders all input fields", () => {
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
  });

  it("submits successfully with valid data", async () => {
    fireEvent.change(screen.getByTestId("input-email"), {
      target: { name: "email", value: "john@gmail.com" },
    });
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { name: "password", value: "Password1@" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Email is required/)).not.toBeInTheDocument();
      expect(screen.queryByText(/Password is required/)).not.toBeInTheDocument();
    });
  });

  it("shows validation errors when fields are empty", async () => {
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/)).toBeInTheDocument();
    });
  });
  
  it("shows error for short password", async () => {
    fireEvent.change(screen.getByTestId("input-email"), {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { name: "password", value: "123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 6 characters/)).toBeInTheDocument();
    });
  });

  it("toggles password visibility", async () => {
    const passwordInput = screen.getByTestId("input-password");
    expect(passwordInput.type).toBe("password");

    const toggleBtn = screen.getByTestId("toggle-password");
    fireEvent.click(toggleBtn);

    await waitFor(() => {
      expect(passwordInput.type).toBe("text");
    });
  });
});
