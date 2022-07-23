const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const cloudinary = require('cloudinary');
const {unlink} = require('fs');

const upload = multer({dest: "uploads/"});

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

const getAllAuthors = async(req, res)=>{
    try {
        const authors = await prisma.author.findMany({
            include: {
                quotes: true
            }
        })
        res.status(200).json(authors);
    } catch (error) {
       res.status(500).json('Failed to perform request')
    }
    
}

const getAuthorById = async(req, res)=>{
    try {
        const author = await prisma.author.findUnique({
            where: {
                id: Number(req.params.authorId)
            },
            include: {
                quotes: true
            }
        })
        res.status(200).json(author);
    } catch (error) {
       res.status(500).json('Failed to perform request')
    }
    
}

const createAuthor = async(req, res)=>{
    try {
        const uploadedImage = await cloudinary.v2.uploader.upload(req.file.path);
        const newAuthor = await prisma.author.create({
            data: {
                name: req.body.name,
                picture: uploadedImage.url
            }
        })
        // delete file from uploads folder
        unlink(req.file.path,(err)=>{
            if(err) return res.json('failed to delete file');
        });
        
        res.status(200).json(newAuthor);
    } catch (error) {
       res.status(500).json({message:'Failed to perform request',error})
    }
    
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    upload
}