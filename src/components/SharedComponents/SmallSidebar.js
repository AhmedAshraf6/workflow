import React from 'react';
import NavLinks from './NavLinks';
import Logo from './Logo';

const SmallSidebar = () => {
  return (
    <dialog id='navbar_modal' className='modal'>
      <div className='modal-box'>
        <form method='dialog'>
          {/* if there is a button in form, it will close the modal */}
          <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
            ✕
          </button>
        </form>

        <div className='flex justify-center'>
          <Logo />
        </div>
        <div className='flex justify-center mt-4'>
          <NavLinks />
        </div>
      </div>
    </dialog>
  );
};

export default SmallSidebar;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
