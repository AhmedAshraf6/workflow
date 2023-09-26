import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import FormRow from '../SharedComponents/FormRow';
import { toast } from 'react-toastify';
import Loading from '../SharedComponents/Loading';
import { toggleStepModal } from '../../../features/app/StepsSlice';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%', // Adjust as needed
    height: '50%', // Adjust as needed
  },
};

export default function StepModal() {
  const { isStepModalOpen } = useSelector((store) => store.steps);

  const dispatch = useDispatch();
  // Quieres

  // Handle Change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // dispatch(handleChangeApp({ name, value }));
  };

  // Handle Submit
  const onSubmit = (e) => {
    e.preventDefault();
    // editApp({ nameOfGroup, descGroup, userIdsInGroup });
  };

  return (
    <Modal
      isOpen={isStepModalOpen}
      overlayClassName='fixed top-0 left-0 bg-light/75 right-0 bottom-0 '
      style={customStyles.content}
      ariaHideApp={false}
    >
      <button
        onClick={() => {
          dispatch(toggleStepModal());
        }}
      >
        <FaTimes className='text-red-950 text-2xl cursor-pointer' />
      </button>

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
          className='group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-base sm:text-lg font-semibold text-light hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 '
          // disabled={isLoading}
        >
          {/* {isLoading ? 'loading...' : 'Submit'} */}
          submit
        </button>
      </form>
    </Modal>
  );
}
