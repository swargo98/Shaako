import man2 from './assets/img/avatars/avatar2.jpg'

import ContainerCHW from "../popupCHW/Container";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";


import Swal from 'sweetalert2'

// // CommonJS
// const Swal = require('sweetalert2')



const UpdateCHW = () => {
    let [result, setresult] = useState([])
    let [search, setsearch] = useState('')
    let organization = localStorage.getItem('organization')
    useEffect(() => {
        getCHW()
    }, [])

    let getCHW = async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/getCHW', {
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
            let response2 = await fetch('http://127.0.0.1:8000/CHW/getImage', {
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
            setresult(prevArray => [...prevArray, now]);
        }
    }

    let handleChangeSearch = (value) => {
        setsearch(value)
    }

    let handleSubmit = async () => {
        console.log(search)
        let response = await fetch('http://127.0.0.1:8000/organization/searchCHW', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ search, organization })
        })
        let d = await response.json()
        setresult([])
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            let response2 = await fetch('http://127.0.0.1:8000/CHW/getImage', {
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
            setresult(prevArray => [...prevArray, now]);
        }
    }
    let submit = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onCancel(id)
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    };
    let onCancel = async (id) => {
        console.log(id)
        let response = await fetch('http://127.0.0.1:8000/organization/deleteCHW', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })
        let d = await response.json()
        getCHW()
    }
    return (
        <div className="container-fluid">
            {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
            <br />
            <br />
            <div className="col-md-5 col-lg-8 feature-box"><i className="icon-pencil icon"></i>
                <a href='/new_chw'><h4>স্বাস্থ্যকর্মী নিয়োগ</h4></a>
            </div>
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">স্বাস্থ্যকর্মী আপডেট, সুপারভাইজার পরিবর্তন এবং অব্যহতি</p>
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
                                    <th>ঠিকানা</th>
                                    <th>কর্মরত এলাকা</th>
                                    <th>সুপারভাইজার</th>
                                    <th>নিয়োগ তারিখ</th>
                                    <th>পরিবর্তন</th>
                                    <th>অব্যহতি</th>
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
                                                <td>{r.ward_union},&nbsp;{r.upazilla_thana},&nbsp;{r.district},&nbsp;{r.division}
                                                </td>
                                                <td>{r.supervisor_name}</td>
                                                <td>{r.recruitment_date}</td>
                                                <td>
                                                    <ContainerCHW triggerText={"সুপারভাইজার পরিবর্তন"} chwid={r.id} />
                                                </td>
                                                <td>
                                                    <button className="btn btn-primary" type="button"
                                                        style={{ background: "rgb(247,22,22)" }} onClick={() => submit(r.id)}>অব্যহতি প্রদান
                                                    </button>
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
                            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Total {result.length} results</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}

export default UpdateCHW;
