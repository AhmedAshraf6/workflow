import React, { useState } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { MdModeEditOutline } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

import { FiCheck } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FormRow } from '../../SharedComponents';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../../../utils/axios';
import {
  addStepToWorkflowLevels,
  clearValues,
  deleteMoreStep,
  editStepInsideWorkflowLevels,
  handleAddForm,
  handleChange,
  handleMoreStep,
} from '../../../features/app/StepsSlice';
import {
  useFetchGroups,
  useFetchStepTypes,
  useFetchUsers,
} from '../../../utils/reactQueryCustomHooks';
import FormSelectPackage from '../../SharedComponents/FormSelectPackage';
import cn from 'classnames';

export default function EditStepModal({ open, handleToggle }) {
  const dispatch = useDispatch();
  // quiers
  const { data: users, isLoading: usersIsLoading } = useFetchUsers();
  const { data: groups, isLoading: groupsIsLoading } = useFetchGroups();
  // const { data, isLoading: stepIsLoading } = useFetchStepTypes();
  const { name, description, stepUserPermissions } = useSelector(
    (store) => store.steps
  );
  const modalClass = cn({
    'modal modal-bottom sm:modal-middle': true,
    'modal-open': open,
  });
  // Handle Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !stepUserPermissions ||
      stepUserPermissions.stepUserPermissions.length === 0
    ) {
      toast.error('Please fill all fields');
      return;
    }

    dispatch(editStepInsideWorkflowLevels());
    dispatch(clearValues());
    handleToggle(); // editApp({ nameOfGroup, descGroup, userIdsInGroup });
  };

  const handleSelect = (choice) => {
    const tempChoice = choice.map((ch) => {
      if (ch.isUserId) {
        return { userId: ch.value };
      } else {
        return { groupId: ch.value };
      }
    });
    dispatch(
      handleChange({
        name: 'stepUserPermissions',
        value: {
          stepUserPermissions: tempChoice,
          renderedUserPermisions: choice,
        },
      })
    );
  };
  const handleChangeMain = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch(handleChange({ name, value }));
  };
  return (
    <dialog id='edit_step_modal' className={modalClass}>
      <div className='modal-box max-w-sm'>
        <form
          method='dialog'
          onClick={() => {
            dispatch(clearValues());
            handleToggle();
          }}
        >
          {/* if there is a button in form, it will close the modal */}
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>
        <form
          className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5'
          onSubmit={onSubmit}
        >
          <FormRow
            labelText='Enter name of the step'
            type='text'
            name='name'
            value={name}
            handleChange={handleChangeMain}
          />

          <FormRow
            labelText='Enter description'
            type='text'
            name='description'
            value={description}
            handleChange={handleChangeMain}
          />
          {usersIsLoading || groupsIsLoading ? (
            <div className='text-center'>
              <span className='loading loading-spinner loading-xs'></span>
            </div>
          ) : (
            <FormSelectPackage
              value={stepUserPermissions?.renderedUserPermisions}
              options={
                users?.userOptions &&
                groups?.groupOptions && [
                  ...users?.userOptions,
                  ...groups?.groupOptions,
                ]
              }
              handleChange={handleSelect}
            />
          )}
          <button
            type='submit'
            className='btn btn-primary text-primary-content '
            // disabled={isLoading}
          >
            {/* {isLoading ? 'loading...' : 'Submit'} */}
            Edit
          </button>
        </form>
      </div>
    </dialog>
  );
}
