import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import BlankForm from '../../components/createApp/createForm/BlankForm';
import FormFields from '../../components/createApp/createForm/FormFields';
import { useMutation, useQuery } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import Loading from '../../components/SharedComponents/Loading';
import { useSelector } from 'react-redux';
import {
  addNewFormDataToSections,
  editFields,
} from '../../features/app/formBuilderSlice';
import { toast } from 'react-toastify';
export default function CreateForm() {
  const dispatch = useDispatch();
  const [inputData, seInputData] = useState([]);
  const { appProcessId } = useSelector((store) => store.formapp);
  const { sections } = useSelector((store) => store.formbuilder);

  const { data, isLoading } = useQuery({
    queryKey: ['inputsData'],
    queryFn: async () => {
      const data = await customFetch('/FieldTypes');
      const tempData = data.data.map((inp) => {
        return {
          id: uuidv4(),
          fieldTypeId: inp.id,
          name: inp.name,
          isRequired: 'true',
          sortOrder: Math.floor((1 + Math.random()) * 0x10000),
        };
      });
      seInputData(tempData);
      return tempData;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });

  // Add Form Data To api
  const { mutate: createForm, isLoading: isCreateFormLoading } = useMutation({
    mutationFn: async (dataSend) => {
      console.log(dataSend);
      const { data } = await customFetch.post('/Forms', dataSend);
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success('Form Added');
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });

  const handleDragEnd = (result) => {
    const { destination, source, type } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // دي لو هتنقل من ال بلانك فورم للانبوت ففيلد ممكن نحذفها حاليا
    if (destination.droppableId === 'inputData') {
      return;
    }
    if (source.droppableId === 'inputData') {
      let add;
      let active = inputData;
      let complete = sections;
      // Source Logic
      if (source.droppableId === 'inputData') {
        add = active[source.index];
        // active.splice(source.index, 1);
      } else {
        add = complete[source.index];
        complete.splice(source.index, 1);
      }
      sections.forEach((sec, indexSec) => {
        if (sec.id === destination.droppableId) {
          dispatch(
            editFields({
              sec,
              destination: destination.index,
              add,
              id: uuidv4(),
              indexSec,
            })
          );
          seInputData(data);
          return;
        }
      });
      return;
    }
    if (type === 'group') {
      const reorderedStores = [...sections];

      const storeSourceIndex = source.index;
      const storeDestinatonIndex = destination.index;

      const [removedStore] = reorderedStores.splice(storeSourceIndex, 1);
      reorderedStores.splice(storeDestinatonIndex, 0, removedStore);

      return dispatch(addNewFormDataToSections(reorderedStores));
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = sections.findIndex(
      (store) => store.id === source.droppableId
    );
    const storeDestinationIndex = sections.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...sections[storeSourceIndex].fields];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...sections[storeDestinationIndex].fields]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...sections];

    newStores[storeSourceIndex] = {
      ...sections[storeSourceIndex],
      fields: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...sections[storeDestinationIndex],
      fields: newDestinationItems,
    };

    dispatch(addNewFormDataToSections(newStores));
  };
  // handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    let tempSections = [];
    let fields = [];
    let tempfields = [];
    let tempsSecFields = [];
    sections.forEach((sec) => {
      if (sec.id !== 'ExtraFields') {
        tempsSecFields = sec.fields.map((field) => {
          const { fieldTypeId, name, isRequired, sortOrder } = field;
          return {
            fieldTypeId,
            name,
            isRequired: isRequired === 'true' ? true : false,
            sortOrder,
          };
        });
        tempSections.push({ name: sec.name, fields: tempsSecFields });
      }
    });
    sections.forEach((sec) => {
      if (sec.id === 'ExtraFields') {
        tempfields = sec.fields.map((field) => {
          const { fieldTypeId, name, isRequired, sortOrder } = field;
          return {
            fieldTypeId,
            name,
            isRequired: isRequired === 'true' ? true : false,
            sortOrder,
          };
        });
        fields.push(...tempfields);
      }
    });
    if (tempfields.length === 0 && tempsSecFields.length === 0) {
      toast.error('Please provide one or more field');
      return;
    }
    createForm({
      applicationProcessId: appProcessId,
      fields,
      sections: tempSections,
    });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='grid grid-cols-1 md:grid-cols-3 items-start gap-5 mt-4 sm:mt-6'>
        <FormFields inputData={inputData} />
        <BlankForm />
      </div>
      <form onSubmit={handleSubmit} className='flex justify-center'>
        <button type='submit' className='btn btn-primary  '>
          Next
        </button>
      </form>
    </DragDropContext>
  );
}
// tempfields = sec.fields.map((field) => {
//   const { fieldTypeId, name, isRequired, sortOrder } = field;
//   return { ahmed: '1' };
// });
// return tempfields;
