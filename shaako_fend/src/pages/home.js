import Background from './assets/img/mali-800.jpg'
import './assets/fonts/simple-line-icons.min.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Home = () => {
    let [data1, setdata1] = useState(12)
    let [data2, setdata2] = useState(23)
    let [data3, setdata3] = useState(34)

    useEffect(() => {
        getData()
    }, [])

    let getData = async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/home',
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'TOKEN ' + localStorage.getItem('token')
            },
        })
        let d = await response.json()
        setdata1(data1 => ({ ...data1, 'data1': d[0] }))
        setdata2(data2 => ({ ...data2, 'data2': d[1] }))
        setdata3(data3 => ({ ...data3, 'data3': d[2] }))
    }


    return (
        <main className="page landing-page">
            
            {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
            <section className="clean-block clean-hero"
                style={{ backgroundImage: "url(" + Background + ")", color: 'rgba(9, 255, 162, 0.85)'}}>
                <div className="text">
                    <h1><span style={{ color: 'rgb(66, 0, 255)', fontWeight:'bold'}}>সাঁকো</span></h1>
                    <p><br /><strong><span style={{ color: 'rgb(7, 55, 99)' , fontWeight:'bold'}}>স্বাস্থ্যসেবার সেতুবন্ধন</span></strong><br /><br />
                    </p>
                    <button className="btn btn-outline-light btn-lg" type="button"
                        style={{ margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green' }}>সেবাপ্রাপ্ত রুগী:&nbsp; {data1.data1}
                    </button>
                    <button className="btn btn-outline-light btn-lg" type="button"
                        style={{ margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green' }}>মোট স্বাস্থ্যকর্মী:&nbsp; {data2.data2}
                    </button>
                    <button className="btn btn-outline-light btn-lg" type="button"
                        style={{ margin: '0px', padding: '8px 16px', width: '433.922px', background: 'green' }}>মোট সুপারভাইজার:&nbsp; {data3.data3}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Home;