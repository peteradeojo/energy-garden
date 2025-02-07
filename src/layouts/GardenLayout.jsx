import { CgBell } from 'react-icons/cg';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useParams, useNavigate, Link } from 'react-router';

import { GardenContext } from '../context/UserContext';
import { useGardensQuery, useNotificationsQuery } from '../api';
import { useHandleReduxQueryError } from '../hooks/useHandleReduxQuery';

const GardenLayout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: gardens, isLoading, isSuccess } = useGardensQuery();

  const {
    data: notifications = [],
    error: notificationsError,
    isError: isNotificationsError,
  } = useNotificationsQuery();

  const notificationUnread = useMemo(
    () => notifications.some(({ is_read }) => !is_read),
    [notifications]
  );

  const [garden, setGarden] = useState(null);

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        const garden = gardens.find((g) => g.id == params.id);

        if (!garden) {
          navigate('/dashboard');
        } else {
          setGarden(garden);
        }
      } else {
        navigate('/login');
      }
    }
  }, [isLoading]);

  useHandleReduxQueryError({
    error: notificationsError,
    isError: isNotificationsError,
  });

  return (
    <GardenContext.Provider value={garden}>
      <main className="bg-[#F1DAC4] min-h-screen">
        <div className="relative flex flex-col justify-between min-h-[270px] h-[40vh] pt-8 bg-[url(./assets/gardenscape.png)] bg-top bg-cover bg-no-repeat">
          <div className="z-1 flex justify-end gap-x-8 px-12 items-center">
            <Link
              to="/dashboard"
              className="btn bg-white border-transparent shadow"
            >
              Home
            </Link>
            <Link
              to="/notifications"
              className={`relative block w-8 h-8 after:absolute after:-right-0.5 after:top-0 after:w-1.5 after:h-1.5 after:bg-red-600 after:rounded-[50%] ${
                notificationUnread || 'after:hidden'
              }`}
            >
              <CgBell className="w-full h-full text-[#F1DAC4]" />
            </Link>
          </div>
          <p className="z-1 px-default pb-4 text-4xl font-bold text-white">
            {garden?.name}
          </p>
          <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-5% to-95% from-[rgba(0,0,0,0.75)] to-[rgba(0,0,0,0)]" />
        </div>

        <div className="px-default">
          <Outlet />
        </div>
      </main>
    </GardenContext.Provider>
  );
};

export default GardenLayout;
