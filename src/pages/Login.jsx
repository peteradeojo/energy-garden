import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useGetTokenMutation } from '../api';

const Login = () => {
  const navigate = useNavigate();

  const formRef = useRef(null);

  const [login, { isLoading }] = useGetTokenMutation();

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

          <form
            className="w-2/3 m-auto grid"
            onSubmit={(e) => {
              e.preventDefault();

              const form = formRef.current;

              login({
                username: form.username.value,
                password: form.password.value,
              })
                .unwrap()
                .then((data) => {
                  console.log(data);
                  localStorage.setItem('auth', JSON.stringify(data));
                  navigate('/dashboard');
                })
                .catch((err) => {
                  console.error(err);
                  alert('Unable to login. Please try again later.');
                });
            }}
            ref={formRef}
          >
            <label>Username</label>
            <input
              type="text"
              className="input"
              name="username"
              placeholder="Username"
            />
            <div className="py-4"></div>

            <label>Password</label>
            <input
              type="password"
              className="input"
              name="password"
              placeholder="Password"
            />
            <div className="py-4"></div>

            <button
              disabled={isLoading}
              className="w-full input-btn py-3 font-semibold"
            >
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
