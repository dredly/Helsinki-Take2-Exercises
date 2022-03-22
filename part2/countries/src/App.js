import { useState, useEffect } from 'react';
import axios from 'axios';

const CountrySearch = ({ search, handleChange }) => {
  return (
    <>
      <label htmlFor="country-search-input">find countries </label>
      <input value={search} id="country-search-input" onChange={handleChange} />
    </>
  )
}

const CountryList = ({ countries, handleShow }) => {
  return (
    <ul>
      {countries.map(result => (
        <li key={result.cca3}>{result.name.common} <button value={result.name.common} onClick={handleShow}>show</button></li>
      ))}
    </ul>
  )
}

const CountryDetails = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {Object.keys(country.languages).map(langKey => (
          <li key={langKey}>{country.languages[langKey]}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </>
  )
}

const SearchOutcome = ({ results, handleShow }) => {
  if (results.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  if (results.length > 1 && results.length <= 10) {
    return <CountryList countries={results} handleShow={handleShow} />
  }
  if (results.length === 1) {
    return <CountryDetails country={results[0]} />
  }
  return <p>No results</p>
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        setResults(response.data);
      })
  }, []);

  const handleChange = evt => {
    setSearch(evt.target.value);
    setResults(countries.filter(country => (
      country.name.common.toLowerCase().includes(evt.target.value.toLowerCase())
    )));
    // console.log(results.map(result => result.name.common));
  }

  const handleShow = evt => {
    setSearch(evt.target.value);
    setResults(countries.filter(country => (
      country.name.common.toLowerCase().includes(evt.target.value.toLowerCase())
    )));
  }

  return (
    <div>
      <CountrySearch search={search} handleChange={handleChange} />
      <SearchOutcome results={results} handleShow={handleShow} />
    </div>
  );
}

export default App;
