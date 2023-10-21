import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../SharedComponents/Loading';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

export default function NewRequestModal({ open, handleToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentStepId, setCurrentStepId] = useState('');
  const modalClass = cn({
    'modal modal-bottom sm:modal-middle': true,
    'modal-open': open,
  });
  const { data: apps, isLoading: isLoadingApps } = useQuery({
    queryKey: ['all_apps_process_instancess'],
    queryFn: async () => {
      const { data } = await customFetch(
        '/ApplicationProcesses?IsDraft=false&pageNumber=2'
      );
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
        setCurrentStepId(data.currentStepId);
        // handleToggle();
        // navigate(
        //   `createapplicationprocessinstances/Submitted/${data.currentStepId}`
        // );
        console.log(data);
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });
  const { data, isLoading: isLoadingCreateApp } = useQuery({
    queryKey: ['get_input_requests_for_start', currentStepId],
    queryFn: async () => {
      const data = await customFetch(
        `/ApplicationProcessInstanceSteps/ByStepTypeId/${2}`
      );
      return { data };
    },
    onSuccess: (data) => {
      const stepinstance = data.data.data.pendingRequests.find(
        (stepinc) => stepinc.step.id == currentStepId
      );
      handleToggle();
      navigate(
        `createapplicationprocessinstances/Submitted/${stepinstance.id}`
      );
    },
    onError: (error) => {
      console.log(error);
      checkForUnauthorizedResponse(error, dispatch);
    },
    enabled: !!currentStepId,
  });
  console.log(isLoadingCreateApp);
  return (
    <dialog id='new_app_request_modal' className={modalClass}>
      <div className='modal-box'>
        <div className='flex justify-between items-center'>
          <h1 className='text-md sm:text-xl font-semibold text-base-content'>
            Start A New Request
          </h1>
          <form method='dialog'>
            {/* if there is a button in form, it will close the modal */}
            <button
              className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
              onClick={handleToggle}
            >
              ✕
            </button>
          </form>
        </div>

        <div
          className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5 '
          // onSubmit={onSubmit}
        >
          {isLoadingApps ||
          isLoadingAppInstance ||
          (currentStepId && isLoadingCreateApp) ? (
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
