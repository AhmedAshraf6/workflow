import React from 'react';
import Loading from '../../components/SharedComponents/Loading';
import { useDispatch } from 'react-redux';

export default function Rejected() {
  const dispatch = useDispatch();
  const [inputId, setInputId] = useState(0);
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const handleToggle = () => setOpen((prev) => !prev);
  const { data, isLoading } = useQuery({
    queryKey: ['get_rejected_requests'],
    queryFn: async () => {
      const data = await customFetch(
        '/ApplicationProcessInstanceSteps/ByStepTypeId/4'
      );
      return { data };
    },
    onError: (error) => {
      console.log(error);
      checkForUnauthorizedResponse(error, dispatch);
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (data?.data?.data?.pendingRequests.length === 0) {
    return (
      <h2 className='mt-5 sm:mt-10 text-xl sm:text-2xl text-primary text-center font-semibold'>
        There is no approval requests
      </h2>
    );
  }
  return (
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
                    Created By
                  </th>
                  <th
                    scope='col'
                    className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                  >
                    Step Name
                  </th>

                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {data?.data?.data?.pendingRequests?.map((inputrequest) => (
                  <tr key={inputrequest.id}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                      {inputrequest.id}
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {inputrequest?.createdBy?.firstName}{' '}
                      {inputrequest?.createdBy?.lastName}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                      {inputrequest?.step?.name}
                    </td>

                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3'>
                      <button
                        className='text-indigo-600 hover:text-indigo-900 cursor-pointer'
                        onClick={() => {
                          handleToggle();
                          setInputId(inputrequest?.id);
                        }}
                      >
                        Open
                      </button>
                      <button
                        className='text-red-600 hover:text-red-900 cursor-pointer'
                        onClick={() =>
                          rejectApplicationProcessInstance(inputrequest?.id)
                        }
                      >
                        Reject
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
  );
}
