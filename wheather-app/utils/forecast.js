const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e1560dd7467a280626a5a654e780cea2/'+latitude+','+longitude+'?units=si';

    request({url, json:true}, (error, {body})=>{
        if (error){
            callback('Unable to connect to wheather service', undefined)
        }else if(body.error){
            callback( 'Unable to find location',undefined)
        }else{
            callback(undefined,body.daily.data[0].summary +' There is '+body.currently.temperature+' degress out. There is a ' + body.currently.precipProbability +'% change of rain')
        }
    })
};

module.exports = forecast;