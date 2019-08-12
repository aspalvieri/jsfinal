import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function New() {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  function handleInputChange(event) {
    event.persist();
    const { name, value } = event.target;

    setInputs(inputs => {
      return {
        ...inputs,
        [name]: value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/countries", inputs)
      .then(resp => setRedirect(true))
      .catch(err => console.log(err));
  }

  if (redirect) return <Redirect to="/" />;

  return (
    <div className="container">
      <header>
        <h1 style={{textAlign: "center"}}>New Country</h1>
      </header>

      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              name="name"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Population</label>
            <input
              className="form-control"
              name="population"
              required
              type="number"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Export</label>
            <select
              className="form-control"
              name="export"
              required
              onChange={handleInputChange}
            >
              <option value="AGRICULTURE">AGRICULTURE</option>
              <option value="WATER">WATER</option>
              <option value="MINERALS">MINERALS</option>
              <option value="RARE MATERIALS">RARE MATERIALS</option>
              <option value="LUMBER">LUMBER</option>
            </select>
          </div>

          <div className="form-group">
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default New;
