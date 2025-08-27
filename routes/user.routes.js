import { Router } from "express";
import { deleteUser, getAllUsers,getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import rateLimitMiddleware from "../middlewares/arcjet.middleware.js";

const userRouter = Router();

userRouter.get("/", rateLimitMiddleware, getAllUsers)
userRouter.get("/:id",authorize, getUser)

userRouter.post("/", (req,res) => {
    res.send({
        title : "Create new user"
    })
})

userRouter.put("/:id",(req,res) => {
    res.send({
        title : "update user data"
    })
})

userRouter.delete("/:id", deleteUser)

export default userRouter