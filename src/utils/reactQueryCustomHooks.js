import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from './axios';
import { useDispatch } from 'react-redux';
import { clearValues } from '../features/modals/modalSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeStepNumber } from '../features/app/FormAppSlice';

// Fetch Users
export const useFetchUsers = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const data = await customFetch.get('/Users');
      const userOptions = data?.data.map((user) => {
        return { label: user.email, value: user.id, isUserId: true };
      });
      return { data, userOptions };
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return { data, isLoading };
};

/*  Group */
// Create Group
export const useFetchGroups = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ['AllGroups'],
    queryFn: async () => {
      const data = await customFetch.get('/Groups');
      const groupOptions = data?.data.map((group) => {
        return { label: group.name, value: group.id };
      });
      return { data, groupOptions };
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return { data, isLoading };
};
export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const { mutate: createGroup, isLoading: isCreateGroupLoading } = useMutation({
    mutationFn: async ({ nameOfGroup, descGroup, userIdsInGroup }) => {
      const { data } = await customFetch.post('/Groups', {
        name: nameOfGroup,
        description: descGroup,
        userIds: userIdsInGroup,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('Group Added Successfully...');
      queryClient.invalidateQueries({ queryKey: ['AllGroups'] });
      dispatch(clearValues());
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return { createGroup, isCreateGroupLoading };
};
// Edit Group
export const useEditGroup = () => {
  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const { mutate: editGroup, isLoading: isEditGroupLoading } = useMutation({
    mutationFn: async ({ groupId, group }) => {
      const { data } = await customFetch.put(`/Groups/${groupId}`, group);
      return data;
    },
    onSuccess: () => {
      toast.success('Group Editted Successfully...');
      queryClient.invalidateQueries({ queryKey: ['AllGroups'] });
      dispatch(clearValues());
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return { editGroup, isEditGroupLoading };
};
// Group//

// FormBuilderSLice =>>>> getTypesInputFields
export const useFetchInputsTypesField = () => {
  const { data: options } = useQuery({
    queryKey: ['getTypesInputFields'],
    queryFn: async () => {
      const res = await customFetch('/FieldTypes');
      const options = res?.data.map((t) => {
        return { id: t.id, name: t.name };
      });
      return options;
    },
    refetchOnWindowFocus: false,
  });

  return { options };
};
export const useFetchInputsTypesFieldInProcessInstance = () => {
  const { data: fieldsTypesProcess, isLoading: isLoadingFields } = useQuery({
    queryKey: ['getTypesInputFieldsInProcessInstance'],
    queryFn: async () => {
      const { data } = await customFetch('/FieldTypes');
      return data;
    },
    refetchOnWindowFocus: false,
  });

  return { fieldsTypesProcess, isLoadingFields };
};

// fetch users and groups

// fetch Step Type id

export const useFetchStepTypes = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['stepType'],
    queryFn: async () => {
      return await customFetch('/StepTypes');
    },
    refetchOnWindowFocus: false,
  });
  return { data, isLoading };
};

// Permissions
// export const useFetchStepsPermissions = () => {
//   const { stepsId } = useSelector((store) => store.steps);
//   const dispatch = useDispatch();
//   const { data: fetchStepsPermissions, isLoading: isLoadingStepsPermissions } =
//     useQuery({
//       queryKey: ['stepsPermissions'],
//       queryFn: async () => {
//         const data = await customFetch(`/Workflows/${stepsId}`, {
//           timeout: 1000,
//         });
//         return data;
//       },
//       onError: (error) => {
//         checkForUnauthorizedResponse(error, dispatch);
//       },
//       retry: false, // Disable retries
//     });
//   return { fetchStepsPermissions, isLoadingStepsPermissions };
// };

// export const useFetchFormPermissions = () => {
//   const { formId } = useSelector((store) => store.formbuilder);
//   const dispatch = useDispatch();
//   const { data: fetchFormPermissions, isLoading: isLoadingFormPermissions } =
//     useQuery({
//       queryKey: ['formPermissions'],
//       queryFn: async () => {
//         const data = await customFetch(`/Forms/${formId}`, { timeout: 2000 });
//         return data;
//       },
//       onError: (error) => {
//         checkForUnauthorizedResponse(error, dispatch);
//       },
//       retry: false, // Disable retries
//     });
//   return { fetchFormPermissions, isLoadingFormPermissions };
// };

export const useFetchRolesPermissions = () => {
  const dispatch = useDispatch();
  const { data: fetchRolesPermissions, isLoading: isLoadingRolesPermissions } =
    useQuery({
      queryKey: ['rolesPermissions'],
      queryFn: async () => {
        const data = await customFetch('/PermissionTypes');
        return data;
      },
      onError: (error) => {
        checkForUnauthorizedResponse(error, dispatch);
      },
      refetchOnWindowFocus: false,
    });
  return { fetchRolesPermissions, isLoadingRolesPermissions };
};
// export const useMultiQuery = () => {
//   const { stepsId } = useSelector((store) => store.steps);
//   const { formId } = useSelector((store) => store.formbuilder);

//   const results = useQueries({
//     queries: [
//       {
//         queryKey: ['stepsPermissions'],
//         queryFn: async () => {
//           const data = await customFetch(`/Workflows/${stepsId}`);
//           return data;
//         },
//       },
//       {
//         queryKey: ['formPermissions'],
//         queryFn: async () => {
//           const data = await customFetch(`/Forms/${formId}`);
//           return data;
//         },
//       },
//     ],
//   });
//   const isLoading = results.some((query) => query.isLoading);
//   return { results, isLoading };
// };

export const useCreatePermissions = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data,
    mutate: createPermission,
    isLoading: isLoadingCreatePermissions,
  } = useMutation({
    mutationFn: async ({ permissions, applicationProcessId }) => {
      const { data } = await customFetch.post('/Permissions', {
        permissions,
        applicationProcessId,
      });
      return data;
    },
    onSuccess: () => {
      toast.success('Permission added Successfully...');
      dispatch(changeStepNumber(1));
      navigate('/allapps');
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return { data, createPermission, isLoadingCreatePermissions };
};

// get application process instance steps
export const useCreateApplicationProcessInstanceInputs = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: createApplicationProcessInstanceInputs,
    isLoading: isLoadingApplicationProcessInstanceInputs,
  } = useMutation({
    mutationFn: async ({
      processinstancesid,
      statusTypeId,
      submittedForm,
      handleToggle,
    }) => {
      const { data } = await customFetch.post(
        '/ApplicationProcessInstanceInputs',
        {
          applicationProcessInstanceStepId: processinstancesid,
          statusTypeId,
          formUserInputs: submittedForm,
        }
      );
      handleToggle && handleToggle();
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['get_input_requests'] });
      toast.success('added successfully');
      navigate('/');
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return {
    createApplicationProcessInstanceInputs,
    isLoadingApplicationProcessInstanceInputs,
  };
};
export const useCreateApplicationProcessInstanceApprove = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    mutate: createApplicationProcessInstanceApprove,
    isLoading: isLoadingApplicationProcessInstanceApprove,
  } = useMutation({
    mutationFn: async ({ processinstancesid, statusTypeId, handleToggle }) => {
      console.log(processinstancesid);
      console.log(statusTypeId);
      const { data } = await customFetch.post(
        '/ApplicationProcessInstanceInputs',
        {
          applicationProcessInstanceStepId: processinstancesid,
          statusTypeId,
        }
      );
      handleToggle();
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ['get_Approve_requests'] });
      toast.success('added successfully');
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return {
    createApplicationProcessInstanceApprove,
    isLoadingApplicationProcessInstanceApprove,
  };
};
