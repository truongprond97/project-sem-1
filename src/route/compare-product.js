const route = require('express').Router()

const {getProductDetail} = require('../services/product.service')

route.get('/', async (request, response) => {
    try{
        if(!request.query.id1 || !request.query.id2) throw new Error('invalid request!')
        const productOne = await getProductDetail(request.query.id1)
        const productTwo = await getProductDetail(request.query.id2)

        const dataResponse = { 
            productOne: productOne.data,
            productTwo: productTwo.data
        }

        response.   status(200).render('compare-product', dataResponse)
    }catch(e){
        response.status(404).render('404')
    }
})

module.exports = route