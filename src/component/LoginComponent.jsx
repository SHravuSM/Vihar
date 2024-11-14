// LoginComponent.js
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    await signInWithGoogle();
  };

  return (
    <div>
      <button className='border-2 border-blue-500 p-2 text-xl font-semibold rounded-lg' onClick={handleGoogleLogin}>Continue with Google</button>
    </div>
  );
};

export default LoginComponent;
