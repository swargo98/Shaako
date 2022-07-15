import './App.css';
import Navbar from "./components/navbar";
import About from "./pages/about";
import Home from "./pages/home";
import Authentication from "./pages/auth";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Navbar />
            <div className="app-container">
                <Routes>
                    <Route path='/home' element={<Home/>} />
                    <Route path='/about' element={<About/>} />
                    <Route path='/login' element={<Authentication/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;