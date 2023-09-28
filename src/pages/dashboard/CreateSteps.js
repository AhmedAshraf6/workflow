import React from 'react';
import AddStepType from '../../components/createApp/CreateSteps/AddStepType';
import DefaultStep from '../../components/createApp/CreateSteps/DefaultStep';
export default function CreateSteps() {
  return (
    <div className='flex flex-col items-center'>
      <div className='rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center'>
        <div className='w-[20px] h-[20px] border-2 border-neutral   rounded-full'></div>
      </div>

      <DefaultStep />

      <AddStepType />

      <div className='rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center'>
        <div className='w-[20px] h-[20px] border-2 bg-neutral   rounded-full'></div>
      </div>
    </div>
  );
}
