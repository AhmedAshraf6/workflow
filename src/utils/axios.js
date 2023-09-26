import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';
import { useDispatch } from 'react-redux';
import { clearStore } from '../features/user/userSlice';
import { toast } from 'react-toastify';
// import { clearStore } from '../features/user/userSlice';
const customFetch = axios.create({
  baseURL: 'https://processbuilder.cloud/api',
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});
export const checkForUnauthorizedResponse = (error, dispatch) => {
  if (error?.response?.status === 401) {
    dispatch(clearStore());
    return toast.error('Unauthorized! Logging Out...');
  }
  console.log(error);
  return toast.error(error?.response?.data || error?.message);
};
export default customFetch;
