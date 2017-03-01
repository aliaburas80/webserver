var request = require('request');

module.exports=function(city,callback){
  url='http://openweathermap.org/data/2.5/forecast?q='+city+',DE&appid=b1b15e88fa797225412429c1c50c122a1';
  console.log('http://openweathermap.org/data/2.5/forecast?q='+city+',DE&appid=b1b15e88fa797225412429c1c50c122a1');
  return new Promise(function(resolve,reject){
    request({
        url: url,
        json:true
        },function(err,res,body){
          if(err){
            reject(err+' Unable to fetch weather.');
          }else{
            var message = JSON.stringify(body,null,4);
            if(body.error){
              reject({
                code:body.cod,
                message:body.message
              });
            }else{
              var arr = [];
              for(var a in body.list){
                arr.push(body.list[a]);
              }
              resolve(
                {
                  arr:arr
              }
            );
            }
          }
      });
  })
}








  /*

  { dt: 1488650400,
    main:
     { temp: 14.44,
       temp_min: 14.44,
       temp_max: 14.44,
       pressure: 1004.91,
       sea_level: 1021.03,
       grnd_level: 1004.91,
       humidity: 63,
       temp_kf: 0 },
    weather:
     [ { id: 803,
         main: 'Clouds',
         description: 'broken clouds',
         icon: '04n' } ],
    clouds: { all: 64 },
    wind: { speed: 4.25, deg: 223.5 },
    rain: {},
    sys: { pod: 'n' },
    dt_txt: '2017-03-04 18:00:00' }
  [ { id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04n' } ]


  */
