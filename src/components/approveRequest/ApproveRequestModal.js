import React, { useState } from 'react';
import { FormRow } from '../SharedComponents';
import Loading from '../SharedComponents/Loading';
import { useQuery } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import {
  useCreateApplicationProcessInstanceApprove,
  useFetchInputsTypesFieldInProcessInstance,
} from '../../utils/reactQueryCustomHooks';

const ApproveRequestModal = ({ inputid, open, handleToggle, typeaction }) => {
  const dispatch = useDispatch();
  const [submittedForm, setSubmittedForm] = useState([]);

  const modalClass = cn({
    'modal modal-bottom sm:modal-middle': true,
    'modal-open': open,
  });
  const { data: singleAppProcessById, isLoading: isLoadingSingleAppProcess } =
    useQuery({
      queryKey: ['single_process_instances', inputid],
      queryFn: async () => {
        const { data } = await customFetch(
          `/ApplicationProcessInstanceSteps/${inputid}`
        );
        return data;
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });
  console.log(singleAppProcessById);
  const {
    createApplicationProcessInstanceApprove,
    isLoadingApplicationProcessInstanceApprove,
  } = useCreateApplicationProcessInstanceApprove();
  const { fieldsTypesProcess, isLoadingFields } =
    useFetchInputsTypesFieldInProcessInstance();

  const handleChange = (e) => {
    const name = Number(e.target.name);
    const value = e.target.value;
    let bool = 0;
    let temparr = submittedForm;
    const newarr = temparr.map((temp) => {
      if (temp.fieldId == name) {
        bool = 1;
        return { fieldId: name, value };
      }
      return temp;
    });
    if (!bool) {
      setSubmittedForm([...submittedForm, { fieldId: name, value }]);
    } else {
      setSubmittedForm(newarr);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(Number(processinstancesid));
    // console.log(statusTypeId);

    const makeprocessinstancesidnumber = Number(inputid);
    createApplicationProcessInstanceApprove({
      processinstancesid: makeprocessinstancesidnumber,
      statusTypeId: 3,
      handleToggle,
    });
  };
  return (
    <dialog id='input_request_modal' className={modalClass}>
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button
            className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
            onClick={handleToggle}
          >
            ✕
          </button>
        </form>
        {isLoadingApplicationProcessInstanceApprove ||
        isLoadingFields ||
        isLoadingSingleAppProcess ? (
          <Loading />
        ) : (
          <form className='bg-base-100 rounded-lg py-5' onSubmit={handleSubmit}>
            {singleAppProcessById?.formWithPermissions?.sections?.map(
              (section) => {
                return (
                  <section
                    key={section.id}
                    className=' border-b-2 border-base-300 pb-5 sm:pb-8 mx-2 sm:mx-5'
                  >
                    <h2 className='text-lg sm:text-2xl font-semibold'>
                      {section.name}
                    </h2>
                    <div className='flex flex-col gap-y-5 sm:gap-y-7 mt-3 sm:mt-5 w-full  px-3 sm:px-5'>
                      {section?.fields?.map((field) => {
                        const {
                          id,
                          name: fieldName,
                          fieldTypeId,
                          isRequired,
                          permissionType,
                          value,
                        } = field;
                        const tag = fieldsTypesProcess?.find(
                          (option) => option.id === fieldTypeId
                        );
                        return (
                          <div key={id}>
                            {permissionType?.name !== 'Hidden' && (
                              <FormRow
                                name={id}
                                labelText={fieldName}
                                isrequired={isRequired}
                                type={tag?.tagAttributes[0]?.value}
                                key={id}
                                readonly={
                                  permissionType?.name === 'Readonly' && true
                                }
                                handleChange={handleChange}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              }
            )}
            {/* fields */}
            <div className='pb-5 sm:pb-8 mx-2 sm:mx-5'>
              <div className='flex flex-col gap-y-5 sm:gap-y-7 mt-3 sm:mt-5 w-full  px-3 sm:px-5'>
                {singleAppProcessById?.formWithPermissions?.fields?.map(
                  (field) => {
                    const {
                      id,
                      name: fieldName,
                      fieldTypeId,
                      isRequired,
                      permissionType,
                      value,
                    } = field;
                    const tag = fieldsTypesProcess?.find(
                      (option) => option.id === fieldTypeId
                    );
                    return (
                      <div key={id}>
                        {permissionType?.name !== 'Hidden' && (
                          <FormRow
                            name={id}
                            labelText={fieldName}
                            isrequired={isRequired}
                            type={tag?.tagAttributes[0]?.value}
                            key={id}
                            readonly={
                              permissionType?.name === 'Readonly' && true
                            }
                            handleChange={handleChange}
                          />
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <div className='text-center '>
              <button type='submit' className='btn btn-primary mx-2'>
                {typeaction}
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

export default ApproveRequestModal;
