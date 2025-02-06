import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useGetTokenMutation } from '../api';
import FormInput from '../components/FormInput';

const Login = () => {
  const navigate = useNavigate();

  const formRef = useRef(null);

  const [login, { isLoading }] = useGetTokenMutation();

  return (
    <>
      <div className="h-screen p-4 bg-[#F9F9F9]">
        <header className="flex justify-center items-center mb-16 relative">
          <Link
            to="/"
            className="text-5xl font-extralight absolute left-0 top-1/2 -translate-y-1/2"
          >
            &times;
          </Link>
          <h2 className="text-3xl font-bold">Log In</h2>
        </header>

        <form
          className="w-1/2 m-auto flex flex-col gap-5"
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
          <FormInput
            type="text"
            id="username"
            name="username"
            className="input"
            placeholder="Username"
            extraContainerClass="flex-col items-start"
          >
            <label htmlFor="username">Username</label>
          </FormInput>

          <FormInput
            id="password"
            type="password"
            name="password"
            className="input"
            placeholder="Password"
            extraContainerClass="flex-col items-start"
          >
            <label htmlFor="password">Password</label>
          </FormInput>

          <button
            disabled={isLoading}
            className="btn btn-primary w-full input-btn py-3 font-semibold"
          >
            Log In
          </button>
        </form>

        <p className="text-center pt-4">
          Don't have an account?&nbsp;
          <Link to="/register" className="text-green-700 underline">
            Sign up
          </Link>
        </p>

        <div className="fixed bottom-0 left-0 w-[300px] h-[411px] bg-contain bg-no-repeat bg-[url(./assets/flowers.png)]" />
      </div>
    </>
  );
};

export default Login;
