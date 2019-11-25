import React from 'react';
import { ICONS } from '../../constants';

const ProfileWidget = props => {
  return(
    <div className="profile-widget" >
      <div className="icon-controls" >
        <img src={ICONS.LOGOUT.WHITE} alt="Logout icon" onClick={props.logOut} />
      </div>
    </div>
  )
}

export default ProfileWidget;