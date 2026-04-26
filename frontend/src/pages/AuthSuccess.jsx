import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { updateUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const userData = JSON.parse(decodeURIComponent(data));
        // Store token and user data directly (already authenticated via Google)
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify({
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar
        }));
        updateUser({
          _id: userData._id,
          name: userData.name,
          email: userData.email,
          avatar: userData.avatar
        });
        navigate('/dashboard');
      } catch (err) {
        console.error('Auth success error:', err);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-amber-400 text-xl animate-pulse">
        Signing you in... 🔥
      </div>
    </div>
  );
};

export default AuthSuccess;