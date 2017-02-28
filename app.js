var weather = require('./app/weather');
var location = require('./app/location');
var weatherAll = require('./app/weatherForMonth')
var express = require('express');
var middleware=require('./app/middleware')
var app=express();
var ejs = require('ejs')
var ejsData;
app.set('view engine' , 'ejs')

var PORT = process.env.PORT || 3300;
//
app.use(middleware.requireAuthentication);
//
app.use(middleware.logger);
app.get('/',function(req,res){
  var errorMessage ='';
  var city ;
  if(req.query){
    if(req.query.city){
      city = req.query.city;
    }else{
      ejsData={};
      ejsData.err='';
      ejsData.err =" Wether error : code:1002, message: please add query to main link {?city=cityname} ";
    res.render('select');//  res.render('errors', {data:ejsData});
    }
  }else{
  //    res.render('select');
  }

  weather(city).then(
    function(data){
     ejsData={
        icon:data.icon,
        city:data.name,
        temp:data.temp
      }
      return location()
    },function(error){
      ejsData.error =" Wether error : code: "+error.code+', message: '+error.message;
      res.render('errors', {data:ejsData});
      return;
    }
  ).then(
    function(data){
      var str=data.city+' loc '+data.loc;
      ejsData.ipCity = data.city;
      ejsData.loc    = data.loc;
      ejsData.ip = data.ip;
      ejsData.hostname = data.hostname;
      ejsData.region = data.region;
      ejsData.country = data.country;
      ejsData.org=data.org;
      return weatherAll(city);
    },function(data){
      ejsData.error=" Location error : "+error;
      res.render('errors', {data:ejsData});
    }
  ).then(function(data){
    ejsData.allWeather = data.arr;
    res.render('index', {data:ejsData});
  },function(data){
    ejsData.error=" Weather error : "+error;
    res.render('errors', {data:ejsData});
  });
});
// when you want to use static HTML pages.
app.use(express.static(__dirname + '/src'));
app.use('/index',express.static(__dirname+'/public'));
app.use('/info',express.static(__dirname+'/public/info.html'))
//
app.listen(PORT,function(){
  console.log('Server work at localhot:'+PORT);
});
