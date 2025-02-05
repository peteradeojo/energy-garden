import { useContext, useState } from 'react';
import { GardenContext } from '../context/UserContext';
import {
  usePlantsQuery,
  useAddToGardenMutation,
  useGetPlantQuery,
  useRemoveFromGardenMutation,
  useMarkWateredMutation,
  useGetWaterScheduleQuery,
} from '../api';

import sqr from '../assets/checker.png';
import drop from '../assets/Waterdrop.svg';
import sun from '../assets/sunlight.svg';

import seedling from '../assets/seedling.svg';
import vegetative from '../assets/vegetative.svg';
import fruiting from '../assets/fruiting.svg';
import flowering from '../assets/flowering.svg';

import Menu from '../components/Menu';

const WaterSchedule = ({ plant }) => {
  const { data, isLoading } = useGetWaterScheduleQuery(
    plant.watering_schedule.id
  );

  return (
    <div>
      {isLoading && <>Fetching your water schedule</>}
      {data && (
        <>
          <p>
            <b>Last watered: </b> {data.last_watered_date}
          </p>
          <p>
            <b>Next Watering date: </b> {data.next_watering_date}
          </p>
        </>
      )}
    </div>
  );
};

const PlantView = ({ plant, setViewing }) => {
  const { data: details, isLoading, isSuccess } = useGetPlantQuery(plant.plant);

  return (
    <div className="duration-200 w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] grid place-items-center z-[10000]">
      <div className="w-2/3 p-2 bg-white rounded-lg text-black opacity-100 overflow-y-auto max-h-2/3">
        <div className="flex justify-between items-center px-default py-4">
          <p className="text-xl font-bold">{plant.plant_name.toUpperCase()}</p>
          <button
            onClick={(e) => {
              setViewing(undefined);
            }}
            className="text-5xl font-extralight"
          >
            &times;
          </button>
        </div>

        <div className="px-default py-8">
          {isLoading && <p className="text-center">Loading...</p>}

          {isSuccess && (
            <>
              <p className="py-2">
                The {details?.name} is a{' '}
                <b>{details?.plant_type?.toLowerCase()}</b> that grows in{' '}
                {details.soil.includes('soil') ? (
                  <b>{details.soil.toLowerCase()}</b>
                ) : (
                  <>
                    <b>{details.soil.toLowerCase()}</b> soil
                  </>
                )}
                . It should be ready for harvesting in{' '}
                {details.number_of_days_to_Harvest} days from planting.
              </p>

              <p>
                <b>Type:</b> {details.plant_type}
              </p>

              <div className="py-4">
                <table className="table w-full border-collapse table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th>
                        <img src={sun} className="inline" />
                      </th>
                      <th>
                        <img src={drop} className="inline" />
                      </th>
                      <th>Other</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-center">
                      <td className="py-3 w-1/3 border border-gray-200">
                        {details.sunlight}
                      </td>
                      <td className="py-3 w-1/3 border border-gray-200">
                        {details.water_frequency} times/day
                      </td>
                      <td className="py-3 w-1/3 text-sm border border-gray-200">
                        {details.maintenance_task}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="pb-8">
            <WaterSchedule plant={plant} />
          </div>
        </div>
      </div>
    </div>
  );
};

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

const GrowthStage = ({ stage }) => {
  return (
    <span className="flex items-center gap-x-1">
      <>
        {stage == 'Seedling' && <img src={seedling} width={10} />}
        {stage == 'Fruiting' && <img src={fruiting} width={15} />}
        {stage == 'Vegetative' && <img src={vegetative} width={15} />}
        {stage == 'Flowering' && <img src={flowering} width={15} />}
      </>
      <span>{stage}</span>
    </span>
  );
};

const AddPlantModal = ({ hook }) => {
  const { data, isLoading, isError, isUninitialized } = usePlantsQuery();

  const garden = useContext(GardenContext);

  return (
    <div className="duration-200 w-full h-full absolute top-0 left-0 bg-[rgba(0,0,0,0.3)] grid place-items-center z-[10000]">
      <div className="w-2/3 p-2 rounded-lg bg-white text-black opacity-100 overflow-y-auto max-h-2/3">
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

/**
 *
 * @param {{plant: {growth_stage: string}}} param0
 * @returns
 */
const GardenPlant = ({ plant, setViewPlant }) => {
  const [options, setOptions] = useState(false);

  const [remove, { isLoading }] = useRemoveFromGardenMutation();
  const [water] = useMarkWateredMutation();

  const deletePlant = (id) => {
    remove(id)
      .unwrap()
      .then((data) => {
        console.log(data);
        alert('Plant removed');
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert('An error occured');
      })
      .finally(() => {
        setOptions(false);
      });
  };

  const waterPlant = (id) => {
    water(id)
      .unwrap()
      .then((data) => {
        console.log(data);
        alert('Mark watered successful');
      })
      .catch((err) => {
        console.error(err);
        alert('An error occured');
      })
      .finally(() => {
        setOptions(false);
      });
  };

  return (
    <div className="relative">
      <div
        className="h-2/5 overflow-clip"
        onClick={(e) => {
          setViewPlant(plant);
        }}
      >
        <img src={sqr} className="w-full rounded-3xl" />
      </div>

      <div className="p-4 bg-gray-300 w-full bottom-0 grid grid-cols-6 justify-between">
        <div className="col-span-5">
          <p className="text-xl font-bold">{plant.plant_name}</p>
          <div className="flex gap-x-4 text-xs items-center w-full ">
            {/* <span>{plant.quantity}</span> */}
            <span>
              <GrowthStage
                stage={(
                  plant.growth_stage[0] +
                  plant.growth_stage.substring(1).toLowerCase()
                ).trim()}
              />
            </span>

            <span className="gap-x-1 flex">
              <img src={drop} width={15} alt="" />
              <span>{plant.watering_schedule.frequency_in_days}d</span>
            </span>
          </div>
        </div>
        <div className="col-span-1 text-center self-start h-full pt-4">
          {options && (
            <Menu
              markWatered={() => {
                waterPlant(plant.watering_schedule.id);
              }}
              deletePlant={() => {
                deletePlant(plant.id);
              }}
            />
          )}
          <button
            className="rounded-full duration-200 w-[30px] h-[30px] hover:bg-gray-400 text-lg font-bold"
            onClick={() => {
              setOptions(!options);
            }}
          >
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

  const [viewing, setViewing] = useState(undefined);

  return (
    <>
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
              <GardenPlant
                plant={plant}
                key={plant.id}
                setViewPlant={setViewing}
              />
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

      {viewing && <PlantView plant={viewing} setViewing={setViewing} />}
    </>
  );
};

export default Garden;
