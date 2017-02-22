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
            reject(err+' Unable to fetch IP informations.');
          }else{
            resolve(
              {
                ip:body.ip,
                hostname:body.hostname,
                region:body.region,
                country:body.country,
                city:body.city,
                loc:body.loc,
                org:body.org
              }
            );
          }
      });
  });
};
