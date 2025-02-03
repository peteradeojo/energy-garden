import { Outlet } from 'react-router';

import bell from '../assets/bell.svg';

const AppLayout = () => {
  return (
    <>
      <div className="flex justify-end gap-x-8 pt-8 px-12 items-center pb-16">
        <button className="input-btn px-12 py-2 bg-[#49454F] text-white font-bold">
          Watch our Tutorials
        </button>

        <span className="px-24">
          <img src={bell} width={20} />
        </span>
      </div>

      <div className="px-default">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
