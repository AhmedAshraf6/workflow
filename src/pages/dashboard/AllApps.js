import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import PaginationContainer from '../../components/SharedComponents/PaginationContainer';
import Loading from '../../components/SharedComponents/Loading';
import { setIsEditForm } from '../../features/app/formBuilderSlice';
import { useNavigate } from 'react-router-dom';

export default function AllApps() {
  const [page, setPage] = useState(1);
  const [appprocess, setAppProcess] = useState({ id: '', redirect: '' });
  const [formId, setFormId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // All Apps
  const { isLoading, data } = useQuery({
    queryKey: ['app_process', page],
    queryFn: async () => {
      const data = await customFetch(
        `ApplicationProcesses?IsDraft=false&pageNumber=${page}`
      );
      return data.data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  // All Apps

  // Specific App
  const {
    isLoading: isLoadingSpecificAppProcess,
    data: dataSpecificAppProcess,
  } = useQuery({
    queryKey: ['app_process_by_id', appprocess.id],
    queryFn: async () => {
      const data = await customFetch(`ApplicationProcesses/${appprocess.id}`);
      return data.data;
    },
    onSuccess: (data) => {
      console.log(data);
      appprocess.redirect === 'form' && setFormId(data.formId);
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
    enabled: !!appprocess.id,
  });
  // Specific App

  // Get Form
  const { isLoading: isLoadingGetForm, data: dataGetForm } = useQuery({
    queryKey: ['Get_Form', formId],
    queryFn: async () => {
      const data = await customFetch(`Forms/${formId}`);
      return data.data;
    },
    onSuccess: (data) => {
      dispatch(
        setIsEditForm({
          sections: data.sections,
          fields: data.fields,
          updateformId: formId,
        })
      );
      navigate('/createapp/addform');
      console.log(data);
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
    enabled: !!formId,
  });

  // Get Form
  if (isLoading) {
    return <Loading />;
  }
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
                  {data?.items?.map((item) => (
                    <tr key={item.id}>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                        {item.name}
                      </td>

                      <td className='px-6 py-4 text-sm whitespace-nowrap sm:whitespace-normal font-medium text-gray-500'>
                        {item.description}
                      </td>

                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3'>
                        <button
                          className='text-indigo-600 hover:text-indigo-900 cursor-pointer'
                          onClick={() => {
                            setAppProcess({ redirect: 'form', id: item.id });
                          }}
                        >
                          Edit Form
                        </button>
                        <button className='text-indigo-600 hover:text-indigo-900 cursor-pointer'>
                          Edit Workflow
                        </button>
                        <button className='text-indigo-600 hover:text-indigo-900 cursor-pointer'>
                          Edit Permissions
                        </button>
                        <button className='text-indigo-600 hover:text-indigo-900 cursor-pointer'>
                          Update
                        </button>
                        <button className='text-red-600 hover:text-red-900 cursor-pointer'>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <PaginationContainer
        page={page}
        setPage={setPage}
        pageCount={data?.totalPages}
      />
    </>
  );
}
