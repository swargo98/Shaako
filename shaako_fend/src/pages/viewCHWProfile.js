import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const CHWProfile = () => {
    let [result, setresult] = useState('')
    let [image, setimage] = useState(null)
    let { id } = useParams();
    let [visit, setvisit] = useState([])
    let [quiz , setquiz] = useState([])

    useEffect(() => {
        getProfile();
        getRecentVisits();
        getRecentQuiz();
    }, [])

    let getRecentQuiz = async () => {
        let response = await fetch('http://127.0.0.1:8000/CHW/getRecentQuizSubmissions', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })

        let d = await response.json()
        console.log(d);
        setquiz([]);
        for (let i = 0; i < d.length; i++) {
            setquiz(prevArray => [...prevArray, d[i]]);
        }
    }
    let getRecentVisits = async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/getRecentVisits', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })

        let d = await response.json()
        console.log(d);
        setvisit([]);
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            console.log(now.id)
            let response2 = await fetch('http://127.0.0.1:8000/patient/getPatientImage', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'TOKEN ' + localStorage.getItem('token')
                },
                body: JSON.stringify(now.id)
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
            now.image = imageurl
            setvisit(prevArray => [...prevArray, now]);
        }
    }

    let getProfile = async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/getCHWProfile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })

        let d = await response.json()
        console.log(d);
        setresult(d);
        let response2 = await fetch('http://127.0.0.1:8000/CHW/getImage', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
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
        setimage(imageurl)
    }

    return (
        <div id="content">
            <div className="container-fluid">
                <br />
                <br />
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <div className="card mb-3">
                            <div className="card-body text-center shadow">
                                <img className="rounded-circle mb-3 mt-4" src={image} width="160" height="160" />
                                <h5>{result.name}</h5>
                            </div>
                        </div>
                        <div className="card shadow mb-3">
                            <div className="card-header py-3">
                                <p className="text-primary m-0 fw-bold">সাধারণ তথ্য</p>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>সুপারভাইজার নাম</strong></label>
                                            <br />
                                            {result.supervisor_name}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>ইউজারনেম</strong></label>
                                            <br />
                                            {result.name}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ইমেইল এড্রেস</strong></label>
                                            <br />
                                            {result.email}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>মোবাইল নম্বর</strong></label>
                                            <br />
                                            {result.contactNo}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ঠিকানা</strong></label>
                                            <br />
                                            {result.presentAddress}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>কর্মরত এলাকা</strong></label>
                                            <br />
                                            {result.ward_union},{result.upazilla_thana},{result.district},{result.division}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>নিয়োগ তারিখ</strong></label>
                                            <br />
                                            {result.recruitment_date}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">

                        <div className="row">
                            <div className="col">
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">সাম্প্রতিক ভিজিটসমূহ</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive table mt-2" id="dataTable" role="grid"
                                            aria-describedby="dataTable_info">
                                            <table className="table my-0" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>রোগীর নাম</th>
                                                        <th>জন্ম তারিখ</th>
                                                        <th>লিঙ্গ</th>
                                                        <th>ঠিকানা</th>
                                                        <th>ভিজিট তারিখ</th>
                                                        <th>অনুমাণকৃত রোগ</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        visit.map((r) => {
                                                            return (
                                                                <tr>
                                                                    <td><img className="rounded-circle me-2" width="30" height="30"
                                                                        src={r.image} alt="man" />{r.patient_name}</td>
                                                                    <td>{r.dob}
                                                                    </td>
                                                                    <td>{r.gender}
                                                                    </td>
                                                                    <td>{r.address}
                                                                    </td>
                                                                    <td>{r.date}
                                                                    </td>
                                                                    <td>{r.disease}</td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                                <tfoot>
                                                    <tr></tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 align-self-center">
                                                <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Total {visit.length} results</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col">
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">সাম্প্রতিক কুইজ সাবমিশন</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive table mt-2" id="dataTable" role="grid"
                                            aria-describedby="dataTable_info">
                                            <table className="table my-0" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>কুইজ নাম</th>
                                                        <th>সাবমিশন তারিখ</th>
                                                        <th>স্কোর</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        quiz.map((r) => {
                                                            return (
                                                                <tr>
                                                                    <td>{r.quiz_name}
                                                                    </td>
                                                                    <td>{r.date}
                                                                    </td>
                                                                    <td>{r.point}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                                <tfoot>
                                                    <tr></tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 align-self-center">
                                                <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Total {visit.length} results</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CHWProfile;
