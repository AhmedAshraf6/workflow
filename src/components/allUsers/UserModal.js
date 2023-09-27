import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  handleChangeMember,
  clearValues,
} from '../../features/modals/modalSlice';
import { useMutation } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import FormRow from '../SharedComponents/FormRow';
import FormSelect from '../SharedComponents/FormSelect';
import { toast } from 'react-toastify';

const UserModal = () => {
  const {
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
    <dialog id='user_modal' className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={() => {
              dispatch(clearValues());
            }}
          >
            ✕
          </button>
        </form>
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
            addEmptyOption=''
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
};

export default UserModal;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
