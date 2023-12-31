import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  roleId: '',
  roles: [
    { id: 1, name: 'Administrator' },
    {
      id: 2,
      name: 'User',
    },
  ],
  editUserId: '',
  isEdittingMember: false,
  // Groub
  groupId: '',
  nameOfGroup: '',
  descGroup: '',
  userIdsInGroup: [],
  isGroubModalOpen: false,
  isEditGroub: false,
  isEditGroubMember: false,
  // edit ids
  userGroups: [],
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // shared
    handleChangeMember: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
    // users
    setEditMember: (state, { payload }) => {
      return { ...state, isEdittingMember: true, ...payload };
    },

    setEditGroup: (state, { payload }) => {
      return { ...state, isEditGroub: true, ...payload };
    },
  },
});
export const { handleChangeMember, setEditMember, clearValues, setEditGroup } =
  modalSlice.actions;

export default modalSlice.reducer;
