var request = require('request');
//imperial = f
//metric = c
var url    = 'http://api.openweathermap.org/data/2.5/weather?q=Aqaba&units=metric&appid=a61916be03f8410e46604b1c7612bb7e';
//
module.exports = function(callback){
  return new Promise(function(resolve,reject){
    request({
        url: url,
        json:true
        },function(err,res,body){
          if(err){
            reject(err+' Unable to fetch weather.');
          }else{
            var message = JSON.stringify(body,null,4);
            //console.log(message);
            if(body.message){
              reject({
                code:body.cod,
                message:body.message
              });
            }else{
              resolve({
                icon : body.weather[0].icon,
                name : body.name,
                temp : body.main.temp
              });
            }
          }
      });
  })
}
