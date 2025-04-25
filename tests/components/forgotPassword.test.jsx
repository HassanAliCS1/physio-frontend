import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ForgotPassword from '../../src/pages/ForgotPassword';
import ForgotPasswordMain from '../../src/pages/ForgotPassword/ForgotPasswordMain';
import CodeVerification from '../../src/pages/ForgotPassword/CodeVerification';
import NewPassword from '../../src/pages/ForgotPassword/NewPassword';
import { MemoryRouter } from 'react-router-dom';
import { expect, vi } from 'vitest';

vi.mock('../../hooks/useForgotPassword', () => ({
    useForgotPassword: () => ({
        submitEmail: vi.fn().mockResolvedValue(true),
        loading: false,
        error: null,
    }),
}));

vi.mock('../../hooks/useVerifyResetPasswordOtp', () => ({
    useVerifyResetPasswordOtp: () => ({
        verifyResetPasswordOtp: vi.fn().mockResolvedValue(true),
        loading: false,
        error: null,
    }),
}));

vi.mock('../../hooks/useResetPassword', () => ({
    useResetPassword: () => ({
        resetPassword: vi.fn().mockResolvedValue(true),
        loading: false,
        error: null,
    }),
}));

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

// ForgotPassword Tests
describe('ForgotPassword Component', () => {
    it('renders initial form', () => {
        render(<ForgotPassword />, { wrapper: MemoryRouter });
        expect(screen.getByText(/Don't you have an account/)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Reset Password/ })).toBeInTheDocument();
    });

    it('proceeds with email submission', async () => {
        render(<ForgotPassword />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'physio@gmail.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Reset Password/ }));

        await waitFor(() => {
            expect(screen.queryByText(/Email cannot be empty./)).not.toBeInTheDocument();
        });
    });

    it('shows error if email is empty', async () => {
        render(<ForgotPassword />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: '' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Reset Password/ }));

        await waitFor(() => {
            expect(screen.getByText(/Email cannot be empty./)).toBeInTheDocument();
        });
    });

    it('submitting valid email format', async () => {
        render(<ForgotPassword />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'abc@gmail.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Reset Password/ }));

        await waitFor(() => {
            expect(screen.queryByText(/Please enter a valid email./)).not.toBeInTheDocument();
        });
    });

    it('shows error for invalid email format', async () => {
        render(<ForgotPassword />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'abc@com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Reset Password/ }));

        await waitFor(() => {
            expect(screen.getByText(/Please enter a valid email./)).toBeInTheDocument();
        });
    });

    it('accepts a valid email and proceeds to OTP page', async () => {
        render(<ForgotPassword />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'physio@gmail.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Reset Password/ }));

        await waitFor(() => {
            expect(screen.getByText(/Get Your Code/)).toBeInTheDocument();
        });
    });

    it('submits valid OTP and proceeds to password reset page', async () => {
        render(<ForgotPassword />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'physio@gmail.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Reset Password/ }));

        await waitFor(() => {
            expect(screen.getByText(/Enter 4-digit code/)).toBeInTheDocument();
        });

        ['C', 'O', 'D', 'E'].forEach((label, i) => {
            fireEvent.change(screen.getByRole('textbox', { name: new RegExp(label, 'i') }), {
                target: { value: `${i + 1}` },
            });
        });
        fireEvent.click(screen.getByRole('button', { name: /Verify and Proceed/ }));

        await waitFor(() => {
            expect(screen.getByLabelText(/New Password/)).toBeInTheDocument();
        });
    });

    it('shows error when OTP length is less than 4 digits', async () => {
        render(<ForgotPassword />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'example@gmail.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Reset Password/ }));

        await waitFor(() => {
            expect(screen.getByText(/Enter 4-digit code/)).toBeInTheDocument();
        });

        // Only 3 digits
        fireEvent.change(screen.getByRole('textbox', { name: /C/i }), { target: { value: '1' } });
        fireEvent.change(screen.getByRole('textbox', { name: /O/i }), { target: { value: '2' } });
        fireEvent.change(screen.getByRole('textbox', { name: /D/i }), { target: { value: '3' } });

        fireEvent.click(screen.getByRole('button', { name: /Verify and Proceed/ }));

        await waitFor(() => {
            expect(screen.getByText(/Enter 4-digit code/)).toBeInTheDocument();
        });
    });

    it('shows alert when passwords do not match', async () => {
        const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });
        render(<ForgotPassword />, { wrapper: MemoryRouter });
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'reset@fail.com' },
        });
        fireEvent.click(screen.getByRole('button', { name: /Reset Password/ }));

        await waitFor(() => {
            expect(screen.getByText(/Enter 4-digit code/)).toBeInTheDocument();
        });

        ['C', 'O', 'D', 'E'].forEach((label, i) => {
            fireEvent.change(screen.getByRole('textbox', { name: new RegExp(label, 'i') }), {
                target: { value: `${i + 1}` },
            });
        });
        fireEvent.click(screen.getByRole('button', { name: /Verify and Proceed/ }));

        await waitFor(() => {
            expect(screen.getByLabelText(/New Password/)).toBeInTheDocument();
        });

        fireEvent.change(screen.getByLabelText(/New Password/), {
            target: { value: 'Password123@#' },
        });
        fireEvent.change(screen.getByLabelText(/Confirm Password/), {
            target: { value: 'NewPassword123@#' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Reset Password/ }));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith('Passwords do not match.');
        });

        alertSpy.mockRestore();
    });
});

// ForgotPasswordMain Tests
describe('ForgotPasswordMain Component', () => {
    it('shows email error', () => {
        render(
            <ForgotPasswordMain
                handleSubmit={vi.fn()}
                handleChange={vi.fn()}
                email=""
                emailError="Server error"
                emptyEmailError=""
            />
        );

        expect(screen.getByText(/Server error/)).toBeInTheDocument();
    });

    it('disables button on loading', () => {
        render(
            <ForgotPasswordMain
                handleSubmit={vi.fn()}
                handleChange={vi.fn()}
                email="test@example.com"
                emailLoading
                emailError=""
                emptyEmailError=""
            />
        );

        expect(screen.getByRole('button')).toBeDisabled();
    });
});

// CodeVerification Tests
describe('CodeVerification Component', () => {
    it('get all 4 OTP inputs and handles changes', () => {
        const mockChange = vi.fn();
        render(
            <CodeVerification
                handleCodeVerification={vi.fn()}
                handleChange={mockChange}
                formData={{ code1: '', code2: '', code3: '', code4: '' }}
            />
        );

        ['C', 'O', 'D', 'E'].forEach(label => {
            const input = screen.getByRole('textbox', { name: new RegExp(label, 'i') });
            fireEvent.change(input, {
                target: { value: '1' },
            });

            expect(mockChange).toHaveBeenCalled();
        });
    });

    it('check verification on form submit', () => {
        const handleVerify = vi.fn((e) => e.preventDefault());
        render(
            <CodeVerification
                handleCodeVerification={handleVerify}
                handleChange={vi.fn()}
                formData={{ code1: '1', code2: '2', code3: '3', code4: '4' }}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /Verify and Proceed/ }));
        expect(handleVerify).toHaveBeenCalled();
    });
});


// NewPassword Tests
describe('NewPassword Component', () => {
    it('component render and show password fields', () => {
        render(
            <NewPassword
                handlePasswordReset={vi.fn()}
                handleChange={vi.fn()}
                newPassword=""
                confirmPassword=""
                resetLoading={false}
                resetError=""
            />
        );

        expect(screen.getByLabelText(/New Password/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirm Password/)).toBeInTheDocument();
    });

    it('displays reset error', () => {
        render(
            <NewPassword
                handlePasswordReset={vi.fn()}
                handleChange={vi.fn()}
                newPassword=""
                confirmPassword=""
                resetLoading={false}
                resetError="Reset failed"
            />
        );

        expect(screen.getByText(/Reset failed/)).toBeInTheDocument();
    });

    it('disables button when loading', () => {
        render(
            <NewPassword
                handlePasswordReset={vi.fn()}
                handleChange={vi.fn()}
                newPassword=""
                confirmPassword=""
                resetLoading
                resetError=""
            />
        );

        expect(screen.getByRole('button', { name: /Resetting.../ })).toBeDisabled();
    });
});
