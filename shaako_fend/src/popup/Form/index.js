import React, { useState, useEffect } from 'react';
import { BrowserRouter as Navigate } from 'react-router-dom';

export const Form = ({ onSubmit, sup_id }) => {
  let [division, setdivision] = useState([])
  let [district, setdistrict] = useState([])
  let [upazilla, setupazilla] = useState([])

  let [inputdivision, setinputdivision] = useState('')
  let [inputdistrict, setinputdistrict] = useState('')
  let [inputupazilla, setinputupazilla] = useState('')

  useEffect(() => {
    getDivisions();
  }, [])

  useEffect(() => {
    getDistrict();
  }, [inputdivision])

  useEffect(() => {
    getUpazilla();
  }, [inputdistrict])

  let getDivisions = async () => {
    setdivision([]);
    setdistrict([]);
    setupazilla([]);
    setinputdivision('');
    setinputdistrict('');
    setinputupazilla('');

    let response = await fetch('http://127.0.0.1:8000/organization/fetchLocationSupervisor', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputdivision, inputdistrict, inputupazilla })
    })
    let d = await response.json()
    for (let i = 0; i < d.division.length; i++) {
      let now = d.division[i]
      setdivision(prevArray => [...prevArray, now]);
    }
    setinputdivision(d.division[0]);
    for (let i = 0; i < d.district.length; i++) {
      let now = d.district[i]
      setdistrict(prevArray => [...prevArray, now]);
    }
    setinputdistrict(d.district[0]);
    for (let i = 0; i < d.upazilla.length; i++) {
      let now = d.upazilla[i]
      setupazilla(prevArray => [...prevArray, now]);
    }
    setinputupazilla(d.upazilla[0]);
  }

  let getDistrict = async () => {
    if (inputdivision.length !== 0) {


      let response = await fetch('http://127.0.0.1:8000/organization/fetchLocationSupervisor', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputdivision, inputdistrict, inputupazilla })
      })
      let d = await response.json()
      for (let i = 0; i < d.district.length; i++) {
        let now = d.district[i]
        setdistrict(prevArray => [...prevArray, now]);
      }
      setinputdistrict(d.district[0]);
      for (let i = 0; i < d.upazilla.length; i++) {
        let now = d.upazilla[i]
        setupazilla(prevArray => [...prevArray, now]);
      }
      setinputupazilla(d.upazilla[0]);
    }
  }

  let getUpazilla = async () => {
    if (inputdivision.length !== 0 && inputdistrict.length !== 0) {
      setupazilla([])
      setinputupazilla('')

      let response = await fetch('http://127.0.0.1:8000/organization/fetchLocationSupervisor', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputdivision, inputdistrict, inputupazilla })
      })
      let d = await response.json()
      for (let i = 0; i < d.upazilla.length; i++) {
        let now = d.upazilla[i]
        setupazilla(prevArray => [...prevArray, now]);
      }
      setinputupazilla(d.upazilla[0]);
    }
  }
  let handleChangeDivision = (value) => {
    setdistrict([])
    setupazilla([])
    setinputdistrict('')
    setinputupazilla('')
    setinputdivision(value);
  }

  let handleChangeDistrict = (value) => {
    setupazilla([])
    setinputupazilla('')
    setinputdistrict(value);
  }

  let handleChangeUpazilla = (value) => {
    setinputupazilla(value)
  }
  let handleSubmit = async () => {
    if (inputdivision.length !== 0 && inputdistrict.length !== 0 && inputupazilla.length != 0) {
      let response = await fetch('http://127.0.0.1:8000/organization/updateSupervisor', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sup_id, inputdivision, inputdistrict, inputupazilla })
      })
      let data = await response.json()
    }
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">বিভাগ</label>
        <br />
        <select className="form-control" onChange={(e) => { handleChangeDivision(e.target.value) }} value={inputdivision?.body}>
          {
            division.map((r) => {
              return (
                <option value={r}>{r}</option>
              )
            })
          }
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name">জেলা</label>
        <select className="form-control" onChange={(e) => { handleChangeDistrict(e.target.value) }} value={inputdistrict?.body}>
          {
            district.map((r) => {
              return (
                <option value={r}>{r}</option>
              )
            })
          }
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="name">উপজেলা</label>
        <select className="form-control" onChange={(e) => { handleChangeUpazilla(e.target.value) }} value={inputupazilla?.body}>
          {
            upazilla.map((r) => {
              return (
                <option value={r}>{r}</option>
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
