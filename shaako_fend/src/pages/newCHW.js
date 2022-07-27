import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const NewCHW = () => {
    let [ward, setward] = useState([])
    let [inputward, setinputward] = useState('')
    let [inputdivision, setinputdivision] = useState([])
    let [inputdistrict, setinputdistrict] = useState([])
    let [inputupazilla, setinputupazilla] = useState([])

    let [sup, setsup] = useState([])
    let [inputsup, setinputsup] = useState('')
    let [supid, setsupid] = useState('')

    let [name, setname] = useState('')
    let [email, setemail] = useState('')
    let [password, setpassword] = useState('')
    let [contact, setcontact] = useState('')
    let [address, setaddress] = useState('')
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
        getSups();
    }, [])

    useEffect(() => {
        getWards();
    }, [supid])

    let getSups = async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/getSupervisorDetailed', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(organization)
        })

        let d = await response.json()
        console.log(d)
        setsup([])
        setinputdivision([])
        setinputdistrict([])
        setinputupazilla([])

        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            setsup(prevArray => [...prevArray, now]);
        }
        setinputsup(d[0].name);
        setsupid(d[0].id);
        setinputdivision(prevArray => [...prevArray, d[0].division]);
        setinputdistrict(prevArray => [...prevArray, d[0].district]);
        setinputupazilla(prevArray => [...prevArray, d[0].upazilla_thana]);
    }

    let getWards = async () => {
        if (inputsup.length !== 0) {
            console.log(supid)
            let response = await fetch('http://127.0.0.1:8000/organization/getUnionsOfSupervisor', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(supid)
            })
            setward([])
            let d = await response.json()
            for (let i = 0; i < d.length; i++) {
                let now = d[i]
                setward(prevArray => [...prevArray, now]);
            }
            setinputward(d[0]);
        }
    }


    let handleChangeSup = (value) => {
        setinputdivision([])
        setinputdistrict([])
        setinputupazilla([])
        for (let i = 0; i < sup.length; i++) {
            if (sup[i].id == value) {
                setinputsup(sup[i].name);
                setsupid(sup[i].id);
                setinputdivision(prevArray => [...prevArray, sup[i].division]);
                setinputdistrict(prevArray => [...prevArray, sup[i].district]);
                setinputupazilla(prevArray => [...prevArray, sup[i].upazilla_thana]);
            }
        }
    }


    let handleChangeWard = (value) => {
        setinputward(value)
    }

    let handleSubmit = async () => {
        console.log(name, email, password, contact, address, organization, inputward, supid)
        if (name.length !== 0 && email.length !== 0 && password.length !== 0 && contact.length !== 0
            && address.length !== 0 && inputward.length !== 0 && inputsup.length !== 0) {
            let division = inputdivision[0]
            let district = inputdistrict[0]
            let upazilla_thana = inputupazilla[0]
            let response = await fetch('http://127.0.0.1:8000/organization/createCHW', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ name, email, password, contact, address, organization, inputward, supid, division, district, upazilla_thana })
            })
            let data = await response.json()
        }
    }
    return (
        <main className="page landing-page" style={{ padding: "76px 0px 0px" }}>
            {!localStorage.getItem('logged') && <Navigate to="/login" replace={true} />}
            <section className="clean-block features" style={{ background: "#a6f9d6" }}>
                <div className="container">
                    <div className="block-heading" style={{ padding: "24px 0px 0px" }}>
                        <h2 className="text-info"><br /><span
                            style={{ color: "rgba(var(--bs-info-rgb), var(--bs-text-opacity))", backgroundColor: "rgb(246, 246, 246)" }}>স্বাস্থ্যকর্মী নিয়োগ</span><br />
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

                                <label htmlFor="name">সুপারভাইজার সিলেক্ট</label>
                                <br />
                                <select className="form-control" onChange={(e) => { handleChangeSup(e.target.value) }} value={supid?.body}>
                                    {
                                        sup.map((r) => {
                                            return (
                                                <option value={r.id}>(ID: {r.id})&nbsp;{r.name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <br />
                                <label htmlFor="name">কর্মরত বিভাগ</label>
                                <br />
                                <select className="form-control" value={inputdivision?.body}>
                                    {
                                        inputdivision.map((r) => {
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
                                <select className="form-control" value={inputdistrict?.body}>
                                    {
                                        inputdistrict.map((r) => {
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
                                <select className="form-control" value={inputupazilla?.body}>
                                    {
                                        inputupazilla.map((r) => {
                                            return (
                                                <option value={r}>{r}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <br />
                            <div className="form-group">
                                <label htmlFor="name">কর্মরত ওয়ার্ড</label>
                                <select className="form-control" onChange={(e) => { handleChangeWard(e.target.value) }} value={inputward?.body}>
                                    {
                                        ward.map((r) => {
                                            return (
                                                <option value={r}>{r}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <br />
                            <div className="mb-3"><label className="form-label" htmlFor="email">ছবি</label><input
                                className="form-control" type="file" /></div>
                            <div className="mb-3">
                                <button className="btn btn-primary" type="button" onClick={handleSubmit}> <a style={{color: "white", textDecoration: "none"}} href="/chw_list">সংরক্ষণ করুন</a></button>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default NewCHW;
