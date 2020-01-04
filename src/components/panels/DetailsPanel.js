import React from 'react';

import { ICONS } from '../../constants';

const DetailsPanel = ({ file, setSelectedFile }) => {

  const renderFileDetails = () => {
    const detailsToRender = getDetailsToRender();
    return detailsToRender.map(([k, v]) => {
      return(
        <tr key={k}>
          <td>{makeSentenceCase(k)}:</td><td className="right-column">{v}</td>
        </tr>
      )
    });
  }

  const getDetailsToRender = () => {
    const hiddenFileDetails = ["id", "name"];
    return Object.entries(file).filter(([k, v]) => {
      return !hiddenFileDetails.includes(k);
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
        <h3 className="break">{file.name}</h3>
        <table>
          <tbody>
            {renderFileDetails()}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DetailsPanel;