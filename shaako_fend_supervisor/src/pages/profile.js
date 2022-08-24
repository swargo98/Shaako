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
    let [location, setlocation] = useState('')
    let [organizationname, setorganizationname] = useState('')
    let [recruitment, setrecruitment] = useState('')

    let [image, setimage] = useState(null)

    let [inputimage, setinputimage] = useState(null)
    let organization = localStorage.getItem('organization')
    let id = localStorage.getItem('sup_id')

    let handleChangename = (value) => {
        setname(value)
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

    let handleChangepassword2 = (value) => {
        setpassword2(value)
    }
    let handleChangepasswordOld2 = (value) => {
        setpasswordOld2(value)
    }

    useEffect(() => {
        getProfile();
    }, [])

    let handleChangeImage = (value) => {
        // set the inputimage to value.target.files[0]
        console.log(value);
        console.log(value.target.files[0]);
        setinputimage(value.target.files[0])
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
        setpasswordOld(d.password)
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

    let handleSubmitImage = async () => {
        // console.log(inputimage)
        // let admin_id = localStorage.getItem('admin_id')
        // let now = JSON.stringify({admin_id,inputimage})
        // console.log(now)
        // let response = await fetch('http://127.0.0.1:8000/organization/pictureUpdate', {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'TOKEN ' + localStorage.getItem('token')
        //     },
        //     body: now
        // })
        // let data = await response.json()
        // console.log(data);
        // // if (data === 'True') {
        // //     alert('Profile Picture Updated Successfully')
        // //     Navigate('/profile', { replace: true })
        // // }
    }

    let handleSubmit = async () => {
        console.log(name, email, password,password2, contact, address)
        if (name.length !== 0 && email.length !== 0 && contact.length !== 0 && address.length !== 0) {
            let response = await fetch('http://127.0.0.1:8000/supervisor/updateSupervisorProfile', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'TOKEN ' + localStorage.getItem('token')
                },

                body: JSON.stringify({ id, name, email, password, password2, passwordOld, passwordOld2, contact, address })
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
                            <div className="card-body text-center shadow">
                                <img className="rounded-circle mb-3 mt-4" src={image} width="160" height="160" />
                                <p>{name}</p>
                                <div className="mb-3"><button className="btn btn-primary btn-sm" type="button">ছবি পরিবর্তন</button></div>
                                <div className="mb-3"><input className="form-control" type="file" onChange={(e) => { handleChangeImage(e) }} /></div>
                                <div className="mb-3"><button className="btn btn-primary btn-sm" type="button" onClick={handleSubmitImage}>সংরক্ষণ করুন</button></div>
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

                                            </div>
                                            <div className="row">

                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ইমেইল এড্রেস</strong></label><input
                                                        className="form-control" type="text" id="name" name="name" onChange={(e) => { handleChangeemail(e.target.value) }} value={email} /></div>
                                                </div>
                                            </div>
                                            <div className="row">

                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>মোবাইল নম্বর</strong></label><input
                                                        className="form-control" type="text" id="name" name="name" onChange={(e) => { handleChangecontact(e.target.value) }} value={contact} /></div>
                                                </div>
                                            </div>

                                            <div className="row">

                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ঠিকানা</strong></label><input
                                                        className="form-control" type="text" id="name" name="name" onChange={(e) => { handleChangeaddress(e.target.value) }} value={address} /></div>
                                                </div>
                                            </div>
                                            <hr />
                                            <strong><p style={{ color: "blue" }}>পাসওয়ার্ড অপরিবর্তিত রাখতে ফিল্ড দুটি খালি রাখুন</p></strong>

                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>নতুন পাসওয়ার্ড</strong></label><input
                                                        className="form-control" type="password" id="name" name="name" onChange={(e) => { handleChangepassword(e.target.value) }} value={password?.body} /></div>
                                                </div>
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="last_name"><strong>পুনরায় লিখুন</strong></label><input
                                                        className="form-control" type="password" id="name" name="name" onChange={(e) => { handleChangepassword2(e.target.value) }} value={password2?.body} /></div>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col">
                                                    <div className="mb-3"><label className="form-label" htmlFor="first_name"><strong>পুরোনো পাসওয়ার্ড</strong></label><input
                                                        className="form-control" type="password" id="name" name="name" onChange={(e) => { handleChangepasswordOld2(e.target.value) }} value={passwordOld2?.body} /></div>
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
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3"><label className="form-label" htmlFor="username"><strong>প্রতিষ্ঠান নাম</strong></label>
                                                    <br />
                                                    {organizationname}
                                                    {/* <input className="form-control" type="text" id="username-1" value={name} name="username" readOnly={true} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3"><label className="form-label" htmlFor="username"><strong>ইউজারনেম</strong></label>
                                                    <br />
                                                    {name}
                                                    {/* <input className="form-control" type="text" id="username-1" value={name} name="username" readOnly={true} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ইমেইল এড্রেস</strong></label>
                                                    <br />
                                                    {email}
                                                    {/* <input className="form-control" type="email" id="email-1" value={email} name="email" readOnly={true} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>মোবাইল নম্বর</strong></label>
                                                    <br />
                                                    {contact}
                                                    {/* <input className="form-control" type="email" id="email-1" value={email} name="email" readOnly={true} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>ঠিকানা</strong></label>
                                                    <br />
                                                    {address}
                                                    {/* <input className="form-control" type="email" id="email-1" value={email} name="email" readOnly={true} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3"><label className="form-label" htmlFor="email"><strong>কর্মরত এলাকা</strong></label>
                                                    <br />
                                                    {location}
                                                    {/* <input className="form-control" type="email" id="email-1" value={email} name="email" readOnly={true} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col">
                                                <div className="mb-3"><label className="form-label" htmlFor="username"><strong>নিয়োগ তারিখ</strong></label>
                                                    <br />
                                                    {recruitment}
                                                    {/* <input className="form-control" type="text" id="username-1" value={name} name="username" readOnly={true} /> */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3"><button className="btn btn-primary btn-sm" type="button" onClick={handleEdit}>তথ্য অথবা পাসওয়ার্ড পরিবর্তন</button></div>
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
