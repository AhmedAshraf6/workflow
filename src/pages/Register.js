import { useState, useEffect } from 'react';
import { Logo } from '../components/SharedComponents';
import { FormRow } from '../components/SharedComponents';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import customFetch from '../utils/axios';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};
export default function Register() {
  const [values, setValues] = useState(initialState);
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);
  // React query
  const {
    mutate: loginUserM,
    data: userDataLogin,
    isLoading,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      const { data } = await customFetch.post('/Authentication/Login', {
        email,
        password,
      });
      return data;
    },
    onSuccess: (data) => {
      dispatch(
        loginUser({
          token: data.token,
          isAdmin: data.user.role.id == 1 && true,
          ...data.user,
        })
      );
      toast.success('login successfully');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });
  // Handle Change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };
  // Handle submit
  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isMember) {
      loginUserM({ email, password });
      return;
    }
    toast.error('register not working in current time');
    // dispatch(registerUser({ name, email, password }));
  };
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  return (
    <div className='flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-bgLight'>
      <div className='w-full max-w-md space-y-8 bg-light  py-10  px-8 rounded-lg border-t-4 border-primary'>
        <div>
          <div className='flex justify-center'>
            <Logo className='h-12 w-auto' />
          </div>
          <h2 className='mt-3 sm:mt-6 text-center text-xl sm:text-3xl font-bold tracking-tight text-dark'>
            {!values.isMember ? 'Register' : 'Login'}
          </h2>
        </div>
        <form
          className='mt-2 sm:mt-8 flex flex-col gap-y-3 sm:gap-y-5'
          onSubmit={onSubmit}
        >
          {!values.isMember && (
            <FormRow
              type='text'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />
          )}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />
          <button
            type='submit'
            className='btn btn-primary text-primary-content'
            // disabled={isLoading}
          >
            {isLoading ? 'loading...' : 'Submit'}
          </button>
        </form>
        <p className='text-lg text-center'>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <span
            className='text-primary text-xl cursor-pointer'
            onClick={toggleMember}
          >
            {values.isMember ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}
