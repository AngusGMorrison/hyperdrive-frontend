import React, { useState } from 'react';

const useContextMenu = () => {

  const POSITION_OFFSET_PX = 10

  const initialContextMenu = {
    isOpen: false,
    fileId: null,
    position: {
      top: 0,
      left: 0
    }
  }

  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const openContextMenu = (file, mouseCoords) => {
    setContextMenu({
      isOpen: true,
      file: file,
      position: {
        top: mouseCoords.y - POSITION_OFFSET_PX,
        left: mouseCoords.x - POSITION_OFFSET_PX
      }
    });
  }

  const closeContextMenu = (event = null) => {
    if (event) { event.preventDefault() };
    contextMenu.isOpen && setContextMenu(initialContextMenu);
  }

  return({ contextMenu, openContextMenu, closeContextMenu });
}

export default useContextMenu;