const JWT = require('jsonwebtoken');

const authenticate = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader, req.headers);
    if(authHeader){
        if(authHeader.startsWith('Bearer')){
            const token = authHeader.split(' ')[1];
            JWT.verify(token,'open123', (err, decoded)=>{
                if(err){
                    res.status(400).json('Token is Invalid');
                }else{
                    console.log(decoded);
                    next();
                }
            })

        }else{
            res.status(400).json('Authorization header is malformed.');
        }
    }else{
        res.status(400).json('Authorization header is missing');
    }

}

module.exports = authenticate;