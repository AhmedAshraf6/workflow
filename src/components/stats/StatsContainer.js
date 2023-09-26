import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import StateItem from './StatsItem';

export default function StatsContainer() {
  const defaultStats = [
    {
      title: 'In Progress',
      count: 30,
      icon: <FaSuitcaseRolling />,
      color: 'text-[#e9b949]',
      bcg: 'bg-[#fcefc7]',
    },
    {
      title: 'Approved',
      count: 30,
      icon: <FaCalendarCheck />,
      color: 'text-[#647acb]',
      bcg: 'bg-[#e0e8f9]',
    },
    {
      title: 'Rejected',
      count: 30,
      icon: <FaBug />,
      color: 'text-[#d66a6a]',
      bcg: 'bg-[#ffeeee]',
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3'>
      {defaultStats.map((item, index) => (
        <StateItem key={index} {...item} />
      ))}
    </div>
  );
}
