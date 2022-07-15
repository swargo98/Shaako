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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <NavbarNGOAdmin />
            <br/>
            <br/>
            <br/>
            <div className="app-container" style={{backgroundColor: "#a6f9d6"}}>
                <Routes>
                    <Route path='/home' element={<Home/>} />
                    <Route path='/about' element={<About/>} />
                    <Route path='/login' element={<Authentication/>} />
                    <Route path='/supervisor_management' element={<SupervisorManagement/>} />
                    <Route path='/supervisor_list' element={<SupervisorList/>} />
                    <Route path='/new_supervisor' element={<NewSupervisor/>} />
                    <Route path='/update_supervisor' element={<UpdateSupervisor/>} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;