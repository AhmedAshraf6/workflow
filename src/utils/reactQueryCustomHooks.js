import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from './axios';
import { useDispatch } from 'react-redux';
import { clearValues } from '../features/modals/modalSlice';
import { toast } from 'react-toastify';

// Fetch Users
export const useFetchUsers = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const data = await customFetch.get('/Users');
      return data;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  return { data, isLoading };
};
/*  Group */
// Create Group
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
  });

  return { options };
};
