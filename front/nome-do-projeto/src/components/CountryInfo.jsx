import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const CountryInfo = () => {
  const { countryCode } = useParams(); 
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/country-info/${countryCode}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar informações do país');
        }
        const data = await response.json();
        
        const latestPopulation = data.population.data[0]?.populationCounts.slice(-1)[0]?.value || 'N/A';
        
        setCountry({
          ...data.countryInfo,
          population: latestPopulation,
          flag: data.flag?.data || '',
          borders: data.countryInfo.borders || []
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); 
      }
    };

    fetchCountry();
  }, [countryCode]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{country.commonName || country.officialName}</h1>
      <img src={country.flag} alt={`Bandeira de ${country.commonName || country.officialName}`} />
      <h2>País: {country.officialName}</h2>
      <h3>População: {country.population}</h3>
      <h4>Países Vizinhos:</h4>
      <ul>
        {country.borders.map(border => (
          <li key={border.countryCode}>
            <Link to={`/country-info/${border.countryCode}`}>{border.commonName || border.officialName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryInfo;
