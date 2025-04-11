const express = require('express');
const app = express();
const PORT = 3001;


const weatherData = {
    'SãoPaulo': { city: 'São Paulo', temp: 25, unit: 'Celsius' },
    'RioDeJaneiro': { city: 'Rio de Janeiro', temp: 33, unit: 'Celsius' },
    'Curitiba': { city: 'Curitiba', temp: 13, unit: 'Celsius' },
};

app.get('/weather/:city', (req, res) => {
    const cityParam = req.params.city;
    const data = weatherData[cityParam];

    if (!data) {
        return res.status(404).json({ error: 'Cidade não encontrada' });
    }

    res.json(data);
});

app.listen(PORT, () => {
    console.log(`API B (Weather) rodando em http://localhost:${PORT}`);
});
