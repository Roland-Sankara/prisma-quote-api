const {StatusCodes} = require('http-status-codes');
const validateData = (schema)=>{
    return (
        (req, res, next)=>{

            const {error, value} =  schema.validate(req.body);
            if(error){
                res.status(StatusCodes.BAD_REQUEST).json({error: error.details[0].message});
            }else{
                next();
            }
        }
    )
}

module.exports = validateData;