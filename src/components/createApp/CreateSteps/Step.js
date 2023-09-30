import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  deleteStepFromWorkflowLevels,
  setEditStep,
} from '../../../features/app/StepsSlice';
import { FaTrash } from 'react-icons/fa';

const Step = ({ workflow }) => {
  const { workflowLevels } = useSelector((store) => store.steps);
  const dispatch = useDispatch();
  const [dis, setDis] = useState('');

  useEffect(() => {
    const allsteps = document.querySelector('.allSteps');
    let firstEl = '';
    let secondEl = '';
    if (allsteps.children[allsteps.children.length - 1]) {
      firstEl =
        allsteps.children[allsteps.children.length - 1].getBoundingClientRect();
    }
    if (allsteps.children[allsteps.children.length - 2]) {
      secondEl =
        allsteps.children[allsteps.children.length - 2].getBoundingClientRect();
    }
    var distance = '';
    if (secondEl) {
      distance = Math.abs(secondEl.top - firstEl.top) - 170;
    }

    setDis(distance ? distance : '160');
  }, [workflow]);
  return (
    <>
      {workflow?.steps.length > 1 ? (
        <div className='relative'>
          {workflow.steps.map((step, index) => {
            const { name, description, sortOrder, stepUserPermissions } = step;
            return (
              <div
                className={`bg-base-100  w-[300px] rounded-md text-base-content relative py-5  ${
                  index > 0 ? 'left-12 mt-5' : 'mt-[200px]'
                }`}
              >
                <div
                  className={`absolute bottom-[165px]  bg-gray-300 w-[2px] ${
                    index > 0 && 'h-[20px]'
                  } ${index === 0 && 'right-[90%]'}`}
                  style={{ height: `${index === 0 && `${dis}px`}` }}
                ></div>
                <div className='px-4 text-lg'>
                  <div className='flex justify-between items-center '>
                    <h2 className='text-primary font-semibold text-lg sm:text-xl'>
                      {name}
                    </h2>
                    <FaTrash
                      className='text-lg text-neutral cursor-pointer'
                      onClick={() =>
                        dispatch(
                          deleteStepFromWorkflowLevels({
                            sortOrdParent: workflow.sortOrder,
                            sortOrdChild: sortOrder,
                          })
                        )
                      }
                    />
                  </div>

                  <h4 className='mt-4'>{description}</h4>
                </div>
                <hr className='border-gray-600  mt-4' />
                <button
                  className='w-full text-end mt-3 px-4'
                  onClick={() => {
                    dispatch(
                      setEditStep({
                        name,
                        description,
                        stepUserPermissions,
                        sortOrderParent: workflow?.sortOrder,
                        sortOrderChild: sortOrder,
                      })
                    );
                    document.getElementById('edit_step_modal').showModal();
                  }}
                >
                  Change
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        workflow.steps.map((step) => {
          const { name, description, sortOrder, stepUserPermissions } = step;
          return (
            <div className='bg-base-100 mt-40 w-[300px] rounded-md text-base-content relative py-5'>
              <div
                className={`absolute bottom-[165px]  bg-gray-300 w-[2px] right-[90%]`}
                style={{ height: `${dis}px` }}
              ></div>

              <div className='px-4 text-lg'>
                <div className='flex justify-between items-center '>
                  <h2 className='text-primary font-semibold text-lg sm:text-xl'>
                    {name}
                  </h2>
                  <FaTrash
                    className='text-lg text-neutral cursor-pointer'
                    onClick={() =>
                      dispatch(
                        deleteStepFromWorkflowLevels({
                          sortOrdParent: workflow.sortOrder,
                          // sortOrdChild: sortOrder,
                        })
                      )
                    }
                  />
                </div>

                <h4 className='mt-4'>{description}</h4>
              </div>

              <hr className='border-gray-600  mt-4' />
              <button
                className='w-full text-end mt-3 px-4'
                onClick={() => {
                  dispatch(
                    setEditStep({
                      name,
                      description,
                      stepUserPermissions,
                      sortOrderParent: workflow?.sortOrder,
                      sortOrderChild: sortOrder,
                    })
                  );
                  document.getElementById('edit_step_modal').showModal();
                }}
              >
                Change
              </button>
            </div>
          );
        })
      )}
    </>
  );
};

export default Step;
