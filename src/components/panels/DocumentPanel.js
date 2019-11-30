import React from 'react';

import FileCard from '../cards/FileCard';

const DocumentPanel = props => {

  const renderDocuments = () => {
    return props.documents.map(document => {
      return(
        <FileCard
          key={document.id}
          file={document}
          openContextMenu={props.openContextMenu}
          setSelectedFile={props.setSelectedFile}
        />
      );
    });
  }

  return(
    <div className="document-panel" >
      <h2 className="file-panel-heading">Files</h2>
      { renderDocuments() }
    </div>
  )

};

export default DocumentPanel;