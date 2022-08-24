import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const NewSupervisor = () => {
    let [division, setdivision] = useState([])
    let [district, setdistrict] = useState([])
    let [upazilla, setupazilla] = useState([])

    let [inputdivision, setinputdivision] = useState('')
    let [inputdistrict, setinputdistrict] = useState('')
    let [inputupazilla, setinputupazilla] = useState('')
    let [name, setname] = useState('')
    let [email, setemail] = useState('')
    let [password, setpassword] = useState('')
    let [contact, setcontact] = useState('')
    let [address, setaddress] = useState('')
    let [inputimage, setinputimage] = useState(null)
    let [failedCreate, setfailedCreate] = useState('')
    let [failedCreateBool, setfailedCreateBool] = useState(false)
    let [done, setdone] = useState(false)

    let organization = localStorage.getItem('organization')
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
    useEffect(() => {
        getDivisions();
    }, [])

    useEffect(() => {
        getDistrict();
    }, [inputdivision])

    useEffect(() => {
        getUpazilla();
    }, [inputdistrict])

    let getDivisions = async () => {
        setdivision([]);
        setdistrict([]);
        setupazilla([]);
        setinputdivision('');
        setinputdistrict('');
        setinputupazilla('');

        let response = await fetch('http://127.0.0.1:8000/organization/fetchLocationSupervisor', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ inputdivision, inputdistrict, inputupazilla })
        })
        let d = await response.json()
        for (let i = 0; i < d.division.length; i++) {
            let now = d.division[i]
            setdivision(prevArray => [...prevArray, now]);
        }
        setinputdivision(d.division[0]);
        for (let i = 0; i < d.district.length; i++) {
            let now = d.district[i]
            setdistrict(prevArray => [...prevArray, now]);
        }
        setinputdistrict(d.district[0]);
        for (let i = 0; i < d.upazilla.length; i++) {
            let now = d.upazilla[i]
            setupazilla(prevArray => [...prevArray, now]);
        }
        setinputupazilla(d.upazilla[0]);
    }

    let getDistrict = async () => {
        if (inputdivision.length !== 0) {


            let response = await fetch('http://127.0.0.1:8000/organization/fetchLocationSupervisor', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'TOKEN ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ inputdivision, inputdistrict, inputupazilla })
            })
            let d = await response.json()
            for (let i = 0; i < d.district.length; i++) {
                let now = d.district[i]
                setdistrict(prevArray => [...prevArray, now]);
            }
            setinputdistrict(d.district[0]);
            for (let i = 0; i < d.upazilla.length; i++) {
                let now = d.upazilla[i]
                setupazilla(prevArray => [...prevArray, now]);
            }
            setinputupazilla(d.upazilla[0]);
        }
    }

    let getUpazilla = async () => {
        if (inputdivision.length !== 0 && inputdistrict.length !== 0) {
            setupazilla([])
            setinputupazilla('')

            let response = await fetch('http://127.0.0.1:8000/organization/fetchLocationSupervisor', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'TOKEN ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ inputdivision, inputdistrict, inputupazilla })
            })
            let d = await response.json()
            for (let i = 0; i < d.upazilla.length; i++) {
                let now = d.upazilla[i]
                setupazilla(prevArray => [...prevArray, now]);
            }
            setinputupazilla(d.upazilla[0]);
        }
    }
    let handleChangeDivision = (value) => {
        setdistrict([])
        setupazilla([])
        setinputdistrict('')
        setinputupazilla('')
        setinputdivision(value);
    }

    let handleChangeDistrict = (value) => {
        setupazilla([])
        setinputupazilla('')
        setinputdistrict(value);
    }

    let handleChangeUpazilla = (value) => {
        setinputupazilla(value)
    }

    let handleChangeImage = (value) => {
        // set the inputimage to value.target.files[0]
        console.log(value);
        console.log(value.target.files[0]);
        setinputimage(value.target.files[0])
    }

    let handleSubmit = async () => {
        // console.log(name, email, password, contact, address, organization, inputdivision, inputdistrict, inputupazilla, inputimage)
        // const uploadData = new FormData();
        // uploadData.append('name', name);
        // uploadData.append('email', email);
        // uploadData.append('password', password);
        // uploadData.append('contact', contact);
        // uploadData.append('address', address);
        // uploadData.append('organization', organization);
        // uploadData.append('inputdivision', inputdivision);
        // uploadData.append('inputdistrict', inputdistrict);
        // uploadData.append('inputupazilla', inputupazilla);
        // uploadData.append('inputimage', inputimage);
        // console.log(uploadData)
        let response = await fetch('http://127.0.0.1:8000/organization/createSupervisor', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ name, email, password, contact, address, organization, inputdivision, inputdistrict, inputupazilla, inputimage })
        })
        let data = await response.json()
        console.log(data)
        if (data === 'True') {
            setdone(true)
        }
        else {
            setfailedCreate(data)
            setfailedCreateBool(true)
        }
    }
    return (
        <>
            <main className="page landing-page" style={{ padding: "20px 0px 0px" }}>
                {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
                <section className="clean-block features" style={{ background: "#a6f9d6" }}>
                    <div className="container">
                        <div className="block-heading" style={{ padding: "24px 0px 0px" }}>
                            <h2 className="text-info"><br /><span
                                style={{ color: "rgba(var(--bs-info-rgb), var(--bs-text-opacity))", backgroundColor: "rgb(246, 246, 246)" }}>সুপারভাইজার নিয়োগ</span><br />
                            </h2>
                        </div>
                    </div>
                    <section className="clean-block clean-form dark" style={{ background: "#a6f9d6" }}>
                        <div className="container" style={{ margin: "0px 10px", padding: "0px 200px" }}>
                            <form style={{ width: "1000px", transform: "translate(100px)" }}>
                                <div className="mb-3"><label className="form-label" htmlFor="name">নাম</label><input
                                    className="form-control" type="text" id="name" name="name"
                                    onChange={(e) => { handleChangename(e.target.value) }} value={name?.body} /></div>
                                <div className="mb-3"><label className="form-label" htmlFor="email">ইমেইল</label><input
                                    className="form-control" type="email" id="name" name="email"
                                    onChange={(e) => { handleChangeemail(e.target.value) }} value={email?.body} /></div>
                                <div className="mb-3"><label className="form-label" htmlFor="password">পাসওয়ার্ড</label><input
                                    className="form-control" type="password" id="name" name="name"
                                    onChange={(e) => { handleChangepassword(e.target.value) }} value={password?.body} /></div>
                                <div className="mb-3"><label className="form-label" htmlFor="number">মোবাইল
                                    নম্বর</label><input className="form-control" type="text" id="subject" name="subject"
                                        onChange={(e) => { handleChangecontact(e.target.value) }} value={contact?.body} />
                                </div>
                                <div className="mb-3"><label className="form-label" htmlFor="name">বর্তমান ঠিকানা</label><input
                                    className="form-control" type="text" id="email-1" name="address"
                                    onChange={(e) => { handleChangeaddress(e.target.value) }} value={address?.body} /></div>
                                <div className="form-group">
                                    <label htmlFor="name">কর্মরত বিভাগ</label>
                                    <br />
                                    <select className="form-control" onChange={(e) => { handleChangeDivision(e.target.value) }} value={inputdivision?.body}>
                                        {
                                            division.map((r) => {
                                                return (
                                                    <option value={r}>{r}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="name">কর্মরত জেলা</label>
                                    <select className="form-control" onChange={(e) => { handleChangeDistrict(e.target.value) }} value={inputdistrict?.body}>
                                        {
                                            district.map((r) => {
                                                return (
                                                    <option value={r}>{r}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <br />
                                <div className="form-group">
                                    <label htmlFor="name">কর্মরত উপজেলা</label>
                                    <select className="form-control" onChange={(e) => { handleChangeUpazilla(e.target.value) }} value={inputupazilla?.body}>
                                        {
                                            upazilla.map((r) => {
                                                return (
                                                    <option value={r}>{r}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <br />
                                <div className="mb-3"><label className="form-label" htmlFor="email">ছবি</label><input
                                    className="form-control" type="file" onChange={(e) => { handleChangeImage(e) }} /></div>
                                <div className="mb-3">
                                    <button className="btn btn-primary" type="button" onClick={handleSubmit}>সংরক্ষণ করুন</button>
                                    {failedCreateBool && <p style={{ color: "red" }}>{failedCreate}!</p>}
                                </div>
                            </form>
                        </div>
                    </section>
                </section>
            </main>
            {done && <Navigate to="/update_supervisor" replace={true} />}
        </>
    );
}

export default NewSupervisor;
