import React, { useState, useEffect } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { CloseOutlined } from '@mui/icons-material';
import useGetUserInfo from '../../../../../hooks/useGetUserInfo';
import useUpdateUser from '../../../../../hooks/useUpdateUser';

const EditAccount = ({ editOpen, setEditOpen }) => {
    const { user, error, refetchUser } = useGetUserInfo();
    const { updateUser, loading, error: updateError } = useUpdateUser();

    const initialFormData = {
        firstName: '',
        lastName: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.first_name || '',
                lastName: user.last_name || '',
                email: user.email || '',
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({ ...errors, [name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
        }

        if (formData.newPassword.length < 8 && formData.newPassword) {
            newErrors.newPassword = 'Password must be at least 8 characters';
        }
        if (formData.confirmPassword !== formData.newPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        const isFormValid = validateForm();

        if (!isFormValid) {
            alert('Please fill in all fields correctly before submitting.');
            return;
        }

        await updateUser(formData, () => {
            refetchUser();
            alert('User details updated successfully!');
            setEditOpen(false);
        });
    };


    if (error) {
        return <div>Error fetching user data: {error}</div>;
    }
    return (
        <div className={`edit-wrapper ${editOpen ? "open" : ""}`}>
            <div className="user-details-edit">
                <div className="details-action">
                    <h2>Edit personal details</h2>
                    <CloseOutlined onClick={() => setEditOpen(false)} className='close-icon' />
                </div>
                <form onSubmit={handleSaveChanges} className='form'>
                    <div className="form-group">
                        <label>Password (Please Enter your current password before editing)</label>
                        <div className="password-input">
                            <input
                                type={showOldPassword ? 'text' : 'password'}
                                name="oldPassword"
                                value={formData.oldPassword}
                                onChange={handleChange}
                                placeholder="Change password requires current password"
                            />
                            <div
                                className="toggle-password"
                                onClick={() => setShowOldPassword(!showOldPassword)}
                            >
                                {
                                    showOldPassword ?
                                        <VisibilityIcon className='toggle-icon' />
                                        : <VisibilityOffIcon className='toggle-icon' />
                                }
                            </div>
                        </div>
                        {errors.oldPassword && <span className="error">{errors.oldPassword}</span>}
                    </div>
                    <div className="form-group">
                        <div className="password-input">
                            <label>First name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                disabled={formData.oldPassword ? false : true}
                            />
                        </div>
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                        <div className="password-input">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                title='You cannot change your email address'
                                value={formData.email}
                                placeholder="Enter Email"
                                disabled
                                className='disable'
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="password-input">
                            <label>Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                disabled={formData.oldPassword ? false : true}
                            />
                        </div>
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                        <>
                            <div className="form-group">
                                <label>New Password</label>
                                <div className="password-input">
                                    <input
                                        type={showNewPassword ? 'text' : 'password'}
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleChange}
                                        placeholder="Enter your new password"
                                        disabled={formData.oldPassword ? false : true}
                                    />
                                    <div
                                        className="toggle-password"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                    >
                                        {
                                            showNewPassword ?
                                                <VisibilityIcon className='toggle-icon' />
                                                : <VisibilityOffIcon className='toggle-icon' />
                                        }
                                    </div>
                                </div>
                                {errors.newPassword && <span className="error">{errors.newPassword}</span>}
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <div className="password-input">
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="Enter new password"
                                        disabled={formData.oldPassword ? false : true}
                                    />
                                    <div
                                        className="toggle-password"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {
                                            showConfirmPassword ?
                                                <VisibilityIcon className='toggle-icon' />
                                                : <VisibilityOffIcon className='toggle-icon' />
                                        }
                                    </div>
                                </div>
                                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                            </div>
                        </>
                    {updateError && <span className="error">Error: {updateError}</span>}
                    <div className="edit-btn">
                        <button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccount;