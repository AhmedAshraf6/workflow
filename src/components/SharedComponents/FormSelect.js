import React from 'react';

export default function FormSelect({
  name,
  defaultValue,
  options,
  handleChange,
  labelText,
  addEmptyOption,
  nolabel,
  colorInput = 'text-dark',
  bgColorInput = 'bg-white',
  labelColor = 'text-gray-900',
}) {
  return (
    <div>
      {!nolabel && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium leading-6 ${labelColor}`}
        >
          {labelText}
        </label>
      )}
      <select
        className={`block w-full px-4 py-2 mt-2 ${colorInput} text-lg ${bgColorInput} border  rounded-md shadow-sm focus:outline-none focus:border-dark sm:text-sm cursor-pointer`}
        onChange={handleChange}
        value={defaultValue}
        name={name}
      >
        {addEmptyOption && <option></option>}
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
