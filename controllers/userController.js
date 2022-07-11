const {PrismaClient} = require('@prisma/client');
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
        res.status(200).json(users);
    } catch (error) {
       res.status(500).json('Failed to perform request')
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

        res.status(200).json({newUser,token});
    } catch (error) {
       res.status(500).json('Failed to perform request')
    }
    
}

module.exports = {
    getAllUsers,
    createUser
}

