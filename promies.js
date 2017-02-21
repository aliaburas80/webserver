function doWork(data,callback){
  callback('done');
}
//
//
// function doWorkPromise(data){
//   return new Promise(function(resolve,reject){
//     setTimeout(function(){
//       reject('everyThing is borking!');
//     },1000);
//       // reject({
//       //   error:'Somthing that happened'
//       // });
//   });
// }
//
// doWorkPromise('some data').then(function(data){
//   console.log(data);
// },function(error){
//   console.log(error);
// })

var request = require('request');
function getWeather(location){
  console.log(location);
  var url    = 'http://api.openweathermap.org/data/2.5/weather?q='+location+'&units=metric&appid=a61916be03f8410e46604b1c7612bb7e';
  return new Promise(function(resolve,reject){
    request({
        url: url,
        json:true
        },function(err,res,body){
          if(err){
            reject({error:err,message:'Unable to fetch weather.'});
          }else{
            var message = JSON.stringify(body,null,4);
            if(body.message){
              reject({error:err,message:body.message,code:body.cod});
            }else{
              console.log(message);
              resolve(body.name+' temp right now is: '+body.main.temp+'c');
            }
          }
      });
  })
}

getWeather('Amman').then(function(data){
  console.log(data);
},function(error){
  console.log('Error\n code: '+error.code+',\n error: '+error.error+',\n message'+error.message);
});






// Advance Promise


function doWork(){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      console.log('done!');
      resolve(Math.random()*1000);
    },1000)
  })
}


function doWork2(num){
  return new Promise(function(resolve,reject){
    setTimeout(function(){
      console.log('done!'+num);
      resolve(num);
    },1000)
  })
}

doWork().then(function(num){
  return doWork2(num);
}).then(function(data){
  console.log('All done!' + data);
},function(){
    console.log('Error');
}).catch(function(error){
  console.log(error);
});
/*







//imperial = f
//metric = c
//
module.exports = function(callback){

}



*/
