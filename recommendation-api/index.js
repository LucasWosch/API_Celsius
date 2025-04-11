const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// URL da API B
const API_B_URL = 'http://localhost:3001/weather';

app.get('/recommendation/:city', async (req, res) => {
    const city = req.params.city;

    try {
        const response = await axios.get(`${API_B_URL}/${city}`);
        const { city: cityName, temp, unit } = response.data;

        let recommendation = '';

        if (temp > 30) {
            recommendation = 'Está muito quente! Hidrate-se e use protetor solar.';
        } else if (temp > 15) {
            recommendation = 'O clima está agradável!';
        } else {
            recommendation = 'Está frio! Não esqueça o casaco.';
        }

        res.json({
            city: cityName,
            temp,
            unit,
            recommendation
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar dados do clima.' });
    }
});

app.listen(PORT, () => {
    console.log(`API A (Recommendation) rodando em http://localhost:${PORT}`);
});
