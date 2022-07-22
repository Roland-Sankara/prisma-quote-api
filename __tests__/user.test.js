const { PrismaClient } = require('@prisma/client');
const request = require('supertest');
const app = require('../app');
const prisma = new PrismaClient

const userOne = {
    username: 'TestUser4',
    password: "18388dduy8"
}

beforeAll(async()=>{
    await prisma.user.create({
        data: {
            username: 'TestUser1',
            password: "seed12345--"
        }
    })
})

afterAll(async()=>{
    await prisma.user.deleteMany({
        where:{
            username: {
                contains: 'Test'
            }
        }
    })
})

test('Should get all users in the database', async()=>{
    await request(app).get('/api/v1/users').expect(500)
})

test('Should create a new user', async()=>{
    const response = await request(app).post('/api/v1/users').send({
        username: userOne.username,
        password: userOne.password
    })
    expect(response.body.token).toBeTruthy()
})

test('Should not create a new user without username', async()=>{
    await request(app).post('/api/v1/users').send({
        password: "18388ddu"
    }).expect(500)
})

/**
 * CHALLENGE
 * 1. Goal: Test login failure
 *    - Create "Should not login non-existent user" test case
 *        > make a request with bad /Invalid credentials
 *    - expect the correct status code/reponse to be returned
 *    - Run the test.
 * 
 * 2. Goal: Test user account deleted by authenticated user
 *    - Create "Should delete account for user" test case
 *        > Setup auth header and expect correcr status code/response to be returned
 *    - Create "Should not delete account by unauthenticated user"
 *        > Expect correct status code to be returned
 *    - Run the tests  
 */