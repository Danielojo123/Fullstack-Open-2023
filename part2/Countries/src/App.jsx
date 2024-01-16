// Install axios by running: npm install axios
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const searchCountry = async () => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${searchQuery}`);
      const data = response.data;

      if (data.length === 0) {
        setErrorMessage('No matching countries found.');
        setCountries([]);
      } else if (data.length > 10) {
        setErrorMessage('Too many countries match the query. Please make your query more specific.');
        setCountries([]);
      } else {
        setCountries(data);
        setErrorMessage('');
        setSelectedCountry(null);
      }
    } catch (error) {
      setErrorMessage('Error fetching data from the API.');
      console.error(error);
    }
  };

  const viewCountryDetails = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div>
      <h1>Country Information Viewer</h1>
      <label>
        Search for a country:
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Type country name..."
        />
      </label>
      <button onClick={searchCountry}>Search</button>

      {errorMessage && <p>{errorMessage}</p>}

      {countries.length > 0 && (
        <div>
          {countries.map((country) => (
            <div key={country.name.common}>
              <h2>{country.name.common}</h2>
              {selectedCountry !== country && (
                <button onClick={() => viewCountryDetails(country)}>View Details</button>
              )}
              {selectedCountry === country && (
                <div>
                  <p>Capital: {country.capital}</p>
                  <p>Region: {country.region}</p>
                  <p>Population: {country.population}</p>
                  <p>Area: {country.area} sq km</p>
                  <p>Languages: {Array.isArray(country.languages) ? country.languages.map((lang) => lang) : 'N/A'}</p>
                  <hr />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
