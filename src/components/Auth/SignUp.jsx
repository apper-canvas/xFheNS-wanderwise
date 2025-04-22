import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupAuth } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const authContainerRef = useRef(null);
  const navigate = useNavigate();
  const { loginSuccess } = useAuth();

  useEffect(() => {
    if (!authContainerRef.current) return;

    const { showSignup } = setupAuth(
      '#auth-container',
      (user) => {
        // On successful signup
        loginSuccess(user.data);
        navigate('/dashboard');
      },
      (error) => {
        // On signup error
        console.error('Signup failed:', error);
      }
    );

    showSignup();

    // Cleanup
    return () => {
      // Any cleanup needed for ApperUI
    };
  }, [navigate, loginSuccess]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join WanderWise to start your journey</p>
        </div>
        
        <div id="auth-container" ref={authContainerRef} className="min-h-[400px]"></div>
      </div>
    </div>
  );
};

export default SignUp;