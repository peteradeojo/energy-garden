import { Outlet, useParams, useNavigate, Link } from 'react-router';
import bell from '../assets/bell.svg';
import { useGardensQuery } from '../api';
import { GardenContext } from '../context/UserContext';
import { useEffect, useState } from 'react';

const GardenLayout = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: gardens, isLoading, isSuccess } = useGardensQuery();

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

  return (
    <GardenContext.Provider value={garden}>
      <div className="bg-[#D9D9D9]">
        <div className="flex justify-end gap-x-8 pt-8 px-12 items-center pb-16">
          <Link to={'/dashboard'} className='btn'>Home</Link>
          <span className="px-24">
            <img src={bell} width={20} />
          </span>
        </div>
        <div className="py-10"></div>
        <p className="px-default py-4 text-4xl font-bold">{garden?.name}</p>
      </div>

      <div className="px-default">
        <Outlet />
      </div>
    </GardenContext.Provider>
  );
};

export default GardenLayout;
