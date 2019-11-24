import React, { useState, useEffect } from 'react';
import driveAPI from '../adapters/driveAPI';
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
      });
    //Handle 403s here with forced logout and redirect
  }, []);

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
      />
    </div>
  )
}

export default Drive;