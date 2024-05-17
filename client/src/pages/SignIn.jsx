/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        toast.error('Sign in failed!!');
        return;
      }
      dispatch(signInSuccess(data));
      toast.success('Sign in successfully!!');
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
      toast.error('Sign in failed!!');
    }
  };
  return (
    <div className='min-h-screen mt-20 '>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* Left Side */}
        <div className=' flex-1'>
          <Link to={'/'} className='font-bold  text-4xl'>
            <h1 className='font-bold  flex flex-wrap'>
              <span className='text-slate-500'>Urban</span>
              <span className='text-slate-700'>Estate</span>
            </h1>
          </Link>
          <p className='text-sm font-semibold mt-5'>
            Welcome to Urban Estate, where your dream home awaits! Explore our
            curated collection of properties tailored to your urban lifestyle
            🏙️. Find your perfect sanctuary amidst the bustling cityscape today!
            🏠 #UrbanLiving #DreamHome
          </p>
        </div>

        {/* Right Sight */}
        <div className='p-3 max-w-lg mx-auto flex-1'>
          <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input
              type='email'
              placeholder='Enter Your Email'
              className='border p-3 rounded-lg'
              id='email'
              onChange={handleChange}
            />
            <input
              type='password'
              placeholder='Enter Your Password'
              className='border p-3 rounded-lg'
              id='password'
              onChange={handleChange}
            />

            <button
              disabled={loading}
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
            >
              {loading ? 'Loading...' : 'Sign In'}
            </button>
            <OAuth />
          </form>
          <div className='flex gap-2 mt-5'>
            <p>Dont have an account?</p>
            <Link to={'/sign-up'}>
              <span className='text-blue-700'>Sign up</span>
            </Link>
          </div>
          {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
      </div>
    </div>
  );
}
