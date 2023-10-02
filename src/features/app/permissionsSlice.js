import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stepId: '',
  permissions: [],
};

const permissionsSlice = createSlice({
  name: 'stepspermissions',
  initialState,
  reducers: {
    changeStepId: (state, { payload: { stepId, stepPermission } }) => {
      state.stepId = stepId;
    },
    changeStepPermission: (state, { payload: { fieldId, permissionId } }) => {
      state.permissions = state.permissions.map((permission) => {
        if (
          permission.stepId === state.stepId &&
          permission.fieldId === fieldId
        ) {
          return { ...permission, permissionTypeId: permissionId };
        }
        return permission;
      });
    },
    AddPermissions: (
      state,
      { payload: { stepsPermissions, formPermissions } }
    ) => {
      const finalStepsPer = stepsPermissions?.map((workflow) => {
        const steps = workflow?.steps?.map((step) => {
          const stepId = step.id;
          const stepTypeId = step.stepTypeId;

          const sections = formPermissions?.sections?.map((section) => {
            const fields = section?.fields?.map((field) => {
              return {
                stepId,
                fieldId: field.id,
                permissionTypeId: stepTypeId === 1 ? 8 : 7,
              };
            });
            return fields;
          });

          const lonelyFields = formPermissions?.fields?.map((field) => {
            return {
              stepId,
              fieldId: field.id,
              permissionTypeId: stepTypeId === 1 ? 8 : 7,
            };
          });

          return [...sections, ...lonelyFields];
        });
        return steps;
      });
      const tempSteps = finalStepsPer.flat(3);
      state.permissions = tempSteps;
      state.stepId = tempSteps[0].stepId;
    },
  },
});
export const { changeStepId, AddPermissions, changeStepPermission } =
  permissionsSlice.actions;

export default permissionsSlice.reducer;
