import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import ContainerCHW from "../popupCHW/Container";

const SupervisorProfile = () => {
    let [name, setname] = useState('')
    let [email, setemail] = useState('')
    let [contact, setcontact] = useState('')
    let [address, setaddress] = useState('')
    let [location, setlocation] = useState('')
    let [organizationname, setorganizationname] = useState('')
    let [recruitment, setrecruitment] = useState('')

    let [image, setimage] = useState(null)

    let organization = localStorage.getItem('organization')
    let { id } = useParams();
    let [result, setresult] = useState([])
    let [search, setsearch] = useState('')

    useEffect(() => {
        getCHW();
        getProfile();
    }, [])

    let getCHW = async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/getSupervisorCHW', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ organization, id })
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
        let response = await fetch('http://127.0.0.1:8000/organization/searchSupervisorCHW', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ search, organization, id })
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




    let getProfile = async () => {
        console.log(id)
        let response = await fetch('http://127.0.0.1:8000/supervisor/getProfile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })

        let d = await response.json()
        console.log(d);

        setname(d.name)
        setemail(d.email)
        setcontact(d.contactNo)
        setaddress(d.address)
        setlocation(d.upazilla + ", " + d.district + ", " + d.district)
        setorganizationname(d.organization);
        setrecruitment(d.recruitment_date);
        let response2 = await fetch('http://127.0.0.1:8000/organization/image/supervisor', {
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
                                <h5>{name}</h5>
                            </div>
                        </div>
                        <div className="card shadow mb-3">
                            <div className="card-header py-3">
                                <p className="text-primary m-0 fw-bold">সাধারণ তথ্য</p>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>প্রতিষ্ঠান নাম</strong></label>
                                            <br />
                                            {organizationname}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>ইউজারনেম</strong></label>
                                            <br />
                                            {name}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ইমেইল এড্রেস</strong></label>
                                            <br />
                                            {email}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>মোবাইল নম্বর</strong></label>
                                            <br />
                                            {contact}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ঠিকানা</strong></label>
                                            <br />
                                            {address}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="email"><strong>কর্মরত এলাকা</strong></label>
                                            <br />
                                            {location}
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3"><label className="form-label" htmlFor="username"><strong>নিয়োগ তারিখ</strong></label>
                                            <br />
                                            {recruitment}
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
                                        <p className="text-primary m-0 fw-bold">সুপারভাইজারের অধীনে কর্মরত স্বাস্থ্যকর্মী তালিকা</p>
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        result.map((r) => {
                                                            if (!r.name.includes(search) && !r.email.includes(search) && !r.contactNo.includes(search) && !r.presentAddress.includes(search) && !r.upazilla_thana.includes(search)
                                                                && !r.district.includes(search) && !r.division.includes(search) && !r.recruitment_date.includes(search) && !r.supervisor_name.includes(search)
                                                                && !r.ward_union.includes(search)) {
                                                                return <></>;
                                                            }
                                                            return (
                                                                <tr>
                                                                    <td><img className="rounded-circle me-2" width="30" height="30"
                                                                        src={r.image} alt="man" />
                                                                        <a style={{ textDecoration: "none" }} href={`/viewCHWProfile/${r.id}`}>{r.name}</a>
                                                                    </td>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupervisorProfile;
