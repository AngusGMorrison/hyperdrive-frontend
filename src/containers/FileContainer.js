import React from 'react';
import { BANNER_TYPES, ICONS } from '../constants';
import '../components/panels/panels.css';

import Banner from '../components/banners/Banner';
import NavBar from '../components/menus/NavBar';
import FolderPanel from '../components/panels/FolderPanel';
import DocumentPanel from '../components/panels/DocumentPanel';
import ContextMenu from '../components/menus/ContextMenu';

const FileContainer = props => {

  return(
    <div className="file-container" >
      { 
        props.serverError &&
        <Banner
          type={BANNER_TYPES.ERROR}
          icon={ICONS.CLOUD_OFF.DARK}
          content={props.serverError}
        />
      }
      <NavBar
        currentFolder={props.currentFolder}
        changeFolder={props.changeFolder}
      />
      {
        props.files.folders.length > 0 &&
        <FolderPanel 
          folders={props.files.folders}
          changeFolder={props.changeFolder}
          contextMenu={props.contextMenu}
          openContextMenu={props.openContextMenu}
          setSelectedFile={props.setSelectedFile}
          deleteFile={props.deleteFile}
        />
      }
      {
        props.files.documents.length > 0 &&
        <DocumentPanel
          documents={props.files.documents}
          contextMenu={props.contextMenu}
          openContextMenu={props.openContextMenu}
          setSelectedFile={props.setSelectedFile}
          deleteFile={props.deleteFile}
          downloadFile={props.downloadFile}
        />
      }
      { 
        props.contextMenu.isOpen &&
        <ContextMenu attributes={props.contextMenu} />
      }
    </div>
  )
}

export default FileContainer;