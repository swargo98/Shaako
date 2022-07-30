import man1 from './assets/img/avatars/avatar1.jpg'
import man2 from './assets/img/avatars/avatar2.jpg'
import man3 from './assets/img/avatars/avatar3.jpg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const SupervisorList = () => {
    let [result, setresult] = useState([])
    let [search, setsearch] = useState('')
    let [images, setimages] = useState([])
    let organization = localStorage.getItem('organization')
    useEffect(() => {
        getSupervisor()
    }, [])

    let getSupervisor = async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/getSupervisorDetailed', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(organization)
        })
        let d = await response.json()
        setresult([])
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            console.log(now.id)
            let response2 = await fetch('http://127.0.0.1:8000/organization/image/supervisor', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'TOKEN ' + localStorage.getItem('token')
                },
                body: JSON.stringify(now.id)
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
            setresult(prevArray => [...prevArray, now]);
        }
    }

    let handleChangeSearch = (value) => {
        setsearch(value)
    }

    let handleSubmit = async () => {
        console.log(search)
        let response = await fetch('http://127.0.0.1:8000/organization/searchSupervisor', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({search,organization})
        })
        let d = await response.json()
        setresult([])
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            let response2 = await fetch('http://127.0.0.1:8000/organization/image/supervisor', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'TOKEN ' + localStorage.getItem('token')
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
            setresult(prevArray => [...prevArray, now]);
        }
    }

    return (
        <div className="container-fluid">
            {/* {!localStorage.getItem('logged') && <Navigate to="/login" replace={true} />} */}
            <br />
            <br />
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">সুপারভাইজার তালিকা</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="input-group rounded">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
                                    onChange={(e) => { handleChangeSearch(e.target.value) }} value={search?.body} />
                                <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive table mt-2" id="dataTable" role="grid"
                        aria-describedby="dataTable_info">
                        <table className="table my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th>নাম</th>
                                    <th>ইমেইল</th>
                                    <th>মোবাইল নম্বর</th>
                                    <th>বর্তমান ঠিকানা</th>
                                    <th>কর্মরত এলাকা</th>
                                    <th>নিয়োগ তারিখ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result.map((r) => {
                                        return (
                                            <tr>
                                                <td><img className="rounded-circle me-2" width="30" height="30"
                                                    src={r.image} alt="man" />{r.name}</td>
                                                <td>{r.email}
                                                </td>
                                                <td>{r.contactNo}
                                                </td>
                                                <td>{r.presentAddress}
                                                </td>
                                                <td>{r.upazilla_thana},&nbsp;{r.district},&nbsp;{r.division}
                                                </td>
                                                <td>{r.recruitment_date}</td>
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
                            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Total {result.length} results</p>
                        </div>
                        {/* <div className="col-md-6">
                            <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                                <ul className="pagination">
                                    <li className="page-item disabled"><a className="page-link" aria-label="Previous"
                                        href="/"><span aria-hidden="true">«</span></a>
                                    </li>
                                    <li className="page-item active"><a className="page-link" href="/">1</a></li>
                                    <li className="page-item"><a className="page-link" href="/">2</a></li>
                                    <li className="page-item"><a className="page-link" href="/">3</a></li>
                                    <li className="page-item"><a className="page-link" aria-label="Next" href="/"><span
                                        aria-hidden="true">»</span></a></li>
                                </ul>
                            </nav>
                        </div> */}
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}

export default SupervisorList;
