import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workflowLevels: [],
  name: '',
  description: '',
  stepTypeId: '',
  sortOrder: 1,
  stepUserPermissions: {
    stepUserPermissions: [],
    renderedUserPermisions: [],
  },
  moreStep: [],
  addForm: [],
  sortOrderParent: 0,
  sortOrderChild: 0,

  // default step
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
  stepsId: '10',
};

const StepsSlice = createSlice({
  name: 'steps',
  initialState,
  reducers: {
    addStepToWorkflowLevels: (state, { payload }) => {
      state.workflowLevels.push(payload);
    },
    setEditStep: (state, { payload }) => {
      return { ...state, ...payload };
    },
    editStepInsideWorkflowLevels: (state) => {
      let n = state.workflowLevels.map((workflowLevel) => {
        if (workflowLevel.sortOrder === state.sortOrderParent) {
          let s = workflowLevel.steps.map((step) => {
            if (step.sortOrder === state.sortOrderChild) {
              return {
                ...step,
                name: state.name,
                description: state.description,
                stepUserPermissions: state.stepUserPermissions,
              };
            }
            return step;
          });

          return { sortOrder: state.sortOrderParent, steps: s };
        }

        return workflowLevel;
      });
      state.workflowLevels = n;
    },
    deleteStepFromWorkflowLevels: (
      state,
      { payload: { sortOrdParent, sortOrdChild } }
    ) => {
      if (sortOrdParent && !sortOrdChild) {
        state.workflowLevels = state.workflowLevels.filter(
          (workflowLevel) => workflowLevel.sortOrder !== sortOrdParent
        );
      } else {
        let n = state.workflowLevels.map((workflowLevel) => {
          if (workflowLevel.sortOrder === sortOrdParent) {
            const a = workflowLevel.steps.filter(
              (step) => step.sortOrder !== sortOrdChild
            );
            return { sortOrder: sortOrdParent, steps: a };
          }

          return workflowLevel;
        });
        state.workflowLevels = n;
      }
    },
    clearValues: (state) => {
      state.name = '';
      state.description = '';
      state.stepTypeId = '';
      state.stepUserPermissions = {
        stepUserPermissions: [],
        renderedUserPermisions: [],
      };
      state.moreStep = [];
      state.addForm = [];
    },
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
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
      { payload: { name, value, index, stepTypeIdState } }
    ) => {
      state.moreStep[index] = {
        ...state.moreStep[index],
        [name]: value,
        stepTypeId: stepTypeIdState,
        sortOrder: index + 2,
      };
    },
    handleAddForm: (state) => {
      state.addForm.push('a');
    },
    deleteMoreStep: (state, { payload }) => {
      state.moreStep.splice(payload, 1);
      state.addForm.splice(payload, 1);
    },
    AddStepsId: (state, { payload }) => {
      state.stepsId = payload;
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
  handleChange,
  addStepToWorkflowLevels,
  clearValues,
  setEditStep,
  editStepInsideWorkflowLevels,
  deleteStepFromWorkflowLevels,
  AddStepsId,
} = StepsSlice.actions;

export default StepsSlice.reducer;
