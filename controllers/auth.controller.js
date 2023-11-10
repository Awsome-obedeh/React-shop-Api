const jwt=require('jsonwebtoken');

const accessToken=function(id,user){
    return jwt.sign({id,user},process.env.JWT_SECRET,{expiresIn:'2d'})
}

const verifyToken=(req,res,next)=>{
    // get token from jwt token headers
    const token=req.headers.token;
    if(!token)return res.status(401).json("Token is inavlid")
//    verify the token
    jwt.verify(token,process.env.JWT_SECRET, (err,data)=>{
        // if there is an error 
        if(err) res.status(403).json("Inauthorized operation")
        // assign the jwt payload to the req object
        req.user=data;
        next();
    } )
}

module.exports={
    accessToken,
    verifyToken
}