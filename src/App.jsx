import { Link } from 'react-router';

import image from './assets/generic-img.png';

const App = () => {
  return (
    <>
      {/* Navigation bar */}
      <div className="flex justify-between items-center py-6 px-default border-b border-black w-full">
        <div className="flex gap-x-12 items-center">
          <p className="text-3xl">Logo</p>
          <ul className="flex gap-x-4">
            <li className="p-4">Garden Planner</li>
            <li className="p-4">Plant Care</li>
            <li className="p-4">Water Schedule</li>
            <li className="p-4">More Tools</li>
          </ul>
        </div>

        <div className="flex items-center gap-x-6">
          <Link to="/login" className="btn text-black">
            Login
          </Link>
          <Link to="/explore" className="btn bg-black text-white">
            Explore
          </Link>
        </div>
      </div>

      {/* Hero section */}
      <div className="w-full px-default">
        <h2 className="text-6xl font-bold w-1/2 leading-[1.2em] py-5">
          Transform Your Home Garden with Our Comprehensive Planning Tools
        </h2>
        <p className="w-2/3 py-5">
          Simplify your gardening experience with tailored reminders, tracking,
          and a rich plant database.
        </p>

        <div className="flex gap-x-3 py-5">
          <button className="btn bg-black text-white">Get Started</button>
          <button className="btn">Learn More</button>
        </div>

        <div className="py-5">
          <img src={image} className="w-full" />
        </div>
      </div>

      {/* Explore section */}
      <div className="px-default py-12 text-center">
        <h2 className="text-4xl font-bold py-6 w-2/5 m-auto">
          Explore Our Essential Gardening Features
        </h2>
        <p className="w-3/5 m-auto">
          Our Home Garden Planner offers a comprehensive suite of features
          designed to make gardening easier and more enjoyable. From tracking
          plant care to scheduling watering, we've got you covered.
        </p>

        <div className="grid grid-cols-3 gap-x-12 py-12">
          <div className="text-center">
            <img src={image} />
            <p className="text-3xl font-bold py-6 px-2 m-auto">
              Comprehensive Plant Database for Your Garden
            </p>
            <p>
              Access detailed information on a wide variety of plants, including
              their growing requirements and care instructions.
            </p>
          </div>
          <div className="text-center">
            <img src={image} />
            <p className="text-3xl font-bold py-6 px-2 m-auto">
              Efficient Water Scheduler for Optimal Care
            </p>
            <p>
              Receive timely watering reminders and create custom schedules to
              ensure your plants thrive.
            </p>
          </div>
          <div className="text-center">
            <img src={image} />
            <p className="text-3xl font-bold py-6 px-2 m-auto">
              Helpful Reminders for Gardening Tasks
            </p>
            <p>
              Stay on top of your gardening with reminders for planting,
              maintenance, and harvesting.
            </p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-x-6">
          <button className="btn">Learn More</button>
          <Link to={'/register'}>Sign Up &rarr;</Link>
        </div>
      </div>

      {/* Enhance garden section */}
      <div className="grid grid-cols-2 items-center px-default">
        <p>Enhance Your Garden with Simple Tracking</p>
        <div>
          <p>
            Our Simple Tracking feature empowers you to monitor your garden's
            progress effortlessly. By keeping tabs on growth, task completion,
            and success rates, you can make informed decisions that lead to a
            thriving garden. This valuable insight helps you optimize your
            gardening efforts and achieve the results you desire.
          </p>
          <div className="flex items-center gap-x-6">
            <button className="btn">Learn More</button>
            <Link to={'/register'}>Sign Up &rarr;</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
