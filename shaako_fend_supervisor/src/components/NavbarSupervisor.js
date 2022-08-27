import logo from './assets/img/Capture.png'
import './assets/fonts/simple-line-icons.min.css'
import './assets/fonts/fontawesome-all.min.css'
import Notifications from "react-notifications-menu";
import React, { useState, useEffect } from "react";

const DEFAULT_NOTIFICATION = {
    image:
        "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
    message: "Notification one.",
    detailPage: "/view_contents",
    receivedTime: "12h ago"
};
let handleSubmit = async () => {
    localStorage.removeItem('logged');
    localStorage.removeItem('organization');
    localStorage.removeItem('sup_id');
    localStorage.removeItem('token');
}
const NavbarSupervisor = () => {
    const [data, setData] = useState([]);
    let [dummy, setdummy] = useState(false)

    useEffect(() => {
        init();

    }, [])

    let handleChecked = async (id) => {
        let response = await fetch('http://127.0.0.1:8000/supervisor/markAsRead', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })
        let d = await response.json()
        console.log(d)
    }

    let init = async () => {
        console.log("ekhane")
        let response = await fetch('http://127.0.0.1:8000/supervisor/getSupNotification', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(localStorage.getItem('sup_id'))
        })
        let d = await response.json()
        console.log(d)
        setData([])


        for (let i = 0; i < d.length; i++) {
            let now = d[i]

            if (now.notification_type === 'campaign') {
                let DEFAULT_NOTIFICATION = {
                    image:
                        "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
                    message: now.description,
                    
                    receivedTime: now.ago_minute,
                    // onClick: handleChecked(now.id),
                    detailPage: "/go_to/"+now.id,
                };
                setData(prevArray => [...prevArray, DEFAULT_NOTIFICATION]);
            }
            if (now.notification_type === 'chw') {
                let DEFAULT_NOTIFICATION = {
                    image:
                        "https://cutshort-data.s3.amazonaws.com/cloudfront/public/companies/5809d1d8af3059ed5b346ed1/logo-1615367026425-logo-v6.png",
                    message: now.description,
                    // onClick: handleChecked(now.id),
                    detailPage: "/go_to/"+now.id,
                    receivedTime: now.ago_minute
                };
                setData(prevArray => [...prevArray, DEFAULT_NOTIFICATION]);
            }

        }

        setdummy()

    }
    return (
        <nav className="navbar navbar-light navbar-expand-lg fixed-top bg-white clean-navbar">
            <div className="container"><img src={logo} alt="logo" style={{ width: '40px' }} /><a
                className="navbar-brand logo" href="/"
                style={{ width: '67.25px', padding: '3px 0px', margin: '0px' }}><strong><span
                    style={{ color: 'rgba(4, 40, 228, 0.9)' }}>&nbsp; সাঁকো</span></strong></a>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span
                    className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span>
                </button>
                {/* {logged && */}
                <div className="collapse navbar-collapse" id="navcol-1">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="/home">হোম</a></li>
                        <li className="nav-item"><a className="nav-link" href="/view_contents">পাঠসমূহ</a></li>
                        <li className="nav-item"><a className="nav-link" href="/chw_list">স্বাস্থ্যকর্মী</a></li>
                        <li className="nav-item"><a className="nav-link" href="/campaign_list">ক্যাম্পেইন</a></li>
                        <li className="nav-item"><a className="nav-link" href="/">পরিসংখ্যান</a></li>
                        <li className="nav-item">

                            {/* <Notifications data={data} onItemClick={(item) => {
                                console.log(item)

                            }} */}
                            {/* /> */}
                            <Notifications
                                data={data}
                                header={{
                                    title: "Notifications",
                                    option: { text: "View All", onClick: () => console.log("Clicked") }
                                }}
                                // onItemClick={(item) => {
                                //     console.log("hennnnnnnlooooooo "+item)
                                // }}
                                // onClick={init()}
                            />
                        </li>
                        <li className="nav-item">
                            <div className="nav-item dropdown" style={{ margin: "5px" }}><a className="dropdown-toggle"
                                aria-expanded="false"
                                data-bs-toggle="dropdown"
                                href="/"
                                style={{ color: 'rgb(0,0,0)' }}></a>
                                <div className="dropdown-menu"><a className="dropdown-item" href="/profile">প্রোফাইল</a><a
                                    className="dropdown-item" href="/login" onClick={handleSubmit}>লগ আউট</a></div>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* } */}
            </div>
        </nav>
    );
}

export default NavbarSupervisor;
