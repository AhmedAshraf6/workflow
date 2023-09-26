import React from 'react';
import Table from '../../components/SharedComponents/Table';
import Loading from '../../components/SharedComponents/Loading';
import { useFetchUsers } from '../../utils/reactQueryCustomHooks';
export default function Allusers() {
  const { data, isLoading } = useFetchUsers();
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className='allUsers mt-4 sm:mt-6'>
      {/* <UserModal /> */}
      <div className='flex justify-between items-center'>
        <h1 className='text-lg lg:text-xl text-primary font-semibold'>
          All users
        </h1>
        <button
          className='btn btn-primary'
          onClick={() => document.getElementById('user_modal').showModal()}
        >
          Create User
        </button>
      </div>
      {/* Table */}
      <Table data={data?.data} />
    </div>
  );
}
