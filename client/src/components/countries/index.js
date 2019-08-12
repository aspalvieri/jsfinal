import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

function Index() {
  const [country, setCountries] = useState([]);

  useEffect(() => {
    Axios.get("/api/countries")
      .then(result => setCountries(result.data)) // Our countries are under the property .data
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <header>
        <h1 style={{textAlign: "center"}}>All Countries</h1>
      </header>

      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Population</th>
              <th>Export</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {country.map(country => (
              <tr key={country._id}>
                <td>
                  <Link to={`/${country._id}`}>{country.name}</Link>
                </td>
                <td>{country.population}</td>
                <td>{country.export}</td>
                <td>
                  <Link to={`/${country._id}/edit`}>Edit</Link> |&nbsp;
                  <Link to={`/${country._id}/destroy`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Index;
