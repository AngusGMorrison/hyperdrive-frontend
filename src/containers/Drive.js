import React, { useState, useEffect } from 'react';
import driveAPI from '../adapters/driveAPI';
import ERROR_HANDLERS from '../errors/errorHandlers';
import ERROR_DETAILS from '../errors/errorDetails';
import './drive.css';

import ControlPanel from '../components/panels/ControlPanel'
import FilePanel from '../components/panels/FilePanel';

const Drive = props => {

  const [userDetails, setUserDetails] = useState({});
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState(null);
  
  useEffect(() => {
    driveAPI.getFilesInFolder()
      .then(renderDrive)
      .catch(error => {
        ERROR_HANDLERS.handleHttpErrors(error, handleServerError);
      });
  }, []);

  const renderDrive = driveData => {
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
        // sortType={sortType}
        // setSortType={setSortType}
        logOut={props.logOut}
      />
      <FilePanel
        files={files}
        serverError={props.serverError}
      />
    </div>
  )
}

export default Drive;