import React, { useState, useEffect } from 'react';

import ControlPanel from '../components/controlPanel/ControlPanel'

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
    <div>
      <ControlPanel
        setLoggedIn={props.setLoggedIn} 
        // searchTerm={searchTerm}
        // setSearchTerm={setSearchTerm}
        // sortType={sortType}
        // setSortType={setSortType}
      />
      {/* <FilePanel
        files={files}
      /> */}
    </div>
  )
}

export default Drive;