const express = require("express");
const {getProduct} = require("../services/product.service");
const router = express.Router();


router.post("/products", async (request, response) => {
    console.log(request)
    try{

        if(!request.body || !request.body.data || !Array.isArray(request.body.data)) throw new Error('invalid body data')

        const product = await getProduct()

        if (!product?.data?.content ) throw new Error('Invalid product list')

        const responseList = []
        request.body.data.forEach((item) => {
            const exact = product.data.content.find(product => product.id === item.id)
            if (exact) {
                exact.quantity = item.quantity
                responseList.push(exact)
            }
        })
        response.status(200).json({
            data: responseList
        })
    }catch (e) {
        response.status(500).send({
            message: "INTERNAL_SERVER_ERROR"
        })
    }


})

module.exports = router
