module.exports ={
    requireAuthentication:  function(req,res,next){
      // info+='<div>private route hit</div>'
      console.log('private route hit');
      next();
    },
    logger:function(req,res,next){
      // info+='<div>'+req.method+' '+req.originalUrl+' '+new Date().toString()+'</div>'
      console.log(req.method+' '+req.originalUrl+' '+new Date().toString());
      next();
  }
}
