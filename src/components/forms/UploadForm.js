import React, { useState } from 'react';
import driveAPI from '../../adapters/driveAPI';

import { ICONS } from '../../constants';

const UploadForm = props => {
  
  const initialProgress = {loaded: 0, total: 1};
  const [ uploadProgress, setUploadProgress ] = useState(initialProgress);
  const [ isUploading, setIsUploading ] = useState(false);

  const [ isDraggedOver, setIsDraggedOver ] = useState(false);

  const form = React.createRef();
  const fileInput = React.createRef();

  const clickFileInput = event => {
    event.stopPropagation();
    fileInput.current.click();
  }

  const handleDragOver = event => {
    event.preventDefault();
    setIsDraggedOver(true);
  }

  const handleDragLeave = event => {
    event.preventDefault();
    setIsDraggedOver(false);
  }

  const handleDrop = event => {
    event.preventDefault();
    setIsDraggedOver(false);
    if (!event.dataTransfer.files[0]) return;
    const formData = new FormData();
    formData.append('document', event.dataTransfer.files[0]);
    uploadFile(formData);
    setIsUploading(true);
  }

  const handleManualSubmit = event => {
    event.preventDefault();
    const formData = new FormData(form.current);
    uploadFile(formData);
    setIsUploading(true);
    form.current.reset();
  }

  const uploadFile = formData => {
    formData.append('parent_folder_id', props.currentFolder.id);
    driveAPI.uploadFile(formData, setUploadProgress, handleResponse);
  }

  const handleResponse = response => {
    setUploadProgress(initialProgress);
    props.updateDrive(response.folder, response.user);
    setIsUploading(false);
  }

  return(
    <form
      ref={form}
      className={`upload-zone ${isDraggedOver ? 'dragged-over' : null }`}
      onChange={handleManualSubmit}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label className="upload-label" onClick={clickFileInput} htmlFor="file">
        <img className="upload-icon" src={ICONS.CLOUD_UPLOAD.BLUE} alt="Cloud upload icon" draggable={false} />
        Drag files or click here to upload
      <input className="manual-file-input" onClick={e => e.stopPropagation()} ref={fileInput} type="file" name="document" accept=".txt, image/jpg" />
      </label>
      <progress className={`upload-progress ${isUploading ? null : 'hidden'}`} value={uploadProgress.loaded} max={uploadProgress.total}></progress>
    </form>
  );
  
}

export default UploadForm;