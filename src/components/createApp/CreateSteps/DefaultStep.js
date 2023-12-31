import React, { useState } from 'react';
import {
  useFetchGroups,
  useFetchUsers,
} from '../../../utils/reactQueryCustomHooks';
import FormSelectPackage from '../../SharedComponents/FormSelectPackage';
import {
  handleSelect,
  removeDfaultUserPermisions,
} from '../../../features/app/StepsSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const DefaultStep = () => {
  const { data: users, isLoading: usersIsLoading } = useFetchUsers();
  const { data: groups, isLoading: groupsIsLoading } = useFetchGroups();
  const { renderedDefaultUserPermisions } = useSelector((store) => store.steps);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [checked, setChecked] = useState('1');
  const handleChange = (e) => {
    setChecked(e.target.value);
  };

  // const options2 = groups?.data.map((group) => {
  //   return { label: group.name, value: group.id };
  // });

  // Handle Select of select package
  const handleSelectPack = (choice) => {
    const tempChoice = choice.map((ch) => {
      if (ch.isUserId) {
        return { userId: ch.value };
      } else {
        return { groupId: ch.value };
      }
    });
    dispatch(
      handleSelect({
        name: 'stepUserPermissions',
        value: tempChoice,
        renderedPermisions: choice,
      })
    );
  };
  return (
    <div className='bg-neutral mt-40 w-[300px] rounded-md text-neutral-content  py-5'>
      {/* <div className='absolute bottom-[165px] left-[50%] bg-gray-300 w-[2px] h-[100px]'></div> */}
      <div className='px-4 text-lg'>
        <h2>Who can start this app?</h2>
        {active ? (
          <>
            <div className='form-control '>
              <label className='label cursor-pointer flex justify-start gap-x-2'>
                <input
                  type='radio'
                  name='radio-10'
                  className='radio bg-white checked:bg-blue-500'
                  value='1'
                  onChange={(e) => {
                    handleChange(e);
                    dispatch(removeDfaultUserPermisions());
                  }}
                  checked={checked === '1'}
                />
                <span className='text-center'>all users can start</span>
              </label>
            </div>
            <div className='form-control'>
              <label className='label cursor-pointer flex justify-start gap-x-2'>
                <input
                  type='radio'
                  name='radio-10'
                  className='radio bg-white checked:bg-blue-500'
                  value='2'
                  checked={checked === '2'}
                  onChange={handleChange}
                />
                <span className='label-text text-white'>
                  Add Specific Users to this level
                </span>
              </label>
            </div>
          </>
        ) : checked === '1' ? (
          <h3 className='mt-5'>All users </h3>
        ) : (
          <h3 className='mt-5'>Specifc Users can start</h3>
        )}
        {active && checked === '2' ? (
          usersIsLoading || groupsIsLoading ? (
            <div className='text-center'>
              <span className='loading loading-spinner loading-xs  '></span>
            </div>
          ) : (
            <FormSelectPackage
              value={renderedDefaultUserPermisions}
              options={
                users?.userOptions &&
                groups?.groupOptions && [
                  ...users?.userOptions,
                  ...groups?.groupOptions,
                ]
              }
              handleChange={handleSelectPack}
            />
          )
        ) : (
          ''
        )}

        {/* {active && checked === '2' && (
        )} */}
        <h4 className='mt-4'></h4>
      </div>

      <hr className='border-gray-600  mt-4' />
      <button
        className='w-full text-end mt-3 px-4'
        onClick={() => setActive(!active)}
      >
        {active ? 'done' : 'Change'}
      </button>
    </div>
  );
};

export default DefaultStep;
