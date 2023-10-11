import React, { useEffect, useState } from 'react';
import StepsPermissions from '../../components/createApp/createPermissions/StepsPermissions';
import FormPermissions from '../../components/createApp/createPermissions/FormPermissions';

import Loading from '../../components/SharedComponents/Loading';
import { useDispatch } from 'react-redux';
import {
  AddPermissions,
  finsihLoading,
  startLoading,
} from '../../features/app/permissionsSlice';
import { useSelector } from 'react-redux';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useCreatePermissions } from '../../utils/reactQueryCustomHooks';
// import {
//   useFetchFormPermissions,
//   useFetchStepsPermissions,
// } from '../../utils/reactQueryCustomHooks';
const CreatePermisions = () => {
  const { stepsId } = useSelector((store) => store.steps);
  const { formId } = useSelector((store) => store.formbuilder);
  const [isLoading, setIsloading] = useState(true);
  const [stepsPermission, setStepsPermission] = useState([]);
  const [formPermission, setFormPermission] = useState([]);
  const { isLoadingAction, permissions } = useSelector(
    (store) => store.stepspermissions
  );
  const { appProcessId } = useSelector((store) => store.formapp);
  const { data, createPermission, isLoadingCreatePermissions } =
    useCreatePermissions();
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      const res = await customFetch(`/Workflows/${stepsId}`);
      setStepsPermission(res.data);
    } catch (error) {
      setIsloading(false);
      checkForUnauthorizedResponse(error, dispatch);
    }
  };
  const fetchData2 = async () => {
    try {
      const res = await customFetch(`/Forms/${formId}`);
      setFormPermission(res.data);
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      checkForUnauthorizedResponse(error, dispatch);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
    return () => {
      clearTimeout();
    };
  }, []);
  useEffect(() => {
    if (stepsPermission?.workflowLevels?.length > 0) {
      fetchData2();
    }
  }, [stepsPermission]);

  useEffect(() => {
    if (
      formPermission?.sections?.length > 0 ||
      formPermission?.field?.lenght > 0
    ) {
      dispatch(startLoading());
      dispatch(
        AddPermissions({
          stepsPermissions: stepsPermission?.workflowLevels,
          formPermissions: formPermission,
        })
      );
      dispatch(finsihLoading());
    }
  }, [formPermission]);
  if (isLoadingAction || isLoading || isLoadingCreatePermissions) {
    return <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createPermission({
      permissions,
      applicationProcessId: appProcessId,
    });
  };
  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 '>
        <div className='col-span-1 '>
          <StepsPermissions data={stepsPermission} />
        </div>
        <div className='col-span-1 sm:col-span-2'>
          <FormPermissions data={formPermission} />
        </div>
      </div>
      <form
        className='text-center w-full mt-5 sm:mt-10'
        onSubmit={handleSubmit}
      >
        <button type='submit' className='btn btn-primary'>
          Finsih
        </button>
      </form>
    </>
  );
};

export default CreatePermisions;
