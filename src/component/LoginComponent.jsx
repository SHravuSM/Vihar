// LoginComponent.js
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Google from '../images/Google.gif'

const LoginComponent = () => {
  const { signInWithGoogle, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'vehicle provider') {
      navigate('/provider');
    }
  }, [role, navigate]);

  const handleGoogleLogin = async () => {
    await signInWithGoogle().then((val) =>
      console.log('hello'))

  };

  return (
    <div onClick={handleGoogleLogin} className='flex items-center gap-0 rounded shadow-md'>
      <button className=' p-2 text-xl font-semibold text-white' >Continue with Google</button>
      <div className='h-10 w-10 rounded-lg flex justify-center items-center bg-white'>
        <img className='h-8 ' src={Google} alt="" />
      </div>
    </div>
  );
};

export default LoginComponent;
