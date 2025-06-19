import request from "supertest"
import { prisma } from "@/database/prisma"

import { app } from "@/app"

describe("UsersController", () => {

    let user_id: string

    afterAll(async () => {
        await prisma.user.delete({where:{id: user_id}})
    })

    it("should create a new user", async () => {
     const response = await request(app).post("/users").send({
    name: "Test User",
    email: "test@example.com",
    password: "123456"
     })
    
     expect(response.status).toBe(201)
     expect(response.body).toHaveProperty("id")
     expect(response.body.name).toBe("Test User")

     user_id = response.body.id
})
})
 