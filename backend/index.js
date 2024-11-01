const express = require('express');
const cors = require('cors'); 
const countryRoutes = require('./routes/countryRoutes');

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/api', countryRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
