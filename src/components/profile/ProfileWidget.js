import React from 'react';
import { THEMES } from '../../constants';
import './profile.css'

import ExtraSmallButton from '../buttons/ExtraSmallButton';

const ProfileWidget = ({ user, logOut }) => {

  const getUserInitial = () => {
    return user.name.charAt(0);
  }

  const formatStorageTracker = () => {
    const stored = formatStorageUsed();
    const allowance = formatAllowance('MB');
    return `${stored} of ${allowance} used`;
  }

  const formatStorageUsed = () => {
    if (user.storage_used < 1000) {
      return `${user.storage_used} B`;
    } else if (user.storage_used < 1000000) {
      return `${calculateUnitsByExponent(3)} kB`;
    } else {
      return `${calculateUnitsByExponent(6)} MB`;
    }
  }

  const calculateUnitsByExponent = exponent => {
    return Math.ceil(user.storage_used / 10**exponent);
  }

  const formatAllowance = unit => {
    return `${calculateAllowanceByExponent(6)} ${unit}`;
  }

  const calculateAllowanceByExponent = exponent => {
    return Math.floor(user.storage_allowance / 10**exponent);
  }

  return(
    <div className="profile-widget" >
      <div className="avatar" >
        <div className="avatar-initial">
          {getUserInitial()}
        </div>
      </div>
      <div className="profile-details">
        <span className="profile-name">{user.name}</span>
        <span className="storage-tracker">{formatStorageTracker()}</span>
      </div>
      <ExtraSmallButton theme={THEMES.SECONDARY} action={logOut}>
        Log out
      </ExtraSmallButton>
      {/* <div className="icon-controls" >
        <img className="icon-button" src={ICONS.LOGOUT.WHITE} alt="Logout icon" onClick={logOut} title="Log out" draggable={false} />
      </div> */}
    </div>
  )
}

export default ProfileWidget;