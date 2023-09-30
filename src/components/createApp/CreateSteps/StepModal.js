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

export default function StepModal() {
  const dispatch = useDispatch();
  // quiers
  const { data: users, isLoading: usersIsLoading } = useFetchUsers();
  const { data: groups, isLoading: groupsIsLoading } = useFetchGroups();
  const { data, isLoading: stepIsLoading } = useFetchStepTypes();
  const {
    addForm,
    moreStep,
    name,
    description,
    stepUserPermissions,
    stepTypeId,
    sortOrder,
    workflowLevels,
  } = useSelector((store) => store.steps);
  const [active, setActive] = useState(false);
  const [stepTypeIdState, setStepTypeIdState] = useState('');

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
    if (moreStep.length > 0) {
      moreStep.map((step) => {
        const { name, description, stepUserPermissions } = step;
        if (
          !name ||
          !description ||
          !stepUserPermissions ||
          stepUserPermissions.stepUserPermissions.length === 0
        ) {
          toast.error('Please fill all fields');
          return;
        }
      });
    }
    let tempMoreStep = moreStep.map((step) => {
      const { name, description, stepTypeId, sortOrder, stepUserPermissions } =
        step;
      return {
        name,
        description,
        stepTypeId,
        sortOrder,
        stepUserPermissions,
        // remove rendered users or groups
        // stepUserPermissions: stepUserPermissions?.stepUserPermissions,
      };
    });
    console.log(tempMoreStep);
    let step = {
      sortOrder:
        workflowLevels.length > 0
          ? workflowLevels[workflowLevels.length - 1].sortOrder + 1
          : 2,
      steps: [
        {
          name,
          description,
          stepTypeId,
          sortOrder,
          stepUserPermissions: stepUserPermissions,
        },
        ...tempMoreStep,
      ],
    };
    dispatch(addStepToWorkflowLevels(step));
    dispatch(clearValues());
    document.getElementById('step_modal').close();
    // editApp({ nameOfGroup, descGroup, userIdsInGroup });
  };
  const handleSelectPack = (choice, index, stepTypeIdState) => {
    const tempChoice = choice.map((ch) => {
      if (ch.isUserId) {
        return { userId: ch.value };
      } else {
        return { groupId: ch.value };
      }
    });
    //  console.log(tempChoice);
    dispatch(
      handleMoreStep({
        name: 'stepUserPermissions',
        value: {
          stepUserPermissions: tempChoice,
          renderedUserPermisions: choice,
        },
        stepTypeIdState,
        index,
      })
    );
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
    <dialog id='step_modal' className='modal'>
      <div className='modal-box max-w-sm'>
        <form method='dialog' onClick={() => dispatch(clearValues())}>
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
          {addForm?.map((form, index) => {
            return (
              <div key={index} className='relative'>
                <div className='divider'></div>
                <FaTrash
                  className='text-lg text-neutral cursor-pointer absolute right-0'
                  onClick={() => dispatch(deleteMoreStep(index))}
                />
                <FormRow
                  labelText='Enter name of the step'
                  type='text'
                  name='name'
                  handleChange={(e) =>
                    dispatch(
                      handleMoreStep({
                        name: e.target.name,
                        value: e.target.value,
                        index,
                        stepTypeIdState,
                      })
                    )
                  }
                />
                <FormRow
                  labelText='Enter description'
                  type='text'
                  name='description'
                  handleChange={(e) =>
                    dispatch(
                      handleMoreStep({
                        name: e.target.name,
                        value: e.target.value,
                        index,
                        stepTypeIdState,
                      })
                    )
                  }
                />
                {usersIsLoading || groupsIsLoading ? (
                  <div className='text-center'>
                    <span className='loading loading-spinner loading-xs  '></span>
                  </div>
                ) : (
                  <FormSelectPackage
                    // value={renderedDefaultUserPermisions}

                    options={
                      users?.userOptions &&
                      groups?.groupOptions && [
                        ...users?.userOptions,
                        ...groups?.groupOptions,
                      ]
                    }
                    handleChange={(ch) =>
                      handleSelectPack(ch, index, stepTypeIdState)
                    }
                  />
                )}
              </div>
            );
          })}
          <div className='flex justify-center gap-x-4'>
            <span>Add Another Step </span>
            {active ? (
              <IoClose
                className='text-2xl text-neutral cursor-pointer'
                onClick={() => setActive(!active)}
              />
            ) : (
              <AiOutlinePlusCircle
                className='text-2xl text-neutral cursor-pointer'
                onClick={() => setActive(!active)}
              />
            )}
            <span> in the same level</span>
          </div>

          {active && (
            <div className='relative mb-5 '>
              <button
                className='absolute rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center top-0 left-28 tooltip'
                onClick={() => {
                  setStepTypeIdState(data?.data[0].id);
                  setActive(!active);
                  dispatch(handleAddForm());
                }}
                data-tip='add input step'
                disabled={stepIsLoading}
              >
                {stepIsLoading ? (
                  <div className='text-center'>
                    <span className='loading loading-spinner loading-xs  '></span>
                  </div>
                ) : (
                  <MdModeEditOutline className='text-slate-800 text-xl' />
                )}
              </button>
              <button
                className='absolute rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center top-0 right-28 tooltip'
                onClick={() => {
                  setStepTypeIdState(data?.data[1].id);
                  setActive(!active);
                  dispatch(handleAddForm());
                }}
                data-tip='add approval step'
                disabled={stepIsLoading}
              >
                {stepIsLoading ? (
                  <div className='text-center'>
                    <span className='loading loading-spinner loading-xs  '></span>
                  </div>
                ) : (
                  <FiCheck className='text-slate-800 text-2xl' />
                )}
              </button>
            </div>
          )}
          <button
            type='submit'
            className='btn btn-primary text-primary-content '
            // disabled={isLoading}
          >
            {/* {isLoading ? 'loading...' : 'Submit'} */}
            submit
          </button>
        </form>
      </div>
    </dialog>
  );
}
