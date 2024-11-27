import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import Banner from '../partials/Banner';
import Video from '../assets/video.png'
import Courses from '../assets/courses.png'
import financearticle from '../assets/financearticle.png'

const EcoLearn = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

          <div className="sm:items-center mb-8">

{/* Left: Title */}
<div className="mb-4 sm:mb-6">
  <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">EcoLearn</h1>
</div>

{/* Courses Section */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/dashboard/eco-learn/video">
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img
              className="w-full content-fill h-40 "
              src={Video}
              alt="Videos"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Videos</h3>
              <p>Watch informative videos on climate action, green energy, and environmental conservation.</p>
            </div>
          </div>
        </Link>
        <Link to="/dashboard/eco-learn/course">
    <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <img
        className="w-full h-40 object-fill"
        src={Courses}
        alt="Courses"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">Courses</h3>
        <p>Explore various courses to deepen your understanding of environmental sustainability and climate science.</p>
      </div>
    </div>
  </Link>
        <Link to="/dashboard/eco-learn/course">
          <div className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <img
              className="w-full h-40 object-cover"
              src={financearticle}
              alt="Articles"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">Articles and News</h3>
              <p>Read articles to stay updated with the latest climate change trends and solutions.</p>
            </div>
          </div>
        </Link>
              </div>
            </div>

          </div>
        </main>

        <Banner />

      </div>
    </div>
  )
}

export default EcoLearn