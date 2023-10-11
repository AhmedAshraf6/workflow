import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FormRow } from '../../components/SharedComponents';
import {
  useFetchInputsTypesField,
  useFetchInputsTypesFieldInProcessInstance,
  useCreateApplicationProcessInstanceInputs,
} from '../../utils/reactQueryCustomHooks';
import Loading from '../../components/SharedComponents/Loading';
import { toast } from 'react-toastify';

const CreateApplicationProcessInstance = () => {
  const { processinstancesid, typeaction } = useParams();
  const [submittedForm, setSubmittedForm] = useState([]);
  const dispatch = useDispatch();
  const { data: singleAppProcessById, isLoading: isLoadingSingleAppProcess } =
    useQuery({
      queryKey: ['single_process_instances', processinstancesid],
      queryFn: async () => {
        const { data } = await customFetch(
          `/ApplicationProcessInstanceSteps/${processinstancesid}`
        );
        return data;
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
    });
  // const { data: statusType, isLoading: isLoadingStatusType } = useQuery({
  //   queryKey: ['status_type'],
  //   queryFn: async () => {
  //     const { data } = await customFetch('/StatusTypes');
  //     return data;
  //   },
  //   onError: (error) => {
  //     checkForUnauthorizedResponse(error, dispatch);
  //   },
  // });
  const {
    createApplicationProcessInstanceInputs,
    isLoadingApplicationProcessInstanceInputs,
  } = useCreateApplicationProcessInstanceInputs();

  const { fieldsTypesProcess, isLoadingFields } =
    useFetchInputsTypesFieldInProcessInstance();
  // const statusTypeId = statusType?.find(
  //   (statustype) => statustype.name === typeaction
  // );
  // const rejectedStatusType = statusType?.find(
  //   (statustype) => statustype.name === 'Rejected'
  // );

  if (isLoadingFields || isLoadingSingleAppProcess) {
    //isLoadingStatusType
    return <Loading />;
  }

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

    const makeprocessinstancesidnumber = Number(processinstancesid);
    createApplicationProcessInstanceInputs({
      processinstancesid: makeprocessinstancesidnumber,
      statusTypeId: 2,
      submittedForm,
    });
  };
  // console.log(singleAppProcessById);
  // console.log(fieldsTypesProcess);
  // console.log(statusType);
  // console.log(submittedForm);
  // console.log(statusType);
  return (
    <form className='bg-base-100 rounded-lg py-5' onSubmit={handleSubmit}>
      {singleAppProcessById?.formWithPermissions?.sections?.map((section) => {
        return (
          <section
            key={section.id}
            className=' border-b-2 border-base-300 pb-5 sm:pb-8 mx-2 sm:mx-5'
          >
            <h2 className='text-lg sm:text-2xl font-semibold'>
              {section.name}
            </h2>
            <div className='flex flex-col gap-y-5 sm:gap-y-7 mt-3 sm:mt-5 w-full sm:w-[50%] px-3 sm:px-5'>
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
                        readonly={permissionType?.name === 'Readonly' && true}
                        handleChange={handleChange}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
      {/* fields */}
      <div className='pb-5 sm:pb-8 mx-2 sm:mx-5'>
        <div className='flex flex-col gap-y-5 sm:gap-y-7 mt-3 sm:mt-5 w-full sm:w-[50%] px-3 sm:px-5'>
          {singleAppProcessById?.formWithPermissions?.fields?.map((field) => {
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
                    readonly={permissionType?.name === 'Readonly' && true}
                    handleChange={handleChange}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className='text-center '>
        <button type='button' className='btn btn-error mx-2'>
          Rejected
        </button>
        <button type='submit' className='btn btn-primary mx-2'>
          {typeaction}
        </button>
      </div>
    </form>
  );
};

export default CreateApplicationProcessInstance;
