import './App.css';
import NavbarSupervisor from "./components/NavbarSupervisor";
import Footer from "./components/footer";
import Home from "./pages/home";
import Authentication from "./pages/auth";
import RichTextEditor from "./components/richTextEditor";
import NewLesson from "./pages/newLesson";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <NavbarSupervisor />
            <br/>
            <br/>
            <br/>
            <div className="app-container" style={{backgroundColor: "#a6f9d6"}}>
                <Routes>
                    <Route exact path='/home' element={<Home/>} />
                    <Route exact path='/login' element={<Authentication/>} />
                    <Route exact path='/editor' element={<RichTextEditor/>} />
                    <Route exact path='/new_lesson' element={<NewLesson/>} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;