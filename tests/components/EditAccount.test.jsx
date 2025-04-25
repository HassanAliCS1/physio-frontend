import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EditAccount from "../../src/pages/MainContent/Account/components/EditAccount";

vi.mock("@mui/icons-material/Visibility", () => ({
    default: () => <div data-testid="icon-visible">VisibleIcon</div>,
}));
vi.mock("@mui/icons-material/VisibilityOff", () => ({
    default: () => <div data-testid="icon-hidden">HiddenIcon</div>,
}));
vi.mock("@mui/icons-material/CloseOutlined", () => ({
    default: (props) => (
        <div data-testid="close-icon" onClick={props.onClick}>
            CloseIcon
        </div>
    ),
}));

const refetchUser = vi.fn();

vi.mock("../../../src/hooks/useGetUserInfo", () => ({
    default: () => ({
        user: {
            first_name: "John",
            last_name: "Doe",
            email: "john@example.com",
        },
        error: null,
        refetchUser,
    }),
}));

describe("EditAccount Component", () => {
    let setEditOpen;

    beforeEach(() => {
        setEditOpen = vi.fn();
    });

    it("renders the form fields with pre-filled user data", async () => {
        render(<EditAccount editOpen={true} setEditOpen={setEditOpen} />);

        fireEvent.change(
            screen.getByPlaceholderText("Change password requires current password"),
            {
                target: { value: "OldPass123@" },
            }
        );
        fireEvent.change(
            screen.getByPlaceholderText("Enter first name"),
            {
                target: { value: "John" },
            }
        );
        fireEvent.change(
            screen.getByPlaceholderText("Enter last name"),
            {
                target: { value: "Doe" },
            }
        );

        await waitFor(() => {
            const firstNameInput = screen.getByPlaceholderText("Enter first name");
            const lastNameInput = screen.getByPlaceholderText("Enter last name");

            expect(firstNameInput).toHaveValue("John");
            expect(lastNameInput).toHaveValue("Doe");
        });
    });

    it("disables name fields when old password is empty", () => {
        render(<EditAccount editOpen={true} setEditOpen={setEditOpen} />);

        expect(screen.getByPlaceholderText("Enter first name")).toBeDisabled();
        expect(screen.getByPlaceholderText("Enter last name")).toBeDisabled();
    });

    it("enables fields after entering old password", () => {
        render(<EditAccount editOpen={true} setEditOpen={setEditOpen} />);

        fireEvent.change(
            screen.getByPlaceholderText("Change password requires current password"),
            {
                target: { value: "OldPass123@" },
            }
        );

        expect(screen.getByPlaceholderText("Enter first name")).not.toBeDisabled();
        expect(screen.getByPlaceholderText("Enter last name")).not.toBeDisabled();
    });

    it("shows validation error for mismatched confirm password", async () => {
        render(<EditAccount editOpen={true} setEditOpen={setEditOpen} />);

        fireEvent.change(
            screen.getByPlaceholderText("Change password requires current password"),
            {
                target: { value: "OldPass123@" },
            }
        );
        fireEvent.change(screen.getByPlaceholderText("Enter your new password"), {
            target: { value: "NewPass123" },
        });
        fireEvent.change(screen.getByPlaceholderText("Enter new password"), {
            target: { value: "WrongPass" },
        });

        fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

        await waitFor(() => {
            expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
        });
    });

    it("closes the form when Close icon is clicked", () => {
        render(<EditAccount editOpen={true} setEditOpen={setEditOpen} />);

        fireEvent.click(screen.getByTestId("close-icon"));
        expect(setEditOpen).toHaveBeenCalledWith(false);
    });
});
