import React from 'react';
import Select from 'react-select';

export default function FormSelectPackage({ name, options, handleChange }) {
  return (
    <Select
      isMulti
      name={name}
      options={options}
      className='w-full'
      classNamePrefix='select'
      onChange={handleChange}
    />
  );
}
