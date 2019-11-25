import React, { useState } from 'react';
import driveAPI from '../../adapters/driveAPI';

const UploadForm = props => {
  
  const initialProgress = {loaded: 0, total: 1};
  const [uploadProgress, setUploadProgress] = useState(initialProgress);

  const handleSubmit = event => {
    event.preventDefault();
    const file = new FormData(event.target);
    driveAPI.uploadFile(file, setUploadProgress, handleResponse);
    event.target.reset();
  }

  const handleResponse = response => {
    setUploadProgress(initialProgress);
    props.addFileToState(response.files[0]);
  }

  return(
    <form className="upload-zone" onSubmit={handleSubmit}>
      <label htmlFor="file">Upload</label>
      <input type="file" name="file" accept=".txt, image/jpg" />
      <button>Submit</button>
      <progress value={uploadProgress.loaded} max={uploadProgress.total}></progress>
    </form>
  );
  
}

export default UploadForm;