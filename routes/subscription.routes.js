import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import { cancelSubscription, createSubscription, deleteSubscription, getAllSubscriptions, getSubscriptionById, getUpcomingSubscriptions, getUserSubscriptions, updateSubscription } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions)
subscriptionRouter.get("/:id", getSubscriptionById)
subscriptionRouter.post("/", authorize, createSubscription)
subscriptionRouter.put("/:id", updateSubscription)
subscriptionRouter.delete("/:id", deleteSubscription)
subscriptionRouter.get("/user/:id", authorize , getUserSubscriptions)
subscriptionRouter.put("/:id/cancel", cancelSubscription )
subscriptionRouter.get("/upcoming-renewals", getUpcomingSubscriptions)

export default subscriptionRouter