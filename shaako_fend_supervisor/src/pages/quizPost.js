import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';

const BlogPost = () => {
    let [result, setresult] = useState([]);
    let { id } = useParams();
    let [show, setshow] = useState(true)

    // for edit 
    let [cnt, setcnt] = useState(1)
    let [quizName, setquizName] = useState([])
    const [someVar, setSomeVar] = useState(null);
    const [successful, setsuccessful] = useState(false);

    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        result.items = []
        console.log(id)
        let response = await fetch('http://127.0.0.1:8000/supervisor/getMyQuiz', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ id, sup_id: localStorage.getItem('sup_id') })
        })
        let d = await response.json()
        setresult(d);
        if (d === 'No quiz found') {
            alert('No quiz found')
            Navigate('/home')
        }
        console.log(d)
        console.log(d.items)
    }
    let toggle = () => {
        
        setquizName(result.title)

        let tr = result
        setresult([])
        console.log(tr)
        for (let i = 0; i < tr.items.length; i++) {
            let temp = {}
            temp['ques'] = tr.items[i].ques
            temp['option1'] = tr.items[i].option1
            temp['option2'] = tr.items[i].option2
            temp['option3'] = tr.items[i].option3
            temp['option4'] = tr.items[i].option4
            temp['correct'] = tr.items[i].correct
            temp['id'] = cnt
            console.log(temp)
            setresult(prevArray => [...prevArray, temp]);
            setcnt(cnt + 1)
        }
        setshow(false)
    }

    const renderData = () => {
        setSomeVar(!someVar);
    }

    let Radioevent = (e) => {
        console.log(e.target)
        //check if type is radio
        console.log(e.target.type)
        if (e.target.type === 'radio') {
            //find the entry in result which has the same id as the e.target.name
            let temp = result.find(x => x.id == e.target.name)
            temp['correct'] = e.target.value
        }
        if (e.target.type === 'text') {
            //find the entry in result which has the same id as the e.target.name
            let temp = result.find(x => x.id == e.target.id)
            temp[e.target.name] = e.target.value
        }
        renderData()
    }
    let quesEvent = (e) => {
        let temp = result.find(x => x.id == e.target.id)
        temp['ques'] = e.target.value
        console.log(temp)
        renderData()
    }
    let quizNameEvent = (e) => {
        setquizName(e.target.value)

    }
    let delQuesEvent = (e) => {
        console.log('del pressed' + e.target.id)
        let y = Number(e.target.id)
        console.log(typeof (e.target.id) + ' ' + y)
        let tempresult = result
        setresult([])
        for (let i = 0; i < tempresult.length; i++) {
            if (tempresult[i].id != y) {
                console.log(tempresult[i].id + ' ' + tempresult[i].ques)
                setresult(prevArray => [...prevArray, tempresult[i]]);
            }
        }
        renderData()
    }
    let submit = async () => {
        let response = await fetch('http://127.0.0.1:8000/supervisor/addNewQuiz', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ 'sup_id': localStorage.getItem('sup_id'), quizName, result })
        })
        let d = await response.json()
        if (d === 'successful') {

            //navigate to view_contents
            alert('সফলভাবে জমা হয়েছে')
            setsuccessful(true)
        }
        else {
            alert('কিছু ভুল হয়েছে, আবার চেষ্টা করুন')
        }
    }
    let addNew = (e) => {
        console.log(cnt)

        let temp = {}
        temp['ques'] = ''
        temp['option1'] = ''
        temp['option2'] = ''
        temp['option3'] = ''
        temp['option4'] = ''
        temp['correct'] = ''
        temp['id'] = cnt + 1
        setresult(prevArray => [...prevArray, temp]);
        setcnt(cnt + 1)

    }

    if (show) {
        return (

            <>
                {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
                <div>
                    <br />
                    <header className="masthead" style={{ backgroundColor: "lightyellow" }}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10 col-lg-8 mx-auto position-relative">
                                    <div className="post-heading">
                                        <h1>{result.title}</h1><span className="meta">Posted by&nbsp;
                                            {result.author}&nbsp;on {result.upload_time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    {

                        result.items?.map((r) => {
                            return (
                                <div className="p-4" style={{ borderRadius: "20px", color: "var(--bs-gray-800)", background: "var(--bs-gray-400)", width: "831px", transform: "translate(350px)", margin: "15px" }}>

                                    <h6>প্রশ্ন: {r.ques}</h6>
                                    <div>
                                        <div className="form-check" style={{ margin: "25px" }}>
                                            <input className="form-check-input" type="radio" id="option1" checked={r.correct === 1} />
                                            <h6>{r.option1}</h6>
                                        </div>

                                        <div className="form-check" style={{ margin: "25px" }}>
                                            <input className="form-check-input" type="radio" id="option2" checked={r.correct === 2} />
                                            <h6>{r.option2}</h6>
                                        </div>

                                        <div className="form-check" style={{ margin: "25px" }}>
                                            <input className="form-check-input" type="radio" id="option3" checked={r.correct === 3} />
                                            <h6>{r.option3}</h6>
                                        </div>

                                        <div className="form-check" style={{ margin: "25px" }}>
                                            <input className="form-check-input" type="radio" id="option4" checked={r.correct === 4} />
                                            <h6>{r.option4}</h6>
                                        </div>
                                    </div>

                                </div>

                            );
                        })
                    }
                    <div className="p-4" style={{ color: "var(--bs-gray-800)", width: "831px", transform: "translate(244px)", margin: "15px" }}>
                        <div className="row">
                            <div className="col-md-6">
                                {/* <button className="btn btn-primary" type="button" style={{ margin: "-70px", padding: "12px", transform: "translate(500px)", position: "static" }} onClick={toggle}>এডিট</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <main className="page landing-page">
                {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
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
                                    <div className="p-4" style={{ borderRadius: "20px", color: "var(--bs-gray-800)", background: "var(--bs-gray-400)", width: "831px", transform: "translate(244px)", margin: "15px" }}>
                                        <h5>কুইজের নাম:</h5>
                                        <div onChange={quizNameEvent}>
                                            <header></header><input type="text" style={{ borderRadius: "10px", height: "37px", width: "720.4px", opacity: "1" }} value={quizName} name="quizName" />
                                        </div>
                                    </div>
                                    {

                                        result.map((r) => {
                                            return (
                                                <div className="p-4" style={{ borderRadius: "20px", color: "var(--bs-gray-800)", background: "var(--bs-gray-400)", width: "831px", transform: "translate(244px)", margin: "15px" }}>
                                                    <i class="material-icons" style={{ transform: "translateX(750px)" }} onClick={delQuesEvent} id={r.id}>delete</i>
                                                    {/* <i class="icon ion-android-delete fs-2" style="margin: 758px;width: 0;height: 0;"></i> */}
                                                    <h5>প্রশ্ন:</h5>
                                                    <div onChange={quesEvent}>
                                                        <header></header><input type="text" style={{ borderRadius: "10px", height: "37px", width: "720.4px", opacity: "1" }} value={r.ques} id={r.id} name="ques" />
                                                    </div>
                                                    <div onChange={Radioevent}>
                                                        <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="option1" name={r.id} value="1" /><input type="text" id={r.id} name="option1" style={{ borderRadius: "10px", height: "30px", width: "420.4px", opacity: "1" }} value={r.option1} /></div>
                                                        <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="option2" name={r.id} value="2" /><input type="text" id={r.id} name="option2" style={{ borderRadius: "10px", height: "30px", width: "420.4px", opacity: "1" }} value={r.option2} /></div>
                                                        <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="option3" name={r.id} value="3" /><input type="text" id={r.id} name="option3" style={{ borderRadius: "10px", height: "30px", width: "420.4px", opacity: "1" }} value={r.option3} /></div>
                                                        <div className="form-check" style={{ margin: "25px" }}><input className="form-check-input" type="radio" id="option4" name={r.id} value="4" /><input type="text" id={r.id} name="option4" style={{ borderRadius: "10px", height: "30px", width: "420.4px", opacity: "1" }} value={r.option4} /></div>

                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                </tbody>

                                <div className="p-4" style={{ color: "var(--bs-gray-800)", width: "831px", transform: "translate(244px)", margin: "15px" }}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <button className="btn btn-primary" type="button" style={{ margin: "-70px", padding: "12px", transform: "translate(300px)", position: "static" }} onClick={addNew}>নতুন প্রশ্ন যুক্ত করুন</button>
                                        </div>
                                        <div className="col-md-6">
                                            <button className="btn btn-primary" type="button" style={{ margin: "-70px", padding: "12px", transform: "translate(100px)", position: "static" }} onClick={submit}>Submit</button>
                                        </div>
                                    </div>

                                    {/* <button className="btn btn-primary" type="button" style={{ margin: "-70px", padding: "12px", transform: "translate(390px)", position: "static" }} onClick={addNew}>নতুন প্রশ্ন যুক্ত করুন</button> */}
                                </div>
                                {/* <div className="p-4" style={{ color: "var(--bs-gray-800)", width: "831px", transform: "translate(244px)", margin: "15px" }}>
                                    <button className="btn btn-primary" type="button" style={{ margin: "-70px", padding: "12px", transform: "translate(420px)", position: "static"  }}>Submit</button>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </section>
                {successful && <Navigate to="/view_contents" replace={true} />}
            </main>


        );
    }
}

export default BlogPost;
