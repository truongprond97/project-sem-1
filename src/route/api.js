const express = require("express");
const {getProduct, getProductWithParams, mappedQueryParams} = require("../services/product.service");
const {response} = require("express");
const router = express.Router();


router.post("/cart", async (request, response) => {
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

router.get("/products", async (request, response) => {
    try {
    const resData = await getProductWithParams(mappedQueryParams(request.query))
        console.log(resData)
        if(resData.status !== 200) throw new Error('invalid body data')
        response.status(200).json({data : resData.data.content})
    }catch (e) {
        response.status(500).send({
            message: "INTERNAL_SERVER_ERROR"
        })
    }
})

module.exports = router
