import { useDispatch } from 'react-redux';
import { setEditGroup } from '../../features/modals/modalSlice';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import GroupModal from './GroupModal';
import { useState } from 'react';

export default function TableGroups({ data: groups }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen((prev) => !prev);
  const { data, mutate: deleteGroup } = useMutation({
    mutationFn: async (groupid) => {
      console.log(groupid);
      const { data } = await customFetch.delete(`/Groups/${groupid}`);
      return data;
    },
    onSuccess: () => {
      toast.success('Deleted Successfully...');
      queryClient.invalidateQueries({ queryKey: ['AllGroups'] });
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  console.log(data);
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
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                    >
                      Description
                    </th>

                    <th scope='col' className='relative px-6 py-3'>
                      <span className='sr-only'>Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {groups?.map((group) => (
                    <tr key={group.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {group.id}
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {group.name}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                        {group.description}
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3'>
                        <Link
                          className='text-primary hover:text-primaryHover cursor-pointer'
                          to={`members/${group.id}`}
                        >
                          view members
                        </Link>
                        <span
                          className='text-indigo-600 hover:text-indigo-900 cursor-pointer'
                          onClick={() => {
                            handleToggle();
                            dispatch(
                              setEditGroup({
                                groupId: group.id,
                                nameOfGroup: group.name,
                                descGroup: group.description,
                              })
                            );
                          }}
                        >
                          Edit
                        </span>
                        <span
                          className='text-red-600 hover:text-red-900 cursor-pointer'
                          onClick={() => deleteGroup(group.id)}
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
      {open && <GroupModal open={open} handleToggle={handleToggle} />}
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
