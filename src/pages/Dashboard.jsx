import { Link, useNavigate } from 'react-router';
import checker from '../assets/checker.png';
import { useCreateGardenMutation, useGardensQuery } from '../api';
import { useEffect, useRef, useState } from 'react';

const GardenLink = ({ garden }) => {
  return (
    <Link to={`/gardens/${garden.id}`} className="flex bg-[#D9D9D9] hover:cursor-pointer hover:bg-gray-300 duration-200 rounded-md justify-between  items-center">
      <img src={checker} width={100} className="rounded-md" />
      <div className="grid gap-y-1">
        <p className="font-bold text-xl">{garden?.name || 'Garden name'}</p>
        <p>{garden?.gardenplants.length} plant(s)</p>
      </div>
      <div className="w-1/6 text-center self-start h-full pt-4">
        <button className="rounded-full duration-200 w-[30px] h-[30px] hover:bg-gray-400 text-lg font-bold">
          {'\ufe19'}
        </button>
      </div>
    </Link>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const [createGarden, setCreateGarden] = useState(false);

  const {
    data: gardens,
    isLoading,
    isSuccess,
    isUninitialized,
    status,
  } = useGardensQuery();

  const createRef = useRef(null);

  const [newGarden, { isLoading: newIsLoading }] = useCreateGardenMutation();

  useEffect(() => {
    if (!isLoading && !isUninitialized) {
      if (!isSuccess) {
        navigate('/');
      }
    }
  }, [isLoading]);

  return (
    <>
      <p className="text-3xl font-bold">Good Morning, Gardener</p>
      <div className="py-6"></div>

      <div className="flex gap-x-4 items-center">
        <h3 className="text-xl font-bold">Your gardens</h3>
        <button
          onClick={(e) => {
            setCreateGarden(!createGarden);
          }}
          className="input-btn rounded-full w-[25px] h-[25px]"
        >
          {'\u002b'}
        </button>
      </div>
      {createGarden && (
        <form
          className="py-3 w-2/3 flex gap-x-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = createRef.current;
            newGarden({
              name: form.name.value,
            })
              .unwrap()
              .then((data) => {
                console.log(data);
                form.reset();
                setCreateGarden(false);
              })
              .catch((err) => {
                console.error(err);
                alert(
                  'An error occurred. Unable to create your garden at this time'
                );
              });
          }}
          ref={createRef}
        >
          <input
            type="text"
            name="name"
            className="input w-full"
            placeholder="What will you call your garden?"
          />
          <button className="btn bg-black text-white">Save</button>
        </form>
      )}
      <div className="grid grid-cols-4 gap-x-8 py-6">
        {!isLoading &&
          !isUninitialized &&
          gardens?.map((garden, i) => <GardenLink key={i} garden={garden} />)}
      </div>
    </>
  );
};

export default Dashboard;
