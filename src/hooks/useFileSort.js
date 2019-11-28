import React, { useState } from 'react';
import { SORT_TYPES } from '../constants';

const useFileSort = () => {

  const [ sortType, setSortType ] = useState(SORT_TYPES.CREATED_AT);

  const sortFiles = filesToSort => {
    const sortFunction = sortFunctions[sortType];
    return [ ...filesToSort ].sort(sortFunction);
  }

  const sortByName = (a, b) => {
    return (a.filename).localeCompare(b.filename);
  }

  const sortByCreatedAt = (a, b) => {
    return b.id - a.id;
  }

  const sortByUpdatedAt = (a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  }

  const sortFunctions = {
    [SORT_TYPES.NAME]: sortByName,
    [SORT_TYPES.CREATED_AT]: sortByCreatedAt,
    [SORT_TYPES.UPDATED_AT]: sortByUpdatedAt
  }

  return ({ sortType, setSortType, sortFiles });

}

export default useFileSort;