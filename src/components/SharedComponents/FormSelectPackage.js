import React from 'react';
import Select from 'react-select';

export default function FormSelectPackage({
  name,
  options,
  handleChange,
  value,
}) {
  return (
    <Select
      isMulti
      name={name}
      options={options}
      className='w-full text-neutral'
      classNamePrefix='select'
      onChange={handleChange}
      value={value}
      menuPlacement='auto'
      maxMenuHeight={200}
    />
  );
}
