import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  changeStepNumber,
  clearValues,
  handleChangeApp,
} from '../../features/app/FormAppSlice';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { toast } from 'react-toastify';
import { FormRow } from '../SharedComponents';
import { useNavigate } from 'react-router-dom';
import { clearAllValues } from '../../features/app/formBuilderSlice';

export default function FormApp() {
  const { Name, Description } = useSelector((store) => store.formapp);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Quieres

  const { mutate: createApp, isLoading } = useMutation({
    mutationFn: async (app) => {
      const { data } = await customFetch.post('/ApplicationProcesses', app);
      return data;
    },
    onSuccess: (data) => {
      dispatch(clearValues({ appProcessId: data?.id }));
      // dispatch(clearAllValues());
      dispatch(changeStepNumber(2));
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  }); // Handle Change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeApp({ name, value }));
  };

  // Handle Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (!Name || !Description) {
      toast.error('Please Fill ALl required fields');
      return;
    }
    createApp({ Name, Description });
  };
  return (
    <div className='flex justify-center'>
      <form
        className='flex flex-col mt-5 sm:mt-10 w-full mx-5 sm:w-[50%] gap-y-5 sm:gap-y-8'
        onSubmit={onSubmit}
      >
        <FormRow
          labelText='Enter name of the App'
          type='text'
          name='Name'
          value={Name}
          handleChange={handleChange}
        />
        <FormRow
          labelText='Enter description'
          type='text'
          name='Description'
          value={Description}
          handleChange={handleChange}
        />
        <button
          type='submit'
          className='btn btn-primary'
          // disabled={isLoading}
        >
          {/* {isLoading ? 'loading...' : 'Submit'} */}
          Next
        </button>
      </form>
    </div>
  );
}
