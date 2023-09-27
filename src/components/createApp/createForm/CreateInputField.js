import React, { useState } from 'react';
import { FormRow, FormSelect } from '../../SharedComponents';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  addInputToExtraFields,
  clearValues,
  handleChangeCreatedInput,
} from '../../../features/app/formBuilderSlice';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../../../utils/axios';
import FormRadio from '../../SharedComponents/FormRadio';
import {
  typesInputField,
  useFetchInputsTypesField,
} from '../../../utils/reactQueryCustomHooks';
export default function CreateInputField({ setActiveField }) {
  const { sections, fieldName, fieldTypeId, isRequired } = useSelector(
    (store) => store.formbuilder
  );
  const dispatch = useDispatch();
  const { options } = useFetchInputsTypesField();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeCreatedInput({ name, value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fieldName) {
      toast.error('Please enter the name');
      return;
    }
    if (!fieldTypeId) {
      toast.error('Please select type of field');
      return;
    }
    sections.forEach((sec, index) => {
      if (sec.id === 'ExtraFields') {
        dispatch(
          addInputToExtraFields({
            index: index,
            extrafield: {
              id: uuidv4(),
              fieldName,
              fieldTypeId,
              isRequired,
              sortOrder: Math.floor((1 + Math.random()) * 0x10000),
            },
          })
        );
        dispatch(clearValues());
        setActiveField(false);
        return;
      }
    });
  };
  return (
    <form className='flex justify-evenly  gap-4 my-6' onSubmit={handleSubmit}>
      <FormRow
        labelText='field Name'
        name='fieldName'
        value={fieldName}
        handleChange={handleChange}
        type='text'
        placeholder='Enter Name'
      />
      <FormSelect
        defaultValue={fieldTypeId}
        name='fieldTypeId'
        nolabel='nolabel'
        options={options || []}
        handleChange={handleChange}
        addEmptyOption='add'
      />
      <FormRadio
        name='isRequired'
        valyes='true'
        valno='false'
        defaultValue={isRequired}
        handleChange={handleChange}
      />
      <div className='flex items-end gap-2'>
        <button type='submit' className='text-primary'>
          Save
        </button>
        <button className='text-red-500' onClick={() => setActiveField(false)}>
          Delete
        </button>
      </div>
    </form>
  );
}
