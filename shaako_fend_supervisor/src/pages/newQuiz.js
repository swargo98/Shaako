import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { toBeEmpty } from '@testing-library/jest-dom/dist/matchers';


const NewQuiz = () => {
    // create a Radioevent function to handle the radio event
    let [cnt, setcnt] = useState(1)
    let [result, setresult] = useState([])
    useEffect(() => {
        init()
    }, [])

    let init = () => {
        let temp={}
        temp['ques']=''
        temp['option1']=''
        temp['option2']=''
        temp['option3']=''
        temp['option4']=''
        temp['correct']=''
        temp['id']=cnt
        console.log(temp)
        setresult(prevArray => [...prevArray, temp]);
    }

    let Radioevent = (e) => {
        console.log(e.target)
        //check if type is radio
        console.log(e.target.type)
        if(e.target.type==='radio') {
            //find the entry in result which has the same id as the e.target.name
            let temp = result.find(x => x.id == e.target.name)
            temp['correct']=e.target.value
            console.log(temp)
        }
        if(e.target.type==='text') {
            //find the entry in result which has the same id as the e.target.name
            let temp = result.find(x => x.id == e.target.id)
            temp[e.target.name]=e.target.value
            console.log(temp)
        }
    }
    let quesEvent = (e) => {
        console.log(e.target)
        console.log(e.target.value)
        let temp = result.find(x => x.id == e.target.id)
        temp['ques']=e.target.value
        console.log(temp)
    }
    let addNew = (e) => {
        console.log(cnt)
        
        let temp={}
        temp['ques']='My ques'
        temp['option1']=''
        temp['option2']=''
        temp['option3']=''
        temp['option4']=''
        temp['correct']=''
        temp['id']=cnt+1
        console.log(temp)
        setresult(prevArray => [...prevArray, temp]);
        setcnt(cnt + 1)
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
                        <tbody>
                        {
                            result.map((r) => {
                                return (
                                    <div className="p-4" style={{ color: "var(--bs-gray-800)", background: "var(--bs-gray-400)", width: "831px", transform: "translate(244px)" }}>
                                        <h5>প্রশ্ন:</h5>
                                        <div onChange={quesEvent}>
                                        <header></header><input type="text" style={{ height: "37px", width: "720.4px", opacity: "1" }} value={r.ques?.body} id={r.id} name="ques"/>
                                        </div>
                                        <div onChange={Radioevent}>
                                            <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="option1" name={r.id} value="1" /><input type="text" id={r.id} name="option1" style={{ height: "30px", width: "420.4px", opacity: "1" }} value={r.option1?.body} /></div>
                                            <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="option2" name={r.id} value="2" /><input type="text" id={r.id} name="option2" style={{ height: "30px", width: "420.4px", opacity: "1" }} value={r.option2?.body} /></div>
                                            <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="option3" name={r.id} value="3" /><input type="text" id={r.id} name="option3" style={{ height: "30px", width: "420.4px", opacity: "1" }} value={r.option3?.body} /></div>
                                            <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="option4" name={r.id} value="4" /><input type="text" id={r.id} name="option4" style={{ height: "30px", width: "420.4px", opacity: "1" }} value={r.option4?.body} /></div>
                                            
                                        </div>
                                    </div>
                                    
                                );
                            })
                        }
                        </tbody>
                        
                            <div className="p-4" style={{ color: "var(--bs-gray-800)", background: "var(--bs-gray-400)", width: "831px", transform: "translate(244px)" }}>
                                <button className="btn btn-primary" type="button" style={{ margin: "-70px", padding: "12px", transform: "translate(390px)", position: "static" }} onClick={addNew}>নতুন প্রশ্ন যুক্ত করুন</button>
                            </div>
                            <div className="p-4" style={{ color: "var(--bs-gray-800)", background: "var(--bs-gray-400)", width: "831px", transform: "translate(244px)" }}>
                                <button className="btn btn-primary" type="button" style={{ margin: "-70px", padding: "12px", transform: "translate(420px)", position: "static"  }}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                
                </div>
            </section>
        </main>


    );
}

export default NewQuiz;
