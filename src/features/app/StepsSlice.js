import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workflowLevels: [],
  
  stepId: '',
  stepName:'',
  usersInStep:[],
  isStepModalOpen: false,
  defaultStep: {
    sortOrder: 1,
    steps: [
      {
        name: 'Default First Step',
        description: 'This step is to take the input from the User.',
        stepTypeId: 2,
        sortOrder: 1,
      },
    ],
  },
};

const StepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    editStepId: (state, { payload }) => {
      state.stepId = payload;
    },
    toggleStepModal: (state) => {
      state.openStepModal = !state.openStepModal;
    },
  },
});
export const { toggleAppModal, editStepId, toggleStepModal } =
  StepsSlice.actions;

export default StepsSlice.reducer;
