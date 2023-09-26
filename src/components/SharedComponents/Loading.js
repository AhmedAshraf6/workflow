import React from 'react';
import spinner from '../../assets/images/spinner.svg';
export default function Loading() {
  return (
    <div className='text-white flex justify-center '>
      <img src={spinner} alt='loading...' className='h-96' />
    </div>
  );
}
