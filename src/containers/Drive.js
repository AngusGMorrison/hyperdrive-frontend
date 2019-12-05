import React, { useState, useEffect } from 'react';
import driveAPI from '../adapters/driveAPI';
import ERROR_HANDLERS from '../errors/errorHandlers';
import ERROR_DETAILS from '../errors/errorDetails';
import './drive.css';

import ControlPanel from '../components/panels/ControlPanel'
import FileContainer from './FileContainer';
import DetailsPanel from '../components/panels/DetailsPanel';
import useContextMenu from '../hooks/useContextMenu';
import useFileSort from '../hooks/useFileSort';

const Drive = props => {
  
  const [ userDetails, setUserDetails ] = useState(null);
  
  const [ searchTerm, setSearchTerm ] = useState('');
  const { contextMenu, openContextMenu, closeContextMenu } = useContextMenu();
  const { sortType, setSortType, sortFiles } = useFileSort();
  const [ selectedFile, setSelectedFile ] = useState(null);

  const initialFolder = { id: null, documents: [], subfolders: [] }
  const [ currentFolder, setCurrentFolder ] = useState(initialFolder);
  const initialFilesToRender = { folders: [], documents: [] }
  const [ filesToRender, setFilesToRender ] = useState(initialFilesToRender);

  useEffect(() => loadFolder(currentFolder), []);

  const loadFolder = targetFolder => {
    driveAPI.getFolder(targetFolder)
      .then(setDriveState)
      .catch(error => ERROR_HANDLERS.handleHttpErrors(error, handleServerError));
  }

  const setDriveState = driveData => {
    console.log(driveData);
    setUserDetails(driveData.user);
    setCurrentFolder(driveData.folder);
    setSelectedFile(null);
  }

  const handleServerError = error => {
    switch (error.code) {
      case 403:
        forbidAccess();
        break;
      default:
        props.setServerError(ERROR_DETAILS.GENERIC)
        break;
    }
  }

  const forbidAccess = () => {
    props.setServerError(ERROR_DETAILS.UNAUTHORIZED);
    props.logOut();
  }

  useEffect(() => {
    setFilesToRender(getFilesToRender());
  }, [currentFolder, sortType, searchTerm]);

  const getFilesToRender = () => {
    const searchResults = searchFiles()
    return sortFiles(searchResults);
  }

  const searchFiles = () => {
    if (!searchTerm) return { documents: [ ...currentFolder.documents ], folders: [ ...currentFolder.subfolders ] };
    return {
      documents: searchFileType("documents"),
      folders: searchFileType("subfolders")
    };
  }

  const searchFileType = fileType => {
    return currentFolder[fileType].filter(file => {
      return file.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
  }

  const updateDrive = (folder, userDetails) => {
    setCurrentFolder(folder);
    setUserDetails(userDetails);
  }

  const deleteFile = file => {
    const confirmation = window.confirm("Delete this file? This can't be undone.")
    if (!confirmation) return;
    driveAPI.deleteFile(file)
      .then(setDriveState)
      .catch(error => ERROR_HANDLERS.handleHttpErrors(error, handleFileError));
  }

  const downloadFile = file => {
    driveAPI.downloadFile(file)
      .catch(error => ERROR_HANDLERS.handleHttpErrors(error, handleFileError));
  }

  const handleFileError = error => {
    switch (error.code) {
      case 403:
        props.forbidAccess();
        break;
      case 404:
        props.setServerError(ERROR_DETAILS.FILE_NOT_FOUND);
        break;
      default:
        props.setServerError(ERROR_DETAILS.GENERIC)
        break;
    }
  }

  const createFolder = folderDetails => {
    driveAPI.createFolder(folderDetails, currentFolder)
      .then(setDriveState)
      .catch(error => ERROR_HANDLERS.handleHttpErrors(error, handleServerError))
  }

  const moveFile = (file, destinationFolder) => {
    driveAPI.moveFile(file, destinationFolder)
      .then(setDriveState)
      .catch(error => ERROR_HANDLERS.handleHttpErrors(error, handleFileError));
  }

  return(
    <div className="drive" onClick={closeContextMenu} onContextMenu={closeContextMenu}>
      <div className="panel-container">
        <div className="static-panels" >
          <ControlPanel
            user={userDetails}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            sortType={sortType}
            setSortType={setSortType}
            currentFolder={currentFolder}
            updateDrive={updateDrive}
            logOut={props.logOut}
            createFolder={createFolder}
            
          />
          {
            currentFolder.id &&
            <FileContainer
              currentFolder={currentFolder}
              files={filesToRender}
              setSelectedFile={setSelectedFile}
              serverError={props.serverError}
              setServerError={props.setServerError}
              contextMenu={contextMenu}
              openContextMenu={openContextMenu}
              forbidAccess={forbidAccess}
              loadFolder={loadFolder}
              deleteFile={deleteFile}
              downloadFile={downloadFile}
              moveFile={moveFile}
            />
          }
        </div>
      </div>
      {
        selectedFile &&
        <DetailsPanel
          file={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      }
    </div>
  )
}

export default Drive;