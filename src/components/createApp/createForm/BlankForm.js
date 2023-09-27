import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import FormRowDnd from './FormRowDnd';
import { GrAddCircle } from 'react-icons/gr';
import CreateInputField from './CreateInputField';
import { useSelector } from 'react-redux';
import {
  addSectionToForm,
  editSectionName,
} from '../../../features/app/formBuilderSlice';
import CreateSection from './CreateSection';
import { useDispatch } from 'react-redux';

export default function BlankForm({}) {
  const [activeField, setActiveField] = useState(false);
  const [activeSection, setActiveSection] = useState(false);
  const { sections } = useSelector((store) => store.formbuilder);
  return (
    <div className=' bg-light  col-span-2 p-5 '>
      <Droppable droppableId='blankForm' type='group'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {sections?.map((sec, index) => (
              <Draggable draggableId={sec.id} index={index} key={sec.id}>
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className='mb-16 border-2 border-transparent hover:border-gray-600'
                  >
                    {/* <FormRowDnd type={inp.type} name={inp.name} /> */}
                    <SectionList {...sec} index={index} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {/* Fields */}

      {activeField && <CreateInputField setActiveField={setActiveField} />}
      {/* <GrAddCircle className=' w-full cursor-pointer text-2xl mt-5' /> */}
      {activeSection && (
        <CreateSection
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      )}
      <div className='flex justify-center gap-3 mt-4'>
        <span
          className='text-primary text-lg font-semibold cursor-pointer'
          onClick={() => setActiveSection(!activeSection)}
        >
          Add Section
        </span>
        <span
          onClick={() => setActiveField(!activeField)}
          className='text-primary text-lg font-semibold cursor-pointer'
        >
          Add Field
        </span>
      </div>
    </div>
  );
}

function SectionList({ name, fields, id, index: indexParent }) {
  const dispatch = useDispatch();

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className='store-container'>
            {name && (
              <input
                type='text'
                value={name}
                onChange={(e) =>
                  dispatch(
                    editSectionName({ indexParent, val: e.target.value })
                  )
                }
                className=' outline-none  text-primary text-lg font-bold min-w-[50px] bg-transparent'
                placeholder='Enter name  section'
              />
            )}
          </div>
          <div className='items-container'>
            {fields?.map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    className='item-container mx-4 mt-5'
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <FormRowDnd
                      {...item}
                      item={item}
                      indexParent={indexParent}
                      indexChild={index}
                    />
                    {/* <FormRowDnd type={inp.type} name={inp.name} /> */}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}
