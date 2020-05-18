import React from 'react';
import PropTypes from 'prop-types';
import style from './filterInput.module.css';

const FilterInput = ({ filter, filterInput }) => (
  <div className={style.searchBox}>
    <label className={style.searchLable}>
      Find contacts by name
      <input
        className={style.searchInput}
        type="text"
        placeholder="Add your search..."
        value={filter}
        name="filter"
        onChange={filterInput}
      />
    </label>
  </div>
);

FilterInput.propTypes = {
  filter: PropTypes.string.isRequired,
  filterInput: PropTypes.elementType.isRequired,
};

export default FilterInput;
