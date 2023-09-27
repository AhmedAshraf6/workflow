import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  appProcessId: '',
  Name: '',
  Description: '',
  stepNumber: 1,
};

const FormAppSlice = createSlice({
  name: 'formApp',
  initialState,
  reducers: {
    handleChangeApp: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: (state, { payload }) => {
      return {
        ...initialState,
        ...payload,
      };
    },
    changeStepNumber: (state, { payload }) => {
      state.stepNumber = payload;
    },
  },
});
export const { handleChangeApp, clearValues, changeStepNumber } =
  FormAppSlice.actions;

export default FormAppSlice.reducer;
