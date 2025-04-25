import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import SignUpForm from "../../src/pages/SignUp/SignUpForm";

let mockSignUp;

vi.mock("../../src/hooks/useSignUp", () => {
  return {
    default: () => ({
      signUp: (...args) => mockSignUp(...args),
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

describe("SignUpForm", () => {
  beforeEach(() => {
    mockSignUp = vi.fn((data, cb) => cb && cb());

    render(
      <BrowserRouter>
        <SignUpForm />
      </BrowserRouter>
    );
  });

  it("renders all input fields", () => {
    expect(screen.getByTestId("input-firstName")).toBeInTheDocument();
    expect(screen.getByTestId("input-lastName")).toBeInTheDocument();
    expect(screen.getByTestId("input-email")).toBeInTheDocument();
    expect(screen.getByTestId("input-password")).toBeInTheDocument();
    expect(screen.getByTestId("input-confirmPassword")).toBeInTheDocument();
  });

  it("submits successfully with valid data", async () => {
    fireEvent.change(screen.getByTestId("input-firstName"), {
      target: { name: "firstName", value: "John" },
    });
    fireEvent.change(screen.getByTestId("input-lastName"), {
      target: { name: "lastName", value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("input-email"), {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { name: "password", value: "Password1@" },
    });
    fireEvent.change(screen.getByTestId("input-confirmPassword"), {
      target: { name: "confirmPassword", value: "Password1@" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.queryByText(/First name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Last name is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Email is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Password is required/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Confirm password is required/i)).not.toBeInTheDocument();
    });
  });

  it("shows error for empty fields", async () => {
    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Confirm password is required/i)).toBeInTheDocument();
    });
  });

  it("shows error when passwords do not match", async () => {
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { name: "password", value: "Password1@" },
    });
    fireEvent.change(screen.getByTestId("input-confirmPassword"), {
      target: { name: "confirmPassword", value: "Password2@" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords must match/i)).toBeInTheDocument();
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

  it("handles form submission errors", async () => {
    mockSignUp = vi.fn(() => Promise.reject("Something went wrong"));

    fireEvent.change(screen.getByTestId("input-firstName"), {
      target: { name: "firstName", value: "John" },
    });
    fireEvent.change(screen.getByTestId("input-lastName"), {
      target: { name: "lastName", value: "Doe" },
    });
    fireEvent.change(screen.getByTestId("input-email"), {
      target: { name: "email", value: "john@example.com" },
    });
    fireEvent.change(screen.getByTestId("input-password"), {
      target: { name: "password", value: "Password1@" },
    });
    fireEvent.change(screen.getByTestId("input-confirmPassword"), {
      target: { name: "confirmPassword", value: "Password1@" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create account/i }));

    await waitFor(() => {
      expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
  });
});
