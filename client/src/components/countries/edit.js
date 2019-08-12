import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

function Edit(props) {
  const [inputs, setInputs] = useState({});
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    Axios.get(`/api/countries/${props.match.params.id}`)
      .then(result => setInputs(result.data))
      .catch(err => console.error(err));
  }, [props]);

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post("/api/countries/update", {
      id: props.match.params.id,
      ...inputs
    })
      .then(() => setRedirect(true))
      .catch(err => console.error(err));
  }

  function handleInputChange(event) {
    event.persist();
    const { name, value } = event.target;

    setInputs(inputs => {
      inputs[name] = value;
      return inputs;
    });
  }

  if (redirect) return <Redirect to="/" />;

  if (inputs.name && inputs.population && inputs.export) {
    return (
        <div className="container">
        <header>
            <h1 style={{textAlign: "center"}}>Edit Country</h1>
        </header>
        <div>
            <form action="/" method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Name</label>
                <input
                className="form-control"
                name="name"
                required="required"
                onChange={handleInputChange}
                defaultValue={inputs.name}
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
                defaultValue={inputs.population}
                />
            </div>

            <div className="form-group">
                <label>Export</label>
                <select
                className="form-control"
                name="export"
                required="required"
                onChange={handleInputChange}
                defaultValue={inputs.export}
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
  return <p>Loading...</p>;
}

export default Edit;
