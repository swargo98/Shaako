import React from 'react';

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">সুপারভাইজার</label>
          <br/>
          <br/>
          <input list="ice-cream-flavors" id="ice-cream-choice" name="ice-cream-choice" style={{width: "400px"}} />
          <datalist id="ice-cream-flavors">
              <option value="Chocolate"/>
                  <option value="Coconut"/>
                      <option value="Mint"/>
                          <option value="Strawberry"/>
                              <option value="Vanilla"/>
          </datalist>
      </div>
        <br/>
      <div className="form-group">
        <button className="form-control btn btn-primary" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};
export default Form;
