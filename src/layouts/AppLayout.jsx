import { CgBell } from 'react-icons/cg';
import { useMemo, useState } from 'react';
import { LiaTimesSolid } from 'react-icons/lia';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';

import { useLogoutMutation, useNotificationsQuery } from '../api';
import {
  useHandleReduxQueryError,
  useHandleReduxQuerySuccess,
} from '../hooks/useHandleReduxQuery';

const AppLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [navOpened, setNavOpened] = useState(false);
  const navOptionsHidden = useMemo(() => {
    return ['/profile', '/notifications'].includes(pathname);
  }, [pathname]);
  const [
    logout,
    {
      error: logoutError,
      isError: isLogoutError,
      isSuccess: isLogoutSuccess,
      isLoading: isLogoutLoading,
    },
  ] = useLogoutMutation();

  const {
    data: notifications = [],
    error: notificationsError,
    isError: isNotificationsError,
  } = useNotificationsQuery();

  const notificationUnread = useMemo(
    () => notifications.some(({ is_read }) => !is_read),
    [notifications]
  );

  const handleNavToggle = () => setNavOpened((prev) => !prev);

  const navLinks = [
    { name: 'Dashboard', url: '/dashboard' },
    // { name: 'Your gardens', url: '/dashboard' },  // gardens and dashboard are the same page
    { name: 'Your plants', url: '/' },
    { name: 'Notifications', url: '/notifications' },
    { name: 'Profile', url: '/profile' },
  ];

  useHandleReduxQueryError({ error: logoutError, isError: isLogoutError });
  useHandleReduxQuerySuccess({
    isSuccess: isLogoutSuccess,
    onSuccess: () => navigate('/'),
  });

  useHandleReduxQueryError({
    error: notificationsError,
    isError: isNotificationsError,
  });

  return (
    <main className="bg-[#F1DAC4] min-h-screen">
      <header className="flex items-center gap-x-8 pt-8 px-12 items-center pb-16">
        <RxHamburgerMenu
          onClick={handleNavToggle}
          className="w-8 h-8 cursor-pointer text-[#141115]"
        />
        <div
          className={`ml-auto flex items-center gap-x-8 ${
            navOptionsHidden && 'hidden'
          }`}
        >
          <Link
            to="/"
            className="input-btn px-12 py-2 bg-[#0E402D] text-white font-semibold"
          >
            Watch our Tutorials
          </Link>

          <Link
            to="/notifications"
            className={`relative block w-8 h-8 after:absolute after:-right-0.5 after:top-0 after:w-1.5 after:h-1.5 after:bg-red-600 after:rounded-[50%] ${
              notificationUnread || 'after:hidden'
            }`}
          >
            <CgBell className="w-full h-full text-[#0E402D]" />
          </Link>
        </div>
      </header>

      {/* overlay */}
      <div
        onClick={handleNavToggle}
        className={`z-40 fixed inset-0 bg-[rgba(0,0,0,0.4)] duration-300 ${
          navOpened || 'opacity-0 invisible'
        }`}
      />

      {/* side navbar */}
      <div
        className={`overflow-y-auto p-10 z-50 fixed text-[#F1DAC4] inset-y-0 bg-[#0E402D] w-[350px] duration-300 ${
          navOpened ? 'left-0' : '-left-[350px]'
        }`}
      >
        <LiaTimesSolid
          onClick={handleNavToggle}
          className="cursor-pointer w-10 h-10 ml-auto"
        />

        <ul className="mt-16 flex flex-col gap-8">
          {navLinks.map(({ name, url }) => (
            <li>
              <Link
                to={url}
                key={name}
                onClick={handleNavToggle}
                className="font-bold text-lg"
              >
                {name}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => logout()}
              disabled={isLogoutLoading}
              className="btn bg-[#F1DAC4] text-[#0E402D] border-transparent"
            >
              Log out
            </button>
          </li>
        </ul>
      </div>

      <div className="px-default">
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
