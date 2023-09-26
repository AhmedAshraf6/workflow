import React from 'react';
import Table from '../../components/SharedComponents/Table';
import { useDispatch } from 'react-redux';
import {
  toggleGroubModal,
  toogleUserModal,
} from '../../features/modals/modalSlice';
import { useQuery } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import Loading from '../../components/SharedComponents/Loading';
import TableGroups from '../../components/allGroups/TableGroups';
export default function AllGroups() {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ['AllGroups'],
    queryFn: async () => {
      const data = await customFetch.get('/Groups');
      return data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='AllGroups mt-4 sm:mt-6'>
      {/* <UserModal /> */}
      <div className='flex justify-between items-center'>
        <h1 className='text-lg lg:text-xl text-primary font-semibold'>
          All Groups
        </h1>
        <button
          className='btn-primary hover:bg-primaryHover'
          onClick={() => dispatch(toggleGroubModal())}
        >
          Create Group
        </button>
      </div>
      {/* Table */}
      <TableGroups data={data?.data} />
    </div>
  );
}
