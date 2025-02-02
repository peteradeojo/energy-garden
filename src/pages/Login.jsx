import { useState } from 'react';
import { Link } from 'react-router';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  return (
    <>
      <div className="grid place-items-center w-dvw h-dvh border">
        <div className="w-2/3 border p-4">
          <div className="flex justify-between items-center">
            <Link to={'/'} className="text-5xl font-extralight">
              &times;
            </Link>
            <h2 className="text-3xl font-bold">Log In</h2>
            <Link to={'/register'} className="input-btn px-4 py-2">
              Sign Up
            </Link>
          </div>

          <div className="py-4"></div>
          <div className="py-4"></div>

          <form className="w-2/3 m-auto grid">
            <label>E-mail</label>
            <input type="text" className="input" placeholder="E-mail" />
            <div className="py-4"></div>

            <label>Username</label>
            <input type="text" className="input" placeholder="Username" />
            <div className="py-4"></div>

            <label>Password</label>
            <input type="password" className="input" placeholder="Password" />
            <div className="py-4"></div>

            <button className="w-full input-btn py-3 font-semibold">
              Log In
            </button>
          </form>
          <div className="py-4"></div>
        </div>
      </div>
    </>
  );
};

export default Login;
