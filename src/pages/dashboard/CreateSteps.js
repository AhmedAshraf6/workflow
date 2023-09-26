import React from 'react';
import AddStepType from '../../components/createApp/CreateSteps/AddStepType';
export default function CreateSteps() {
  return (
    <div className='flex flex-col items-center'>
      <div className='rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center'>
        <div className='w-[20px] h-[20px] border-2 border-neutral   rounded-full'></div>
      </div>

      <div className='bg-neutral mt-40 w-[300px] rounded-md text-neutral-content relative py-5'>
        <div className='absolute bottom-[165px] left-[50%] bg-gray-300 w-[2px] h-[100px]'></div>
        <div className='px-4 text-lg'>
          <h2>Who can start this app?</h2>
          <h4 className='mt-4'>all users can start</h4>
        </div>
        <hr className='border-gray-600  mt-4' />
        <button className='w-full text-end mt-3 px-4'>Change</button>
      </div>
      <AddStepType />
      <div className='rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center'>
        <div className='w-[20px] h-[20px] border-2 bg-neutral   rounded-full'></div>
      </div>
    </div>
  );
}
