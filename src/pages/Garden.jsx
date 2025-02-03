import { useContext, useState } from 'react';
import { GardenContext } from '../context/UserContext';
import { usePlantsQuery, useAddToGardenMutation } from '../api';

import sqr from '../assets/checker.png';
import drop from '../assets/Waterdrop.svg';

const AddPlant = ({ plant, garden, hook }) => {
  const [quantity, setQuantity] = useState(0);
  const [add, { isLoading }] = useAddToGardenMutation();

  return (
    <div key={plant.id}>
      <p className="text-lg font-bold">{plant.name}</p>
      <p>{plant.plant_type}</p>
      <div className="text-sm">
        <p>
          <b>Soil:</b> {plant.soil}
        </p>
        <p>
          <b>Water:</b> {plant.water_frequency} times/day
        </p>
        <p>
          <b>Harvest in:</b> {plant.number_of_days_to_Harvest} days
        </p>

        {garden?.gardenplants.find((p) => p.plant == plant.id) == undefined ? (
          <div className="flex items-center gap-x-2">
            <button
              className="input-btn py-0.5 px-2 font-semibold"
              onClick={(e) => {
                if (quantity <= 0) {
                  return;
                }

                console.log(garden, plant);

                add({
                  plant: plant.id,
                  garden: garden.id,
                  quantity,
                })
                  .unwrap()
                  .then((data) => {
                    console.log(data);
                    hook[1](false);
                  })
                  .catch((err) => {
                    console.error(err);
                    alert(
                      'Unable to add this plant at this time. Please try again later.'
                    );
                  });
              }}
            >
              Add
            </button>
            <input
              type="number"
              min={0}
              className="input py-0.5 w-[70px] text-center rounded-none"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
          </div>
        ) : (
          <>Added</>
        )}
      </div>
    </div>
  );
};

const AddPlantModal = ({ hook }) => {
  const { data, isLoading, isError, isUninitialized } = usePlantsQuery();

  const garden = useContext(GardenContext);

  return (
    <div className="duration-200 w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] grid place-items-center">
      <div className="w-2/3 p-2 bg-white text-black opacity-100 overflow-y-auto max-h-2/3">
        <div className="flex justify-between items-center px-default py-4">
          <p className="text-xl font-bold">Add a Plant</p>
          <button
            onClick={(e) => {
              hook[1](false);
            }}
            className="text-5xl font-extralight"
          >
            &times;
          </button>
        </div>

        {/* <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
        </form> */}
        <div className="grid grid-cols-2 gap-4 px-default">
          {data?.map((plant) => (
            <AddPlant
              plant={plant}
              garden={garden}
              key={plant.id}
              hook={hook}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const GardenPlant = ({ plant }) => {
  console.log(plant);
  return (
    <div className="relative">
      <img src={sqr} className="w-full rounded-3xl" />

      <div className="p-4 bg-gray-300 absolute w-full bottom-0 flex justify-between">
        <div>
          <p className="text-xl font-bold">{plant.plant_name}</p>
          <div className="flex gap-x-1">
            <span>{plant.quantity}</span>
            <img src={drop} alt="" />
            <span>{plant.watering_schedule.frequency_in_days}d</span>
          </div>
        </div>
        <div className="w-1/6 text-center self-start h-full pt-4">
          <button className="rounded-full duration-200 w-[30px] h-[30px] hover:bg-gray-400 text-lg font-bold">
            {'\ufe19'}
          </button>
        </div>
      </div>
    </div>
  );
};

const Garden = () => {
  const gardenContext = useContext(GardenContext);
  const [addingPlant, setAddPlant] = useState(false);

  return (
    <div className="py-6">
      {addingPlant && <AddPlantModal hook={[addingPlant, setAddPlant]} />}
      <button
        className="input-btn bg-black text-white p-2"
        onClick={() => {
          setAddPlant(true);
        }}
      >
        Add a Plant
      </button>
      {gardenContext?.gardenplants.length > 0 ? (
        <div className="grid grid-cols-6 gap-x-12 py-8">
          {gardenContext?.gardenplants.map((plant) => (
            <GardenPlant plant={plant} key={plant.id} />
          ))}
        </div>
      ) : (
        <>
          <div>
            <p>You have not added any plants to your garden.</p>
          </div>
        </>
      )}
    </div>
  );
};

export default Garden;
