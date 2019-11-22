import React, { useState } from 'react';
import driveAPI from '../../adapters/driveAPI';
import { ICONS } from '../../constants';
import './panels.css'

import TextField from '../forms/fields/TextField';
import BinarySelector from '../selectors/BinarySelector';

const ControlPanel = props => {

  const initialProgress = {loaded: 0, total: 1};
  const [uploadProgress, setUploadProgress] = useState(initialProgress);

  const handleSubmit = event => {
    event.preventDefault();
    const file = new FormData(event.target);
    driveAPI.uploadFile(file, setUploadProgress, handleResponse);
  }

  const handleResponse = response => {
    setUploadProgress(initialProgress);
    console.log(response);
  }

  return(
    <div className="control-panel">
      <img className="drive-logo" src="/logos/hyperdrive-logo-50px.jpg" alt="Hyperdrive logo" />
      <TextField icon={ICONS.SEARCH} placeholder="Search" />
      <BinarySelector heading="Sort by:" icon={ICONS.SORT.YELLOW} option1="name" option2="updated at" handleClick={() => {}} />
      <form className="upload-zone" onSubmit={handleSubmit}>
        <label htmlFor="file">Upload</label>
        <input type="file" name="file" accept=".txt, image/jpg" />
        <button>Submit</button>
        <progress value={uploadProgress.loaded} max={uploadProgress.total}></progress>
      </form>
    </div>
    
  )
}

export default ControlPanel;