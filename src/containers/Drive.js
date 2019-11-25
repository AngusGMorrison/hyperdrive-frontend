import React, { useState, useEffect } from 'react';
import driveAPI from '../adapters/driveAPI';
import { SORT_TYPES } from '../constants';
import ERROR_HANDLERS from '../errors/errorHandlers';
import ERROR_DETAILS from '../errors/errorDetails';
import './drive.css';

import ControlPanel from '../components/panels/ControlPanel'
import FilePanel from '../components/panels/FilePanel';

const Drive = props => {

  const [userDetails, setUserDetails] = useState({});
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState(SORT_TYPES.CREATED_AT);
  
  useEffect(() => {
    driveAPI.getFilesInFolder()
      .then(setDriveState)
      .catch(error => {
        ERROR_HANDLERS.handleHttpErrors(error, handleServerError);
      });
  }, []);

  const setDriveState = driveData => {
    console.log(driveData)
    setUserDetails(driveData.user);
    setFiles(driveData.user.files);
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

  const getFilesToRender = () => {
    const filesToRender = searchFiles()
    return sortFiles(filesToRender);
  }

  const searchFiles = () => {
    if (!searchTerm) return files;
    return files.filter(file => {
      return file.filename.includes(searchTerm);
    });
  }

  const sortFiles = files => {
    const sortFunction = sortType === SORT_TYPES.NAME ? sortByName : sortByCreatedAt;
    return files.sort(sortFunction);
  }

  const sortByName = (a, b) => {
    return (a.filename).localeCompare(b.filename);
  }

  const sortByCreatedAt = (a, b) => {
    return new Date(b.created_at) - new Date(a.created_at);
  }

  const forbidAccess = () => {
    props.setServerError(ERROR_DETAILS.UNAUTHORIZED);
    props.logOut();
  }

  return(
    <div className="drive">
      <ControlPanel
        user={userDetails}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortType={sortType}
        setSortType={setSortType}
        logOut={props.logOut}
      />
      <FilePanel
        files={getFilesToRender()}
        serverError={props.serverError}
      />
    </div>
  )
}

export default Drive;