import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';

const BlogPost = () => {
    let [result, setresult] = useState('');
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
        console.log(d)
        let now = d
        console.log(now.title + " " + now.content + " " + now.author + " " + now.upload_time)
        setresult(now);
    }
    return (
        <>{!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
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
                <article>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-lg-8 mx-auto">
                                <br />
                                <div className="content" dangerouslySetInnerHTML={{ __html: result.content }}></div>
                                <button type="button" class="btn btn-primary" >
                                    <a style={{ textDecoration: "none",color : "white" }} href={`/edit_lesson/${id}`}>
                                        Edit Content
                                    </a>
                                </button>

                            </div>
                        </div>
                    </div>
                </article>
                <br />
            </div>
        </>
    );
}

export default BlogPost;
