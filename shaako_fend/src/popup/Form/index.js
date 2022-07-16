import React, { useState, useEffect } from 'react';

export const Form = ({ onSubmit, sup_id }) => {
  let [division, setdivision] = useState([])
  let [district, setdistrict] = useState([])
  let [upazilla, setupazilla] = useState([])

  useEffect(() => {
    getDivisions()
  }, [])

  let getDivisions = async () => {
    let response = await fetch('http://127.0.0.1:8000/organization/fetchLocationSupervisor')
    let d = await response.json()

    setdivision([])
    setdistrict([])
    setupazilla([])

    for (let i = 0; i < d.length; i++) {
      let now = d[i]
      setdivision(prevArray => [...prevArray, now]);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">বিভাগ</label>
        <br />
        <select className="form-control" name="cars" id="cars">
          {
            division.map((r) => {
              return (
                <option value="volvo">{r}</option>
              )
            })
          }


              {/* // <option value="saab">Saab</option>
              // <option value="mercedes">Mercedes</option>
              // <option value="audi">Audi</option> */}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="name">জেলা</label>
        <select className="form-control" name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="name">উপজেলা</label>
        <select className="form-control" name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
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
