import man1 from './assets/img/avatars/avatar1.jpg'
import man2 from './assets/img/avatars/avatar2.jpg'
import man3 from './assets/img/avatars/avatar3.jpg'

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const Profile = () => {
    const [isReadOnly, setReadOnly] = useState(true);


    let [name, setname] = useState('')
    let [email, setemail] = useState('')
    let [password, setpassword] = useState('')
    let [passwordOld, setpasswordOld] = useState('')
    let [password2, setpassword2] = useState('')
    let [passwordOld2, setpasswordOld2] = useState('')
    let [contact, setcontact] = useState('')
    let [address, setaddress] = useState('')
    let [image, setimage] = useState(null)
    let organization = localStorage.getItem('organization')
    let id = localStorage.getItem('admin_id')

    let handleChangename = (value) => {
        setname(value)
        console.log(value)
    }
    let handleChangeemail = (value) => {
        setemail(value)
    }
    let handleChangepassword = (value) => {
        setpassword(value)
    }
    let handleChangecontact = (value) => {
        setcontact(value)
    }
    let handleChangeaddress = (value) => {
        setaddress(value)
    }

    let handleChangepasswordOld = (value) => {
        setpasswordOld(value)
    }

    let handleChangepassword2 = (value) => {
        setpassword2(value)
    }
    let handleChangepasswordOld2 = (value) => {
        setpasswordOld2(value)
    }
    useEffect(() => {
        getProfile();
    }, [])

    let getProfile = async () => {
        console.log(id)
        let response = await fetch('http://127.0.0.1:8000/organization/profile', {
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
        setpasswordOld(d.password)
        setcontact(d.contact)
        setaddress(d.address)

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


    let handleSubmit = async () => {
        console.log(name, email, password, contact, address)
        if (name.length !== 0 && email.length !== 0 && password.length !== 0) {
            console.log('here79')
            let response = await fetch('http://127.0.0.1:8000/organization/profileUpdate', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'TOKEN ' + localStorage.getItem('token')
                },

                body: JSON.stringify({ id, name, email, password, password2, passwordOld, passwordOld2 })
            })
            let data = await response.json()

            console.log(data)
            if (data.status === 'success') {
                alert('Profile Updated Successfully')
                //navigate to profile with replace
                Navigate('/profile', { replace: true })
            }
        }
    }

    let handleEdit = () => {
        setReadOnly(!isReadOnly);
    }
    return (
        <div id="content">
            <div className="container-fluid">
                <br />
                <br />
                <div className="row mb-3">
                    <div className="col-lg-4">
                        <div className="card mb-3">
                            <div className="card-body text-center shadow"><img className="rounded-circle mb-3 mt-4" src={image} width="160" height="160" />
                                <div className="mb-3"><button className="btn btn-primary btn-sm" type="button">Change Photo</button></div>
                            </div>
                        </div>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="text-primary fw-bold m-0">Campaigns Status</h6>
                            </div>
                            <div className="card-body">
                                <h4 className="small fw-bold">Server migration<span className="float-end">20%</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-danger" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{ width: "20%" }}><span className="visually-hidden">20%</span></div>
                                </div>
                                <h4 className="small fw-bold">Sales tracking<span className="float-end">40%</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-warning" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ width: '40%' }}><span className="visually-hidden">40%</span></div>
                                </div>
                                <h4 className="small fw-bold">Customer Database<span className="float-end">60%</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-primary" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{ width: '60%' }}><span className="visually-hidden">60%</span></div>
                                </div>
                                <h4 className="small fw-bold">Payout Details<span className="float-end">80%</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-info" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style={{ width: '80%' }}><span className="visually-hidden">80%</span></div>
                                </div>
                                <h4 className="small fw-bold">Account setup<span className="float-end">Complete!</span></h4>
                                <div className="progress progress-sm mb-3">
                                    <div className="progress-bar bg-success" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }}><span className="visually-hidden">100%</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="row mb-3 d-none">
                            <div className="col">
                                <div className="card textwhite bg-primary text-white shadow">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col">
                                                <p className="m-0">Peformance</p>
                                                <p className="m-0"><strong>65.2%</strong></p>
                                            </div>
                                            <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                                        </div>
                                        <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="card textwhite bg-success text-white shadow">
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col">
                                                <p className="m-0">Peformance</p>
                                                <p className="m-0"><strong>65.2%</strong></p>
                                            </div>
                                            <div className="col-auto"><i className="fas fa-rocket fa-2x"></i></div>
                                        </div>
                                        <p className="text-white-50 small m-0"><i className="fas fa-arrow-up"></i>&nbsp;5% since last month</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="card shadow mb-3" style={{ display: isReadOnly ? 'none' : '' }}>
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">সাধারণ তথ্য</p>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>ইউজারনেম</strong></label><input
                                                        className="form-control" type="text" id="name" name="name" onChange={(e) => { handleChangename(e.target.value) }} value={name} /></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ইমেইল এড্রেস</strong></label><input
                                                        className="form-control" type="text" id="name" name="name" onChange={(e) => { handleChangeemail(e.target.value) }} value={email} /></div>
                                                </div>
                                            </div>
                                            {/* <div className="row">
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" for="first_name"><strong>First Name</strong></label><input className="form-control" type="text" id="first_name" placeholder="John" name="first_name"/></div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="mb-3"><label className="form-label" for="last_name"><strong>Last Name</strong></label><input className="form-control" type="text" id="last_name" placeholder="Doe" name="last_name"/></div>
                                                    </div>
                                                </div> */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>নতুন পাসওয়ার্ড</strong></label><input
                                                        className="form-control" type="text" id="name" name="name" onChange={(e) => { handleChangepassword(e.target.value) }} value={password?.body} /></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="last_name"><strong>পুনরায় লিখুন</strong></label><input
                                                        className="form-control" type="text" id="name" name="name" onChange={(e) => { handleChangepassword2(e.target.value) }} value={password2?.body} /></div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>পুরোনো পাসওয়ার্ড</strong></label><input
                                                        className="form-control" type="text" id="name" name="name" onChange={(e) => { handleChangepasswordOld2(e.target.value) }} value={passwordOld2?.body} /></div>
                                                </div>
                                            </div>
                                            <div className="mb-3"><button className="btn btn-primary btn-sm" type="button" onClick={handleSubmit}> <a style={{ color: "white", textDecoration: "none" }} href="/profile">সংরক্ষণ করুন</a></button></div>
                                        </form>
                                    </div>
                                </div>
                                <div className="card shadow mb-3" style={{ display: isReadOnly ? '' : 'none' }}>
                                    <div className="card-header py-3">
                                        <p className="text-primary m-0 fw-bold">সাধারণ তথ্য</p>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="username"><strong>ইউজারনেম</strong></label><input className="form-control" type="text" id="username-1" value={name} name="username" readOnly={true} /></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ইমেইল এড্রেস</strong></label><input className="form-control" type="email" id="email-1" value={email} name="email" readOnly={true} /></div>
                                                </div>
                                            </div>
                                            <div className="mb-3"><button className="btn btn-primary btn-sm" type="button" onClick={handleEdit}>তথ্য অথবা পাসওয়ার্ড পরিবর্তন</button></div>
                                        </form>
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

export default Profile;
