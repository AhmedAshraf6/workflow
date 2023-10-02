import React from 'react';
import NavLinks from './NavLinks';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';

import { navbarLinks } from '../../utils/links';
import { useSelector } from 'react-redux';
const SmallSidebar = () => {
  const { user } = useSelector((store) => store.user);
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
        <div className='block sm:hidden'>
          {user?.isAdmin ? (
            <div>
              <div className='flex flex-col items-center gap-x-3'>
                {navbarLinks.map((link) => {
                  const { text, path, id } = link;
                  return (
                    <NavLink
                      to={path}
                      className={({ isActive }) => {
                        return isActive
                          ? 'text-primary flex items-center gap-x-2 text-base py-3 '
                          : 'text-dark flex items-center gap-x-2 text-base py-3';
                      }}
                      key={id}
                    >
                      {text}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ) : (
            <h2 className='text-2xl text-primary font-semibold'>Workflow</h2>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default SmallSidebar;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
