import { Router } from "express"

import { SessionController } from "@/controllers/session-controller"

const sessionsRoutes = Router()

const sessionController = new SessionController()

sessionsRoutes.post("/", sessionController.create)

export { sessionsRoutes }