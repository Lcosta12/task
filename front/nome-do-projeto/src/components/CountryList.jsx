import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/available-countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Erro ao buscar lista de países:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Lista de Países</h1>
      <ul>
        {countries.map(country => (
          <li key={country.countryCode}>
            <Link to={`/country-info/${country.countryCode}`}>{country.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
