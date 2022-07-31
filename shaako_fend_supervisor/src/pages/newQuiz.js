import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";


const NewQuiz = () => {
    // create a Radioevent function to handle the radio event
    let Radioevent = (e) => {
        console.log(e.target.value)
    }
    return (
        <main className="page landing-page">
            {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}

            <section className="clean-block features" style={{ background: "#a6f9d6", margin: "-67px" }}>
                <div className="container">
                    <div className="block-heading" style={{ padding: "24px 0px 0px" }}>
                        <p></p>
                    </div>
                </div>
                <div className="container py-4 py-xl-5">
                    <div className="row mb-5">
                        <div className="col-md-8 col-xl-7 text-center mx-auto">
                            <h2>নতুন কুইজ</h2>
                        </div>
                    </div>
                    <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
                        <div className="col-lg-10">
                            <div className="p-4" style={{ color: "var(--bs-gray-800)", background: "var(--bs-gray-400)", width: "831px", transform: "translate(244px)" }}>
                                <h1>প্রশ্ন:</h1>
                                <header></header><input type="text" style={{ height: "37px", width: "720.4px", opacity: "1" }} />
                                <div onChange={Radioevent}>
                                    <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="formCheck-1" name="a" value="x" /><label className="form-check-label" htmlFor="formCheck-1">Label</label></div>
                                    <div className="form-check" style={{ margin: "23px" }}><input className="form-check-input" type="radio" id="formCheck-4" name="a" value="y" /><label className="form-check-label" htmlFor="formCheck-4">Label</label></div>
                                    <div className="form-check" style={{ margin: "23px" }}><input className="form-check-input" type="radio" id="formCheck-3" name="a" value="z" /><label className="form-check-label" htmlFor="formCheck-3">Label</label></div>
                                    <div className="form-check" style={{ margin: "23px" }}><input className="form-check-input" type="radio" id="formCheck-2" name="a" value="p" /><label className="form-check-label" htmlFor="formCheck-2">Label</label></div>
                                </div>
                            </div>
                            <div className="p-4" style={{ color: "var(--bs-gray-800)", background: "var(--bs-gray-400)", width: "831px", transform: "translate(244px)" }}>
                                <h1>প্রশ্ন:</h1>
                                <header></header><input type="text" style={{ height: "37px", width: "720.4px", opacity: "1" }} />
                                <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="formCheck-1" /><label className="form-check-label" htmlFor="formCheck-1">Label</label></div>
                                <div className="form-check" style={{ margin: "23px" }}><input className="form-check-input" type="radio" id="formCheck-4" /><label className="form-check-label" htmlFor="formCheck-4">Label</label></div>
                                <div className="form-check" style={{ margin: "23px" }}><input className="form-check-input" type="radio" id="formCheck-3" /><label className="form-check-label" htmlFor="formCheck-3">Label</label></div>
                                <div className="form-check" style={{ margin: "23px" }}><input className="form-check-input" type="radio" id="formCheck-2" /><label className="form-check-label" htmlFor="formCheck-2">Label</label></div>
                            </div>
                        </div>
                    </div>
                </div><button className="btn btn-primary" type="button" style={{ margin: "-70px", padding: "12px", transform: "translate(490px)", position: "static" }}>নতুন প্রশ্ন যুক্ত করুন</button>
            </section>
        </main>


    );
}

export default NewQuiz;
