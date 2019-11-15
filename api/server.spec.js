const request =require('supertest')
const server = require('./server')
const db = require('../database/dbConfig')

describe("POST /register", () => {

    describe('Registering a user', () => {
      beforeEach(async () => {
        await db('users')
        .truncate()
      })

      it('Should not all to register with no credentials', async()=> {
        const user = await  request(server)
            .post('/api/auth/register')
            .send({username: '', password: ''})
            expect(user.status).toBe(400)
      })
  
      it('Should receive status code of 201', async () => {
        const user = await request(server)
            .post('/api/auth/register')
            .send({username: "Tim", password: "1234"})
        expect(user.status).toBe(201)
      })

  
      it("Should register a user and come back in JSON format",async () => {
        const user = await request(server)
            .post('/api/auth/register')
            .send({username: "Timothy", password: "12345"})
        expect(user.type).toMatch(/json/i);
      })
    })
  })

  
  describe("POST /login", () => {
    
    describe("Login a user", () => {

        it(" should receive a 401 if user is not in database",async () => {
            const user = await request(server)
                .post('/api/auth/login')
                .send({username: "dog", password: "cats"})
                expect(user.status).toBe(401);
          })
      
      it(' respond with the correct status code', async () => {
        const user = await request(server)
            .post('/api/auth/login')
            .send({username: "Timothy", password: "12345"})
        expect(user.status).toBe(200);
      })
  
      it('User should respond with json', async () => {
        const user = await request(server)
            .post('/api/auth/login')
            .send({username: "Timothy", password: "12345"})
        expect(user.type).toMatch(/json/i);
      })
  
      it(' login a user and respond with a token', async () => {
        const user = await request(server)
            .post('/api/auth/login')
            .send({username: "Timothy", password: "12345"})
        expect(user.body.token).toBeTruthy()
        expect(user.body).toHaveProperty('token');
        expect(user.body.token).not.toHaveLength(0);
      })

    })
  })