const express = require("express");
const router = express.Router();

const {getProduct, getProductDetail} = require("../controllers/product.controller");
const {log} = require("console");
const {getCategory, getSubCategory} = require('../services/category.service')
const {getBranch} = require("../services/branch.service");
const {getProductWithParams, mappedQueryParams} = require("../services/product.service");

router.get("/", async (request, response) => {
    try {
        const product = await getProductWithParams(mappedQueryParams(request.query))
        const category = await getCategory()
        const branch = await getBranch()
        const subCategory = await getSubCategory()
        const options = {
            product: product.data.content.slice(0,4),
            category: category.data,
            branch: branch.data, subCategory
        }
        response.status(200).render('store', options)
    }catch (e){
        response.status(404).render('404')

    }

});

router.get("/:id", async (request, response) => {
    try {
    const requestId = request.params['id']
    const detailProduct = await getProductDetail(requestId)
    if(detailProduct.status !== 200){
        response.status(404).render('404')
        return
    }
    const product = await getProduct()
    const responseData = {
        detailProduct: detailProduct.data,
        products: product.data.content.slice(0, 4),
        isShowRelateProduct: true
    }
    response.status(200).render('detail-product', responseData)
    }catch (e){
        response.status(404).render('404')

    }
})

module.exports = router;
