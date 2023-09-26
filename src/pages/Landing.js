import { Logo } from '../components/SharedComponents';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
export default function Landing() {
  return (
    <header className='w-full min-h-[100vh]  bg-bgLight px-10 sm:px-20 pt-5 sm:pt-10'>
      <nav className='w-full '>
        <Logo className='w-48 h-48' />
      </nav>

      <div className='my-20 grid grid-cols-2 gap-4'>
        <div className='col-span-2 md:col-span-1 flex flex-col justify-center text-center sm:text-start'>
          <h1 className='text-2xl md:text-5xl font-bold text-dark mb-3 sm:mb-5 lg:mb-8'>
            Workflow <span className=' text-primary'>Workspace</span> App
          </h1>
          <p className='text-lg  mb-3 sm:mb-5 lg:mb-8 lg:w-[75%]'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            euismod, diam eget bibendum bibendum, ipsum elit consequat ipsum,
          </p>
          <Link
            to='/register'
            className='bg-primary self-start font-semibold px-4 text-lg py-2 text-light rounded-md hover:bg-primaryHover transition-all duration-200 '
          >
            Login/Register
          </Link>
        </div>
        <div className='col-span-2 md:col-span-1 '>
          <img
            src={main}
            alt='About Us'
            className='object-cover w-full h-full'
          />
        </div>
      </div>
    </header>
  );
}
