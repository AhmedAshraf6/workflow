import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
  appProcessId: '',
  Name: '',
  Description: '',
  isAppModalOpen: false,
};

const FormAppSlice = createSlice({
  name: 'formApp',
  initialState,
  reducers: {
    toggleAppModal: (state) => {
      state.isAppModalOpen = !state.isAppModalOpen;
    },
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
export const { toggleAppModal, handleChangeApp, clearValues } =
  FormAppSlice.actions;

export default FormAppSlice.reducer;
