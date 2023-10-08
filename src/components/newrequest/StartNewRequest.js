import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
const StartNewRequest = () => {
  return (
    <div
      className='fixed bottom-8 right-10 tooltip tooltip-left'
      data-tip='Start new request'
      onClick={() =>
        document.getElementById('new_app_request_modal').showModal()
      }
    >
      <AiFillPlusCircle className='text-2xl sm:text-5xl text-error cursor-pointer ' />
    </div>
  );
};

export default StartNewRequest;
