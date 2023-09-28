import React from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  handleChangeMember,
  clearValues,
} from '../../features/modals/modalSlice';
import FormRow from '../SharedComponents/FormRow';
import { toast } from 'react-toastify';
import {
  useCreateGroup,
  useEditGroup,
  useFetchUsers,
} from '../../utils/reactQueryCustomHooks';
import Loading from '../SharedComponents/Loading';
import FormSelectPackage from '../SharedComponents/FormSelectPackage';

export default function GroupModal() {
  const {
    nameOfGroup,
    descGroup,
    userIdsInGroup,
    isEditGroub,
    isEditGroubMember,
    groupId,
    userGroups,
  } = useSelector((store) => store.modal);

  const dispatch = useDispatch();
  const { data, isLoading: usersIsLoading } = useFetchUsers();
  const { createGroup, isCreateGroupLoading } = useCreateGroup();
  const { editGroup, isEditGroupLoading } = useEditGroup();

  // Handle Change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChangeMember({ name, value }));
  };

  // Handle Select of select package
  const handleSelect = (choice) => {
    const tempChoice = choice.map((ch) => ch.value);
    dispatch(handleChangeMember({ name: 'userIdsInGroup', value: tempChoice }));
  };

  // Handle Submit
  const onSubmit = (e) => {
    e.preventDefault();
    if (!nameOfGroup || !descGroup || !userIdsInGroup) {
      toast.error('please fill all required field');
      return;
    }
    if (isEditGroub) {
      editGroup({
        groupId,
        group: {
          id: groupId,
          name: nameOfGroup,
          description: descGroup,
          userGroups,
        },
      });
      return;
    }
    if (isEditGroub || isEditGroubMember) {
      return;
    }
    createGroup({ nameOfGroup, descGroup, userIdsInGroup });
  };

  return (
    <dialog id='group_modal' className='modal'>
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
        {usersIsLoading ? (
          <Loading />
        ) : (
          <form
            className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5'
            onSubmit={onSubmit}
          >
            <FormRow
              labelText='Enter  name of the group'
              type='text'
              name='nameOfGroup'
              value={nameOfGroup}
              handleChange={handleChange}
            />
            <FormRow
              labelText='Enter description'
              type='text'
              name='descGroup'
              value={descGroup}
              handleChange={handleChange}
            />
            {!isEditGroub && (
              <FormSelectPackage
                name='userIdsInGroup'
                options={data?.userOptions}
                handleChange={handleSelect}
              />
            )}
            <button
              type='submit'
              className='btn btn-primary'
              // disabled={isLoading}
            >
              {/* {isLoading ? 'loading...' : 'Submit'} */}
              submit
            </button>
          </form>
        )}
      </div>
    </dialog>
  );
}
