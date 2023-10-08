import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import UserModal from '../components/allUsers/UserModal';
import GroupModal from '../components/allGroups/GroupModal';
import SidebarInput from '../components/createApp/createForm/SidebarInput';
import StepModal from '../components/createApp/CreateSteps/StepModal';
import EditStepModal from '../components/createApp/CreateSteps/EditStepModal';
export default function ProtectedAdmin() {
  const { user } = useSelector((store) => store.user);
  if (user.role.id == 1) {
    return (
      <>
        <UserModal />
        <GroupModal />
        <SidebarInput />
        <StepModal />
        <EditStepModal />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to='/' />;
  }
}
