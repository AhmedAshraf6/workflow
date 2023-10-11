import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import SidebarInput from '../components/createApp/createForm/SidebarInput';
import EditStepModal from '../components/createApp/CreateSteps/EditStepModal';
export default function ProtectedAdmin() {
  const { user } = useSelector((store) => store.user);
  if (user.role.id == 1) {
    return (
      <>
        <SidebarInput />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to='/' />;
  }
}
