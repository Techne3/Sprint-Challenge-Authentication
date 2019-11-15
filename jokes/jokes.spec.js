const request =require('supertest')
const server = require('../api/server')


describe("GET /api/jokes", () => {
    describe("Get jokes list", () => {

      it('should return error if accessed without any credentials', async() => {
          const response = await request(server)
          .get('/api/jokes')
          expect(response.status).toBe(400)
      })

      it("should return a list of jokes back", async () => {
        const response = await request(server)
            .get('/api/jokes')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbSIsImlhdCI6MTU3MzgzODM2NiwiZXhwIjoxNTczOTI0NzY2fQ.o-LTDoi51oaK5k3YGhAE75_th18OV7kcLDlXdTT85Bk')
        expect(response.body).not.toHaveLength(0);
        expect(response.body).toHaveLength(20);
      })
  
      it("Should return with a 200 status", async () => {
        const response = await request(server)
            .get('/api/jokes')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRpbSIsImlhdCI6MTU3MzgzODM2NiwiZXhwIjoxNTczOTI0NzY2fQ.o-LTDoi51oaK5k3YGhAE75_th18OV7kcLDlXdTT85Bk')
        expect(response.status).toBe(200)
      })
    })

  
  })
