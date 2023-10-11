import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import NewRequestModal from './NewRequestModal';
const StartNewRequest = () => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  return (
    <>
      <div
        className='fixed bottom-8 right-10 tooltip tooltip-left'
        data-tip='Start new request'
        onClick={handleToggle}
      >
        <AiFillPlusCircle className='text-2xl sm:text-5xl text-error cursor-pointer ' />
      </div>
      {open && <NewRequestModal open={open} handleToggle={handleToggle} />}
    </>
  );
};

export default StartNewRequest;
