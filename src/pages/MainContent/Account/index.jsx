import React, { useEffect } from 'react'
import CustomButton from '../../../components/CustomButton';
import InjuryDataForm from './components/InjuryDataForm'
import useGetUserInfo from '../../../hooks/useGetUserInfo';

const Accounts = ({ setEditOpen, editOpen }) => {
    const { user, injuryDetails, refetchUser } = useGetUserInfo();

    useEffect(() => {
        refetchUser();
    }, [editOpen]);

    return (
        <div className='account'>
            <div className="account-container">
                <h2 className="title">Account</h2>
                <div className="account-details-wrapper">
                    <div
                        className="account-info"
                    >
                        <div className="details-container">
                            <h2 classNames="sub-title">Account Info</h2>
                            <div className="info-item">
                                <label>First name</label>
                                <span>:</span>
                                <p>{user?.first_name}</p>
                            </div>
                            <div className="info-item">
                                <label>Last name</label>
                                <span>:</span>
                                <p>{user?.last_name}</p>
                            </div>
                            <div className="info-item">
                                <label>E-mail address</label>
                                <span>:</span>
                                <p>{user?.email}</p>
                            </div>
                        </div>
                        <div className="btn-container">
                            <div onClick={() => setEditOpen(true)}>
                                <CustomButton
                                    type="submit"
                                    className="create-button"
                                    width="120px"
                                >
                                    edit
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
                <h2>Injury details</h2>
                <div className="injury-form-details">
                    <InjuryDataForm injuryDetails={injuryDetails} />
                </div>
            </div>
        </div>
    )
}

export default Accounts;