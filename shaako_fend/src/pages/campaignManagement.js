import man1 from './assets/img/avatars/avatar1.jpg'
import man2 from './assets/img/avatars/avatar2.jpg'
import man3 from './assets/img/avatars/avatar3.jpg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const CampaignManagement = () => {
    let [result, setresult] = useState([])
    let organization = localStorage.getItem('organization')

    useEffect(() => {
        getCampaigns()
    }, [])

    let getCampaigns = async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/getCampaignList', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(organization)
        })
        let d = await response.json()
        setresult([])
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            console.log(now.id)
            for (let j = 0; j < now.supervisors.length; j++) {
                let id = now.supervisors[j].id
                let response2 = await fetch('http://127.0.0.1:8000/organization/image/supervisor', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'TOKEN ' + localStorage.getItem('token')
                    },
                    body: JSON.stringify(id)
                })
                //take image respone from bufferIO
                let image = await response2.blob()
                //convert to base64
                let image64 = await image.arrayBuffer()
                //convert to base64
                let image64base64 = await btoa(String.fromCharCode.apply(null, new Uint8Array(image64)))
                //convert to url
                let imageurl = `data:image/png;base64,${image64base64}`
                //push to array
                now.supervisors[j].image = imageurl

            }
            setresult(prevArray => [...prevArray, now]);
        }
    }

    return (
        <main className="page landing-page">
            {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
            <section className="clean-block features" style={{ background: "#a6f9d6", margin: "-67px" }}>
                <div className="container">
                    <div className="block-heading" style={{ padding: "24px 0px 0px" }}>
                    </div>
                </div>
                <div className="container py-4 py-xl-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-7 text-center mx-auto">
                            <h2>ক্যাম্পেইন ম্যানেজমেন্ট</h2>
                            {/* <p className="w-lg-50">Curae hendrerit donec commodo hendrerit egestas tempus, turpis
                                facilisis nostra nunc. Vestibulum dui eget ultrices.</p> */}
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        {
                            result.map((r) => {
                                return (
                                    <div className="col">
                                        <div className="p-4">
                                            <h3>{r.title}</h3>
                                            <p>Start Date: {r.state_date}</p>
                                            <p>End Date: {r.end_date}</p>
                                            <p>Details: {r.campaign_details}</p>

                                            {
                                                r.supervisors.map((r2) => {
                                                    return (
                                                        <>
                                                            <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover"
                                                                width="50" height="50"
                                                                src={r2.image} alt="man" />
                                                                <div>
                                                                    <p className="fw-bold mb-0">{r2.name}</p>
                                                                </div>
                                                            </div>
                                                            <br />
                                                        </>
                                                    );
                                                })
                                            }


                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                    {/* <button className="btn btn-primary" type="button" style={{ margin: "12px" }}>আরও দেখুন</button> */}
                    <button className="btn btn-primary" type="button"
                        style={{ margin: "12px", background: "rgb(52,163,0)" }}><a style={{ color: 'white', textDecoration: "none" }} href="/new_campaign">ক্যাম্পেইন যোগ করুন</a>
                    </button>
                </div>
            </section>
        </main>
    );
}

export default CampaignManagement;
