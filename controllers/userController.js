const {PrismaClient} = require('@prisma/client');
const { StatusCodes } = require('http-status-codes');
const JWT = require('jsonwebtoken');
const prisma = new PrismaClient();

/**
 * JWT.sign({username:req.body.username, userId:newUser.id}, "secret-key")
 * 
 *  
 */

const getAllUsers = async(req, res)=>{
    try {
        const users = await prisma.user.findMany({})
        res.status(StatusCodes.OK).json(users);
    } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Failed to perform request')
    }
    
}


const createUser = async(req, res)=>{
    try {
        const newUser = await prisma.user.create({
            data: req.body
        })
        
        // creating JWT token
        const token = JWT.sign({
            username: req.body.username,
            userId: newUser.id
        }, "open123");

        res.status(StatusCodes.OK).json({newUser,token});
    } catch (error) {
       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Failed to perform request')
    }
    
}

module.exports = {
    getAllUsers,
    createUser
}

