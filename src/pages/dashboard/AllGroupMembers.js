import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import Loading from '../../components/SharedComponents/Loading';
import TableGroupMembers from '../../components/allGroups/TableGroupMembers';

export default function AllGroupMembers() {
  const { groupId } = useParams();
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ['allGroupMembers', groupId],
    queryFn: async () => {
      const data = await customFetch.get(`/Groups/${groupId}`);
      return data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  if (data?.data?.users.length === 0) {
    return (
      <div className='AllGroups mt-4 sm:mt-6'>
        <div className='flex  gap-5 justify-center items-center'>
          <h3 className='text-lg sm:text-2xl text-primary font-semibold'>
            No Members Yet
          </h3>
          <button
            className='btn btn-primary'
            onClick={() => document.getElementById('group_modal').showModal()}
          >
            Add Member
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className='AllGroups mt-4 sm:mt-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-lg lg:text-xl text-primary font-semibold'>
          {data?.data?.name}
        </h1>
        <button
          className='btn-primary hover:bg-primaryHover'
          onClick={() => document.getElementById('group_modal').showModal()}
        >
          Add Member
        </button>
      </div>
      {/* Table */}
      <TableGroupMembers data={data?.data} />
    </div>
  );
}
