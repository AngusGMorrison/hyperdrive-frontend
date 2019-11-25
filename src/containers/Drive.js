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
      .then(data => {
        setUserDetails(data.user);
        setFiles(data.user.files);
      })
      .catch(error => {
        ERROR_HANDLERS.handleHttpErrors(error, handleServerError);
      });
  }, []);

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
    props.logout();
  }

  return(
    <div className="drive">
      <ControlPanel
        user={userDetails}
        setLoggedIn={props.setLoggedIn} 
        // searchTerm={searchTerm}
        // setSearchTerm={setSearchTerm}
        // sortType={sortType}
        // setSortType={setSortType}
      />
      <FilePanel
        files={files}
        serverError={props.serverError}
      />
    </div>
  )
}

export default Drive;