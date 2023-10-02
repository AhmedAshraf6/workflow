import { configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import modalSlice from './features/modals/modalSlice';
import FormAppSlice from './features/app/FormAppSlice';
import formBuilderSlice from './features/app/formBuilderSlice';
import StepsSlice from './features/app/StepsSlice';
import permissionsSlice from './features/app/permissionsSlice';
export const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    formapp: FormAppSlice,
    formbuilder: formBuilderSlice,
    steps: StepsSlice,
    stepspermissions: permissionsSlice,
  },
});
