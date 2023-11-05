import express from "express";
const router = express.Router();
import {
	getProducts,
	getProductByID,
	createProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware																																														/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/:id").get(getProductByID);

export default router;
