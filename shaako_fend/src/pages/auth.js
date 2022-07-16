import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const Authentication = () => {
    let [username, setusername] = useState(null)
    let [password, setpassword] = useState(null)
    let [isLoggedIn, setisLoggedIn] = useState(false)
    let [failedLogin, setfailedLogin] = useState(false)

    useEffect(() => {
        checkAlreadyLogged()
    }, [])
    
    let checkAlreadyLogged = () => {
        let res=localStorage.getItem('logged')
        if(res==='true'){
            setisLoggedIn(true)
        }
    }

    let handleChangeUsername = (value) => {
        setusername(username => ({ ...username, 'username': value }))
    }
    
    let handleChangePassword = (value) => {
        setpassword(password => ({ ...password, 'password': value }))
    }

    let handleSubmit = async () => {
        if (username && password) {
            console.log("Username : ", username, " Password : ", password)
            let response = await fetch('http://127.0.0.1:8000/organization/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            let data = await response.json()
            if (data.correct === 'True') {
                setisLoggedIn(true)
                localStorage.setItem('logged', true)
                localStorage.setItem('organization', data.organization)
                localStorage.setItem('admin_id', data.id)
            }
            else {
                setfailedLogin(true)
            }
        }
    }

    return (
        <>
            <div className="Auth-form-container">
                <form className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="form-group mt-3">
                            <label>Email address</label>
                            <input
                                type="email"
                                className="form-control mt-1"
                                placeholder="Enter email"
                                onChange={(e) => { handleChangeUsername(e.target.value) }} value={username?.body}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control mt-1"
                                placeholder="Enter password"
                                onChange={(e) => { handleChangePassword(e.target.value) }} value={password?.body}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                Submit
                            </button>
                            {failedLogin && <p style={{color: "red"}}>Login Failed!</p>}
                        </div>
                    </div>
                </form>
            </div>
            {isLoggedIn && <Navigate to="/home" replace={true} />}
        </>
    );
}

export default Authentication;
