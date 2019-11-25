import React from 'react';
import { ICONS } from '../../../constants';

const SearchField = props => {

  const handleChange = event => {
    props.setSearchTerm(event.target.value);
  }

  return(
    <div className="field-container">
      <div className="search-field field">
        <img
          className="field-icon"
          src={ICONS.SEARCH.YELLOW}
          alt="Search field icon"
        />

        <input
          name={props.name}
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
    </div>
  );
}

export default SearchField;