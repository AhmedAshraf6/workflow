import React, { useState } from 'react';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Logo from './Logo';
import { useDispatch, useSelector } from 'react-redux';
import { clearStore, toggleSidebar } from '../../features/user/userSlice';
import { Link, NavLink } from 'react-router-dom';
import { navbarLinks } from '../../utils/links';
const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  return (
    <nav className='flex justify-between items-center transition-all duration-1000'>
      <FaAlignLeft
        onClick={() => document.getElementById('navbar_modal').showModal()}
        className='text-primary cursor-pointer text-lg sm:text-2xl block lg:hidden'
      />
      <FaAlignLeft
        onClick={() => dispatch(toggleSidebar())}
        className='text-primary cursor-pointer text-lg sm:text-2xl hidden lg:block'
      />
      <div className='visible lg:hidden'>
        <Link to='/'>
          <Logo />
        </Link>
      </div>
      {/* <h1 className='text-dark text-3xl font-bold hidden lg:block'>WorkFlow</h1> */}
      {user?.isAdmin ? (
        <div>
          <div className='flex gap-x-3'>
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
      <div className='relative'>
        <div
          className='flex items-center bg-primary hover:bg-primaryHover text-primary-content transition duration-200 text-sm sm:text-lg rounded-md py-1 px-2 sm:px-3 gap-2 cursor-pointer'
          onClick={() => setClicked((prev) => !prev)}
        >
          <FaUserCircle />
          <h6>{user?.firstName}</h6>
          <FaCaretDown />
          {clicked && (
            <div
              className='absolute bg-[#dbeafe] rounded-md  top-12 w-full h-full left-0 text-primary flex items-center justify-center font-bold'
              onClick={() => {
                dispatch(clearStore('Logout Successful...'));
              }}
            >
              Logout
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
