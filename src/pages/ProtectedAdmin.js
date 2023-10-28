import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import SidebarInput from '../components/createApp/createForm/SidebarInput';
export default function ProtectedAdmin() {
  const { user } = useSelector((store) => store.user);
  if (user.role.id == 1) {
    return (
      <>
        <Outlet />
        <SidebarInput />
      </>
    );
  } else {
    return <Navigate to='/' />;
  }
}
