import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import CanvasJSReact from './../components/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Statistics = () => {
    let diseases = {
        animationEnabled: true,
        title: {
            text: "রোগের পরিসংখ্যান"
        },
        data: [{
            type: "doughnut",
            showInLegend: true,
            indexLabel: "{name}: {y}",
            yValueFormatString: "#,###'%'",
            dataPoints: [
            ]
        }]
    }
    let [resultdisease, setresultdisease] = useState(null)

    let recruitment = {
        title: {
            text: "Basic Column Chart"
        },
        data: [
            {
                type: "column",
                dataPoints: [
                ]
            }
        ]
    }
    let [resultrecruitment, setresultrecruitment] = useState(null)

    let chwrecruitment = {
        title: {
            text: "Basic Column Chart"
        },
        data: [
            {
                type: "column",
                dataPoints: [
                ]
            }
        ]
    }
    let [resultchwrecruitment, setresultchwrecruitment] = useState(null)
    let organization = localStorage.getItem('organization')

    let [a, seta] = useState(true)

    let campaign = {
        animationEnabled: true,
        theme: "light2",
        title: {
            text: "চলমান ক্যাম্পেইনসমূহ"
        },
        axisX: {
            // title: "ক্যাম্পেইন নাম",
            reversed: true,
        },
        axisY: {
            title: "লক্ষমাত্রা পূর্ণ(%)",
            includeZero: true,
        },
        data: [{
            type: "bar",
            dataPoints: [
            ]
        }]
    }
    let [resultcampaign, setresultcampaign] = useState(null)
    let [division, setdivision] = useState([])
    let [district, setdistrict] = useState([])
    let [upazilla, setupazilla] = useState([])

    let [inputdivision, setinputdivision] = useState('')
    let [inputdistrict, setinputdistrict] = useState('')
    let [inputupazilla, setinputupazilla] = useState('')

    useEffect(() => {
        getDivisions();
    }, [])

    useEffect(() => {
        getDistrict();
    }, [inputdivision])

    useEffect(() => {
        getUpazilla();
    }, [inputdistrict])

    useEffect(() => {
        SubmitFilter();
    }, [inputdivision,inputdistrict,inputupazilla])

    let getDivisions = async () => {
        setdivision(["---"]);
        setdistrict(["---"]);
        setupazilla(["---"]);
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
        // setinputdivision(d.division[0]);
        // for (let i = 0; i < d.district.length; i++) {
        //     let now = d.district[i]
        //     setdistrict(prevArray => [...prevArray, now]);
        // }
        // setinputdistrict(d.district[0]);
        // for (let i = 0; i < d.upazilla.length; i++) {
        //     let now = d.upazilla[i]
        //     setupazilla(prevArray => [...prevArray, now]);
        // }
        // setinputupazilla(d.upazilla[0]);
    }
    let handleChangeDivision =async (value) => {
        setdistrict(["---"])
        setupazilla(["---"])
        setinputdistrict('')
        setinputupazilla('')
        setinputdivision(value);
    }

    let handleChangeDistrict =async (value) => {
        setupazilla(["---"])
        setinputupazilla('')
        setinputdistrict(value);
    }

    let handleChangeUpazilla =async (value) => {
        setinputupazilla(value)
    }

    let SubmitFilter =async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/getFilterDiseaseStat', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ organization, inputdivision, inputdistrict, inputupazilla })
        })
        let d = await response.json()
        diseases.data[0].dataPoints = []
        for (const [key, value] of Object.entries(d)) {
            diseases.data[0].dataPoints.push({
                name: key,
                y: value
            })
        }
        setresultdisease(diseases)
        console.log(d)
    }
    let getDistrict = async () => {
        if (inputdivision.length !== 0) {
            setdistrict(["---"]);
            setupazilla(["---"]);
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
            for (let i = 0; i < d.district.length; i++) {
                let now = d.district[i]
                setdistrict(prevArray => [...prevArray, now]);
            }
            // setinputdistrict(d.district[0]);
            // for (let i = 0; i < d.upazilla.length; i++) {
            //     let now = d.upazilla[i]
            //     setupazilla(prevArray => [...prevArray, now]);
            // }
            // setinputupazilla(d.upazilla[0]);
        }
    }

    let getUpazilla = async () => {
        if (inputdivision.length !== 0 && inputdistrict.length !== 0) {
            setupazilla(["---"])
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
            // setinputupazilla(d.upazilla[0]);
        }
    }

    useEffect(() => {
        getDiseases()

    }, [])

    let getDiseases = async () => {
        let sup_id = 0
        let response = await fetch('http://127.0.0.1:8000/organization/getDiseaseStat', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ organization, sup_id })
        })
        let d = await response.json()
        diseases.data[0].dataPoints = []
        for (const [key, value] of Object.entries(d)) {
            diseases.data[0].dataPoints.push({
                name: key,
                y: value
            })
        }
        setresultdisease(diseases)

        let response2 = await fetch('http://127.0.0.1:8000/organization/getSupervisorRecruitmentStat', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ organization })
        })
        let d2 = await response2.json()
        for (const [key, value] of Object.entries(d2)) {
            recruitment.data[0].dataPoints.push({
                label: key,
                y: value
            })
        }
        let currentYear = new Date().getFullYear()
        let title = currentYear.toString()
        recruitment.title.text = title + " সালের সুপারভাইজার নিয়োগসংখ্যা";
        console.log(recruitment)
        setresultrecruitment(recruitment)


        let response3 = await fetch('http://127.0.0.1:8000/organization/getCHWRecruitmentStat', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ organization })
        })
        let d3 = await response3.json()
        for (const [key, value] of Object.entries(d3)) {
            chwrecruitment.data[0].dataPoints.push({
                label: key,
                y: value
            })
        }
        chwrecruitment.title.text = title + " সালের স্বাস্থ্যকর্মী নিয়োগসংখ্যা";
        console.log(chwrecruitment)
        setresultchwrecruitment(chwrecruitment)

        let response4 = await fetch('http://127.0.0.1:8000/organization/getCampaignStat', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(organization)
        })
        let d4 = await response4.json()
        for (let i = 0; i < d4.length; i++) {
            let now = d4[i]
            campaign.data[0].dataPoints.push(
                {
                    y: now.percentage, label: now.title, indexLabel: "Goal: " + now.goal
                }
            )
        }
        setresultcampaign(campaign);
        seta(false)
    }

    return a ? null : (
        <div className="container-fluid">
            {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
            <br />
            <br />
            <div id="wrapper">
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <div className="container-fluid">
                            <div className="d-sm-flex justify-content-between align-items-center mb-4"></div>

                            <div className="row">
                                <div className="col">
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <CanvasJSChart options={resultcampaign} />

                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow mb-4">
                                        <div className="container form-group">
                                            <label htmlFor="name">বিভাগ</label>
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
                                        <div className="container form-group">
                                            <label htmlFor="name">জেলা</label>
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
                                        <div className="container form-group">
                                            <label htmlFor="name">উপজেলা</label>
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
                                        <div className="card-body">
                                            <div className="chart-area">
                                                <div>
                                                    <CanvasJSChart options={resultdisease}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <div className="chart-area">
                                                <div>
                                                    <CanvasJSChart options={resultrecruitment} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="card shadow mb-4">
                                        <div className="card-body">
                                            <div className="chart-area">
                                                <div>
                                                    <CanvasJSChart options={resultchwrecruitment} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up"></i></a>
            </div>
            <br />
            <br />
        </div>
    );
}

export default Statistics;
