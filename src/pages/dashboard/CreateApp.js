import React from 'react';
import FormApp from '../../components/createApp/FormApp';
import CreateForm from './CreateForm';
import CreateSteps from './CreateSteps';
import { useSelector } from 'react-redux';
export default function CreateApp() {
  const { stepNumber } = useSelector((store) => store.formapp);

  return (
    <>
      <ul className='steps  w-full mx-auto my-5 sm:my-8 '>
        <li className={`step ${stepNumber >= 1 && 'step-primary'}`}>
          Create App
        </li>
        <li className={`step ${stepNumber >= 2 && 'step-primary'}`}>
          Design Form
        </li>
        <li className={`step ${stepNumber >= 3 && 'step-primary'}`}>
          Define Workflow
        </li>
        <li className={`step ${stepNumber >= 4 && 'step-primary'}`}>
          Add permisions
        </li>
      </ul>
      {stepNumber === 1 ? (
        <FormApp />
      ) : stepNumber === 2 ? (
        <CreateForm />
      ) : (
        stepNumber === 3 && <CreateSteps />
      )}
    </>
  );
}
