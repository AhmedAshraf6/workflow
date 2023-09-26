import React from 'react';

export default function StateItem({ title, count, icon, color, bcg }) {
  return (
    <div className='bg-white rounded-lg py-4 md:py-8 px-3 md:px-6'>
      <div className='flex justify-between flex-wrap items-center'>
        <span className={`text-3xl sm:text-5xl ${color} font-bold`}>
          {count}
        </span>
        <span className={`text-xl sm:text-3xl ${bcg} ${color} p-3 rounded-md`}>
          {icon}
        </span>
      </div>
      <h3 className='text-dark font-semibold text-lg mt-2 sm:mt-4'>{title}</h3>
    </div>
  );
}
