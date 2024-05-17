import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
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
              type='text'
              placeholder='Enter Your Username'
              className='border p-3 rounded-lg'
              id='username'
              onChange={handleChange}
            />
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
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
            <OAuth />
          </form>
          <div className='flex gap-2 mt-5'>
            <p>Already have an account?</p>
            <Link to={'/sign-in'}>
              <span className='text-blue-700'>Sign in</span>
            </Link>
          </div>
          {error && <p className='text-red-500 mt-5'>{error}</p>}
        </div>
      </div>
    </div>
  );
}
