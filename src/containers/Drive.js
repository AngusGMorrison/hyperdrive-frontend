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

  const addFileToState = file => {
    setFiles([ ...files, file ]);
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

  const setDriveState = driveData => {
    setUserDetails(driveData.user);
    setFiles(driveData.files);
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
    console.log("sorting")
    return b.id - a.id;
  }



  return(
    <div className="drive">
      <ControlPanel
        user={userDetails}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortType={sortType}
        setSortType={setSortType}
        addFileToState={addFileToState}
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