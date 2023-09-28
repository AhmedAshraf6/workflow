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
  deleteMoreStep,
  handleAddForm,
  handleMoreStep,
} from '../../../features/app/StepsSlice';

export default function StepModal() {
  const dispatch = useDispatch();
  const { addForm } = useSelector((store) => store.steps);
  const [active, setActive] = useState(false);
  const [stepTypeId, setStepTypeId] = useState('');
  const { data } = useQuery({
    queryFn: ['stepType'],
    queryFn: async () => {
      return await customFetch('/StepTypes');
    },
  });

  // Handle Change
  // const handleChange = (e) => {
  //   const name = e.target.name;
  //   const value = e.target.value;

  //   // dispatch(handleChangeApp({ name, value }));
  // };

  // Handle Submit
  const onSubmit = (e) => {
    e.preventDefault();
    // editApp({ nameOfGroup, descGroup, userIdsInGroup });
  };
  return (
    <dialog id='step_modal' className='modal'>
      <div className='modal-box max-w-sm'>
        <form method='dialog'>
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
            name='Name'
            // handleChange={handleChange}
          />

          <FormRow
            labelText='Enter description'
            type='text'
            name='Description'
            // handleChange={handleChange}
          />

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
                  name='Name'
                  handleChange={(e) =>
                    dispatch(
                      handleMoreStep({
                        name: e.target.name,
                        value: e.target.value,
                        index,
                        stepTypeId,
                      })
                    )
                  }
                />
                <FormRow
                  labelText='Enter description'
                  type='text'
                  name='Description'
                  handleChange={(e) =>
                    dispatch(
                      handleMoreStep({
                        name: e.target.name,
                        value: e.target.value,
                        index,
                        stepTypeId,
                      })
                    )
                  }
                />
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
                  setStepTypeId(data?.data[0].id);
                  setActive(!active);
                  dispatch(handleAddForm());
                }}
                data-tip='add input step'
              >
                <MdModeEditOutline className='text-slate-800 text-xl' />
              </button>
              <button
                className='absolute rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center top-0 right-28 tooltip'
                onClick={() => {
                  setStepTypeId(data?.data[1].id);
                  setActive(!active);
                  dispatch(handleAddForm());
                }}
                data-tip='add approval step'
              >
                <FiCheck className='text-slate-800 text-2xl' />
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
