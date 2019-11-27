import React, { useState, useEffect } from 'react';
import driveAPI from '../adapters/driveAPI';
import { SORT_TYPES } from '../constants';
import ERROR_HANDLERS from '../errors/errorHandlers';
import ERROR_DETAILS from '../errors/errorDetails';
import './drive.css';

import ControlPanel from '../components/panels/ControlPanel'
import FilePanel from '../components/panels/FilePanel';

const Drive = props => {
  
  const [userDetails, setUserDetails] = useState(null);

  const [files, setFiles] = useState([]);
  const [filesToRender, setFilesToRender] = useState([]);

  const addFileAndUpdateUser = (file, userDetails) => {
    setFiles([ ...files, file ]);
    setUserDetails({ ...userDetails });
  }

  const removeFileAndUpdateUser = (deletedFile, userDetails) => {
    setFiles(files.filter(file => {
      return file.id !== deletedFile.id;
    }));
    setUserDetails({...userDetails});
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState(SORT_TYPES.CREATED_AT);
  
  useEffect(() => {
    driveAPI.getFilesInFolder()
      .then(setDriveState)
      .catch(error => {
        ERROR_HANDLERS.handleHttpErrors(error, handleServerError);
      });
  }, []);

  useEffect(() => {
    setFilesToRender(getFilesToRender());
  }, [files, sortType, searchTerm]);

  const setDriveState = driveData => {
    setUserDetails(driveData.user);
    setFiles(driveData.documents);
  }

  const handleServerError = error => {
    switch (error.code) {
      case 403:
        forbidAccess();
        break;
      default:
        console.error(error);
    }
  }

  const forbidAccess = () => {
    props.setServerError(ERROR_DETAILS.UNAUTHORIZED);
    props.logOut();
  }

  const getFilesToRender = () => {
    const searchResults = searchFiles()
    return sortFiles(searchResults);
  }

  const searchFiles = () => {
    if (!searchTerm) return [ ...files ];
    return files.filter(file => {
      return file.filename.includes(searchTerm);
    });
  }

  const sortFiles = filesToSort => {
    const sortFunction = sortType === SORT_TYPES.NAME ? sortByName : sortByCreatedAt;
    return filesToSort.sort(sortFunction);
  }

  const sortByName = (a, b) => {
    return (a.filename).localeCompare(b.filename);
  }

  const sortByCreatedAt = (a, b) => {
    return b.id - a.id;
  }

  const initialContextMenu = {
    isOpen: false,
    fileId: null,
    position: {
      top: 0,
      left: 0
    }
  }

  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const openContextMenu = (file, mouseCoords) => {
    setContextMenu({
      isOpen: true,
      file: file,
      position: {
        top: mouseCoords.y - 10,
        left: mouseCoords.x - 10
      }
    });
  }

  const closeContextMenuNoDefault = (event) => {
    event.preventDefault();
    closeContextMenu();
  }
  
  const closeContextMenu = () => {
    contextMenu.isOpen && setContextMenu(initialContextMenu);
  }

  return(
    <div className="drive" onClick={closeContextMenu} onContextMenu={closeContextMenuNoDefault}>
      <ControlPanel
        user={userDetails}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortType={sortType}
        setSortType={setSortType}
        addFileAndUpdateUser={addFileAndUpdateUser}
        logOut={props.logOut}
        
      />
      <FilePanel
        files={filesToRender}
        serverError={props.serverError}
        setServerError={props.setServerError}
        contextMenu={contextMenu}
        openContextMenu={openContextMenu}
        removeFileAndUpdateUser={removeFileAndUpdateUser}
        forbidAccess={forbidAccess}
      />
    </div>
  )
}

export default Drive;