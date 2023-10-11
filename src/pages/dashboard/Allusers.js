import React, { useState } from 'react';
import Loading from '../../components/SharedComponents/Loading';
import { useFetchUsers } from '../../utils/reactQueryCustomHooks';
import UserModal from '../../components/allUsers/UserModal';
import TableUsers from '../../components/SharedComponents/TableUsers';
export default function Allusers() {
  const { data, isLoading } = useFetchUsers();
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <div className='allUsers mt-4 sm:mt-6'>
        {/* <UserModal /> */}
        <div className='flex justify-between items-center'>
          <h1 className='text-lg lg:text-xl text-primary font-semibold'>
            All users
          </h1>
          <button className='btn btn-primary' onClick={handleToggle}>
            Create User
          </button>
        </div>
        {/* Table */}
        <TableUsers data={data?.data?.data} />
      </div>
      {open && <UserModal open={open} handleToggle={handleToggle} />}
    </>
  );
}
