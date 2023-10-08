import React from 'react';

export default function FormRow({
  type,
  name,
  value,
  handleChange,
  labelText,
  pointer,
  placeholder,
  colorInput = 'text-dark',
  bgColorInput = 'bg-white',
  labelColor = 'text-gray-900',
  ring = 'ring-1',
  readonly,
  isrequired,
}) {
  return (
    <div>
      {!placeholder && (
        <label
          htmlFor={name}
          className={`block text-sm font-medium leading-6 ${labelColor}`}
        >
          {labelText || name}
        </label>
      )}

      <div className='mt-2'>
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className={`block w-full rounded-md border-0 py-1.5 ${bgColorInput} ${colorInput} shadow-sm  ${ring} ring-inset placeholder:text-gray-400  sm:text-sm sm:leading-6 px-2`}
          placeholder={placeholder}
          readOnly={readonly}
          required={isrequired}
        />
      </div>
    </div>
  );
}
