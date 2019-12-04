import React from 'react';

import { ICONS } from '../../constants';

const DetailsPanel = ({ file, setSelectedFile }) => {

  const unrenderedProperties = ["id", "name"]

  const renderFileDetails = () => {
    return Object.entries(file).map(([k, v]) => {
      if (!unrenderedProperties.includes(k)) {
        return(
          <tr key={k}>
            <td>{makeSentenceCase(k)}:</td><td>{v}</td>
          </tr>
        );
      } 
    });
  }

  const makeSentenceCase = snakeCaseString => {
    const noUnderscores = snakeCaseString.replace(/_/g, " ");
    const sentence = noUnderscores.charAt(0).toUpperCase() + noUnderscores.substring(1);
    return sentence;
  }

  const closePanel = () => {
    setSelectedFile(null);
  }

  return(
    <div className="details-panel" >
      <div className="details-content">
        <div className="close-icon-container">
          <img className="close-icon icon-button" src={ICONS.CLOSE.DARK} onClick={closePanel} alt="Close details panel" draggable={false} />
        </div>
        <h3>{file.name}</h3>
        <table>
          {renderFileDetails()}
        </table>
      </div>
    </div>
  )
}

export default DetailsPanel;