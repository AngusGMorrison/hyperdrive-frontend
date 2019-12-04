import React, { useState } from 'react';
import { ICONS, FIELD_TYPES, SORT_TYPES, THEMES } from '../../constants';
import { checkForFolderNameErrors } from '../../validators/validators';
import './panels.css'

import Modal from '../modals/Modal.js'
import BigButton from '../buttons/BigButton';
import SearchField from '../forms/fields/SearchField';
import BinarySelector from '../menus/BinarySelector';
import UploadForm from '../forms/UploadForm';
import ProfileWidget from '../profile/ProfileWidget';

const ControlPanel = props => {

  const [ newFolderModalIsVisible, setNewFolderModalIsVisible ] = useState(false);

  const newFolderForm = {
    name: {
      name: 'name',
      type: FIELD_TYPES.TEXT,
      icon: ICONS.FOLDER,
      placeholder: 'Enter folder name',
      value: '',
      required: true,
      validator: checkForFolderNameErrors
    }
  }

  const newFolderSubmitAction = newFolderDetails => {
    setNewFolderModalIsVisible(false);
    props.createFolder(newFolderDetails);
  }

  const newFolderButtons = {
    primary: {
      text: "Create",
      action: newFolderSubmitAction
    },
    cancel: {
      text: "Cancel"
    }
  }

  const handleNewFolderClick = () => {
    setNewFolderModalIsVisible(true);
  }

  return(
    <div className="control-panel">
      {
        newFolderModalIsVisible &&
        <Modal
          heading="New folder"
          form={newFolderForm}
          buttons={newFolderButtons}
          toggleVisible={setNewFolderModalIsVisible}
          hasCloseIcon
        />
      }
      <img className="drive-logo" src="/logos/hyperdrive-logo-50px.jpg" alt="Hyperdrive logo" />
      <SearchField
        name="search"
        placeholder="Search drive"
        value={props.searchTerm}
        setSearchTerm={props.setSearchTerm}
      />
      <BinarySelector
        heading="Sort by:"
        icon={ICONS.SORT.YELLOW}
        option1={SORT_TYPES.NAME}
        option2={SORT_TYPES.CREATED_AT}
        selectedOption={props.sortType}
        handleClick={props.setSortType}
      />
      <UploadForm
        currentFolder={props.currentFolder}
        updateDrive={props.updateDrive}
      />
      <BigButton
        theme={THEMES.BLUE}
        icon={ICONS.ADD.DARK}
        text={"New folder"}
        action={handleNewFolderClick}
      />
      { props.user &&
        <ProfileWidget
          user={props.user}
          logOut={props.logOut}
        />
      }
    </div>
    
  )
}

export default ControlPanel;