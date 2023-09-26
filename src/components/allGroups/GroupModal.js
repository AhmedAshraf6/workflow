import React from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  handleChangeMember,
  clearValues,
  toggleGroubModal,
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

export default function GroupModal() {
  const {
    nameOfGroup,
    descGroup,
    userIdsInGroup,
    isGroubModalOpen,
    isEditGroub,
    isEditGroubMember,
    groupId,
    userGroups,
  } = useSelector((store) => store.modal);

  const dispatch = useDispatch();
  const { data, isLoading: usersIsLoading } = useFetchUsers();
  const { createGroup, isCreateGroupLoading } = useCreateGroup();
  const { editGroup, isEditGroupLoading } = useEditGroup();

  const options = data?.data.map((user) => {
    return { label: user.email, value: user.id };
  });

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
    <Modal
      isOpen={isGroubModalOpen}
      overlayClassName='fixed top-0 left-0 bg-light/75 right-0 bottom-0 c'
      style={customStyles.content}
      ariaHideApp={false}
    >
      <button
        onClick={() => {
          dispatch(toggleGroubModal());
          dispatch(clearValues());
        }}
      >
        <FaTimes className='text-red-950 text-2xl cursor-pointer' />
      </button>
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
              options={options}
              handleChange={handleSelect}
            />
          )}
          <button
            type='submit'
            className='group relative flex w-full justify-center rounded-md bg-primary px-3 py-2 text-base sm:text-lg font-semibold text-light hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 '
            // disabled={isLoading}
          >
            {/* {isLoading ? 'loading...' : 'Submit'} */}
            submit
          </button>
        </form>
      )}
    </Modal>
  );
}
