const express = require('express');
const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
const apiKey = 'bc75d3e74f0d58448c510e6a1d29e6a3';
rl.question('Digite o nome da cidade: ', (city) => {
 
  const geoApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  axios.get(geoApiUrl)
    .then(response => {
      const geoData = response.data[0];

      if (geoData) {
        const { name, lat, lon } = geoData;

        const weatherApiUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

        return axios.get(weatherApiUrl);
      } else {
        console.log('Cidade não encontrada.');
        rl.close();
      }
    })
    .then(response => {
      const weatherData = response.data;

      if (weatherData) {
        const { main, weather } = weatherData;

        console.log(`Cidade: ${weatherData.name}`);
        console.log(`Latitude: ${weatherData.coord.lat}`);
        console.log(`Longitude: ${weatherData.coord.lon}`);
        console.log(`Sensação Térmica: ${main.feels_like} Kelvin`);
        console.log(`Descrição do Clima: ${weather[0].description}`);
      }

      rl.close();
    })
    .catch(error => {
      console.error('Erro ao obter dados da API:', error.message);
      rl.close();
    });
});
  
