import React, { useEffect, useState } from 'react';
import StepsPermissions from '../../components/createApp/createPermissions/StepsPermissions';
import FormPermissions from '../../components/createApp/createPermissions/FormPermissions';
import { useQuery } from '@tanstack/react-query';
import customFetch from '../../utils/axios';
import {
  useFetchFormPermissions,
  useFetchRolesPermissions,
  useFetchStepsPermissions,
} from '../../utils/reactQueryCustomHooks';
import Loading from '../../components/SharedComponents/Loading';
import { useDispatch } from 'react-redux';
import { AddPermissions } from '../../features/app/permissionsSlice';

const CreatePermisions = () => {
  const { isLoadingStepsPermissions, fetchStepsPermissions } =
    useFetchStepsPermissions();
  const { isLoadingFormPermissions, fetchFormPermissions } =
    useFetchFormPermissions();
  const { isLoadingRolesPermissions, fetchRolesPermissions } =
    useFetchRolesPermissions();
  const dispatch = useDispatch();

  if (
    isLoadingFormPermissions ||
    isLoadingStepsPermissions ||
    isLoadingRolesPermissions
  ) {
    return <Loading />;
  }
  if (fetchStepsPermissions && fetchFormPermissions && fetchRolesPermissions) {
    dispatch(
      AddPermissions({
        stepsPermissions: fetchStepsPermissions?.data?.workflowLevels || [],
        formPermissions: fetchFormPermissions?.data || [],
        rolesPermissions: fetchRolesPermissions?.data || [],
      })
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 '>
      <div className='col-span-1 '>
        <StepsPermissions data={fetchStepsPermissions?.data?.workflowLevels} />
      </div>
      <div className='col-span-1 sm:col-span-2'>
        <FormPermissions />
      </div>
    </div>
  );
};

export default CreatePermisions;
