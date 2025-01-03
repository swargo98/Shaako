import './App.css';
import NavbarSupervisor from "./components/NavbarSupervisor";
import Footer from "./components/footer";
import Home from "./pages/home";
import Authentication from "./pages/auth";
import NewLesson from "./pages/newLesson";
import CHWList from "./pages/chwList";
import ViewContents from "./pages/viewContents";
import BlogPost from "./pages/blogPost";
import QuizPost from "./pages/quizPost";
import NewQuiz from "./pages/newQuiz";
import EditLesson from "./pages/editLesson";
import Profile from "./pages/profile";
import CHWProfile from "./pages/viewCHWProfile";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CampaignManagement from "./pages/campaignManagement";
import CampaignDetails from "./pages/CampaignDetails";
import Statistics from './pages/stat';
import GoTo from './pages/go_to';


function App() {
    return (
        <Router>
            <NavbarSupervisor />
            <br />
            <br />
            <br />
            <div className="app-container" style={{ backgroundColor: "#a6f9d6" }}>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/home' element={<Home />} />
                    <Route exact path='/login' element={<Authentication />} />
                    <Route exact path='/new_lesson' element={<NewLesson />} />
                    <Route exact path='/chw_list' element={<CHWList />} />
                    <Route exact path='/view_contents' element={<ViewContents />} />
                    <Route exact path='/blog_post/:id' element={<BlogPost />} />
                    <Route exact path='/quiz_post/:id' element={<QuizPost />} />
                    <Route exact path='/new_quiz' element={<NewQuiz />} />
                    <Route exact path='/edit_lesson/:id' element={<EditLesson />} />
                    <Route exact path='/profile' element={<Profile />} />
                    <Route exact path='/viewCHWProfile/:id' element={<CHWProfile />} />
                    <Route exact path='/campaign_details/:id' element={<CampaignDetails />} />
                    <Route path='/campaign_list' element={<CampaignManagement />} />
                    <Route path='/statistics' element={<Statistics />} />
                    {/* <Route path='/go_to/:now' element={<GoTo />} /> */}
                    <Route exact path='/go_to/:id' element={<GoTo />} />
                </Routes>
            </div>
            <Footer />
        </Router>
    );
}

export default App;