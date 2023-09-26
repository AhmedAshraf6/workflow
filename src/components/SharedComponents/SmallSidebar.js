import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import { toggleSidebar } from '../../features/user/userSlice';
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import NavLinks from './NavLinks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const SmallSidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar());
  };
  // Modal.setAppElement('#yourAppElement');

  return (
    <Modal
      isOpen={isSidebarOpen}
      overlayClassName='lg:hidden fixed top-0 left-0 bg-light/75 right-0 bottom-0'
      style={customStyles.content}
      ariaHideApp={false}
    >
      <button onClick={() => dispatch(toggleSidebar())}>
        <FaTimes className='text-red-950 text-2xl cursor-pointer' />
      </button>
      <div className='flex justify-center'>
        <Logo />
      </div>
      <div className='flex justify-center mt-4'>
        <NavLinks toggleSidebar={toggle} />
      </div>
    </Modal>
  );
};

export default SmallSidebar;

// className={`${isSidebarOpen ? 'block lg:hidden' : 'hidden '}`}
