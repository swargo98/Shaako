import './App.css';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import About from "./pages/about";
import Home from "./pages/home";
import Authentication from "./pages/auth";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Navbar />
            <br/>
            <br/>
            <br/>
            <div className="app-container">
                <Routes>
                    <Route path='/home' element={<Home/>} />
                    <Route path='/about' element={<About/>} />
                    <Route path='/login' element={<Authentication/>} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;