import express from "express";
import {getAllProducts , getProductById , getProductByName} from "../controllers/product.controller.js";

const router = express.Router();

router.route("/").get(getAllProducts);

router.route("/search").get(getProductByName);

router.route("/:id").get(getProductById);

export default router;