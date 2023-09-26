import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  handleChangeApp,
  clearValues,
} from '../../features/app/formBuilderSlice';
import FormRow from '../SharedComponents/FormRow';
import { toast } from 'react-toastify';
import Loading from '../SharedComponents/Loading';

export default function GroupModal() {
  const { appProcessId, Name, Description, isAppModalOpen } = useSelector(
    (store) => store.formBuilder
  );

  const dispatch = useDispatch();
  // Quieres

  // Handle Change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeApp({ name, value }));
  };

  // Handle Submit
  const onSubmit = (e) => {
    e.preventDefault();
    // editApp({ nameOfGroup, descGroup, userIdsInGroup });
  };

  return (
    <dialog id='navbar_modal' className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={() => dispatch(clearValues())}
          >
            ✕
          </button>
        </form>

        <form
          className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5'
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
            className='btn btn-primary '
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
