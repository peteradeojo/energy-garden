import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useRegisterMutation } from '../api';
import FormInput from '../components/FormInput';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });

  const navigate = useNavigate();

  const formRef = useRef(null);

  const [register, { isLoading }] = useRegisterMutation();

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
          <h2 className="text-3xl font-bold">Register</h2>
        </header>

        <form
          className="w-1/2 m-auto flex flex-col gap-5"
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
                alert('Registration successful. Please login.');
                navigate('/login');
              })
              .catch((err) => {
                console.error(err);
                alert('An error occurred.');
              });
          }}
        >
          <FormInput
            id="email"
            type="text"
            name="email"
            className="input"
            placeholder="Please enter your email"
            extraContainerClass="flex-col items-start"
          >
            <label htmlFor="email">E-mail</label>
          </FormInput>

          <FormInput
            type="text"
            id="username"
            name="username"
            className="input"
            placeholder="Please enter your username"
            extraContainerClass="flex-col items-start"
          >
            <label htmlFor="username">Username</label>
          </FormInput>

          <FormInput
            id="password"
            type="password"
            name="password"
            className="input"
            placeholder="Please a strong password"
            extraContainerClass="flex-col items-start"
          >
            <label htmlFor="password">Password</label>
          </FormInput>

          <button
            disabled={isLoading}
            className="btn btn-primary w-full input-btn py-3 font-semibold"
          >
            Register
          </button>
        </form>

        <p className="text-center pt-4">
          Already have account?&nbsp;
          <Link to="/login" className="text-green-700 underline">
            Login
          </Link>
        </p>

        <div className="fixed bottom-0 left-0 w-[300px] h-[411px] bg-contain bg-no-repeat bg-[url(./assets/flowers.png)]" />
      </div>
    </>
  );
};

export default Register;
