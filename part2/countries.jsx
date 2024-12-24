import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ country }) => {
  console.log(Object.entries(country));
  return (
    <>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Languages:</p>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  );
};

const Content = ({ countries, setCountries, setFilter }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length < 10 && countries.length > 1) {
    return (
      <ul>
        {countries.map(c => (
          <li key={c.cca2}>
            {c.name.common}
            <button
              onClick={() => {
                setCountries([c]);
                setFilter(c.name.common);
              }}
            >
              show
            </button>
          </li>
        ))}
      </ul>
    );
  } else if (countries.length == 1) {
    return <Country country={countries[0]} />;
  } else {
    <p>No countries</p>;
  }
};

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all").then(response => {
      setAllCountries(response.data);
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    const newFilter = event.target.value;
    setFilter(newFilter);
    const regex = new RegExp(newFilter, "i");
    const filteredCountries = () => allCountries.filter(country => country.name.common.match(regex));
    setCountries(filteredCountries);
  };

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <div>
          find countries <input value={filter} onChange={handleFilterChange} />
        </div>
        <Content countries={countries} setCountries={setCountries} setFilter={setFilter} />
      </div>
    </div>
  );
};

export default Countries;
