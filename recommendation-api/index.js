const express = require('express');
const axios = require('axios');
const redis = require('redis');
const app = express();
const PORT = 3000;

const client = redis.createClient({
    url: 'redis://localhost:6379'
});

client.connect().then(() => {
    console.log('Conectado ao Redis');
}).catch(console.error);

const API_B_URL = 'http://localhost:3001/weather';

app.get('/recommendation/:city', async (req, res) => {
    const city = req.params.city;

    try {
        let cacheCity = await client.get(city);

        let weatherData;

        if (!cacheCity) {
            const response = await axios.get(`${API_B_URL}/${city}`);
            console.log("utilizando a api")
            weatherData = response.data;

            await client.setEx(city, 60, JSON.stringify(weatherData));
        } else {
            console.log("utilizando o cache")
            weatherData = JSON.parse(cacheCity);
        }

        const { city: cityName, temp } = weatherData;

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
            recommendation
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar dados do clima.' });
    }
});

app.listen(PORT, () => {
    console.log(`API A (Recommendation) rodando em http://localhost:${PORT}`);
});
