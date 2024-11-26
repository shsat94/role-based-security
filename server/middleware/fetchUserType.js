const jwt=require('jsonwebtoken');
const secretKey=process.env.JWT_AUTHENTICATION_KEY;

const fetchUserType=async(req,res,next)=>{
    let execution=true;
    try {
        let tokenispresent=false;
        const token=req.header('auth-token');
        if(!token){
            res.status(404).json(tokenispresent);
        }
        const data=await jwt.verify(token,secretKey);
        req.user=data.user;
        next();
    } catch (error) {
        execution=false;
        res.status(500).json({execution});
    }
};


module.exports=fetchUserType;