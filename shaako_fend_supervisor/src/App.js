import './App.css';
import NavbarSupervisor from "./components/NavbarSupervisor";
import Footer from "./components/footer";
import Home from "./pages/home";
import Authentication from "./pages/auth";
import NewLesson from "./pages/newLesson";
import CHWList from "./pages/chwList";
import ViewContents from "./pages/viewContents";
import BlogPost from "./pages/blogPost";
import NewQuiz from "./pages/newQuiz";

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
                    <Route exact path='/new_lesson' element={<NewLesson/>} />
                    <Route exact path='/chw_list' element={<CHWList/>} />
                    <Route exact path='/view_contents' element={<ViewContents/>} />
                    <Route exact path='/blog_post/:id' element={<BlogPost/>} />
                    <Route exact path='/new_quiz' element={<NewQuiz/>} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;