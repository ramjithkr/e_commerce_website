import express from "express";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import adminRouter from "./adminRouter.js";
import cartRouter from "./cartRouter.js";
import wishlistRouter from "./wishlistRouter.js";
import ratingRouter from "./ratingRouter.js";

const v1Router = express.Router();

v1Router.use("/user", userRouter);
v1Router.use("/product", productRouter);
v1Router.use("/admin", adminRouter);
v1Router.use("/cart", cartRouter);
v1Router.use("/wishlist", wishlistRouter);
v1Router.use("/rating", ratingRouter);

export default v1Router;
