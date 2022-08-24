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

    let [a,seta] = useState(true)

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
        seta(false) 
    }

    return a ? null :(
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
                                            <div className="chart-area">
                                                <div>
                                                    <CanvasJSChart options={resultrecruitment}/>
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
                                        <CanvasJSChart options={resultchwrecruitment}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="card shadow mb-4">
                                        {/* <div className="card-header d-flex justify-content-between align-items-center">
                                            <h6 className="text-primary fw-bold m-0">Revenue Sources</h6>

                                        </div> */}
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
