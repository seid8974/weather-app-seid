const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res) =>{

 res.sendFile(__dirname + "/public/index.html");

})

app.post("/",(req,res) => {

    const cityName = req.body.city;
    const apikey = "8e799d72102d302f6c12330e600bde24";
    const units = "metric";

   const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityName +'&units='+ units +'&appid='+ apikey;
  https.get(url, (response) => {
    let rawData = '';

    response.on('data', (chunk) => {
      rawData += chunk;
    });

    response.on('end', () => {
      try {
        const weatherData = JSON.parse(rawData);

        const cod = weatherData.cod; // OpenWeather may return code as string or number
        if (response.statusCode !== 200 || (cod && Number(cod) !== 200)) {
          const message = weatherData.message || 'City not found';
          return res.status(response.statusCode === 200 ? 400 : response.statusCode).json({ error: message });
        }

        const city = weatherData.name;
        const weatherTemp = weatherData.main && weatherData.main.temp;
        const weatherDescription = weatherData.weather && weatherData.weather[0] && weatherData.weather[0].description;
        const icon = weatherData.weather && weatherData.weather[0] && weatherData.weather[0].icon;
        const imageUrl = 'https://openweathermap.org/img/wn/' + icon + '@2x.png';

        return res.json({
          city: city,
          temp: weatherTemp,
          condition: weatherDescription,
          image: imageUrl
        });
      } catch (e) {
        return res.status(500).json({ error: 'Error parsing weather data' });
      }
    });

    response.on('error', (err) => {
      return res.status(500).json({ error: 'Error fetching weather data' });
    });
  }).on('error', (err) => {
    return res.status(500).json({ error: 'Request error' });
  });
})

app.listen(port,(req,res) => {
    console.log('the port is http://localhost:'+ port);
    console.log("the server is running on port 3000");
})