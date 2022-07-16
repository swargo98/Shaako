import React from 'react';

export const Form = ({ onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="name">বিভাগ</label>
        <input className="form-control" id="name" />
      </div>
        <div className="form-group">
            <label htmlFor="name">জেলা</label>
            <input className="form-control" id="name" />
        </div>

        <div className="form-group">
            <label htmlFor="name">উপজেলা</label>
            <input className="form-control" id="name" />
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
