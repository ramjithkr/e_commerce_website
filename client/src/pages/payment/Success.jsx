import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/user/home');
    }, 5000); // 5 seconds

    return () => clearTimeout(timer); 
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-600">Success!</h1>
        <p className="mt-4 text-gray-600">You will be redirected to the home page in 5 seconds.</p>
      </div>
    </div>
  );
};
