import man2 from './assets/img/avatars/avatar2.jpg'
import { Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

const CHWList = () => {
    let [result, setresult] = useState([])
    let [search, setsearch] = useState('')
    let organization = localStorage.getItem('organization')
    useEffect(() => {
        getCHW()
    }, [])

    let getCHW = async () => {
        let response = await fetch('http://127.0.0.1:8000/supervisor/getCHW', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({'sup_id':localStorage.getItem('sup_id'), 'organization':organization})
        })
        let d = await response.json()
        console.log(d)
        setresult([])
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            console.log(now);
            let response2 = await fetch('http://127.0.0.1:8000/CHW/getImage', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'TOKEN ' + localStorage.getItem('token')
                },
                body: JSON.stringify(now.id)
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
            now.image = imageurl
            setresult(prevArray => [...prevArray, now]);
        }
        

    }

    let handleChangeSearch = (value) => {
        setsearch(value)
    }

    let handleSubmit = async () => {
        console.log(search)
        let response = await fetch('http://127.0.0.1:8000/supervisor/searchCHW', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify({'sup_id':localStorage.getItem('sup_id'), 'organization':organization, search})
        })
        let d = await response.json()
        setresult([]) 
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            setresult(prevArray => [...prevArray, now]);
        }
    }
    return (
        <div className="container-fluid">
           {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
            <br />
            <br />
            <div className="card shadow">
                <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">স্বাস্থ্যকর্মী তালিকা</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <div className="input-group rounded">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon"
                                    onChange={(e) => { handleChangeSearch(e.target.value) }} value={search?.body} />
                                <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>Search</button>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive table mt-2" id="dataTable" role="grid"
                        aria-describedby="dataTable_info">
                        <table className="table my-0" id="dataTable">
                            <thead>
                                <tr>
                                    <th>নাম</th>
                                    <th>মোবাইল নম্বর</th>
                                    <th>কর্মরত এলাকা</th>
                                    <th>নিয়োগ তারিখ</th>
                                    <th>ভিজিট সংখ্যা</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    result.map((r) => {
                                        return (
                                            
                                            <tr>
                                                
                                                <td><a style={{textDecoration: "none"}} href="/"><img className="rounded-circle me-2" width="30" height="30"
                                                         src={r.image} alt="man" />{r.name}</a></td>
                                                         
                                                <td>{r.contactNo}
                                                </td>

                                                <td>{r.union}
                                                </td>
                                                <td>{r.recruitment_date}</td>
                                                <td>{r.visit_forms}</td>
                                                
                                            </tr>
                                            
                                        );
                                    })
                                }

                            </tbody>
                            <tfoot>
                                <tr></tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="row">
                        <div className="col-md-6 align-self-center">
                            <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Total {result.length} results</p>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
        </div>
    );
}

export default CHWList;
