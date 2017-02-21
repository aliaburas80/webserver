// fitch user location based on IP
var request = require('request');
var url ='http://ipinfo.io/json';
//
module.exports=function(callBack){
  return new Promise(function(resolve,reject){
    request({
        url: url,
        json:true
      },function(err,res,body){// call back function
          if(err){
            reject(err+' Unable to fetch weather.');
          }else{
            resolve({city:body.city,loc:body.loc});
          }
      });
  });
};
