import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  handleChangeMember,
  toogleUserModal,
  clearValues,
} from '../../features/modals/modalSlice';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import FormRow from '../SharedComponents/FormRow';
import FormSelect from '../SharedComponents/FormSelect';
import { toast } from 'react-toastify';

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

const UserModal = () => {
  const {
    isUserModalOpen,
    firstName,
    lastName,
    email,
    password,
    roleId,
    roles,
    editUserId,
    isEdittingMember,
  } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeMember({ name, value }));
  };

  // Add User
  const {
    mutate: createUser,
    isLoading: loadCreateUser,
    data: dataCreateUser,
  } = useMutation({
    mutationFn: async ({ firstName, lastName, email, password, roleId }) => {
      const { data } = await customFetch.post('/Users', {
        firstName,
        lastName,
        email,
        password,
        roleId,
      });
      return data;
    },
    onSuccess: () => {},
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  // Edit User
  const {
    mutate: editUser,
    isLoading: loadEditUser,
    data: dataEditUser,
  } = useMutation({
    mutationFn: async ({ userId, user }) => {
      const { data } = await customFetch.put(`/Users/${userId}`, user);
      return data;
    },
    onSuccess: () => {},
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });

  // submit form
  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !firstName ||
      !lastName ||
      !email ||
      !roleId ||
      (!isEdittingMember && !password)
    ) {
      toast.error('please fill out all required field');
      return;
    }
    if (isEdittingMember) {
      editUser({
        userId: editUserId,
        user: {
          firstName,
          lastName,
          email,
          roleId,
          id: editUserId,
        },
      });
    }
    createUser({ firstName, lastName, email, password, roleId });
  };
  return (
    <Modal
      isOpen={isUserModalOpen}
      overlayClassName='fixed top-0 left-0 bg-light/75 right-0 bottom-0 c'
      style={customStyles.content}
      ariaHideApp={false}
    >
      <button
        onClick={() => {
          dispatch(toogleUserModal());
          dispatch(clearValues());
        }}
      >
        <FaTimes className='text-red-950 text-2xl cursor-pointer' />
      </button>
      <form
        className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5'
        onSubmit={onSubmit}
      >
        <FormRow
          type='text'
          name='firstName'
          value={firstName}
          handleChange={handleChange}
        />
        <FormRow
          type='text'
          name='lastName'
          value={lastName}
          handleChange={handleChange}
        />

        <FormRow
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
        />
        {!isEdittingMember && (
          <FormRow
            type='password'
            name='password'
            value={password}
            handleChange={handleChange}
          />
        )}
        <FormSelect
          name='roleId'
          options={roles}
          defaultValue={roleId}
          handleChange={handleChange}
          addEmptyOption='add'
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
};

export default UserModal;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
