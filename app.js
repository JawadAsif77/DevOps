const express = require('express');
const axios = require('axios');

const app = express();

const apiKey = '2c341dae152b70026143a6ea33333b0a'; 

const port = 3000;

app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        const response = await axios.get(url);

        const weatherData = {
            city: response.data.name,
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed
        };

        res.json(weatherData);

    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({ error: error.response.data.message });
        } else {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
