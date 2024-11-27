import React, { useState ,useEffect} from 'react';
import axios from "axios";
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
import { HorizontalCard } from '../components/HorizontalCardPulse'; // Import the TestimonialCard
import { NavbarWithSearch } from '../components/PostNavbar';
export const EcoPulse = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    
  
    useEffect(() => {
        // Fetch posts data from API
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/posts/all', {
                    withCredentials: true, // Make sure cookies are sent with the request
                });
        
                setPosts(response.data);
            } catch (error) {
                console.error("Error fetching posts: ", error);
            }
        };
        

        fetchPosts();
    }, []);

    return (
        <div className="flex h-screen overflow-hidden">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

                {/* Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                        {/* Dashboard actions */}
                        {/* Dashboard actions */}
<div className="sm:flex sm:flex-col sm:justify-between sm:items-start mb-12"> {/* Adjusted for vertical stacking */}
  
  {/* Left: Title */}
  <div className="mb-4 sm:mb-6"> {/* Increased margin-bottom */}
    <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">EcoPulse</h1>
  </div>

  {/* Navbar */}
  <NavbarWithSearch />
</div>


                        {/* Cards */}
                        <div className="grid grid-cols-1 gap-6">
  {posts.map((post) => (
    <div key={post._id} className="w-full">
      <HorizontalCard post={post} />
    </div>
  ))}
</div>

                       

                    </div>
                </main>

                <Banner />

            </div>
        </div>
    );
};


