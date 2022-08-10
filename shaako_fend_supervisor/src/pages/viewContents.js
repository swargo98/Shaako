import man1 from './assets/img/avatars/avatar1.jpg'
import man2 from './assets/img/avatars/avatar2.jpg'
import man3 from './assets/img/avatars/avatar3.jpg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from "react";
import { useState, useEffect } from "react";

const ViewContents = () => {
    let [result, setresult] = useState([])
    let [result2, setresult2] = useState([])
    let sup_id = localStorage.getItem('sup_id')
    let [sup_image,setsup_image] = useState(null);

    useEffect(() => {
        getContents()
        getQuizes()
    }, [])

    let getContents = async () => {
        let response = await fetch('http://127.0.0.1:8000/supervisor/getL', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(sup_id)
        })
        let d = await response.json()
        setresult([])
        console.log(d)
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            console.log(now.id + " " + now.title + " " + now.content + " " + now.supervisor_name + " " + now.upload_time)
            setresult(prevArray => [...prevArray, now]);
        }

        let response2 = await fetch('http://127.0.0.1:8000/organization/image/supervisor', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(sup_id)
        })
        // let result = stackSizeSync();
        // console.log(result)

        //take image respone from bufferIO
        let image = await response2.blob()
        //convert to base64
        let image64 = await image.arrayBuffer()
        //convert to base64
        let image64base64 = await btoa(String.fromCharCode.apply(null, new Uint8Array(image64)))
        //convert to url
        let imageurl = `data:image/png;base64,${image64base64}`
        //push to array
        setsup_image(imageurl)
    }

    let getQuizes = async () => {
        let response = await fetch('http://127.0.0.1:8000/supervisor/getQ', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(sup_id)
        })
        let d = await response.json()
        setresult2([])
        console.log(d)
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            // console.log(now.id + " " + now.title + " " + now.content + " " + now.supervisor_name + " " + now.upload_time)
            setresult2(prevArray => [...prevArray, now]);
        }

        let response2 = await fetch('http://127.0.0.1:8000/organization/image/supervisor', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(sup_id)
        })
        // let result = stackSizeSync();
        // console.log(result)

        //take image respone from bufferIO
        let image = await response2.blob()
        //convert to base64
        let image64 = await image.arrayBuffer()
        //convert to base64
        let image64base64 = await btoa(String.fromCharCode.apply(null, new Uint8Array(image64)))
        //convert to url
        let imageurl = `data:image/png;base64,${image64base64}`
        //push to array
        setsup_image(imageurl)
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
                            <h2>স্বাস্থ্যসেবা বিষয়ক পাঠ</h2>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        {
                            result.map((r) => {
                                return (
                                    <div className="col">
                                        <div className="p-4">
                                            <a style={{ textDecoration: "none" }} href={`/blog_post/${r.id}`}><h4>{r.title}</h4></a>
                                            <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover"
                                                width="50" height="50"
                                                src={sup_image} alt="man" />
                                                <div>
                                                    <p className="fw-bold mb-0">{r.supervisor_name}</p>
                                                    <p className="text-muted mb-0">Upload date: {r.upload_time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                    <button className="btn btn-primary" type="button"
                        style={{ margin: "12px", background: "rgb(52,163,0)" }}><a style={{ color: 'white', textDecoration: "none" }} href="/new_lesson">পাঠ যোগ করুন</a>
                    </button>
                </div>

                <div className="container py-4 py-xl-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-7 text-center mx-auto">
                            <h2>স্বাস্থ্যসেবা বিষয়ক কুইজ</h2>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        {
                            result2.map((r) => {
                                return (
                                    <div className="col">
                                        <div className="p-4">
                                            <a style={{ textDecoration: "none" }} href={`/quiz_post/${r.id}`}><h4>{r.title}</h4></a>
                                            <div className="d-flex"><img className="rounded-circle flex-shrink-0 me-3 fit-cover"
                                                width="50" height="50"
                                                src={sup_image} alt="man" />
                                                <div>
                                                    <p className="fw-bold mb-0">{r.supervisor_name}</p>
                                                    <p className="text-muted mb-0">Upload date: {r.upload_time}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }

                    </div>
                    <button className="btn btn-primary" type="button"
                        style={{ margin: "12px", background: "rgb(52,163,0)" }}><a style={{ color: 'white', textDecoration: "none" }} href="/new_quiz">কুইজ যোগ করুন</a>
                    </button>
                </div>
            </section>

        </main>
    );
}

export default ViewContents;
