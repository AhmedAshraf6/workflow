import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workflowLevels: [],
  stepId: '',
  stepName: '',
  usersInStep: [],
  defaultStep: {
    sortOrder: 1,
    steps: [
      {
        name: 'Default First Step',
        description: 'This step is to take the input from the User.',
        stepTypeId: 2,
        sortOrder: 1,
        stepUserPermissions: [],
      },
    ],
  },
  renderedDefaultUserPermisions: [],
  moreStep: [],
  addForm: [],
};

const StepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    editStepId: (state, { payload }) => {
      state.stepId = payload;
    },
    handleSelect: (state, { payload: { name, value, renderedPermisions } }) => {
      state.defaultStep.steps[0][name] = value;
      state.renderedDefaultUserPermisions = renderedPermisions;
    },
    removeDfaultUserPermisions: (state) => {
      state.defaultStep.steps[0].stepUserPermissions = [];
      state.renderedDefaultUserPermisions = [];
    },
    handleMoreStep: (
      state,
      { payload: { name, value, index, stepTypeId } }
    ) => {
      state.moreStep[index] = {
        ...state.moreStep[index],
        [name]: value,
        stepTypeId,
      };
    },
    handleAddForm: (state) => {
      state.addForm.push('a');
    },
    deleteMoreStep: (state, { payload }) => {
      state.moreStep.splice(payload, 1);
      state.addForm.splice(payload, 1);
    },
  },
});
export const {
  toggleAppModal,
  editStepId,
  handleMoreStep,
  deleteMoreStep,
  handleAddForm,
  handleSelect,
  removeDfaultUserPermisions,
} = StepsSlice.actions;

export default StepsSlice.reducer;
