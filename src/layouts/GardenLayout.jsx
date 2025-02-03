import { Outlet } from 'react-router';

const GardenLayout = () => {
  return (
    <>
      <div></div>

      <div className="px-default">
        <Outlet />
      </div>
    </>
  );
};

export default GardenLayout;
