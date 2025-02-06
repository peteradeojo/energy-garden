import { Link } from 'react-router';
import { PiFlowerLotus } from 'react-icons/pi';

import image from './assets/family.png';
import imageSqr from './assets/generic-square.png';
import boxSvg from './assets/Vector.svg';
import Stars from './assets/Stars.png';
import Lightbox from './assets/Lightbox.png';

const WithRarr = ({ text, to }) => {
  return (
    <>
      <Link to={to || '/'}>{text} &rarr;</Link>
    </>
  );
};

const App = () => {
  return (
    <>
      {/* Navigation bar */}
      <nav className="sticky top-0 bg-white flex justify-between items-center py-6 px-default border-b border-black w-full">
        <div className="flex gap-x-12 items-center">
          <Link to="/" className="text-3xl">
            <PiFlowerLotus className="w-14 h-14 text-green-600" />
          </Link>
          <ul className="flex gap-x-4">
            <li className="p-4">Garden Planner</li>
            <li className="p-4">Plant Care</li>
            <li className="p-4">Water Schedule</li>
            <li className="p-4">More Tools</li>
          </ul>
        </div>

        <div className="flex items-center gap-x-6">
          <Link to="/login" className="btn">
            Login
          </Link>
          <Link to="/explore" className="btn btn-primary">
            Explore
          </Link>
        </div>
      </nav>

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
          <Link to="/register" className="btn btn-primary text-white">
            Get Started
          </Link>
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
          <Link to="/register">Sign Up &rarr;</Link>
        </div>
      </div>

      {/* Enhance garden section */}
      <div className="grid grid-cols-2 items-center px-default py-6 gap-48">
        <p className="text-4xl font-bold">
          Enhance Your Garden with Simple Tracking
        </p>
        <div>
          <p>
            Our Simple Tracking feature empowers you to monitor your garden's
            progress effortlessly. By keeping tabs on growth, task completion,
            and success rates, you can make informed decisions that lead to a
            thriving garden. This valuable insight helps you optimize your
            gardening efforts and achieve the results you desire.
          </p>
          <div className="flex items-center gap-x-6 py-6">
            <button className="btn">Learn More</button>
            <Link to="/register">Sign Up &rarr;</Link>
          </div>
        </div>
      </div>

      <div className="px-default">
        <img src={image} className="w-full" />
      </div>

      <div className="px-default grid gap-x-4 grid-cols-2 items-center">
        <div className="grid grid-cols-2 gap-y-8 pe-12">
          <p className="col-span-2 text-4xl font-bold">
            Unlock the Secrets to a Thriving Home Garden with Our Planner
          </p>
          <p className="col-span-2">
            Transform your gardening experience with our Home Garden Planner,
            designed to simplify every step. Enjoy personalized reminders and
            expert guidance tailored to your unique garden needs.
          </p>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 col-span-2">
            <p className="text-xl font-bold">Effortless Planning</p>
            <p className="text-xl font-bold">Track Success</p>
            <p>
              Stay organized with custom schedules and reminders for watering
              and maintenance tasks.
            </p>
            <p>
              Monitor growth and success rates to ensure your garden flourishes
              beautifully.
            </p>
          </div>
        </div>

        <div className="">
          <img src={imageSqr} className="w-full p-24 pe-0" />
        </div>
      </div>

      <div className="py-12"></div>

      {/* Discover section */}
      <div className="px-default py-12">
        <h2 className="text-4xl w-1/2 font-bold">
          Discover the simplicity of planning your perfect home garden
          effortlessly.
        </h2>

        <div className="py-8"></div>

        <div className="grid grid-cols-3 gap-x-12">
          <div className="grid gap-y-5">
            <img src={boxSvg} />
            <p className="text-3xl font-bold">
              Follow these easy steps to maximize your gardening success.
            </p>
            <p>
              Our Home Garden Planner provides a straightforward approach to
              garden management.
            </p>
            <WithRarr to={'/'} text={'Learn More'} />
          </div>

          <div className="grid gap-y-5">
            <img src={boxSvg} />
            <p className="text-3xl font-bold">
              Utilize our plant database to choose the best plants for your
              garden.
            </p>
            <p>
              Access detailed information on plant care and growing
              requirements.
            </p>
            <WithRarr to={'/'} text={'Learn More'} />
          </div>

          <div className="grid gap-y-5">
            <img src={boxSvg} />
            <p className="text-3xl font-bold">
              Set customized reminders to keep your garden thriving all season
              long.
            </p>
            <p>
              Stay on top of watering, planting, and maintenance tasks
              effortlessly.
            </p>
            <WithRarr to={'/'} text={'Learn More'} />
          </div>
        </div>
      </div>

      <div className="py-12"></div>

      <div className="px-default py-12 grid grid-cols-2 items-center gap-20">
        <img src={Lightbox} alt="" />
        <div>
          <img src={Stars} alt="" />
          <p className="font-bold text-2xl py-6 w-4/5">
            "Using the Home Garden Planner transformed my garden! I never knew
            gardening could be this enjoyable and organized."
          </p>
          <div className="py-3">
            <div className="flex items-stretch">
              <div>
                <p className="font-bold text-lg">Emily Gardener</p>
                <small className="text-lg">Gardener, Homeowner</small>
              </div>
              <span className="h-full p-1 bg-black"></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
