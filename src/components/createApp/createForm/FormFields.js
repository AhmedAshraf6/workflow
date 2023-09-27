import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

export default function FormFields({ inputData }) {
  return (
    <div className='flex flex-col col-span-1 gap-y-4 w-full'>
      <h1 className='text-gray-500 text-lg font-semibold'>
        All Fields You can drag and drop
      </h1>
      <Droppable droppableId='inputData'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {inputData?.map((inp, index) => (
              <Draggable draggableId={inp.id} index={index} key={inp.id}>
                {(provided) => (
                  <div
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <div className='flex justify-between items-center my-4 bg-gray-500 rounded-md p-2 text-white'>
                      <span className='text-light'>{inp.name}</span>
                      {/* {inp.icon} */}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
