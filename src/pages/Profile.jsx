import { RxExit } from 'react-icons/rx';
import { FaUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

import { useLogoutMutation } from '../api';
import FormInput from '../components/FormInput';
import {
  useHandleReduxQueryError,
  useHandleReduxQuerySuccess,
} from '../hooks/useHandleReduxQuery';

const Profile = () => {
  const navigate = useNavigate();
  const [
    logout,
    {
      error: logoutError,
      isError: isLogoutError,
      isSuccess: isLogoutSuccess,
      isLoading: isLogoutLoading,
    },
  ] = useLogoutMutation();

  useHandleReduxQueryError({ error: logoutError, isError: isLogoutError });
  useHandleReduxQuerySuccess({
    isSuccess: isLogoutSuccess,
    onSuccess: () => navigate('/'),
  });

  return (
    <div className="px-20">
      <h2 className="text-5xl font-semibold fixed top-8">Profile</h2>
      <div className="flex gap-8">
        <div className="bg-white rounded-[50%] w-40 h-40 p-10">
          <FaUser className="text-black w-full h-full" />
        </div>
        <div className="pt-16">
          <p className="font-medium text-5xl">Boluwatife Johnson</p>
          <label className="block pt-10 pb-4 -ml-3">Email Address</label>
          <FormInput
            disabled
            placeholder="Email Address"
            extraInputClass="text-gray-700"
            value="peteradeojo@gmail.com"
          />
          <p className="pt-12 text-xl">Change Password</p>
          <button
            onClick={() => logout()}
            className="flex items-center gap-4 text-xl pt-4"
          >
            Logout <RxExit />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
