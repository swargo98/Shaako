import Background from './assets/img/mali-800.jpg'
import './assets/fonts/simple-line-icons.min.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from "react";

const Home = () => {
    let [result, setresult] = useState(null);
    let organization = localStorage.getItem('organization');
    let sup_id = localStorage.getItem('sup_id');

    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        let response = await fetch('http://127.0.0.1:8000/supervisor/home', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(sup_id)
        })
        let d = await response.json()
        console.log(d)
        setresult(d);
    }
    return (
        <main className="page landing-page">
            {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
            <section className="clean-block clean-hero"
                style={{ backgroundImage: "url(" + Background + ")", color: 'rgba(9, 255, 162, 0.85)' }}>
                <div className="text">
                    <h1><span style={{ color: 'rgb(66, 0, 255)', backgroundColor: 'rgb(248, 247, 247)' }}>সাঁকো</span></h1>
                    <p><br /><strong><span style={{ color: 'rgb(7, 55, 99)', backgroundColor: 'rgb(244, 244, 245)' }}>সুপারভাইজার মডিউল</span></strong><br /><br />
                    </p>
                    <button className="btn btn-outline-light btn-lg" type="button"
                        style={{ margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green' }}>সেবাপ্রাপ্ত রুগী: {result?.total_patients}
                    </button>
                    <button className="btn btn-outline-light btn-lg" type="button"
                        style={{ margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green' }}>মোট
                        স্বাস্থ্যকর্মী: {result?.total_chws} 
                    </button>
                    <button className="btn btn-outline-light btn-lg" type="button"
                        style={{ margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green' }}>মোট পাঠ: {result?.total_lessons}
                    </button>

                    <button className="btn btn-outline-light btn-lg" type="button"
                        style={{ margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green' }}>মোট কুইজ: {result?.total_quizes}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Home;