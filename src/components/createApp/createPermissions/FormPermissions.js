import React from 'react';
import { useFetchRolesPermissions } from '../../../utils/reactQueryCustomHooks';
import { useSelector } from 'react-redux';
import { changeStepPermission } from '../../../features/app/permissionsSlice';
import { useDispatch } from 'react-redux';

const FormPermissions = ({ data }) => {
  // const { fetchFormPermissions } = useFetchFormPermissions();
  const { fetchRolesPermissions } = useFetchRolesPermissions();
  const { stepPermission, permissions, stepId } = useSelector(
    (store) => store.stepspermissions
  );
  const dispatch = useDispatch();
  return (
    <div className='rounded-md bg-base-100 py-1 sm:py-3 '>
      <>
        {data?.sections?.map((section, index) => {
          return (
            <div
              className={`mb-5 sm:mb-10  pb-10 ${
                index !== data?.data?.sections?.length - 1 &&
                'border-b-2 border-gray-200'
              }`}
              key={section.id}
            >
              <h1 className='text-base-content text-lg sm:text-2xl font-semibold px-5 sm:px-7'>
                {section.name}
              </h1>
              {section?.fields?.map((field) => {
                return (
                  <div
                    className='flex flex-col gap-y-5 mx-5 sm:mx-10 mt-4 sm:mt-5'
                    key={field.id}
                  >
                    <div>
                      <div
                        className='border-b-2 pb-5 border-gray-300 text-neutral-content'
                        key={field.id}
                      >
                        {field.name}
                      </div>
                      <div className='w-full text-center'>
                        {fetchRolesPermissions?.data?.map((role) => {
                          const { permissionTypeId } = permissions.find(
                            (permission) =>
                              permission.stepId === stepId &&
                              permission.fieldId === field.id
                          );
                          return (
                            <div className='join mt-5' key={role.id}>
                              <button
                                className={`btn btn-sm join-item mx-2 ${
                                  permissionTypeId === role.id && 'btn-primary'
                                }`}
                                onClick={() =>
                                  dispatch(
                                    changeStepPermission({
                                      fieldId: field.id,
                                      permissionId: role.id,
                                    })
                                  )
                                }
                              >
                                {role?.name}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        {data.data?.fields?.map((field) => {
          return (
            <div
              className={`mb-5 sm:mb-10  pb-10 
                 ${
                   data.data?.sections?.length > 0 ? 'border-t-2' : ''
                 } border-gray-200`}
              key={field.id}
            >
              <h1 className='text-base-content text-lg sm:text-2xl font-semibold px-5 sm:px-7'></h1>
              <div className='flex flex-col gap-y-5 mx-5 sm:mx-10 mt-4 sm:mt-5'>
                <div>
                  <div
                    className='border-b-2 pb-5 border-gray-300 text-neutral-content'
                    key={field.id}
                  >
                    {field.name}
                  </div>
                  <div className='w-full text-center'>
                    {fetchRolesPermissions?.data?.map((role) => {
                      const { permissionTypeId } = permissions.find(
                        (permission) =>
                          permission.stepId === stepId &&
                          permission.fieldId === field.id
                      );
                      return (
                        <div className='join mt-5' key={role.id}>
                          <button
                            className={`btn btn-sm join-item mx-2 ${
                              permissionTypeId === role.id && 'btn-primary'
                            }`}
                            onClick={() =>
                              dispatch(
                                changeStepPermission({
                                  fieldId: field.id,
                                  permissionId: role.id,
                                })
                              )
                            }
                          >
                            {role?.name}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    </div>
  );
};

export default FormPermissions;
