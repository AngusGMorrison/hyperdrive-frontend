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
    setIsDraggedOver(false);
    const droppedFile = parseDataTransfer(event.dataTransfer);
    if (fileIsTarget(droppedFile)) return;
    dropAction(droppedFile, target);
  }

  const parseDataTransfer = dataTransfer => {
    try {
      const droppedData = dataTransfer.getData('text');
      const droppedFile = JSON.parse(droppedData);
      return droppedFile;
    } catch (e) {
      // Develop
      console.error(e);
    }
  }

  const fileIsTarget = (file) => {
    return (file.id === target.id) && (file.created_at === target.created_at);
  }

  return { isDraggedOver, handleDragOver, handleDragLeave, handleDrop }

}

export default useDropFile;