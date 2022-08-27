import Background from './assets/img/mali-800.jpg'
import './assets/fonts/simple-line-icons.min.css'
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
const GoTo = () => {
    let { id } = useParams();
    let [To, setTo] = useState(0);
    let [type, settype] = useState(0);
    useEffect(() => {
        getContents()
    }, [])


    let getContents = async () => {
        // window.location.reload(false);
        console.log(id)
        let response = await fetch('http://127.0.0.1:8000/supervisor/getSingleNotification', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })
        let now = await response.json()
        console.log(now)

        setTo(now.type_id)

        let response2 = await fetch('http://127.0.0.1:8000/supervisor/markAsRead', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(id)
        })
        let d = await response2.json()
        console.log(d)
        if (now.notification_type === 'campaign') {
            settype(1)
        }
        if (now.notification_type === 'chw') {
            settype(2)
        }
        

    }
    return (
        <main className="page landing-page">
            {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
            {type === 1 && <Navigate to={`/campaign_details/${To}`} replace={true} />}
            {type === 2 && <Navigate to={`/viewCHWProfile/${To}`} replace={true} />}
        </main>
    );
}

export default GoTo;