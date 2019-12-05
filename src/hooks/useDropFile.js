import React, { useState } from 'react';

const useDropFile = (target, dropAction) => {

  const [ isDraggedOver, setIsDraggedOver ] = useState(false);

  const handleDragOver = event => {
    event.stopPropagation();
    event.preventDefault();
    setIsDraggedOver(true);
  }

  const handleDragLeave = event => {
    setIsDraggedOver(false);
  }

  const handleDrop = event => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggedOver(false);
    const droppedFile = parseDataTransfer(event.dataTransfer);
    if (!isValid(droppedFile)) return;
    dropAction(droppedFile, target);
  }

  const parseDataTransfer = dataTransfer => {
    try {
      const droppedData = dataTransfer.getData('text');
      return JSON.parse(droppedData);
    } catch (e) {
      console.error("Couldn't parse dropped object. It probably wasn't a file.")
    }
    
  }

  const isValid = droppedFile => {
    return droppedFile && isAFile(droppedFile) && !isOwnTarget(droppedFile)
  }

  const isOwnTarget = file => {
    return (file.id === target.id) && (file.created_at === target.created_at);
  }

  const isAFile = droppedFile => {
    return droppedFile.type ? true : false
  }

  return { isDraggedOver, handleDragOver, handleDragLeave, handleDrop }

}

export default useDropFile;