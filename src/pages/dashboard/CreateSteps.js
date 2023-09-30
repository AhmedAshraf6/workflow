import React, { useEffect } from 'react';
import AddStepType from '../../components/createApp/CreateSteps/AddStepType';
import DefaultStep from '../../components/createApp/CreateSteps/DefaultStep';
import { useSelector } from 'react-redux';
import Step from '../../components/createApp/CreateSteps/Step';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useMutation } from '@tanstack/react-query';
import { changeStepNumber } from '../../features/app/FormAppSlice';
import Loading from '../../components/SharedComponents/Loading';

export default function CreateSteps() {
  const { workflowLevels, defaultStep } = useSelector((store) => store.steps);
  const { appProcessId } = useSelector((store) => store.formapp);
  const dispatch = useDispatch();

  const {
    data,
    mutate: createWorkflow,
    isLoading: isCreateWorkFlowLoading,
  } = useMutation({
    mutationFn: async ({ appProcessId, tempWorkflowLevels }) => {
      console.log(appProcessId);
      console.log(tempWorkflowLevels);
      const { data } = await customFetch.post('/Workflows', {
        applicationProcessId: appProcessId,
        workflowLevels: tempWorkflowLevels,
      });
      return data;
    },
    onSuccess: () => {
      dispatch(changeStepNumber(4));
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workflowLevels.length === 0) {
      toast.error('please add one or more step');
      return;
    }
    let tempWorkflowLevels = workflowLevels.map((workflow) => {
      let n = workflow.steps.map((step) => {
        return {
          ...step,
          stepUserPermissions: step.stepUserPermissions.stepUserPermissions,
        };
      });
      return {
        ...workflow,
        steps: n,
      };
    });
    tempWorkflowLevels.unshift(defaultStep);
    createWorkflow({ appProcessId, tempWorkflowLevels });
  };
  if (isCreateWorkFlowLoading) {
    return <Loading />;
  }
  return (
    <div className='flex flex-col items-center'>
      <div className='rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center relative'>
        <div className='absolute top-8 bg-gray-300 w-[2px] h-[157px]'></div>

        <div className='w-[20px] h-[20px] border-2 border-neutral   rounded-full'></div>
      </div>

      <DefaultStep />
      <div className='allSteps'>
        {workflowLevels?.map((workflow) => {
          return <Step key={workflow.sortOrder} workflow={workflow} />;
        })}
      </div>
      <AddStepType />

      <div className='rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center'>
        <div className='w-[20px] h-[20px] border-2 bg-neutral   rounded-full'></div>
      </div>
      <form
        className='flex justify-center mt-5 sm:mt-10'
        onSubmit={handleSubmit}
      >
        <button type='submit' className='btn btn-primary'>
          Next
        </button>
      </form>
    </div>
  );
}
