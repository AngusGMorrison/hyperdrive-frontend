import React, { useState, useEffect } from 'react';
import './drive.css';

import ControlPanel from '../components/panels/ControlPanel'
import FilePanel from '../components/panels/FilePanel';

const Drive = props => {

  const [files, setFiles] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState(null);

  // useEffect(() => {
  //   API.getDrive()
  //     .then(setFiles)
  //     .catch(console.error); //Handle 403s here with forced logout and redirect
  // });

  return(
    <div className="drive">
      <ControlPanel
        setLoggedIn={props.setLoggedIn} 
        // searchTerm={searchTerm}
        // setSearchTerm={setSearchTerm}
        // sortType={sortType}
        // setSortType={setSortType}
      />
      <FilePanel
        // files={files}
      />
    </div>
  )
}

export default Drive;