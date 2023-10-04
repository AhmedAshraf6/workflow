import React from 'react';
import { BiSolidMessageAltEdit } from 'react-icons/bi';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { changeStepId } from '../../../features/app/permissionsSlice';
import { useSelector } from 'react-redux';
// import { useFetchStepsPermissions } from '../../../utils/reactQueryCustomHooks';
import Loading from '../../SharedComponents/Loading';
const StepsPermissions = ({ data }) => {
  const { stepId } = useSelector((store) => store.stepspermissions);
  const dispatch = useDispatch();
  // const { fetchStepsPermissions } = useFetchStepsPermissions();

  return (
    <div className='flex flex-col gap-4'>
      {data?.workflowLevels?.map((workflow) => {
        return workflow.steps.map((step) => {
          const { name, description, id, stepTypeId } = step;
          return (
            <div
              key={id}
              className={`flex items-start gap-x-3 sm:gap-x-5  rounded-md p-3 cursor-pointer ${
                stepId === id
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-100 text-base-content'
              }`}
              onClick={() =>
                dispatch(
                  changeStepId({
                    stepId: id,
                  })
                )
              }
            >
              {stepTypeId === 1 ? (
                <div>
                  <AiOutlineCheck
                    className={`text-lg ${
                      id === stepId ? 'text-base-100' : 'text-primary'
                    } sm:text-xl`}
                  />
                </div>
              ) : (
                <div>
                  <BiSolidMessageAltEdit className='text-lg text-secondary sm:text-xl' />
                </div>
              )}
              <div>
                <h3 className='text-lg font-semibold'>{name}</h3>
                <p>{description}</p>
              </div>
            </div>
          );
        });
      })}
    </div>
  );
};

export default StepsPermissions;
