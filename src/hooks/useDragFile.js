import React, { useState } from 'react';

const useDragFile = file => {

  const [ isDragged, setIsDragged ] = useState(false);

  const handleDragStart = event => {
    event.dataTransfer.setData('text', JSON.stringify(file));
    setIsDragged(true);
  }

  const handleDragEnd = event => {
    event.dataTransfer.clearData();
    setIsDragged(false);
  }

  return { isDragged, handleDragStart, handleDragEnd }

}

export default useDragFile;