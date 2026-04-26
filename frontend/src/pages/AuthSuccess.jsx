import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      try {
        const userData = JSON.parse(decodeURIComponent(data));
        login(userData);
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
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