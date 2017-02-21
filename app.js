var weather = require('./weather');
var location = require('./location');
var express = require('express');
var middleware=require('./middleware')
var app=express();
var info='<meta charset="utf-8"/>';
var PORT = process.env.PORT || 3300;
function print(data){
  return new Promise(function(resolve,reject){
    resolve(data);
  });
}

app.use(middleware.requireAuthentication);

app.use(middleware.logger);
app.get('/',function(req,res){
  console.log('/');
  var errorMessage ='';
  weather().then(
    function(data){
      console.log('weather');
      info+='<div>Weather info <i class"'+data.icon+'"></i> '+data.name +' '+data.temp+"</div>";
      return location()
    },function(error){
      errorMessage+=" Wether error : "+error+'\n';
      return print(errorMessage);
    }
  ).then(
    function(data){
      console.log('location');
      var str=data.city+' loc '+data.loc;
      info+="<div> Location info "+str+"</div> ";
      return print(info);
    },function(data){
      errorMessage+=" Location error : "+error+'\n';
      return print(errorMessage);
    }
  ).then(function(data){
    res.writeHead(200,{'Content-Type' : 'text/HTML'});
    res.end('<div><strong>'+info+'</strong></div>');
  });
});

// when you want to use static HTML pages.
app.use(express.static(__dirname+'/public'))
//
app.listen(PORT,function(){
  console.log('Server work at localhot:'+PORT);
});




//
// weather(function(currentWeather){
//   console.log(currentWeather);
// });
//
//
//
// location(function(location){
//   console.log('City   : '+location.city);
//   console.log('log/lat: '+location.loc);
// });
//


/* // NPM package
var weather = require('node-openweather')({
  key: "a61916be03f8410e46604b1c7612bb7e",
  accuracy: "like",
  unit: "metric",
  language: "en"
});

weather.city('Amman').now().then(function(res) {
  console.log(res);
}).catch(function(err) {
  console.log(err);
});
*/
