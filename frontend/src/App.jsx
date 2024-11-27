import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';


import './css/style.css';
import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import EcoLearn from './pages/EcoLearn.jsx';
import EcoLab from './pages/EcoLab.jsx';
import EcoGames from './pages/EcoGames.jsx';
import {EcoPulse} from './pages/EcoPulse.jsx';
import EcoEngage from './pages/EcoEngage.jsx';
import EcoTracker from './pages/EcoTracker.jsx';
import EcoBot from './pages/EcoBot.jsx';
import EcoPolicy from './pages/EcoPolicy.jsx';
import EcoGuide from './pages/EcoGuide.jsx';
import GameDetailPage from './components/EcoGames/GameDetailPage.jsx';
import { AllArticles } from './components/EcoGuide/AllArticles.jsx';
import Blog from './components/EcoGuide/Blog.jsx';
import BlogArticles from './components/EcoGuide/BlogArticles.jsx';
import EcoTrackerHome from './components/EcoTracker/EcoTrackerHome.jsx';
import EcoTrackerWaste from './components/EcoTracker/EcoTrackerWaste.jsx';
import EcoTrackerFood from './components/EcoTracker/EcoTrackerFood.jsx';
import EcoTrackerTransport from './components/EcoTracker/EcoTrackerTransport.jsx';
import EcoTrackerEnergy from './components/EcoTracker/EcoTrackerEnergy.jsx';
import EcoTrackerWater from './components/EcoTracker/EcoTrackerWater.jsx';
import EcoTrackerProduct from './components/EcoTracker/EcoTrackerProduct.jsx';
import EcoTrackerDigital from './components/EcoTracker/EcoTrackerDigital.jsx';
import DetailPage from './components/EcoLab/DetailPage.jsx';
import EcoStatCarbon from './components/EcoStats/EcoStatCarbon.jsx';
import EcoStatEnergy from './components/EcoStats/EcoStatEnergy.jsx';
import EcoStatAir from './components/EcoStats/EcoStatAir.jsx';
import EcoStatWater from './components/EcoStats/EcoStatWater.jsx';
import EcoStatBiodiversity from './components/EcoStats/EcoStatBiodiversity.jsx';
import EcoStatWaste from './components/EcoStats/EcoStatWaste.jsx';
import EcoStatMobility from './components/EcoStats/EcoStatMobility.jsx';
import EcoAgri from './components/EcoStats/EcoAgri.jsx';
import EcoEconomy from './components/EcoStats/EcoEconomy.jsx';
import SignUp from './pages/sign-up.jsx';
import SignIn from './pages/sign-in.jsx';
import PublicRoutes from './components/Guards/PublicRoutes.jsx';
import Home from './pages/Home.jsx';
import ProtectedRoutes from './components/Guards/ProtectedRoutes.jsx';
import EcoLearnVideo from './components/EcoLearn/EcoLearnVideo.jsx';
import EcoLearnCourses from './components/EcoLearn/EcoLearnCourses.jsx';
import EcoLearnArticles from './components/EcoLearn/EcoLearnArticles.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/" element={<PublicRoutes />}>
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/signin" element={<SignIn />} />
        </Route>
        {/* Home Route */}
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/eco-learn" element={<EcoLearn />} />
          <Route path="/dashboard/eco-learn/video" element={<EcoLearnVideo />} />
          <Route path="/dashboard/eco-learn/course" element={<EcoLearnCourses />} />
          <Route path="/dashboard/eco-learn/article" element={<EcoLearnArticles />} />
          <Route path="/dashboard/eco-lab" element={<EcoLab />} />
          <Route path="/dashboard/eco-lab/details" element={<DetailPage />} />
          <Route path="/dashboard/eco-games" element={<EcoGames />} />
          <Route path="/dashboard/eco-games/details" element={<GameDetailPage />} />
          <Route path="/dashboard/eco-pulse" element={<EcoPulse />} />
          <Route path="/dashboard/eco-engage" element={<EcoEngage />} />
          <Route path="/dashboard/eco-tracker" element={<EcoTrackerHome />} />
          <Route path="/dashboard/eco-tracker/home" element={<EcoTrackerHome />} />
          <Route path="/dashboard/eco-tracker/waste" element={<EcoTrackerWaste />} />
          <Route path="/dashboard/eco-tracker/food" element={<EcoTrackerFood />} />
          <Route path="/dashboard/eco-tracker/transport" element={<EcoTrackerTransport />} />
          <Route path="/dashboard/eco-tracker/energy" element={<EcoTrackerEnergy />} />
          <Route path="/dashboard/eco-tracker/water" element={<EcoTrackerWater />} />
          <Route path="/dashboard/eco-tracker/products" element={<EcoTrackerProduct />} />
          <Route path="/dashboard/eco-tracker/digital" element={<EcoTrackerDigital />} />
          <Route path="/dashboard/eco-bot" element={<EcoBot />} />
          <Route path="/dashboard/eco-policy" element={<EcoPolicy />} />
          <Route path="/dashboard/eco-guide" element={<EcoGuide />} />
          <Route path="/dashboard/eco-guide/all-articles" element={<AllArticles />} />
          <Route path="/dashboard/eco-guide/blog" element={<BlogArticles />} />
          <Route path="/dashboard/eco-stats/carbon" element={<EcoStatCarbon />} />
          <Route path="/dashboard/eco-stats/energy" element={<EcoStatEnergy />} />
          <Route path="/dashboard/eco-stats/air-quality" element={<EcoStatAir />} />
          <Route path="/dashboard/eco-stats/water-usage" element={<EcoStatWater />} />
          <Route path="/dashboard/eco-stats/biodiversity" element={<EcoStatBiodiversity />} />
          <Route path="/dashboard/eco-stats/waste-management" element={<EcoStatWaste />} />
          <Route path="/dashboard/eco-stats/mobility" element={<EcoStatMobility />} />
          <Route path="/dashboard/eco-stats/agriculture" element={<EcoAgri />} />
          <Route path="/dashboard/eco-stats/economy" element={<EcoEconomy />} />
        </Route>
      <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}


export default App;
