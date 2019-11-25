import React from 'react';
import { ICONS, SORT_TYPES } from '../../constants';
import './panels.css'

import SearchField from '../forms/fields/SearchField';
import BinarySelector from '../selectors/BinarySelector';
import UploadForm from '../forms/UploadForm';
import ProfileWidget from '../profile/ProfileWidget';

const ControlPanel = props => {

  return(
    <div className="control-panel">
      <img className="drive-logo" src="/logos/hyperdrive-logo-50px.jpg" alt="Hyperdrive logo" />
      <SearchField name="search" placeholder="Search drive" value={props.searchTerm} setSearchTerm={props.setSearchTerm} />
      <BinarySelector
        heading="Sort by:"
        icon={ICONS.SORT.YELLOW}
        option1={SORT_TYPES.NAME}
        option2={SORT_TYPES.CREATED_AT}
        selectedOption={props.sortType}
        handleClick={props.setSortType}
      />
      <UploadForm />
      <ProfileWidget logOut={props.logOut} />
    </div>
    
  )
}

export default ControlPanel;