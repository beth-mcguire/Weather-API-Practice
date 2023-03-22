const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = '0da93d7980d818b5e06a6eb31e98f422';
    const unit = 'imperial';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=' + unit;

    https.get(url, function(response){
        console.log(response.statusCode);
        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const icon = 'https://openweathermap.org/img/wn/'+ weatherData.weather[0].icon +'@2x.png';
            res.write('<p>The weather is currently ' + weatherDescription + '</p>');
            res.write('<h1>The temperature in ' + query +  ' is ' + temp + ' degrees fahrenheit!</h1>');
            res.write('<img src =' + icon + '> </img>');
            res.send();
        });
    })
});

app.listen(3000, function(){
    console.log('server running');
});