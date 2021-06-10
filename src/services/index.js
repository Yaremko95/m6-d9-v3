import express from "express";
const route = express.Router();

import cartsRoute from "./cart/index.js";
import categoriesRoute from "./categories/index.js";
import productsRoute from "./products/index.js";
import usersRoute from "./users/index.js";
route.use("/cart", cartsRoute);
route.use("/categories", categoriesRoute);
route.use("/products", productsRoute);
route.use("/users", usersRoute);

export default route;
