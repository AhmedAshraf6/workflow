import React from 'react';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { Link } from 'react-router-dom';
const BigSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);

  return (
    <aside
      className={`hidden  min-h-screen lg:flex flex-col gap-y-10 col-span-1 self-start px-4 sm:px-4 py-4  ${
        isSidebarOpen && '!hidden'
      }`}
    >
      <div className='h-[36px] w-full'>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      <NavLinks />
    </aside>
  );
};

export default BigSidebar;
