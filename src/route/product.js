const express = require("express");
const router = express.Router();

const { getProduct } = require("../controllers/product.controller");
const { log } = require("console");


router.get("/",
async (request, response) => {
    const product = await getProduct()
    log(product)
    response.status(200).render('store', {product: product.data.content})
});

module.exports = router;
