import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  appProcessId: '',
  Name: '',
  Description: '',
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
  },
});
export const { handleChangeApp, clearValues } = FormAppSlice.actions;

export default FormAppSlice.reducer;
