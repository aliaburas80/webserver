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
  info='<meta charset="utf-8"/>';
  var errorMessage ='';
  var city = "Amman";
  if(req.query){
      city = req.query.city;
  }
  weather(city).then(
    function(data){
      info+="<div style = 'margin:0 auto; text-align:center'>"
      info+="<h1>Angry Cloud Weather App</h1>"
      info+="<h4>Nodejs and Express</h4>"
      info+='<div><h1>Weather infromation for <spane style="color:red;font-style: italic;font-family: monospace;">'+data.name+'</spane> city </h1></div>'
      info+='<div> <i class"'+data.icon+'"></i> <h2 style="">Current temperature degree { '+data.temp+" &#176 }</h2></div>";
      info+="</div>"
      return location()
    },function(error){
      errorMessage+=" Wether error : "+error+'\n';
      return print(errorMessage);
    }
  ).then(
    function(data){
      console.log('location');
      var str=data.city+' loc '+data.loc;
      info+="<div style='font-size: 8px;  margin: 0 auto;color: chocolate;text-align: center;'>"
      info+="<div>|----------------------------------------------------------------------|</div>"
      info+="<div>|----------------------------------------------------------------------|</div>"
      info+="<div>|----------------------------------------------------------------------|</div>"
      info+="<div>|----------------------------------------------------------------------|</div>"

      info+="<div>  server location info "+str+"</div> ";

      info+="<div>|----------------------------------------------------------------------|</div>"
      info+="<div>|----------------------------------------------------------------------|</div>"
      info+="<div>|----------------------------------------------------------------------|</div>"
      info+="<div>|----------------------------------------------------------------------|</div>"
      info+="</div>"
      info+='<div style="font-size: 14px;  margin: 0 auto;color: chocolate;text-align: center;"> <a href="https://angrycloud-weather-app.herokuapp.com/info" type="button"> How to use this service </a> </div>';

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
app.use('/index',express.static(__dirname+'/public'));
app.use('/info',express.static(__dirname+'/public/info.html'))

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
