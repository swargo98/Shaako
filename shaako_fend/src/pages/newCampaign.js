import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, {useEffect, useState} from "react";
import Multiselect from 'multiselect-react-dropdown';







const NewCampaign = () => {
    let [options,setoptions] = useState([])
    let [selected,setselected] = useState([])
    let [sup, setsup] = useState([])

    let [name, setname] = useState('')
    let [startDate, setStartDate] = useState('')
    let [endDate, setEndDate] = useState('')
    let [supervisors, setSupervisors] = useState([])
    let [description, setDescription] = useState('')
    let [goal, setGoal] = useState('')
    let organization = localStorage.getItem('organization')

    let handleChangename = (value) => {
        setname(value)
        console.log(name)
    }
    let handleChangeStartDate = (value) => {
        console.log(startDate);
        setStartDate(value);
        console.log(startDate);
    }
    let handleChangeEndDate = (value) => {
        console.log(value);
        setEndDate(value);
        console.log(endDate);
    }
    let handleChangeDescription = (value) => {
        setDescription(value)
        console.log(description)
    }
    let handleChangeGoal = (value) => {
        setGoal(value)
        console.log(goal)
    }
    useEffect(() => {
        getSups();
    }, [])


    let getSups = async () => {
        let response = await fetch('http://127.0.0.1:8000/organization/getSupervisorDetailed', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization':'TOKEN ' + localStorage.getItem('token')
            },
            body: JSON.stringify(organization)
        })

        let d = await response.json()
        console.log(d)
        setsup([])
        setoptions(([]))
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            console.log(now)
            setsup(prevArray => [...prevArray, now]);
            let now2 = {name : now.name , id : now.id};
            setoptions(prevArray => [...prevArray, now2]);
        }
    }



    let handleSubmit = async () => {
        console.log(name, startDate, endDate, supervisors, description, organization)
        if (name.length !== 0 &&  selected.length !== 0
            && description.length !== 0  && goal.length !== 0  && startDate.length !== 0 && endDate.length !== 0 ) {
            let response = await fetch('http://127.0.0.1:8000/organization/createCampaign', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'TOKEN ' + localStorage.getItem('token')
                },

                body: JSON.stringify({ name,selected, startDate, endDate, description, goal})
            })
            let data = await response.json()
        }
    }

    let onSelect = (selectedList, selectedItem) => {
        // console.log(selectedList)
        setselected(selectedList)
    }

    let onRemove = (selectedList, removedItem) => {
        // console.log(selectedList)
        setselected(selectedList)
    }
    return (
        <main className="page landing-page" style={{padding: "76px 0px 0px"}}>
            {!localStorage.getItem('token') && <Navigate to="/login" replace={true} />}
            <section className="clean-block features" style={{background: "#a6f9d6"}}>
                <div className="container">
                    <div className="block-heading" style={{padding: "24px 0px 0px"}}>
                        <h2 className="text-info"><br /><span
                            style={{color: "rgba(var(--bs-info-rgb), var(--bs-text-opacity))" , backgroundColor: "rgb(246, 246, 246)"}}>নতুন ক্যাম্পেইন</span><br />
                        </h2>
                    </div>
                </div>
                <section className="clean-block clean-form dark" style={{background: "#a6f9d6"}}>
                    <div className="container" style={{margin: "0px 10px", padding: "0px 200px"}}>
                        <form style={{width: "1000px", transform: "translate(100px)"}}>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="name">নাম</label>
                                <input className="form-control" type="text" id="name" name="name" onChange={(e) => { handleChangename(e.target.value) }} value={name?.body}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="subject">ক্যাম্পেইন শুরু</label>
                                <input className="form-control" type="date" onChange={(e) => { handleChangeStartDate(e.target.value) }} value={startDate?.body}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">ক্যম্পেইন শেষ</label>
                                <input className="form-control" type="date" onChange={(e) => { handleChangeEndDate(e.target.value) }} value={endDate?.body}/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">সুপারভাইজার(গণ)</label>
                                <br />
                                <Multiselect
                                    options={options} // Options to display in the dropdown
                                    selectedValues={selected} // Preselected value to persist in dropdown
                                    onSelect={onSelect} // Function will trigger on select event
                                    onRemove={onRemove} // Function will trigger on remove event
                                    displayValue="name" // Property name to display in the dropdown options
                                />
                                {/*<select className="form-control" onChange={(e) => { handleChangeSup(e.target.value) }} value={supid?.body}>*/}
                                {/*    {*/}
                                {/*        sup.map((r) => {*/}
                                {/*            return (*/}
                                {/*                <option value={r.id}>(ID: {r.id})&nbsp;{r.name}</option>*/}
                                {/*            )*/}
                                {/*        })*/}
                                {/*    }*/}
                                {/*</select>*/}
                            </div>
                                <div className="mb-3" style={{padding: "2px"}}>
                                    <label className="form-label" htmlFor="email">বিবরণ</label>
                                    <input className="form-control" type="text" onChange={(e) => { handleChangeDescription(e.target.value) }} value={description?.body}/>
                                </div>

                            <div className="mb-3" style={{padding: "2px"}}><label className="form-label"
                                                                                  htmlFor="email">লক্ষ্যমাত্রা</label><input
                                className="form-control" type="text" onChange={(e) => { handleChangeGoal(e.target.value) }} value={goal?.body}/></div>

                                <div className="mb-3">
                                    <button className="btn btn-primary" type="button" onClick={handleSubmit}><a style={{color: "white", textDecoration: "none"}} href="/campaign_list">সংরক্ষণ করুন</a></button>
                                </div>
                        </form>
                    </div>
                </section>
            </section>
        </main>
    );
}

export default NewCampaign;
