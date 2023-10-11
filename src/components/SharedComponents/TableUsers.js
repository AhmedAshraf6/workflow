import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
  setEditMember,
  toogleUserModal,
} from '../../features/modals/modalSlice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import UserModal from '../allUsers/UserModal';

export default function TableUsers({ data: users }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const { data, mutate: deleteUser } = useMutation({
    mutationFn: async (userid) => {
      const { data } = await customFetch.delete(`/Users/${userid}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Deleted Successfully...');
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return (
    <>
      <div className='flex flex-col my-5 sm:my-8'>
        <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
            <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      First Name
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Last Name
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Email
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Role
                    </th>
                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {users?.map((user) => (
                    <tr key={user.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {user.id}
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {user.firstName}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {user.lastName}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {user.email}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span
                          className='px-2 inline-flex text-xs leading-5
                      font-semibold rounded-full bg-green-100 text-green-800'
                        >
                          {user.role.name}
                        </span>
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3'>
                        <span
                          className='text-indigo-600 hover:text-indigo-900 cursor-pointer'
                          onClick={() => {
                            handleToggle();
                            dispatch(
                              setEditMember({
                                editUserId: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email,
                                roleId: user.role.id,
                              })
                            );
                          }}
                        >
                          Edit
                        </span>
                        <span
                          className='text-red-600 hover:text-red-900 cursor-pointer'
                          onClick={() => deleteUser(user.id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {open && <UserModal open={open} handleToggle={handleToggle} />}
    </>
  );
}
//  <td className='px-6 py-4 whitespace-nowrap'>
//    <div className='flex items-center'>
//      <div className='flex-shrink-0 h-10 w-10'>
//        <img className='h-10 w-10 rounded-full' src={person.image} alt='' />
//      </div>
//      <div className='ml-4'>
//        <div className='text-sm font-medium text-gray-900'>{person.name}</div>
//        <div className='text-sm text-gray-500'>{person.email}</div>
//      </div>
//    </div>
//  </td>;
