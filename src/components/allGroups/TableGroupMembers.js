import { useDispatch } from 'react-redux';

export default function TableGroupMembers({
  data: { id, name, description, users },
}) {
  const dispatch = useDispatch();
  // const {} = useSelector((store)=>)
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

                  <th scope='col' className='relative px-6 py-3'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className='bg-white divide-y divide-gray-200'>
                {users.map((user) => (
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

                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-3'>
                      <span className='text-red-600 hover:text-red-900 cursor-pointer'>
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
  );
}
