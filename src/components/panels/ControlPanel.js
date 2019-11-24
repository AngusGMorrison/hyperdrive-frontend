import React from 'react';
import { ICONS } from '../../constants';
import './panels.css'

import TextField from '../forms/fields/TextField';
import BinarySelector from '../selectors/BinarySelector';
import UploadForm from '../forms/UploadForm';
import ProfileWidget from '../profile/ProfileWidget';

const ControlPanel = props => {

  return(
    <div className="control-panel">
      <img className="drive-logo" src="/logos/hyperdrive-logo-50px.jpg" alt="Hyperdrive logo" />
      <TextField icon={ICONS.SEARCH} placeholder="Search" />
      <BinarySelector heading="Sort by:" icon={ICONS.SORT.YELLOW} option1="name" option2="updated at" handleClick={() => {}} />
      <UploadForm />
      <ProfileWidget />
    </div>
    
  )
}

export default ControlPanel;