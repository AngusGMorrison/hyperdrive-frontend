import React from 'react';

import driveAPI from '../../adapters/driveAPI';

const ControlPanel = props => {

  const handleSubmit = event => {
    event.preventDefault();
    const file = new FormData(event.target);
    driveAPI.uploadFile(file);
  }

  return(
    <form onSubmit={handleSubmit}>
      <label htmlFor="file">Upload</label>
      <input type="file" name="file" accept=".txt, image/jpg" />
      <button>Submit</button>
    </form>
  )
}

export default ControlPanel;