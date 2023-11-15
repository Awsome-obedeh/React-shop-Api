const jwt = require('jsonwebtoken');


const accessToken = function (id, user) {
    return jwt.sign({ id, user }, process.env.JWT_SECRET, { expiresIn: '2d' })
}

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers.token
    if(authHeader){
        const token=authHeader.split(" ")[1]
        jwt.verify(token,process.env.JWT_SECRET,(err,data)=>{
            if(err)res.status(403).json("Token is not valid")
            req.user=data
            next()
        })





    }
    else{
        return res.status(401).json("You are not authenticated")
    }
}  

const verifyTokenAndAuth=(req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.id=== req.params.id || req.user.isAdmin){

            next();
        }
        else{
            const {isAdmin,id}=req.user
            res.status(403).json({msg:'Operation Not allowed for you', isAdmin,id})
        }
    })

}

// authenticate for admin
const verifyTokenAdmin=(req,res,next)=>{
    verifyToken(req,res, ()=>{
        if(req.user.isAdmin){

            next();
        }
        else{
            const {isAdmin,id}=req.user
            res.status(403).json({msg:'Operation Not allowed for you', isAdmin,id})
        }
    })

}

module.exports={
    verifyToken,
    verifyTokenAndAuth,
    verifyTokenAdmin
}