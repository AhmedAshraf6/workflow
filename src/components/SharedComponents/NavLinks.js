import { NavLink } from 'react-router-dom';
import { currentLinks, requestLinks, userLinks } from '../../utils/links';
import { useSelector } from 'react-redux';

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className='flex flex-col '>
      <h2 className='text-sm text-gray-500'>Cuurent</h2>
      <div className='px-3'>
        {currentLinks.map((link) => {
          const { text, path, id, icon } = link;
          return (
            <NavLink
              to={path}
              className={({ isActive }) => {
                return isActive
                  ? 'text-primary flex items-center gap-x-2 text-base py-3 '
                  : 'text-dark flex items-center gap-x-2 text-base py-3';
              }}
              key={id}
              onClick={toggleSidebar}
            >
              <span className='text-lg'>{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
      <h2 className='text-base text-gray-500'>my Requests</h2>
      <div className='px-3'>
        {requestLinks.map((link) => {
          const { text, path, id, icon } = link;
          return (
            <NavLink
              to={path}
              className={({ isActive }) => {
                return isActive
                  ? 'text-primary flex items-center gap-x-2 text-base py-3'
                  : 'text-dark flex items-center gap-x-2 text-base py-3';
              }}
              key={id}
              onClick={toggleSidebar}
            >
              <span className='text-lg'>{icon}</span>
              {text}
            </NavLink>
          );
        })}
      </div>
      {user?.isAdmin && (
        <div>
          <h2 className='text-base text-gray-500'>My Team</h2>
          <div className='px-3'>
            {userLinks.map((link) => {
              const { text, path, id, icon } = link;
              return (
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    return isActive
                      ? 'text-primary flex items-center gap-x-2 text-base py-3'
                      : 'text-dark flex items-center gap-x-2 text-base py-3';
                  }}
                  key={id}
                  onClick={toggleSidebar}
                >
                  <span className='text-lg'>{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
export default NavLinks;
