import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addSectionToForm } from '../../../features/app/formBuilderSlice';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
export default function CreateSection({ activeSection, setActiveSection }) {
  const [sectionName, setSectionName] = useState('');

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sectionName) {
      toast.error('enter name of the section');
      return;
    }
    dispatch(
      addSectionToForm({
        name: sectionName,
        id: uuidv4(),
        fields: [],
      })
    );
    setActiveSection(!activeSection);
  };
  return (
    <form onSubmit={handleSubmit} className=''>
      <input
        type='text'
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
        className='border-b-2 border-gray-500 focus:border-neutral outline-none'
        placeholder='Enter name  section'
      />
      <button type='submit' className='text-dark'>
        Add
      </button>
    </form>
  );
}
