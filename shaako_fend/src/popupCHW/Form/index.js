import React, { useState, useEffect } from "react";

export const Form = ({ onSubmit, chwid }) => {
  let [result, setresult] = useState([])
  let [supid, setsupid] = useState('')
  useEffect(() => {
    getSup()
  }, [])

  let getSup = async () => {
    let response = await fetch('http://127.0.0.1:8000/organization/getAssignableSupervisor', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'TOKEN ' + localStorage.getItem('token')
      },
      body: JSON.stringify(chwid)
    })
    let d = await response.json()
    setresult([])
    for (let i = 0; i < d.length; i++) {
      let now = d[i]
      setresult(prevArray => [...prevArray, now]);
    }
    setsupid(d[0].id);
  }
  let handleChange = (value) => {
    setsupid(value);
  }
  let handleSubmit = async () => {
    let response = await fetch('http://127.0.0.1:8000/organization/changeSupervisorOfCHW', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'TOKEN ' + localStorage.getItem('token')
      },

      body: JSON.stringify({chwid,supid})
    })
    let data = await response.json()
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">সুপারভাইজার</label>
        <br />
        <select className="form-control" onChange={(e) => { handleChange(e.target.value) }} value={supid?.body}>
          {
            result.map((r) => {
              return (
                <option value={r.id}>(ID: {r.id})&nbsp;{r.name}</option>
              )
            })
          }
        </select>
      </div>
      <br />
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
