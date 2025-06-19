import { Request, Response, NextFunction } from "express";
import { z } from "zod"
import { prisma } from "@/database/prisma"

class DeliveryStatus{
    async update(request:Request, response: Response, next: NextFunction){
     const paramsSchema = z.object({
        id: z.string().uuid(),
     })

     const bodySchema = z.object({
        status: z.enum(["processing", "shipped", "delivered"]),
     })

     const { id } = paramsSchema.parse(request.params)
     const { status } = bodySchema.parse(request.body)

     await prisma.delivery.update({
        data: {
            status,
        }, 
        where:{
            id,
        }
     })

     await prisma.deliveryLog.create({
        data:{
            deliveryID:id, 
            description: status
        }
     })

     return response.json()

    }
}

export {DeliveryStatus}