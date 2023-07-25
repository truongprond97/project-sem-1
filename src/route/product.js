const express = require("express");
const router = express.Router();

const {getProduct} = require("../controllers/product.controller");
const {log} = require("console");
const {getCategory} = require('../services/category.service')
const {getBranch} = require("../services/branch.service");

router.get("/", async (request, response) => {
    const product = await getProduct()
    const category = await getCategory()
    const branch = await getBranch()
    const options = {
        product: product.data.content, category: category.data, branch: branch.data
    }
    response.status(200).render('store', options)
});

router.get("/:id", async (request, response) => {
    const requestId = request.params['id']
    // const detailProduct = await getProductDetail(requestId)
    // if(detailProduct.status !== 200){
    //     response.status(404).render('404')
    //     return
    // }
    const product = await getProduct()
    const responseData = {
        // detailProduct: detailProduct.data,
        products: product.data.content.slice(0, 4)
    }
    response.status(200).render('detail-product', responseData)
})

module.exports = router;
