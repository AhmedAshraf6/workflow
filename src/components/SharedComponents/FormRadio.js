import React from 'react';

export default function FormRadio({
  name,
  valyes,
  valno,
  handleChange,
  labelName,
  defaultValue,
}) {
  return (
    <div>
      <h3> {labelName || name}</h3>
      <div className='flex gap-3'>
        <div>
          <input
            type='radio'
            name={name}
            value={valyes}
            id='yes'
            checked={defaultValue === valyes}
            onChange={handleChange}
          />
          <label htmlFor='yes'>Yes</label>
        </div>
        <div>
          <input
            type='radio'
            name={name}
            value={valno}
            id='no'
            checked={defaultValue === valno}
            onChange={handleChange}
          />
          <label htmlFor='no'>No</label>
        </div>
      </div>
    </div>
  );
}
