import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { MdModeEditOutline } from 'react-icons/md';

import { FiCheck } from 'react-icons/fi';
import customFetch from '../../../utils/axios';
import { useDispatch } from 'react-redux';
import { editStepId } from '../../../features/app/StepsSlice';

export default function AddStepType() {
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const { data } = useQuery({
    queryFn: 'stepType',
    queryFn: async () => {
      return await customFetch('/StepTypes');
    },
  });

  return (
    <div
      className={`relative rounded-full ${
        active ? 'bg-red-500' : 'bg-gray-500'
      } w-[25px] h-[25px] flex justify-center items-center cursor-pointer my-40 `}
    >
      <div className='absolute top-[25px] left-[50%] bg-gray-300 w-[2px] h-[100px]'></div>
      {active && (
        // for edit one
        <button
          className='absolute rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center bottom-10 left-10'
          onClick={() => dispatch(editStepId(data?.data[0].id))}
        >
          <MdModeEditOutline className='text-slate-800 text-xl' />
        </button>
      )}
      {active && (
        // for approve one
        <button
          className='absolute rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center bottom-10 right-10'
          onClick={() => dispatch(editStepId(data?.data[1].id))}
        >
          <FiCheck className='text-slate-800 text-2xl' />
        </button>
      )}
      {active ? (
        <IoClose
          className='text-xl text-white'
          onClick={() => setActive(!active)}
        />
      ) : (
        <BiPlus
          className='text-xl text-white'
          onClick={() => setActive(!active)}
        />
      )}
    </div>
  );
}
