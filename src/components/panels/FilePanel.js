import React, { useState } from 'react';
import './panels.css';

import FileCard from "../cards/FileCard";

const FilePanel = props => {

  const renderFiles = () => {
    return props.files.map(file => {
      return <FileCard key={file.id} file={file} />
    });
  }

  return(
    <div className="file-panel-container" >
      <div className="file-panel" >
        {renderFiles()}
      </div>
    </div>
  )
}

export default FilePanel;