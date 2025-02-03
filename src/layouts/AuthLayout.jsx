import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext';

const AuthLayout = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      navigate('/');
    } else {
      const tokens = JSON.parse(auth);
      setToken(tokens.access);
    }

    return () => {};
  }, []);

  return (
    <UserContext.Provider value={[token, setToken]}>
      <Outlet />
    </UserContext.Provider>
  );
};

export default AuthLayout;
