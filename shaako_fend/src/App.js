import './App.css';
import NavbarNGOAdmin from "./components/NavbarNGOAdmin";
import Footer from "./components/footer";
import About from "./pages/about";
import Home from "./pages/home";
import Authentication from "./pages/auth";
import SupervisorManagement from "./pages/supervisorManagement";
import SupervisorList from "./pages/supervisorList";
import NewSupervisor from "./pages/newSupervisor";
import UpdateSupervisor from "./pages/updateSupervisor";
import CHWManagement from "./pages/CHWManagement";
import CHWList from "./pages/chwList";
import NewCHW from "./pages/newCHW";
import UpdateCHW from "./pages/updateCHW";
import CampaignManagement from "./pages/campaignManagement";
import NewCampaign from "./pages/newCampaign";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Profile from './pages/profile';
import Statistics from './pages/stat';
import SupervisorProfile from './pages/viewSupervisorProfile'

function App() {
    return (
        <Router>
            <NavbarNGOAdmin />
            <br />
            <br />
            <br />
            <div className="app-container" style={{ backgroundColor: "#a6f9d6" }}>
                <Routes>
                    <Route path='/home' element={<Home />} />
                    <Route path='/about' element={<About />} />
                    <Route path='/login' element={<Authentication />} />
                    <Route path='/supervisor_management' element={<SupervisorManagement />} />
                    <Route path='/supervisor_list' element={<SupervisorList />} />
                    <Route path='/new_supervisor' element={<NewSupervisor />} />
                    <Route path='/update_supervisor' element={<UpdateSupervisor />} />
                    <Route path='/chw_management' element={<CHWManagement />} />
                    <Route path='/chw_list' element={<CHWList />} />
                    <Route path='/new_chw' element={<NewCHW />} />
                    <Route path='/update_chw' element={<UpdateCHW />} />
                    <Route path='/campaign_list' element={<CampaignManagement />} />
                    <Route path='/new_campaign' element={<NewCampaign />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/statistics' element={<Statistics />} />
                    <Route exact path='/viewSupervisorProfile/:id' element={<SupervisorProfile />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;