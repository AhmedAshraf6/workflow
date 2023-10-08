import React from 'react';
import { useDispatch } from 'react-redux';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../SharedComponents/Loading';
import { useNavigate } from 'react-router-dom';

export default function NewRequestModal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: apps, isLoading: isLoadingApps } = useQuery({
    queryKey: ['all_apps_process_instancess'],
    queryFn: async () => {
      const { data } = await customFetch('/ApplicationProcesses?IsDraft=false');
      return data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  const { mutate: createAppProcessInstances, isLoading: isLoadingAppInstance } =
    useMutation({
      mutationFn: async (appid) => {
        const { data } = await customFetch.post(
          '/ApplicationProcessInstances',
          {
            applicationProcessId: appid,
          }
        );
        return data;
      },
      onSuccess: (data) => {
        document.getElementById('new_app_request_modal').close();
        navigate(`createapplicationprocessinstances/Submitted/${data.id}`);
        console.log(data);
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });

  return (
    <dialog id='new_app_request_modal' className='modal'>
      <div className='modal-box'>
        <div className='flex justify-between items-center'>
          <h1 className='text-md sm:text-xl font-semibold text-base-content'>
            Start A New Request
          </h1>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
        </div>

        <div
          className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5 '
          // onSubmit={onSubmit}
        >
          {isLoadingApps || isLoadingAppInstance ? (
            <span className='loading loading-dots loading-lg mx-auto '></span>
          ) : (
            apps?.items?.map((item) => {
              return (
                <div
                  className='flex justify-between items-center border-b-2 border-base-200 pb-5'
                  key={item.id}
                >
                  <div>
                    <h2 className='text-base sm:text-lg'>{item.name}</h2>
                    <p className='text-base text-neutral-content mt-3 sm:mt-50'>
                      {item.description}
                    </p>
                  </div>
                  <button
                    className='btn btn-sm btn-primary text-primary-content font-semibold'
                    onClick={() => createAppProcessInstances(item.id)}
                  >
                    Invite
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </dialog>
  );
}
