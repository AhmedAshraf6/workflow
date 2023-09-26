import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  clearValues,
  editInputsInsideSections,
  handleChangeCreatedInput,
  setIsSidebarInputOpen,
} from '../../../features/app/formBuilderSlice';
import { FormRow, FormSelect } from '../../SharedComponents';
import { useFetchInputsTypesField } from '../../../utils/reactQueryCustomHooks';
import FormRadio from '../../SharedComponents/FormRadio';
import { toast } from 'react-toastify';
export default function SidebarInput() {
  const dispatch = useDispatch();
  const { options } = useFetchInputsTypesField();
  const {
    fieldName,
    isSidebarInputOpen,
    fieldTypeId,
    isRequired,
    indexParent,
    indexChild,
  } = useSelector((store) => store.formbuilder);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeCreatedInput({ name, value }));
  };
  const detectToggle = (e) => {
    if (e.target.className === 'overlaySidebar') {
      dispatch(setIsSidebarInputOpen());
      dispatch(clearValues());
    }
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
    dispatch(
      editInputsInsideSections({
        indexParent,
        indexChild,
        field: { isRequired, name: fieldName, fieldTypeId },
      })
    );
    dispatch(setIsSidebarInputOpen());
    dispatch(clearValues());
  };
  return (
    <>
      <div
        className={`${isSidebarInputOpen && 'overlaySidebar'}`}
        onClick={detectToggle}
      >
        <aside
          className={`fixed w-[20%] min-h-[30%] bg-[#495261] text-white top-20  asd	${
            isSidebarInputOpen && 'visiblenav'
          }`}
        >
          {/* #051922 */}
          <AiOutlineClose
            className='text-2xl  cursor-pointer text-white mt-3 mx-3'
            onClick={() => {
              dispatch(setIsSidebarInputOpen());
              dispatch(clearValues());
            }}
          />
          <form className='flex flex-col gap-y-5 px-3 py-5 text-white'>
            <FormRow
              name='fieldName'
              value={fieldName}
              type='text'
              labelText='Field Name'
              handleChange={handleChange}
              bgColorInput='bg-[#535f70]'
              colorInput='text-[#fff]'
              labelColor='text-white'
              ring='ring-0'
            />
            <FormSelect
              name='fieldTypeId'
              defaultValue={fieldTypeId}
              labelText='Field Type'
              handleChange={handleChange}
              options={options}
              addEmptyOption='as'
              bgColorInput='bg-[#535f70]'
              colorInput='text-[#fff]'
              labelColor='text-white'
            />
            <FormRadio
              name='isRequired'
              valyes='true'
              valno='false'
              handleChange={handleChange}
              defaultValue={isRequired}
            />
            <button
              className='btn-sm-primary'
              type='submit'
              onClick={handleSubmit}
            >
              edit
            </button>
          </form>
        </aside>
      </div>
    </>
  );
}
