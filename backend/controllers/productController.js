import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";
//@desc Fetch all products
//@route GET /api/products
//@access public
const getProducts = asyncHandler(async (req, res, next) => {
	const products = await Product.find({});
	res.json(products);
});
//@desc Fetch a products
//@route GET /api/products/:id
//@access public
const getProductByID = asyncHandler(async (req, res, next) => {
	const product = await Product.findById(req.params.id);
	if (product) {
		return res.json(product);
	} else {
		res.status(404);
		throw new Error("Resource not found");
	}
});
export { getProducts, getProductByID };
