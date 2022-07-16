import React, { useState, useEffect } from 'react';

export const Form = ({ onSubmit, sup_id }) => {
  let [division, setdivision] = useState([])
  let [district, setdistrict] = useState([])
  let [upazilla, setupazilla] = useState([])

  let [inputdivision, setinputdivision] = useState('')
  let [inputdistrict, setinputdistrict] = useState('')
  let [inputupazilla, setinputupazilla] = useState('')

  useEffect(() => {
    getDivisions()
  }, [])

  let getDivisions = async () => {
    if (inputdivision.length === 0) {
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
      for (let i = 0; i < d.length; i++) {
        let now = d[i]
        setdivision(prevArray => [...prevArray, now]);
      }
      setinputdivision(division[0]);

    }
    if (inputdistrict.length === 0) {
      setdistrict([]);
      setupazilla([]);
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
      for (let i = 0; i < d.length; i++) {
        let now = d[i]
        setdistrict(prevArray => [...prevArray, now]);
      }
      setinputdistrict(district[0]);
    }
    if (inputupazilla.length === 0) {
      setupazilla([]);
      setinputupazilla('');

      let response = await fetch('http://127.0.0.1:8000/organization/fetchLocationSupervisor', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputdivision, inputdistrict, inputupazilla })
      })
      let d = await response.json()
      for (let i = 0; i < d.length; i++) {
        let now = d[i]
        setupazilla(prevArray => [...prevArray, now]);
      }
      setinputupazilla(upazilla[0]);
    }

  }

  let getDistrict = async () => {
    if (inputdivision.length !== 0) {
      setdistrict([])
      setupazilla([])
      setinputdistrict('')
      setinputupazilla('')

      let response = await fetch('http://127.0.0.1:8000/organization/fetchLocationSupervisor', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ inputdivision, inputdistrict, inputupazilla })
      })
      let d = await response.json()
      for (let i = 0; i < d.length; i++) {
        let now = d[i]
        setdistrict(prevArray => [...prevArray, now]);
      }
      setinputdistrict(district[0])
      getUpazilla()
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
      for (let i = 0; i < d.length; i++) {
        let now = d[i]
        setupazilla(prevArray => [...prevArray, now]);
      }
      setinputupazilla(upazilla[0])
    }
  }
  let handleChangeDivision = (value) => {
    setinputdivision(value)
    getDistrict()
  }

  let handleChangeDistrict = (value) => {
    setinputdistrict(value)
    getUpazilla()
  }

  let handleChangeUpazilla = (value) => {
    setinputupazilla(value)
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
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
