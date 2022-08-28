import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import ContainerCHW from "../popupCHW/Container";

const CampaignDetails = () => {
    let [title, settitle] = useState('')
    let [startdate, setstartdate] = useState('')
    let [enddate, setenddate] = useState('')
    let [goal, setgoal] = useState('')
    let [taken, settaken] = useState('')
    let [percentage, setpercentage] = useState('')
    let [details, setdetails] = useState('')

    let [supervisors, setsupervisors] = useState([])
    let [patients, setpatients] = useState([])


    let organization = localStorage.getItem('organization')
    let { id } = useParams();
    let [search, setsearch] = useState('')

    useEffect(() => {
        getProfile();
    }, [])


    let handleChangeSearch = (value) => {
        setsearch(value)
    }

    let getProfile = async () => {
        console.log(id)
        let response = await fetch('http://127.0.0.1:8000/organization/getCampaignDetails', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ id })
        })

        let d = await response.json()
        console.log(d);
        settitle(d.title)
        setstartdate(d.start_date)
        setenddate(d.end_date)
        setgoal(d.goal)
        setpercentage(d.percentage)
        settaken(d.patients.length)
        setpatients(d.patients)
        setdetails(d.details)

        setsupervisors([])
        setpatients([])
        for (let i = 0; i < d.supervisors.length; i++) {
            let now = d.supervisors[i]
            let response2 = await fetch('http://127.0.0.1:8000/organization/image/supervisor', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'TOKEN ' + localStorage.getItem('token')
                },
                body: JSON.stringify(d.supervisors[i].id)
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
            now.image = imageurl
            setsupervisors(prevArray => [...prevArray, now]);
        }

        for (let i = 0; i < d.patients.length; i++) {
            let now = d.patients[i]
            let response2 = await fetch('http://127.0.0.1:8000/patient/getPatientImage', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'TOKEN ' + localStorage.getItem('token')
                },
                body: JSON.stringify(d.patients[i].id)
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
            now.image = imageurl
            setpatients(prevArray => [...prevArray, now]);
        }
    }

    return (
        <div id="content">
            <div className="container-fluid">
                <br />
                <br />
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <div className="card shadow mb-3">
                            <div className="card-header py-3">
                                <p className="text-primary m-0 fw-bold">ক্যাম্পেইন তথ্য</p>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <br />
                                            <h4>{title}</h4>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>ক্যাম্পেইন শুরু</strong></label>
                                            <br />
                                            {startdate}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>ক্যম্পেইন শেষ</strong></label>
                                            <br />
                                            {enddate}
                                        </div>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>বিবরণ</strong></label>
                                            <br />
                                            {details}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>লক্ষ্যমাত্রা</strong></label>
                                            <br />
                                            {goal}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>সেবা নিয়েছেন</strong></label>
                                            <br />
                                            {taken} জন
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>লক্ষ্যমাত্রা সম্পূর্ণ</strong></label>
                                            <br />
                                            {percentage} %
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">

                        <div className="row">
                            <div className="col">
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">নিয়োগকৃত সুপারভাইজার(গণ)</p>
                                    </div>
                                    <div className="card-body">
                                        {
                                            supervisors.map((r) => {
                                                return (
                                                    <>
                                                        <img className="rounded-circle me-2" width="50" height="50"
                                                            src={r.image} alt="man" />
                                                        <a style={{ textDecoration: "none" }} href={`/viewSupervisorProfile/${r.id}`}>{r.name}</a> &nbsp;
                                                    </>
                                                );
                                            })
                                        }
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-6 align-self-center">
                                                <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Total {supervisors.length} results</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="row">
                            <div className="col">
                                <div className="card shadow">
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">সেবাপ্রাপ্ত রোগীদের তথ্য</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col">
                                                <div className="input-group rounded">
                                                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
                                                        onChange={(e) => { handleChangeSearch(e.target.value) }} value={search?.body} />
                                                    <button type="button" className="btn btn-outline-primary" >Search</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="table-responsive table mt-2" id="dataTable" role="grid"
                                            aria-describedby="dataTable_info">
                                            <table className="table my-0" id="dataTable">
                                                <thead>
                                                    <tr>
                                                        <th>নাম</th>
                                                        <th>জন্ম তারিখ</th>
                                                        <th>লিঙ্গ</th>
                                                        <th>ঠিকানা</th>
                                                        <th>মোবাইল নম্বর</th>                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        patients.map((r) => {
                                                            if (!r.name.includes(search)) {
                                                                return <></>;
                                                            }
                                                            return (
                                                                <tr>
                                                                    <td><img className="rounded-circle me-2" width="30" height="30"
                                                                        src={r.image} alt="man" />
                                                                        {r.name}
                                                                    </td>
                                                                    <td>{r.dob}
                                                                    </td>

                                                                    <td>{r.gender}
                                                                    </td>
                                                                    <td>{r.address}
                                                                    </td>
                                                                    <td>{r.phone}</td>
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
                                                <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Total {patients.length} results</p>
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

export default CampaignDetails;
