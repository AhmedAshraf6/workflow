import React, { useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import {
  deleteInputsInsideSections,
  setEditSidebarInput,
  setIsSidebarInputOpen,
} from '../../../features/app/formBuilderSlice';
export default function FormRowDnd({
  fieldTypeId,
  name,
  isRequired,
  value,
  handleChange,
  labelText,
  item,
  indexParent,
  indexChild,
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <label
        htmlFor={name}
        className='link-nav block text-sm font-medium leading-6 text-gray-900'
      >
        {labelText || name}
      </label>
      <div className='flex justify-center gap-4 items-center mt-2 link-nav'>
        <div className='w-[300px] h-[30px] border-2 border-gray-500'></div>
        <div className='flex gap-2'>
          <button
            className=' edit-input-inside-sidebar'
            onClick={() => {
              dispatch(
                setEditSidebarInput({
                  fieldTypeId,
                  isRequired,
                  fieldName: name,
                  indexParent,
                  indexChild,
                })
              );
              dispatch(setIsSidebarInputOpen());
            }}
          >
            <AiFillSetting className='text-primary text-xl cursor-pointer' />
          </button>

          <BsFillTrashFill
            className='text-red-500 text-xl cursor-pointer'
            onClick={() => {
              dispatch(
                deleteInputsInsideSections({
                  indexParent,
                  indexChild,
                })
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
