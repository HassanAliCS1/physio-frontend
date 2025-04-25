import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Accounts from "../../src/pages/MainContent/Account";

vi.mock("../../src/components/CustomButton", () => ({
  default: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

vi.mock("../../src/pages/MainContent/Account/components/InjuryDataForm", () => ({
  default: ({ injuryDetails }) => (
    <div data-testid="injury-form">
      Injury Form - {injuryDetails?.injuryType || "No data"}
    </div>
  ),
}));

const mockRefetchUser = vi.fn();

vi.mock("../../src/hooks/useGetUserInfo", () => ({
  default: () => ({
    user: {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
    },
    injuryDetails: {
      injuryType: "Knee Injury",
    },
    refetchUser: mockRefetchUser,
  }),
}));

describe("Accounts Component", () => {
  const setEditOpen = vi.fn();

  beforeEach(() => {
    render(<Accounts setEditOpen={setEditOpen} editOpen={false} />);
    mockRefetchUser.mockClear();
  });

  afterEach(cleanup);

  it("renders user information", () => {
    expect(screen.getByText("First name")).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === "John")).toBeInTheDocument();

    expect(screen.getByText("Last name")).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === "Doe")).toBeInTheDocument();

    expect(screen.getByText("E-mail address")).toBeInTheDocument();
    expect(screen.getByText((_, el) => el?.textContent === "john@example.com")).toBeInTheDocument();
  });

  it("calls setEditOpen when edit button is clicked", () => {
    const button = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(button);
    expect(setEditOpen).toHaveBeenCalledWith(true);
  });

  it("renders the InjuryDataForm", () => {
    expect(screen.getByTestId("injury-form")).toHaveTextContent("Knee Injury");
  });

  it("calls refetchUser on mount and when editOpen changes", () => {
    render(<Accounts setEditOpen={setEditOpen} editOpen={true} />);
    expect(mockRefetchUser).toHaveBeenCalled();
  });
});
