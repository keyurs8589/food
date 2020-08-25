import React from 'react';

const Filter = ({
  filterHead,
  filterData,
  filterChanged,
  selectedDataLength,
}) => {
  return (
    <div className='single-filter'>
      <div className='filter-head'>
        <h4>{filterHead}</h4>
        <span>
          {selectedDataLength !== 0 && `${selectedDataLength} selected`}
        </span>
      </div>
      <div className='filter-list'>
        {filterData && filterHead === 'category'
          ? filterData.map((filter, index) => (
              <div key={index}>
                <label className='p-1'>{filter.categories.name}</label>
                <input
                  type='checkbox'
                  name={filterHead}
                  value={filter.categories.id}
                  onChange={filterChanged}
                />
              </div>
            ))
          : filterHead === 'cuisine'
          ? filterData.map((filter, index) => (
              <div key={index}>
                <label className='p-1'>{filter.cuisine.cuisine_name}</label>
                <input
                  type='checkbox'
                  name={filterHead}
                  value={filter.cuisine.cuisine_id}
                  onChange={filterChanged}
                />
              </div>
            ))
          : filterHead === 'establishment' &&
            filterData.map((filter, index) => (
              <div key={index}>
                <label>{filter.establishment.name}</label>
                <input
                  type='checkbox'
                  name={filterHead}
                  value={filter.establishment.id}
                  onChange={filterChanged}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Filter;
