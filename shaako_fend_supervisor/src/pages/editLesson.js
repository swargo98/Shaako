import RichTextEditor from "../components/richTextEditor";
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "../components/EditorToolbar";
import "react-quill/dist/quill.snow.css";


const NewLesson = () => {
    let [title, settitle] = useState(null)
    let [content, setcontent] = useState('')
    let [done, setdone] = useState(false)
    let sup_id = localStorage.getItem('sup_id')
    let { id } = useParams();
    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        console.log(id)
        let response = await fetch('http://127.0.0.1:8000/supervisor/getMyContent', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })
        let d = await response.json()
        let now = d
        console.log(now.title + " " + now.content + " " + now.author + " " + now.upload_time)
        settitle(now.title)
        setcontent(now.content)
    }

    let handleChangeContent = (value) => {
        setcontent(value);
    }

    let ChangeTitle = (value) => {
        settitle(value);
    }

    let submit = async () => {
        console.log(title)
        console.log(content)
        let response = await fetch('http://127.0.0.1:8000/supervisor/editContent', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({id, title, content})
        })
        let data = await response.json()
        if (data == "True") {
            setdone(true)
        }
        console.log(data)
    };

    return (
        <>
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
                                <h2>নতুন পাঠ যোগ করুন</h2>
                            </div>
                        </div>
                        <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3" style={{ margin: "-31px -12px 0px" }}>
                            <div className="col-xl-1">
                                <p style={{ width: "400px" }}>শিরোনামঃ&nbsp;</p>
                            </div>
                            <div className="col"><input type="text" style={{ width: "500px" }} onChange={(e) => { ChangeTitle(e.target.value) }} value={title} /></div>
                        </div>
                        <div className="row gy-4 row-cols-1 row-cols-md-1 row-cols-xl-1"
                            style={{ padding: "0px", margin: "22px -12px 0px" }}>
                            <div className="form-group col-md-12 editor">
                                <label className="font-weight-bold"> Additional Information </label>

                                <EditorToolbar toolbarId={'t2'} />
                                <ReactQuill

                                    theme="snow"
                                    value={content}
                                    onChange={handleChangeContent}
                                    placeholder={"এখানে লেখা শুরু করুন..."}
                                    modules={modules('t2')}
                                    formats={formats}
                                />
                            </div>
                        </div>
                        <button className="btn btn-primary" type="submit"
                            style={{ margin: "22px 0px 0px", background: "rgb(52,163,0)" }} onClick={submit}> পাঠ সেভ করুন
                        </button>
                    </div>


                </section>
            </main>
            {done && <Navigate to={`/blog_post/${id}`} replace={true} />}
        </>
    );
}

export default NewLesson;
