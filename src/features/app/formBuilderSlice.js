import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  sections: [
    {
      id: 'ExtraFields',
      name: '',
      fields: [],
    },
  ],
  isSidebarInputOpen: false,
  fieldName: '',
  fieldTypeId: '',
  isRequired: 'true',
  indexParent: '',
  indexChild: '',
  sortOrder: '',
  formId: '',
  isEditForm: false,
  UpdatedFormId: '',
};

const FormBuilderSlice = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
    setIsSidebarInputOpen: (state) => {
      state.isSidebarInputOpen = !state.isSidebarInputOpen;
    },
    // used only for outlet when user click on page
    closeSidebarInputOpen: (state) => {
      state.isSidebarInputOpen = false;
    },
    setEditSidebarInput: (state, { payload }) => {
      return { ...state, ...payload };
    },
    handleChangeCreatedInput: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    // add section to form
    addNewFormDataToSections: (state, { payload }) => {
      state.sections = payload;
    },
    // Add Section name with empty fields
    addSectionToForm: (state, { payload }) => {
      state.sections.unshift(payload);
    },
    // edit section name
    editSectionName: (state, { payload: { indexParent, val } }) => {
      state.sections[indexParent].name = val;
    },
    // Add input To Extra fields
    addInputToExtraFields: (
      state,
      {
        payload: {
          index,
          extrafield: { id, fieldName, fieldTypeId, isRequired },
        },
      }
    ) => {
      state.sections[index].fields.push({
        id,
        name: fieldName,
        fieldTypeId,
        isRequired,
      });
    },
    editInputsInsideSections: (
      state,
      { payload: { indexParent, indexChild, field } }
    ) => {
      state.sections[indexParent].fields[indexChild] = {
        ...state.sections[indexParent].fields[indexChild],
        ...field,
      };
    },
    deleteInputsInsideSections: (
      state,
      { payload: { indexParent, indexChild } }
    ) => {
      state.sections[indexParent].fields.splice(indexChild, 1);
    },
    // clear value input field
    clearValues: (state) => {
      state.fieldName = '';
      state.fieldTypeId = '';
      // state.isRequired = 'true';
      state.indexParent = '';
      state.indexChild = '';
    },
    clearAllValues: (state) => initialState,
    // Edit Fields frozen objects doesn't editted outside dispatch
    editFields: (state, { payload: { indexSec, id, destination, add } }) => {
      state.sections[indexSec].fields.splice(destination, 0, {
        ...add,
        id,
      });
    },
    addFormId: (state, { payload }) => {
      state.formId = payload;
    },
    setIsEditForm: (state, { payload: { sections, fields, updateformId } }) => {
      state.isEditForm = true;
      state.UpdatedFormId = updateformId;
      // sections[0].fields = fields.length > 0 || [];
      const tempSections = sections.map((sec) => {
        const fields = sec.fields.map((field) => {
          return { ...field, id: uuidv4() };
        });
        return { ...sec, id: `${uuidv4()}`, fields };
      });
      const tempFields = fields?.map((tempfield) => {
        return { ...tempfield, id: uuidv4() };
      });
      state.sections[0].fields = tempFields.length > 0 ? tempFields : [];
      state.sections = tempSections.flat();
    },
  },
});
export const {
  toggleAppModal,
  addNewFormDataToSections,
  addSectionToForm,
  editFields,
  editSectionName,
  addInputToExtraFields,
  setIsEditInput,
  handleChangeCreatedInput,
  setIsSidebarInputOpen,
  clearValues,
  setEditSidebarInput,
  closeSidebarInputOpen,
  editInputsInsideSections,
  deleteInputsInsideSections,
  addFormId,
  setIsEditForm,
  clearAllValues,
} = FormBuilderSlice.actions;

export default FormBuilderSlice.reducer;
