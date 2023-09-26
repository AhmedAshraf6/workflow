import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
import { v4 as uuidv4 } from 'uuid';
export const currentLinks = [
  {
    id: uuidv4(),
    text: 'Approvals',
    path: 'approvals',
    icon: <IoBarChartSharp />,
  },
  {
    id: uuidv4(),
    text: 'Input Requests',
    path: 'inputrequests',
    icon: <ImProfile />,
  },
];
export const requestLinks = [
  { id: uuidv4(), text: 'Drafts', path: 'drafts', icon: <IoBarChartSharp /> },
  {
    id: uuidv4(),
    text: 'In Progress',
    path: 'inprogress',
    icon: <ImProfile />,
  },
  { id: uuidv4(), text: 'Approved', path: 'approved', icon: <ImProfile /> },
  { id: uuidv4(), text: 'Rejected', path: 'rejected', icon: <ImProfile /> },
];
export const userLinks = [
  {
    id: uuidv4(),
    text: 'All Users',
    path: 'manage/allusers',
    icon: <IoBarChartSharp />,
  },

  {
    id: uuidv4(),
    text: 'All Groups',
    path: 'manage/allgroups',
    icon: <ImProfile />,
  },
];
export const navbarLinks = [
  { id: uuidv4(), text: 'Home', path: '/' },
  { id: uuidv4(), text: 'All Apps', path: 'allapps' },
  { id: uuidv4(), text: 'Create App', path: 'createapp' },
];
