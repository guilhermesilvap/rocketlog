import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";
import { DeliveryStatus } from "@/controllers/deliveries-status-controller";

const deliveriesRoutes = Router()

const deliveriesController = new DeliveriesController()
const deliveryStatusController = new DeliveryStatus()

deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]))
deliveriesRoutes.post("/", deliveriesController.create)
deliveriesRoutes.get("/", deliveriesController.index)
deliveriesRoutes.patch("/:id/status", deliveryStatusController.update)

export { deliveriesRoutes }