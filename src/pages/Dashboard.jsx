import { FiPlusCircle } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import { useGardensQuery, useCreateGardenMutation } from '../api';

import gardenImage from '../assets/garden.png';
import FormInput from '../components/FormInput';

const GardenLink = ({ garden }) => {
  return (
    <Link
      to={`/garden/${garden.id}`}
      className="h-[112px] text-[#F1DAC4] flex bg-[#0E402D] hover:cursor-pointer hover:scale-105 duration-200 rounded-2xl justify-between items-center"
    >
      <img src={gardenImage} className="rounded-md" />
      <div className="grid gap-y-1">
        <p className="font-bold text-xl">{garden?.name || 'Garden name'}</p>
        <p>
          {garden?.gardenplants.length} plant
          {garden?.gardenplants.length !== 1 && 's'}
        </p>
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
      <p className="text-3xl font-bold my-6">
        Good Morning, <span className="text-[#0E402D]">Gardener</span>
      </p>

      <div className="flex gap-x-4 items-center">
        <h3 className="text-xl font-bold">Your gardens</h3>
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
          <FormInput
            type="text"
            name="name"
            extraInputClass="input w-full"
            placeholder="Your garden name"
            style={{ backgroundColor: '#fff' }}
          />
          <button className="btn bg-[#0E402D] text-[#F1DAC4] font-medium">
            Save
          </button>
        </form>
      )}
      <div className="grid grid-cols-3 items-center gap-8 py-6">
        {!isLoading &&
          !isUninitialized &&
          gardens?.map((garden, i) => <GardenLink key={i} garden={garden} />)}
        <FiPlusCircle
          className="w-16 h-16 cursor-pointer text-[#0E402D]"
          onClick={() => setCreateGarden((prev) => !prev)}
        />
      </div>
    </>
  );
};

export default Dashboard;
