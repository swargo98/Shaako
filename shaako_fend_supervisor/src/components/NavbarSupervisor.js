import logo from './assets/img/Capture.png'
import './assets/fonts/simple-line-icons.min.css'
import './assets/fonts/fontawesome-all.min.css'
import Notifications from "react-notifications-menu";
import {useState} from "react";

const DEFAULT_NOTIFICATION = {
    image:
        "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
    message: "Notification one.",
    detailPage: "/events",
    receivedTime: "12h ago"
};
let handleSubmit = async () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('organization');
    localStorage.removeItem('sup_id');
    localStorage.removeItem('token');
}
const NavbarSupervisor = () => {
    const [data, setData] = useState([DEFAULT_NOTIFICATION]);
    return (
        <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container"><img src={logo} alt="logo" style={{width: '40px'}}/><a
                className="navbar-brand logo" href="/"
                style={{width: '67.25px', padding: '3px 0px', margin: '0px'}}><strong><span
                style={{color: 'rgba(4, 40, 228, 0.9)'}}>&nbsp; সাঁকো</span></strong></a>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                    className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="/home">হোম</a></li>
                        <li className="nav-item"><a className="nav-link" href="/view_contents">পাঠসমূহ</a></li>
                        <li className="nav-item"><a className="nav-link" href="/chw_list">স্বাস্থ্যকর্মী</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">ক্যাম্পেইন</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">পরিসংখ্যান</a></li>
                        <li className="nav-item"><Notifications
                            data={data}
                            header={{
                                title: "Notifications",
                                option: { text: "View All", onClick: () => console.log("Clicked") }
                            }}
                            markAsRead={(data) => {
                                console.log(data);
                            }}
                        />
                        </li>
                        <li className="nav-item">
                            <div className="nav-item dropdown" style={{margin: "5px"}}><a className="dropdown-toggle"
                                                                                       aria-expanded="false"
                                                                                       data-bs-toggle="dropdown"
                                                                                       href="/"
                                                                                       style={{color: 'rgb(0,0,0)'}}></a>
                                <div className="dropdown-menu"><a className="dropdown-item" href="/profile">প্রোফাইল</a><a
                                    className="dropdown-item" href="/login" onClick={handleSubmit}>লগ আউট</a></div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavbarSupervisor;
