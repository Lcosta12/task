import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryInfo from './components/CountryInfo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/country-info/:countryCode" element={<CountryInfo />} /> 
      </Routes>
    </Router>
  );
};

export default App;
