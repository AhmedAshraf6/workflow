import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Landing, Register, Error, ProtectedRoute } from './pages';
import {
  Profile,
  Stats,
  SharedLayout,
  Approvals,
  InputReuest,
  Drafts,
  InProgress,
  Approved,
  Rejected,
  Allusers,
  AddUser,
  AllGroups,
  AddGroup,
  AllApps,
  CreateApp,
  CreateForm,
  CreateSteps,
  CreatePermisions,
} from './pages/dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedAdmin from './pages/ProtectedAdmin';
import AllGroupMembers from './pages/dashboard/AllGroupMembers';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Stats />} />
          <Route path='approvals' element={<Approvals />} />
          <Route path='inputrequests' element={<InputReuest />} />
          <Route path='drafts' element={<Drafts />} />
          <Route path='inprogress' element={<InProgress />} />
          <Route path='approved' element={<Approved />} />
          <Route path='rejected' element={<Rejected />} />
          <Route element={<ProtectedAdmin />}>
            <Route path='allapps' element={<AllApps />} />
            <Route path='createapp'>
              <Route index element={<CreateApp />}></Route>
              <Route path='addform' element={<CreateForm />}></Route>
              <Route path='createsteps' element={<CreateSteps />}></Route>
              <Route
                path='addpermisions'
                element={<CreatePermisions />}
              ></Route>
            </Route>
          </Route>
          <Route path='manage' element={<ProtectedAdmin />}>
            <Route path='allusers' element={<Allusers />} />
            <Route path='allgroups'>
              <Route index element={<AllGroups />} />
              <Route path='members/:groupId' element={<AllGroupMembers />} />
            </Route>
          </Route>
        </Route>

        <Route path='landing' element={<Landing />} />
        <Route path='register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
  );
}
