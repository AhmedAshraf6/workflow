import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineMail, AiOutlineUser } from 'react-icons/ai';
import { BsFillCalendarDateFill, BsCurrencyDollar } from 'react-icons/bs';
import BlankForm from '../../components/createApp/createForm/BlankForm';
import FormFields from '../../components/createApp/createForm/FormFields';
import { useQuery } from '@tanstack/react-query';
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios';
import { useDispatch } from 'react-redux';
import Loading from '../../components/SharedComponents/Loading';
import { useSelector } from 'react-redux';
import {
  addNewFormDataToSections,
  addSectionToForm,
  editFields,
} from '../../features/app/formBuilderSlice';
export default function CreateForm() {
  const dispatch = useDispatch();
  const [inputData, seInputData] = useState([]);

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
        };
      });
      seInputData(tempData);
      return tempData;
    },
    onError: (error) => {
      checkForUnauthorizedResponse(error, dispatch);
    },
  });
  console.log(data);
  const { sections } = useSelector((store) => store.formbuilder);
  const [blankForm, setBlankForm] = useState([
    {
      name: 'purchase',
      id: 'purchase order',
      fields: [],
    },
    {
      name: 'account',
      id: 'account team',
      fields: [],
    },
  ]);
  // console.log(blankForm);
  // console.log(sections);
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
    console.log(source.droppableId);
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
      console.log(add);
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
  if (isLoading) {
    return <Loading />;
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='grid grid-cols-3 items-start gap-5'>
        <FormFields inputData={inputData} />
        <BlankForm blankForm={blankForm} setBlankForm={setBlankForm} />
      </div>
    </DragDropContext>
  );
}
