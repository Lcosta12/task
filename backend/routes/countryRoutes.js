const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/available-countries', async (req, res) => {
    try {
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar países disponíveis' });
    }
});

router.get('/country-info/:countryCode', async (req, res) => {
    const { countryCode } = req.params;

    try {
        const countryInfo = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);
        const populationData = await axios.get('https://countriesnow.space/api/v0.1/countries/population', { country: countryCode });
        const flagData = await axios.get('https://countriesnow.space/api/v0.1/countries/flag/images', { country: countryCode });

        res.json({
            countryInfo: countryInfo.data,
            population: populationData.data,
            flag: flagData.data
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar informações do país' });
    }
});

module.exports = router;
