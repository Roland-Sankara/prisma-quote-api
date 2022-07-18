const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

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
        const newAuthor = await prisma.author.create({
            data: req.body
        })
        res.status(200).json(newAuthor);
    } catch (error) {
       res.status(500).json('Failed to perform request')
    }
    
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor
}