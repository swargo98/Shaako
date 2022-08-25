import man1 from './assets/img/avatars/avatar1.jpg'
import man2 from './assets/img/avatars/avatar2.jpg'
import man3 from './assets/img/avatars/avatar3.jpg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const CampaignManagement = () => {
    let [result, setresult] = useState([])
    let organization = localStorage.getItem('organization')
    let sup_id = localStorage.getItem('sup_id')
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
            body: JSON.stringify({organization,sup_id})
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
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        {
                            result.map((r) => {
                                return (
                                    <div className="col">
                                        <div className="p-4">
                                            <a style={{ textDecoration: "none" }} href={`/campaign_details/${r.id}`}><h3>{r.title}</h3></a>
                                            <p>Start Date: {r.state_date}</p>
                                            <p>End Date: {r.end_date}</p>
                                            <p>Details: {r.campaign_details}</p>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                </div>
            </section>
        </main>
    );
}

export default CampaignManagement;
