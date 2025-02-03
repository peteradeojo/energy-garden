import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { useRegisterMutation } from '../api';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  const formRef = useRef(null);

  const [register, { isLoading }] = useRegisterMutation();

  return (
    <>
      <div className="grid place-items-center w-dvw h-dvh border">
        <div className="w-2/3 border p-4">
          <div className="flex justify-between items-center">
            <Link to={'/'} className="text-5xl font-extralight">
              &times;
            </Link>
            <h2 className="text-3xl font-bold">Register</h2>
            <Link to={'/login'} className="input-btn px-4 py-2">
              Login
            </Link>
          </div>

          <div className="py-4"></div>
          <div className="py-4"></div>

          <form
            className="w-2/3 m-auto grid"
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              const form = formRef.current;

              // const formData = new FormData(form);
              // formData.append('confirm_password', form.password.value);

              register({
                email: form.email.value,
                username: form.username.value,
                password: form.password.value,
                confirm_password: form.password.value,
              })
                .unwrap()
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.error(err);
                  alert('An error occurred.');
                });
            }}
          >
            <label>E-mail</label>
            <input
              type="text"
              className="input"
              name="email"
              placeholder="E-mail"
            />
            <div className="py-4"></div>

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
              Register
            </button>
          </form>
          <div className="py-4"></div>
        </div>
      </div>
    </>
  );
};

export default Register;
